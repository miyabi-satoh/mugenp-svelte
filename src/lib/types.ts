import type { Category } from './schemas/zod';

export type CategoryWithChildren = Category & {
	children: CategoryWithChildren[];
};
