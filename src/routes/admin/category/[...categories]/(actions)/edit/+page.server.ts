import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
	const data = await parent();
	console.log('src/routes/admin/category/[...categories]/(actions)/edit/+page.server.ts', data);
	return {};
}) satisfies PageServerLoad;
