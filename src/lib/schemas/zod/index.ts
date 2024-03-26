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

export const UserScalarFieldEnumSchema = z.enum(['id', 'username', 'hashedPassword', 'role']);

export const SessionScalarFieldEnumSchema = z.enum(['id', 'userId', 'expiresAt']);

export const CategoryScalarFieldEnumSchema = z.enum([
	'id',
	'slug',
	'title',
	'sortOrder',
	'parentId'
]);

export const SubjectScalarFieldEnumSchema = z.enum(['id', 'slug', 'title', 'sortOrder']);

export const GradeScalarFieldEnumSchema = z.enum(['id', 'slug', 'title', 'sortOrder']);

export const RootCategoryScalarFieldEnumSchema = z.enum(['subjectId', 'gradeId', 'categoryId']);

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

export const UserRoleSchema = z.enum(['USER', 'ADMIN']);

export type UserRoleType = `${z.infer<typeof UserRoleSchema>}`;

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
	role: UserRoleSchema,
	id: z.string(),
	username: z.string(),
	hashedPassword: z.string()
});

export type User = z.infer<typeof UserSchema>;

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
	id: z.string(),
	userId: z.string(),
	expiresAt: z.coerce.date()
});

export type Session = z.infer<typeof SessionSchema>;

/////////////////////////////////////////
// CATEGORY SCHEMA
/////////////////////////////////////////

export const CategorySchema = z.object({
	id: z.number().int(),
	slug: z.string(),
	title: z.string(),
	sortOrder: z.number().int(),
	parentId: z.number().int().nullable()
});

export type Category = z.infer<typeof CategorySchema>;

/////////////////////////////////////////
// SUBJECT SCHEMA
/////////////////////////////////////////

export const SubjectSchema = z.object({
	id: z.number().int(),
	slug: z.string(),
	title: z.string(),
	sortOrder: z.number().int()
});

export type Subject = z.infer<typeof SubjectSchema>;

/////////////////////////////////////////
// GRADE SCHEMA
/////////////////////////////////////////

export const GradeSchema = z.object({
	id: z.number().int(),
	slug: z.string(),
	title: z.string(),
	sortOrder: z.number().int()
});

export type Grade = z.infer<typeof GradeSchema>;

/////////////////////////////////////////
// ROOT CATEGORY SCHEMA
/////////////////////////////////////////

export const RootCategorySchema = z.object({
	subjectId: z.number().int(),
	gradeId: z.number().int(),
	categoryId: z.number().int()
});

export type RootCategory = z.infer<typeof RootCategorySchema>;

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
