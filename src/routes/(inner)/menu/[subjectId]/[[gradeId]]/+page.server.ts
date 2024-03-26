import type { MetaTagsProps } from 'svelte-meta-tags';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	const { subjectId, gradeId } = params;
	const subject = await prisma.subject.findUnique({
		where: { slug: subjectId }
	});
	if (!subject) error(404, 'Not found');

	if (gradeId) {
		const grade = await prisma.grade.findUnique({
			where: { slug: gradeId }
		});
		if (!grade) error(404, 'Not found');
	}

	const pageMetaTags = Object.freeze({
		title: 'MENU'
	} satisfies MetaTagsProps);

	return { pageMetaTags };
}) satisfies PageServerLoad;
