<script lang="ts">
	import { pages } from '$lib/pages';

	$: filterdPages = pages;
</script>

{#each filterdPages as page (page.id)}
	<div>
		<div>{page.chapter}</div>
		<div>{page.section}</div>
		<div>{page.subsection}</div>
		<div>{page.title}</div>
	</div>
{/each}
