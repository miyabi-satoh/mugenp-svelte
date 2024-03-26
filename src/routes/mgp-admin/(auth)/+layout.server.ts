import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (!locals.user) redirect(302, '/mgp-admin');

	return {
		user: locals.user
	};
}) satisfies LayoutServerLoad;
