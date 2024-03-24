<script lang="ts">
	import { IconHome } from '$lib/icons';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="space-y-4">
	<a class="anchor no-underline flex items-center gap-1" href="/">
		<IconHome /><span>Home</span>
	</a>

	<h2 class="h5 font-bold">{data.page.grade} {data.page.section} / {data.page.subsection}</h2>

	<p>{data.page.message}</p>
</div>

{#await import(`../../lib/practices/${data.page.id}_${data.page.module}.svelte`) then Module}
	<svelte:component this={Module.default} />
{:catch error}
	{error.message}
{/await}
