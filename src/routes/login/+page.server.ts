import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { getTokenOptions } from '$lib/utils';
import { site } from '$lib/config/config';

export const actions = {
  default: async ({ request, cookies }) => {
    const form = await request.formData();
    const token = form.get('token');
    if (!token || typeof token !== 'string') {
      throw redirect(301, '/login');
    }
    cookies.set(site.cookieKey, JSON.stringify({ token: token }), getTokenOptions());
    throw redirect(301, '/');
  }
} satisfies Actions;
