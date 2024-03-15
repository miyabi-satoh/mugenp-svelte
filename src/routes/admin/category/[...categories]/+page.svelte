<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Category } from '$lib/schemas/zod';
	import type { ModalComponent, ModalSettings } from '@skeletonlabs/skeleton';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import ModalExampleForm from './Form.svelte';

	const modalStore = getModalStore();
	export let data: PageData;

	let subjectId = data.subjectId ?? '';
	let gradeId = data.gradeId ?? '';

	function modalComponentForm(category: Category | null = null): void {
		const c: ModalComponent = { ref: ModalExampleForm };
		const modal: ModalSettings = {
			type: 'component',
			component: c,
			meta: { data, category }
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
		<div>
			<div class="flex justify-between items-center">
				<div class="text-xl font-bold">Sub categories</div>
				<button class="btn variant-filled-secondary" on:click={() => modalComponentForm()}
					>Add</button
				>
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
							<button on:click={() => modalComponentForm(category)}>編集</button>
						</div>
					{/each}
				{:else}
					<div class="p-4 flex justify-between">No categories.</div>
				{/if}
			</div>
		</div>
	{/if}
</div>
