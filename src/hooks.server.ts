import PocketBase from 'pocketbase';
import { redirect, type Handle } from '@sveltejs/kit';
import { building } from '$app/environment';
import { site } from '$lib/config/config';
import { getTokenOptions } from '$lib/utils';

const pb = new PocketBase(site.pocketbaseServer);

export const handle: Handle = async ({ event, resolve }) => {
    if (event.request.url.includes('/favicon.png')) {
        return await resolve(event);
    }

    event.locals.id = '';
    event.locals.email = '';
    event.locals.avatar = '';
    event.locals.username = '';
    event.locals.name = '';
    event.locals.pb = new PocketBase(site.pocketbaseServer);

    const isLogin: boolean = event.url.pathname === '/login';
    const isLogout: boolean = event.url.pathname === '/logout';
    const pb_auth = event.request.headers.get('cookie') ?? '';
    event.locals.pb.authStore.loadFromCookie(pb_auth, site.cookieKey);
        
    if (isLogin && !event.locals.pb.authStore.isValid || building) {
        event.locals.pb.authStore.clear();
        event.cookies.set(site.cookieKey, '', getTokenOptions());
        return await resolve(event);
    }

    if (isLogin) {
        throw redirect(301, '/');
    }

    if (isLogout || !event.locals.pb.authStore.isValid) {
        event.locals.pb.authStore.clear();
        event.cookies.set(site.cookieKey, '', getTokenOptions());
        throw redirect(301, '/login');
    }

    try {
        const auth = await event.locals.pb
            .collection('users')
            .authRefresh<{ id: string; email: string }>();

        event.locals.id = auth.record.id;
        event.locals.email = auth.record.email;
        event.locals.avatar = pb.getFileUrl(auth.record, auth.record.avatar);
        event.locals.username = auth.record.username;
        event.locals.name = auth.record.name;
    } catch (err: unknown) {
        console.log('>>>>>ERR', err);
        throw redirect(301, '/login');
    }

    if (!event.locals.id) {
        event.locals.pb.authStore.clear();
        throw redirect(301, '/login');
    }

    const response = await resolve(event);
    const cookie = event.locals.pb.authStore.exportToCookie(getTokenOptions());
    response.headers.append('set-cookie', cookie);

    return response;
};