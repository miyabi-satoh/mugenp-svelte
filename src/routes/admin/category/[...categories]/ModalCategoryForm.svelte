<script lang="ts">
	import type { Category } from '$lib/schemas/zod';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { SvelteComponent } from 'svelte';
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	const modalStore = getModalStore();
	let data: PageData = $modalStore[0].meta.data;
	const { form, message, constraints, errors, enhance } = superForm(data.form, {
		onUpdated({ form }) {
			if (form.valid) {
				modalStore.close();
			}
		}
	});
	let category: Category | null = $modalStore[0].meta.category;
	if (category) {
		$form.id = category.id;
		$form.slug = category.slug;
		$form.title = category.title;
	}
</script>

{#if $modalStore[0]}
	<form
		class="bg-surface-100-800-token rounded-token p-4 w-modal shadow-xl space-y-4"
		method="post"
		use:enhance
	>
		<header class="text-2xl font-bold">
			{$form.id ? 'Edit' : 'Add sub'} category {$form.id ?? ''}
		</header>

		<div class="border border-surface-500 p-4 space-y-4 rounded-container-token">
			<div>
				<label class="label">
					<span>Slug</span>
					<input class="input" name="slug" bind:value={$form.slug} {...$constraints.slug} />
				</label>
				{#if $errors.slug}
					<span class="alert variant-filled-error">{$errors.slug}</span>
				{/if}
			</div>

			<div>
				<label class="label">
					<span>Title</span>
					<input class="input" name="title" bind:value={$form.title} {...$constraints.title} />
				</label>
				{#if $errors.title}
					<span class="alert variant-filled-error">{$errors.title}</span>
				{/if}
			</div>

			{#if $message}
				<p>{$message}</p>
			{/if}
			<input type="hidden" name="id" value={$form.id ?? ''} />
			<input type="hidden" name="parentId" value={data.category?.id ?? ''} />
		</div>

		<footer class={parent.regionFooter}>
			<button class="btn {parent.buttonNeutral}" type="button" on:click={parent.onClose}
				>{parent.buttonTextCancel}</button
			>
			<button class="btn {parent.buttonPositive}">Submit</button>
		</footer>
	</form>
{/if}
