import { CategorySchema, type Category } from '$lib/schemas/zod';
import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

const schema = CategorySchema.extend({
	id: CategorySchema.shape.id.optional()
});

export const load = (async ({ parent }) => {
	const { subjectId, gradeId, categories } = await parent();

	// categories配列を使用して、ネストされたカテゴリーのIDを構築し、
	// そのIDに対応するカテゴリーをデータベースから検索します。
	// 見つからない場合は404エラーを返します。
	// 最後のカテゴリーをcategoryに格納します。
	const { category, paths } = await (async () => {
		let path = `/${subjectId}/${gradeId}`;
		const paths = [{ path, title: 'Root' }];

		if (categories.length > 0) {
			let parentId = null;
			for (const [index, slug] of categories.entries()) {
				const last = index === categories.length - 1;
				const res = (await prisma.category.findFirst({
					where: {
						subjectId: parentId ? null : subjectId,
						gradeId: parentId ? null : gradeId,
						parentId,
						slug
					}
				})) as Category | null;
				if (!res) error(404, 'Not found.');

				path += `/${res.slug}`;
				paths.push({ path, title: res.title });

				if (last) {
					const category = await prisma.category.findUnique({
						where: { id: res.id },
						include: {
							children: {
								orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }]
							}
						}
					});
					return { category, paths };
				}
				parentId = res.id;
			}
		} else if (gradeId && subjectId) {
			const children = await prisma.category.findMany({
				where: { subjectId, gradeId },
				orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }]
			});
			const category = {
				id: 0,
				slug: 'root',
				title: 'Root',
				sortOrder: 0,
				gradeId: gradeId ?? null,
				subjectId: subjectId ?? null,
				parentId: null,
				children
			} satisfies Category & { children: Category[] };

			return { category, paths };
		}
		return { category: null, paths };
	})();

	const subjects = await prisma.subject.findMany({
		orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }]
	});
	const grades = await prisma.grade.findMany({
		orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }]
	});

	const form = await superValidate(zod(schema));
	return { subjects, grades, subjectId, gradeId, category, paths, form };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, params }) => {
		const [subjectId, gradeId, ...categories] = params.categories.split('/');
		// categories配列の最後の要素をチェックして
		// 'add'または'edit'の場合にその値をactionに設定し
		// それ以外の場合はnullを設定します。
		const action = (() => {
			if (categories.length > 0) {
				switch (categories[categories.length - 1]) {
					case 'add':
					case 'edit':
						return categories.pop();
				}
			}
			return null;
		})();
		console.dir(action);

		const form = await superValidate(request, zod(schema));
		console.dir(form);
		if (!form.valid) return message(form, 'Invalid form.');

		if (!form.data.parentId) {
			form.data.subjectId = subjectId;
			form.data.gradeId = gradeId;
			form.data.parentId = null;
		}

		if (form.data.id) {
			const res = await prisma.category.findUnique({
				where: { id: form.data.id }
			});
			if (!res) {
				return message(form, `Category ${form.data.id} not found.`, { status: 400 });
			}
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
