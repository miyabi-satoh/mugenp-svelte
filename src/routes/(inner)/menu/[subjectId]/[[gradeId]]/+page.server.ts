import type { MetaTagsProps } from 'svelte-meta-tags';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const pageMetaTags = Object.freeze({
		title: 'HOME'
	} satisfies MetaTagsProps);
	return { pageMetaTags };
}) satisfies PageServerLoad;
