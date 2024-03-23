<script lang="ts">
	import Katex from '$lib/Katex.svelte';
	import { pages } from '$lib/pages';

	const grades = (() => {
		const grades = pages.map((p) => p.grade);
		return grades.filter((g, i) => grades.indexOf(g) === i);
	})();

	let grade: string;
	let section: string;
	let sections: string[] = [];

	$: if (grade) {
		section = '';
		sections = (() => {
			const sections = pages.filter((p) => p.grade === grade).map((p) => p.subsection);
			return sections.filter((s, i) => sections.indexOf(s) === i);
		})();
	}

	let filterdPages = pages;
	$: if (grade || section) {
		filterdPages = pages
			.filter((p) => p.grade === grade)
			.filter((p) => !section || p.subsection === section);
	}
</script>

<div class="flex flex-col sm:flex-row mb-8 gap-4">
	<label class="label flex gap-2 items-center">
		<span class="flex-none">学年</span>
		<select class="select" bind:value={grade}>
			{#each grades as grade}
				<option>{grade}</option>
			{/each}
		</select>
	</label>
	<label class="label flex gap-2 items-center">
		<span class="flex-none">項目</span>
		<select class="select" bind:value={section}>
			<option value="">すべて表示</option>
			{#each sections as section}
				<option>{section}</option>
			{/each}
		</select>
	</label>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
	{#each filterdPages as page (page.id)}
		<a href="/{page.id}">
			<div class="card card-hover shadow-xl">
				<h2 class="bg-surface-300-600-token rounded-t-lg px-2 py-1 text-sm">
					{page.chapter} / {page.subsection}
				</h2>
				<p class="p-4 text-center bg-surface-200-700-token rounded-b-lg">
					{#each page.title.split('$') as text}
						{#if /^\{.*\}$/.test(text)}
							<Katex>{text.slice(1, -1)}</Katex>
						{:else}
							{text}
						{/if}
					{/each}
				</p>
			</div>
		</a>
	{/each}
</div>
