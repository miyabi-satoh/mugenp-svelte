import { CategorySchema, type Category } from '$lib/schemas/zod';
import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

const schema = CategorySchema.extend({
	id: CategorySchema.shape.id.optional()
});

// URLパラメータからカテゴリー階層を分割し、それぞれの存在を検証する関数
async function splitParams(params: string): Promise<number> {
	const categories = params.split('/').filter((s) => !!s);

	// 指定されたcategoriesが正しい階層でない場合、404エラーを返します。
	let lastId = 0;
	if (categories.length > 0) {
		let parentId = null;
		for (const [index, slug] of categories.entries()) {
			const res: Category | null = await prisma.category.findFirst({
				where: {
					parentId,
					slug
				}
			});
			if (!res) error(404, 'Not found.');
			parentId = res.id;
			if (index === categories.length - 1) lastId = res.id;
		}
	}
	return lastId;
}

type FlattenCategory = {
	path: string;
	title: string;
	depth: number;
};
async function fetchCategories(
	parentId: number | null = null,
	depth: number = 1,
	curPath: string = ''
) {
	const categories = await prisma.category.findMany({
		where: { parentId },
		select: {
			id: true,
			slug: true,
			title: true
		},
		orderBy: [{ sortOrder: 'asc' }, { title: 'asc' }]
	});

	const result: FlattenCategory[] = [];
	for (const category of categories) {
		const path = `${curPath}/${category.slug}`;
		result.push({ depth, ...category, path });
		const children = await fetchCategories(category.id, depth + 1, path);
		result.push(...children);
	}

	return result;
}

export const load = (async ({ params }) => {
	// console.log('load')
	const categoryId = await splitParams(params.categories);

	const categories = await fetchCategories();
	console.log('--- categories ---');
	console.log(categories);

	const category = await prisma.category.findUnique({
		where: { id: categoryId },
		include: {
			children: {
				orderBy: [{ sortOrder: 'asc' }, { title: 'asc' }]
			}
		}
	});
	console.log('--- category ---');
	console.log(category);

	const paths = await (async () => {
		const paths: { href: string; title: string }[] = [];
		let id: number | null = categoryId;
		while (id !== null && id > 0) {
			const res: Category | null = await prisma.category.findUnique({
				where: { id }
			});
			if (!res) {
				break;
			}
			paths.unshift({
				href: res.slug,
				title: res.title
			});
			id = res.parentId;
		}
		let href = '';
		return paths.map((path) => {
			href += '/' + path.href;
			return { ...path, href };
		});
	})();
	console.log('--- paths ---');
	console.log(paths);

	const form = await superValidate(zod(schema));
	return { categories, category, paths, form };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, params }) => {
		const _categoryId = await splitParams(params.categories);
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
