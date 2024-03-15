<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { Category } from '$lib/schemas/zod';
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import ModalExampleForm from './Form.svelte';

	const modalStore = getModalStore();
	export let data: PageData;
	// const { form, message, constraints, errors, enhance } = superForm(data.form);

	let subjectId = data.subjectId ?? '';
	let gradeId = data.gradeId ?? '';

	// console.dir(data);
	function modalComponentForm(): void {
		const c: ModalComponent = { ref: ModalExampleForm };
		const modal: ModalSettings = {
			type: 'component',
			component: c,
			meta: { data },
			response: (r) => console.log('response:', r)
		};
		modalStore.trigger(modal);
	}

	function handleChange() {
		if (subjectId && gradeId) {
			goto(`/admin/category/${subjectId}/${gradeId}`);
		} else if (subjectId) {
			goto(`/admin/category/${subjectId}`);
		} else {
			goto(`/admin/category`);
		}
	}

	function handleClickEdit(category: Category) {
		// $form.id = category.id;
		// $form.slug = category.slug;
		// $form.title = category.title;
	}

	function handleClickCancel() {
		// $form.id = undefined;
		// $form.slug = '';
		// $form.title = '';
	}
</script>

<div class="space-y-8">
	<div class="grid grid-cols-2 gap-4">
		<label class="label">
			<span>Subject</span>
			<select class="select" bind:value={subjectId} on:change={handleChange}>
				<option value="">---</option>
				{#each data.subjects as subject (subject.id)}
					<option value={subject.id}>{subject.title}</option>
				{/each}
			</select>
		</label>

		<label class="label">
			<span>Grade</span>
			<select class="select" bind:value={gradeId} on:change={handleChange}>
				<option value="">---</option>
				{#if subjectId}
					{#each data.grades as grade (grade.id)}
						<option value={grade.id}>{grade.title}</option>
					{/each}
				{/if}
			</select>
		</label>
	</div>

	{#if data.category}
		<div>
			{#each data.paths as path, index}
				{#if index < data.paths.length - 1}
					<a class="anchor" href="/admin/category/{path.path}">{path.title}</a>
					<span class="mx-1">/</span>
				{:else}
					{path.title}
				{/if}
			{/each}
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div>
				<div class="flex justify-between items-center">
					<div class="text-xl font-bold">Sub categories</div>
					<button class="btn variant-filled-secondary" on:click={modalComponentForm}>Add</button>
				</div>
				<div
					class="mt-1 rounded-token border-token border-surface-400-500-token bg-surface-200-700-token"
				>
					{#if data.category.children.length > 0}
						{#each data.category.children as category (category.id)}
							<div class="p-4 flex justify-between">
								<a class="anchor" href="/admin/{category.id}">
									{category.title}
									<span class="text-sm opacity-50">({category.slug})</span>
								</a>
								<button on:click={() => handleClickEdit(category)}>編集</button>
							</div>
						{/each}
					{:else}
						<div class="p-4 flex justify-between">No categories.</div>
					{/if}
				</div>
			</div>

			<!-- <form method="post" class="space-y-4" use:enhance>
				<div class="text-xl font-bold">
					{$form.id ? 'Edit' : 'Add sub'} category {$form.id ?? ''}
				</div>

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

				<button class="btn variant-filled-primary">Submit</button>
				{#if $form.id}
					<button class="btn variant-filled" type="button" on:click={handleClickCancel}
						>Cancel</button
					>
				{/if}
				{#if $message}
					<p>{$message}</p>
				{/if}
				<input type="hidden" name="id" value={$form.id ?? ''} />
				<input type="hidden" name="parentId" value={data.category.id} />
			</form> -->
		</div>
	{/if}
</div>
