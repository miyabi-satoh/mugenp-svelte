import { Grade, PrismaClient, Subject } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
	await prisma.$transaction(async (prisma) => {
		const subjects = [
			{ id: 'math', title: '数学' },
			{ id: 'english', title: '英語' },
			{ id: 'japanese', title: '国語' },
			{ id: 'science', title: '理科' },
			{ id: 'social_studies', title: '社会' },
			{ id: 'arithmetic', title: '算数' }
		] satisfies Partial<Subject>[];
		for (const [i, subject] of subjects.entries()) {
			await prisma.subject.upsert({
				where: { id: subject.id },
				update: {},
				create: { ...subject, sortOrder: i + 1 }
			});
		}

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

		for (const [i, grade] of grades.entries()) {
			await prisma.grade.upsert({
				where: { id: grade.id },
				update: {},
				create: { ...grade, sortOrder: i + 1 }
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
