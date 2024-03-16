import { CategorySchema, type Category } from '$lib/schemas/zod';
import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

const schema = CategorySchema.extend({
	id: CategorySchema.shape.id.optional()
});

async function splitParams(params: string): Promise<string[]> {
	const [subjectId, gradeId, ...categories] = params.split('/');

	// 指定されたsubjectIdが存在しない場合、404エラーを返します。
	if (subjectId) {
		const res = await prisma.subject.findUnique({
			where: { id: subjectId },
			select: { id: true }
		});
		if (!res) error(404, 'Not found.');
	}

	// 指定されたgradeIdが存在しない場合、404エラーを返します。
	if (gradeId) {
		const res = await prisma.grade.findUnique({
			where: { id: gradeId },
			select: { id: true }
		});
		if (!res) error(404, 'Not found.');
	}

	// 指定されたcategoriesが正しい階層でない場合、404エラーを返します。
	let lastId = 0;
	if (categories.length > 0) {
		let parentId = null;
		for (const [index, slug] of categories.entries()) {
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
			if (index === categories.length - 1) lastId = res.id;
		}
	}

	return [subjectId, gradeId, lastId > 0 ? `${lastId}` : ''];
}

type FlattenCategory = {
	path: string;
	title: string;
	depth: number;
};
async function fetchCategories(
	subjectId: string | null,
	gradeId: string | null,
	parentId: number | null = null,
	depth: number = 0,
	curPath: string = ''
) {
	const categories = await (async () => {
		if (subjectId && gradeId) {
			return await prisma.category.findMany({
				where: { subjectId, gradeId },
				orderBy: [{ sortOrder: 'asc' }, { title: 'asc' }]
			});
		} else if (parentId) {
			return await prisma.category.findMany({
				where: { parentId },
				orderBy: [{ sortOrder: 'asc' }, { title: 'asc' }]
			});
		} else {
			return [];
		}
	})();

	if (!curPath) curPath = `${subjectId}/${gradeId}`;

	const result: FlattenCategory[] = [];
	for (const category of categories) {
		const path = `${curPath}/${category.slug}`;
		result.push({ depth, ...category, path });
		const children = await fetchCategories(null, null, category.id, depth + 1, path);
		result.push(...children);
	}

	return result;
}

export const load = (async ({ params }) => {
	const [subjectId, gradeId, categoryId] = await splitParams(params.categories);

	const subjects = await prisma.subject.findMany({
		orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }]
	});
	const grades = await prisma.grade.findMany({
		orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }]
	});
	const categories = await fetchCategories(subjectId, gradeId);
	// console.log('-----')
	// categories.forEach(category => console.log(' '.repeat(category.depth) + category.title, category.path))
	// console.log('-----')

	const category = await (async () => {
		if (categoryId) {
			return await prisma.category.findUnique({
				where: { id: parseInt(categoryId) },
				include: {
					children: {
						orderBy: [{ sortOrder: 'asc' }, { title: 'asc' }]
					}
				}
			});
		}
		if (subjectId && gradeId) {
			const children = await prisma.category.findMany({
				where: { subjectId, gradeId },
				orderBy: [{ sortOrder: 'asc' }, { title: 'asc' }]
			});
			const subject = subjects.find((s) => s.id === subjectId);
			const grade = grades.find((g) => g.id === gradeId);
			return {
				id: 0,
				subjectId,
				gradeId,
				parentId: null,
				slug: `${subjectId}/${gradeId}`,
				title: `${subject?.title} ${grade?.title}`,
				sortOrder: 0,
				children
			} satisfies Category & { children: Category[] };
		}
		return null;
	})();
	// console.log('category', category);

	const paths: { path: string; title: string }[] = [];

	const form = await superValidate(zod(schema));
	return { subjects, grades, categories, subjectId, gradeId, category, paths, form };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, params }) => {
		const [subjectId, gradeId] = await splitParams(params.categories);
		const form = await superValidate(request, zod(schema));
		console.dir(form);
		if (!form.valid) return message(form, 'Invalid form.');

		// フォームデータのIDを使用してカテゴリーを検索し、存在しない場合はエラーメッセージを返す
		if (form.data.id) {
			const res = await prisma.category.findUnique({
				where: { id: form.data.id }
			});
			if (!res) {
				return message(form, `Category ${form.data.id} not found.`, { status: 400 });
			}
		}

		// 親カテゴリが指定されていない -> 教科・学年直下
		if (!form.data.parentId) {
			form.data.subjectId = subjectId;
			form.data.gradeId = gradeId;
			form.data.parentId = null;
		}

		console.dir(form);

		try {
			await prisma.$transaction(async (prisma) => {
				if (!form.data.id) {
					await prisma.category.create({
						data: form.data
					});
				} else {
					await prisma.category.update({
						where: { id: form.data.id },
						data: {
							slug: form.data.slug,
							title: form.data.title
						}
					});
				}
			});
			return message(form, `Category ${form.data.id ? 'updated' : 'created'}!`);
		} catch (e) {
			console.error(e);
			return message(form, 'Database error', { status: 400 });
		}
	}
};
