<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';

	export let data: PageData;
	const { form, enhance, constraints } = superForm(data.form);

	let backUrl = '/mgp-admin/categories';
</script>

<a href={backUrl}>Back</a>

<form method="post" use:enhance>
	{#if $form.id}
		<input type="hidden" name="id" value={$form.id} />
	{/if}
	{#if data.action === 'add' && data.category}
		<input type="hidden" name="parentId" value={data.category.id} />
	{/if}
	<label class="label">
		<span>Subject</span>
		<select class="select" name="subjectId" bind:value={$form.subjectId}>
			{#each data.subjects as subject}
				<option value={subject.id}>{subject.title}</option>
			{/each}
		</select>
	</label>

	<label class="label">
		<span>Grade</span>
		<select class="select" name="gradeId" bind:value={$form.gradeId}>
			{#each data.grades as grade}
				<option value={grade.id}>{grade.title}</option>
			{/each}
		</select>
	</label>

	<label class="label">
		<span>Slug</span>
		<input class="input" type="text" name="slug" bind:value={$form.slug} {...$constraints.slug} />
	</label>

	<label class="label">
		<span>Title</span>
		<input
			class="input"
			type="text"
			name="title"
			bind:value={$form.title}
			{...$constraints.title}
		/>
	</label>

	<button type="submit" class="btn variant-filled-primary">Submit</button>
</form>
