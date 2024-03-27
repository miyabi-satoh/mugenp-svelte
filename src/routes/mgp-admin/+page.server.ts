import { fail, redirect } from '@sveltejs/kit';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { ADMIN_PASSWORD, ADMIN_USERNAME } from '$env/static/private';
import { lucia } from '$lib/server/auth';
import { prisma } from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

const schema = z.object({
	username: z.string().min(1),
	password: z.string().min(1)
});

export const load = (async ({ locals }) => {
	if (locals.user) redirect(302, '/mgp-admin/dashboard');

	const count = await prisma.user.count({
		where: { role: 'ADMIN' }
	});
	if (!count) {
		await prisma.user.upsert({
			where: { username: ADMIN_USERNAME },
			create: {
				id: generateId(15),
				username: ADMIN_USERNAME,
				hashedPassword: await new Argon2id().hash(ADMIN_PASSWORD),
				role: 'ADMIN'
			},
			update: {
				role: 'ADMIN'
			}
		});
	}

	const form = await superValidate(zod(schema));

	return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(schema));
		if (!form.valid) return fail(400, { form });

		const { username, password } = form.data;
		const existingUser = await prisma.user.findUnique({
			where: {
				username: username.toLowerCase()
			}
		});
		if (!existingUser) {
			return message(form, 'Incorrect username or password', { status: 400 });
		}

		const validPassword = await new Argon2id().verify(existingUser.hashedPassword, password);
		if (!validPassword) {
			return message(form, 'Incorrect username or password', { status: 400 });
		}

		const session = await lucia.createSession(existingUser.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/mgp-admin/dashboard');
	},
	logout: async ({ locals, cookies }) => {
		if (!locals.session) {
			return fail(401);
		}
		await lucia.invalidateSession(locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
		redirect(302, '/mgp-admin');
	}
};
