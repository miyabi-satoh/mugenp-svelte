import { z } from 'zod';
import { CategorySchema } from '$lib/schemas/zod';

export const schema = CategorySchema.extend({
	id: CategorySchema.shape.id.optional(),
	subjectId: z.number().optional(),
	gradeId: z.number().optional()
});

export type Schema = typeof schema;
