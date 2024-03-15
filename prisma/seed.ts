import { Grade, PrismaClient, Subject } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
	await prisma.$transaction(async (prisma) => {
		// subjects
		const subjects = [
			{ id: 'mat', title: '数学' },
			{ id: 'eng', title: '英語' },
			{ id: 'jap', title: '国語' },
			{ id: 'sci', title: '理科' },
			{ id: 'soc', title: '社会' }
		] satisfies Partial<Subject>[];
		for (const [sortOrder, { id, title }] of subjects.entries()) {
			await prisma.subject.upsert({
				where: { id },
				update: { title, sortOrder },
				create: { id, title, sortOrder }
			});
		}

		// grades
		const grades = [
			{ id: 'e1', title: '小1' },
			{ id: 'e2', title: '小2' },
			{ id: 'e3', title: '小3' },
			{ id: 'e4', title: '小4' },
			{ id: 'e5', title: '小5' },
			{ id: 'e6', title: '小6' },
			{ id: 'j1', title: '中1' },
			{ id: 'j2', title: '中2' },
			{ id: 'j3', title: '中3' },
			{ id: 'h1', title: '高1' },
			{ id: 'h2', title: '高2' },
			{ id: 'h3', title: '高3' }
		] satisfies Partial<Grade>[];
		for (const [sortOrder, { id, title }] of grades.entries()) {
			await prisma.grade.upsert({
				where: { id },
				update: { title, sortOrder },
				create: { id, title, sortOrder }
			});
		}
	});
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
