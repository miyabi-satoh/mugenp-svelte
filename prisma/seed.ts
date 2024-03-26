import { Grade, PrismaClient, Subject } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
	await prisma.$transaction(async (prisma) => {
		const subjects = [
			{ slug: 'math', title: '数学' },
			{ slug: 'english', title: '英語' },
			{ slug: 'japanese', title: '国語' },
			{ slug: 'science', title: '理科' },
			{ slug: 'social_studies', title: '社会' },
			{ slug: 'arithmetic', title: '算数' }
		] satisfies Partial<Subject>[];
		for (const [i, subject] of subjects.entries()) {
			await prisma.subject.upsert({
				where: { slug: subject.slug },
				update: {},
				create: { ...subject, sortOrder: i + 1 }
			});
		}

		const grades = [
			{ slug: 'e1', title: '小1' },
			{ slug: 'e2', title: '小2' },
			{ slug: 'e3', title: '小3' },
			{ slug: 'e4', title: '小4' },
			{ slug: 'e5', title: '小5' },
			{ slug: 'e6', title: '小6' },
			{ slug: 'j1', title: '中1' },
			{ slug: 'j2', title: '中2' },
			{ slug: 'j3', title: '中3' },
			{ slug: 'h1', title: '高1' },
			{ slug: 'h2', title: '高2' },
			{ slug: 'h3', title: '高3' }
		] satisfies Partial<Grade>[];

		for (const [i, grade] of grades.entries()) {
			await prisma.grade.upsert({
				where: { slug: grade.slug },
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
