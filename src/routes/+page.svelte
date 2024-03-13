<script lang="ts">
	import { pages } from '$lib/pages';

	let grade: string;
	$: filterdPages = pages;
</script>

<div class="flex flex-col sm:flex-row mb-8 gap-4">
	<label class="label flex gap-2 items-center">
		<span class="flex-none">学年</span>
		<select class="select" bind:value={grade}>
			<option>中1</option>
			<option>中2</option>
			<option>中3</option>
		</select>
	</label>
	<label class="label flex gap-2 items-center">
		<span class="flex-none">項目</span>
		<select class="select">
			<option value="1">Option 1</option>
			<option value="2">Option 2</option>
			<option value="3">Option 3</option>
			<option value="4">Option 4</option>
			<option value="5">Option 5</option>
		</select>
	</label>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
	{#each filterdPages as page (page.id)}
		<div class="card card-hover shadow-xl">
			<h2 class="bg-tertiary-200-700-token rounded-t-lg px-2 py-1 text-sm">
				{page.chapter} / {page.subsection}
			</h2>
			<p class="p-4 text-center bg-tertiary-400-500-token rounded-b-lg">{page.title}</p>
		</div>
	{/each}
</div>
