<script lang="ts">
	import type { Category } from '$lib/schemas/zod';
	import type { ModalComponent, ModalSettings } from '@skeletonlabs/skeleton';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import ModalCategoryForm from './ModalCategoryForm.svelte';
	import { Icon, PencilSquare, ChevronRight, Home } from 'svelte-hero-icons';
	import { page } from '$app/stores';

	const modalStore = getModalStore();
	export let data: PageData;

	function modalComponentForm(category: Category | null = null): void {
		const c: ModalComponent = { ref: ModalCategoryForm };
		const modal: ModalSettings = {
			type: 'component',
			component: c,
			meta: { data, category }
		};
		modalStore.trigger(modal);
	}
</script>

<div class="space-y-8">
	<div class="grid grid-cols-[1fr_2fr] gap-4">
		<div class="space-y-1">
			<div>Categories</div>
			<div class="rounded-token border-token border-surface-400-500-token p-4">
				<a
					class="p-1 flex items-center hover:bg-surface-300-600-token rounded-token"
					class:bg-surface-200-700-token={$page.url.pathname.endsWith('/admin/category')}
					href="/admin/category"
				>
					<Icon src={Home} size="1rem" class="mr-1" />
					Root
				</a>
				{#each data.categories as category}
					<a
						class="p-1 flex items-center hover:bg-surface-300-600-token rounded-token"
						class:bg-surface-200-700-token={$page.url.pathname.endsWith(category.path)}
						href="/admin/category{category.path}"
					>
						<Icon src={ChevronRight} size="1rem" class="mr-1 ml-{category.depth * 4}" />
						{category.title}
					</a>
				{/each}
			</div>
		</div>
		<div class="space-y-1">
			<div>Todo:</div>
			<div class="flex justify-end gap-1 pb-1">
				<button class="btn variant-filled btn-sm" on:click={() => modalComponentForm()}
					>Add category</button
				>
				<button class="btn variant-filled btn-sm">Add content</button>
			</div>
			<div class="rounded-token border-token border-surface-400-500-token p-4">
				{#if data.category && data.category.children.length > 0}
					{#each data.category.children as child}
						<div>{child.title}</div>
					{/each}
				{:else}
					<div class="p-1">No items.</div>
				{/if}
			</div>
		</div>
	</div>

	{#if data.category}
		<div class="hidden">
			<div class="flex justify-between items-center">
				<div class="text-xl font-bold">Sub categories</div>
				<button class="btn variant-filled-secondary" on:click={() => modalComponentForm()}>
					Add category
				</button>
			</div>
			<div
				class="mt-1 rounded-token border-token border-surface-400-500-token bg-surface-200-700-token"
			>
				{#if data.category.children.length > 0}
					{#each data.category.children as category (category.id)}
						<!-- {@const baseUrl = `/admin/category` + data.paths[data.paths.length - 1].path} -->
						<div class="p-4 flex justify-between">
							<a class="anchor" href="/admin/category/{category.slug}">
								{category.title}
								<span class="text-sm opacity-50">({category.slug})</span>
							</a>
							<button on:click={() => modalComponentForm(category)}>
								<Icon src={PencilSquare} size="1.5rem" />
							</button>
						</div>
					{/each}
				{:else}
					<div class="p-4 flex justify-between">No categories.</div>
				{/if}
			</div>
		</div>
	{/if}
</div>
