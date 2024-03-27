import { error } from '@sveltejs/kit';
import { pages } from '$lib/pages';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const practiceId = params.practiceId;

	const page = pages.find((p) => p.id === practiceId);
	if (!page) error(404, `Page ${practiceId} not found.`);

	return { page };
}) satisfies PageServerLoad;
