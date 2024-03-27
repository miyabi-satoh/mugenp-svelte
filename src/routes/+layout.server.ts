import type { MetaTagsProps } from 'svelte-meta-tags';
import { assets } from '$app/paths';
import { APP_DESCRIPTION, APP_TITLE } from '$env/static/private';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ url }) => {
	const href = new URL(url.pathname, url.origin).href;
	const ogImageUrl = `${assets}/opengraph-image.png`;
	const baseMetaTags = Object.freeze({
		title: APP_TITLE,
		titleTemplate: `%s - ${APP_TITLE}`,
		description: APP_DESCRIPTION,
		canonical: href,
		openGraph: {
			type: 'website',
			url: href,
			locale: 'ja_JP',
			title: APP_TITLE,
			description: APP_DESCRIPTION,
			siteName: APP_TITLE,
			images: [
				{
					url: ogImageUrl,
					alt: APP_DESCRIPTION,
					width: 1200,
					height: 630,
					secureUrl: ogImageUrl,
					type: 'image/png'
				}
			]
		}
	} satisfies MetaTagsProps);

	return { baseMetaTags };
}) satisfies LayoutServerLoad;
