<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if data.action}
	{#await import('./Form.svelte') then module}
		<svelte:component this={module.default} {data} />
	{/await}
{:else}
	{#await import('./List.svelte') then module}
		<svelte:component this={module.default} {data} />
	{/await}
{/if}
