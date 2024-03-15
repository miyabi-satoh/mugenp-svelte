import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import type { Category } from '@prisma/client';

export const load = (async ({ params }) => {
	const [subjectId, gradeId, ...categories] = params.categories.split('/');

	// subjectIdが存在しない場合、404エラーを返します。
	if (subjectId) {
		const res = await prisma.subject.findUnique({
			where: { id: subjectId },
			select: { id: true }
		});
		if (!res) error(404, 'Not found.');
	}

	// gradeIdが存在しない場合、404エラーを返します。
	if (gradeId) {
		const res = await prisma.grade.findUnique({
			where: { id: gradeId },
			select: { id: true }
		});
		if (!res) error(404, 'Not found.');
	}

	if (categories.length > 0) {
		let parentId = null;
		for (const slug of categories) {
			const res: Category | null = await prisma.category.findFirst({
				where: {
					subjectId: parentId ? null : subjectId,
					gradeId: parentId ? null : gradeId,
					parentId,
					slug
				}
			});
			if (!res) error(404, 'Not found.');
			parentId = res.id;
		}
	}

	return { subjectId, gradeId, categories };
}) satisfies LayoutServerLoad;
