<script lang="ts">
	import { pages } from '$lib/pages';

	$: filterdPages = pages;
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
	{#each filterdPages as page (page.id)}
		<div class="card card-hover shadow-xl">
			<h2 class="bg-surface-400-500-token rounded-t-lg px-2 py-1 text-sm">
				{page.chapter} / {page.subsection}
			</h2>
			<p class="p-4 text-center bg-surface-200-700-token rounded-b-lg">{page.title}</p>
		</div>
	{/each}
</div>
