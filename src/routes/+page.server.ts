import type { PageServerLoad } from "./login/$types";

export const load: PageServerLoad = async ({ locals }) => {	
	return {
		email: locals.email,
    avatar: locals.avatar,
		username: locals.username
	};
};
