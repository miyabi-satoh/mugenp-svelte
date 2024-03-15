<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	// Stores
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	const modalStore = getModalStore();
	let data: PageData = $modalStore[0].meta.data;
	const { form, message, constraints, errors, enhance } = superForm(data.form);

	// // Form Data
	// const formData = {
	// 	name: 'Jane Doe',
	// 	tel: '214-555-1234',
	// 	email: 'jdoe@email.com'
	// };

	// We've created a custom submit function to pass the response and close the modal.
	function onFormSubmit(): void {
		// if ($modalStore[0].response) $modalStore[0].response(formData);
		// modalStore.close();
	}

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<form class={cBase} method="post" use:enhance>
		<header class={cHeader}>{$form.id ? 'Edit' : 'Add sub'} category {$form.id ?? ''}</header>
		<!-- Enable for debugging: -->
		<div class={cForm}>
			<div>
				<label class="label">
					<span>Slug</span>
					<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
						<div class="input-group-shim">
							{data.paths[data.paths.length - 1].path}/
						</div>
						<input name="slug" bind:value={$form.slug} {...$constraints.slug} />
					</div>
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
			<input type="hidden" name="parentId" value={data.category?.id} />
		</div>
		<!-- prettier-ignore -->
		<footer class="{parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" type="button" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
			<button class="btn {parent.buttonPositive}">Submit</button>
			<!-- <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
			<button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Submit Form</button> -->
		</footer>
	</form>
{/if}
