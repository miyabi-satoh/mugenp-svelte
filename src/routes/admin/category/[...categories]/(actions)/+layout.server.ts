import type { LayoutServerLoad } from './$types';

export const load = (async ({ parent }) => {
	const data = await parent();
	console.log('src/routes/admin/category/[...categories]/(actions)/+layout.server.ts', data);
	return {};
}) satisfies LayoutServerLoad;
