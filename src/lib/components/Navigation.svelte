<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();

	function drawerClose(): void {
		drawerStore.close();
	}
	export let items: {
		href: string;
		label: string;
	}[] = [];
</script>

{#if items.length > 0}
	<nav class="list-nav p-4">
		<ul>
			{#each items as { href, label }}
				<li>
					<a
						{href}
						class:bg-primary-active-token={$page.url.pathname?.includes(href)}
						on:click={drawerClose}>{label}</a
					>
				</li>
			{/each}
			{#if $page.data.user}
				<li>
					<form method="post" action="/mgp-admin?/logout" use:enhance>
						<button class="w-full">Logout</button>
					</form>
				</li>
			{/if}
		</ul>
	</nav>
{/if}
