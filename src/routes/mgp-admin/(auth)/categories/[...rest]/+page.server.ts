import { error, fail } from '@sveltejs/kit';
import type { Category, Grade, Subject } from '@prisma/client';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { prisma } from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';
import { schema } from './schema';

function splitParams(params: string) {
  const rests = params.split('/');
  console.log('rests', rests);

  if (!rests) {
    return ['', ''];
  }

  if (rests.length === 1) {
    return rests[0] === 'add' ? ['', rests[0]] : [rests[0], ''];
  }

  if (rests.length === 2) {
    return [rests[0], rests[1]];
  }

  error(404, 'Not found');
}

export const load = (async ({ params }) => {
  const [strId, action] = splitParams(params.rest);

  if (action && !['add', 'edit'].includes(action)) error(404, 'Not found');

  let category: Category | null = null;
  if (strId) {
    const id = parseInt(strId);
    if (isNaN(id)) error(404, 'Not found');

    category = await prisma.category.findUnique({
      where: { id }
    });
    if (!category) error(404, 'Not found');
  }

  let subjects: Subject[] = [];
  let grades: Grade[] = [];
  if (action === 'add') {
    subjects = await prisma.subject.findMany({
      orderBy: [{ sortOrder: 'asc' }, { slug: 'asc' }]
    });
    if (!subjects) error(500, 'Internal server error');

    grades = await prisma.grade.findMany({
      orderBy: [{ sortOrder: 'asc' }, { slug: 'asc' }]
    });
    if (!grades) error(500, 'Internal server error');
  }

  const form = await superValidate(category, zod(schema));

  return { category, action, subjects, grades, form };
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(schema));
    if (!form.valid) return fail(400, { form });

    if (!form.data.id) {
      // CREATE category
      if (!form.data.parentId) {
        const { subjectId, gradeId } = form.data
        if (!subjectId || !gradeId) return fail(400, { form })
        const root = await prisma.rootCategory.findUnique({
          where: {
            subjectId_gradeId: {
              subjectId, gradeId
            }
          },
          include: {
            subject: true,
            grade: true
          }
        }
        )
        if (!root) {
          const subject = await prisma.subject.findUnique({
            where: { id: subjectId }
          })
          const grade = await prisma.grade.findUnique({
            where: { id: gradeId }
          })
          const rootCategory = await prisma.category.create({
            data: {
              slug: `${subject?.slug}/${grade?.slug}`,
              title: `${subject?.title} ${grade?.title}`
            }
          })
        }
      }
      console.log(form.data);
    }

    return { form };
  }
};
