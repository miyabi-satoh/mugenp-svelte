<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Category } from '$lib/schemas/zod';
	import type { ModalComponent, ModalSettings } from '@skeletonlabs/skeleton';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import ModalCategoryForm from './ModalCategoryForm.svelte';
	import { Icon, PencilSquare, ChevronRight, ChevronDown } from 'svelte-hero-icons';

	const modalStore = getModalStore();
	export let data: PageData;
	$: if (!data.subjectId) data.subjectId = '';
	$: if (!data.gradeId) data.gradeId = '';
	$: selectedSubject = data.subjects.find((s) => s.id === data.subjectId);
	$: selectedGrade = data.grades.find((g) => g.id === data.gradeId);

	// let subjectId = data.subjectId ?? '';
	// let gradeId = data.gradeId ?? '';

	console.log(...data.paths);
	// console.log(baseUrl);

	function modalComponentForm(category: Category | null = null): void {
		const c: ModalComponent = { ref: ModalCategoryForm };
		const modal: ModalSettings = {
			type: 'component',
			component: c,
			meta: { data, category }
		};
		modalStore.trigger(modal);
	}

	function handleChange(): void {
		if (data.subjectId && data.gradeId) {
			goto(`/admin/category/${data.subjectId}/${data.gradeId}`);
		} else if (data.subjectId) {
			goto(`/admin/category/${data.subjectId}`);
		} else {
			goto(`/admin/category`);
		}
	}
</script>

<div class="space-y-8">
	<div class="grid grid-cols-2 gap-4">
		<select class="select" bind:value={data.subjectId} on:change={handleChange}>
			<option value="">教科を選択</option>
			{#each data.subjects as subject (subject.id)}
				<option value={subject.id}>{subject.title}</option>
			{/each}
		</select>

		<select class="select" bind:value={data.gradeId} on:change={handleChange}>
			<option value="">学年を選択</option>
			{#if data.subjectId}
				{#each data.grades as grade (grade.id)}
					<option value={grade.id}>{grade.title}</option>
				{/each}
			{/if}
		</select>
	</div>

	<div class="grid grid-cols-[1fr_2fr] gap-4">
		<div class="space-y-1">
			<div>Categories</div>
			<div class="rounded-token border-token border-surface-400-500-token p-4">
				{#if selectedSubject && selectedGrade}
					<a
						class="p-1 flex items-center hover:bg-surface-200-700-token rounded-token"
						href="/admin/category/{data.subjectId}/{data.gradeId}"
					>
						{selectedSubject.title}
						{selectedGrade.title}
					</a>
				{/if}
				{#if data.categories}
					{#each data.categories as category}
						<a
							class="p-1 flex items-center hover:bg-surface-200-700-token rounded-token"
							href="/admin/category/{category.path}"
						>
							<Icon src={ChevronRight} size="1rem" class="mx-1" />
							{category.title}
						</a>
					{/each}
				{:else}
					<div class="p-4">No categories.</div>
				{/if}
			</div>
		</div>
		<div class="space-y-1">
			<div>
				{selectedSubject?.title}
				{selectedGrade?.title}
			</div>
			<div class="flex justify-end gap-1">
				<button class="btn variant-filled">Add category</button>
				<button class="btn variant-filled">Add content</button>
			</div>
			<div class="rounded-token border-token border-surface-400-500-token bg-surface-200-700-token">
				{#if data.category?.children}
					{#each data.category.children as category}
						<div>{category.title}</div>
					{/each}
				{:else}
					<div class="p-4">No items.</div>
				{/if}
			</div>
		</div>
	</div>

	{#if data.category}
		<div>
			{#each data.paths as path, index}
				{#if index < data.paths.length - 1}
					<a class="anchor" href="/admin/category{path.path}">{path.title}</a>
					<span class="mx-1">/</span>
				{:else}
					{path.title}
				{/if}
			{/each}
		</div>
		<div>
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
						{@const baseUrl = `/admin/category` + data.paths[data.paths.length - 1].path}
						<div class="p-4 flex justify-between">
							<a class="anchor" href="{baseUrl}/{category.slug}">
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
