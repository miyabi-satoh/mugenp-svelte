import { z } from 'zod';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
	'ReadUncommitted',
	'ReadCommitted',
	'RepeatableRead',
	'Serializable'
]);

export const SubjectScalarFieldEnumSchema = z.enum(['id', 'title', 'sortOrder']);

export const GradeScalarFieldEnumSchema = z.enum(['id', 'title', 'sortOrder']);

export const CategoryScalarFieldEnumSchema = z.enum([
	'id',
	'slug',
	'title',
	'sortOrder',
	'parentId'
]);

export const ContentScalarFieldEnumSchema = z.enum([
	'id',
	'categoryId',
	'title',
	'message',
	'component'
]);

export const SortOrderSchema = z.enum(['asc', 'desc']);

export const QueryModeSchema = z.enum(['default', 'insensitive']);

export const NullsOrderSchema = z.enum(['first', 'last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// SUBJECT SCHEMA
/////////////////////////////////////////

export const SubjectSchema = z.object({
	id: z.string(),
	title: z.string(),
	sortOrder: z.number().int()
});

export type Subject = z.infer<typeof SubjectSchema>;

/////////////////////////////////////////
// GRADE SCHEMA
/////////////////////////////////////////

export const GradeSchema = z.object({
	id: z.string(),
	title: z.string(),
	sortOrder: z.number().int()
});

export type Grade = z.infer<typeof GradeSchema>;

/////////////////////////////////////////
// CATEGORY SCHEMA
/////////////////////////////////////////

export const CategorySchema = z.object({
	id: z.number().int(),
	slug: z.string().min(1).toLowerCase(),
	title: z.string().min(1),
	sortOrder: z.number().int(),
	parentId: z.number().int().nullable()
});

export type Category = z.infer<typeof CategorySchema>;

/////////////////////////////////////////
// CONTENT SCHEMA
/////////////////////////////////////////

export const ContentSchema = z.object({
	id: z.number().int(),
	categoryId: z.number().int(),
	title: z.string(),
	message: z.string(),
	component: z.string()
});

export type Content = z.infer<typeof ContentSchema>;
