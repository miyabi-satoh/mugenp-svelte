<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';

	export let data: PageData;
	const { form, enhance } = superForm(data.form);
</script>

<h1 class="text-3xl font-bold text-center my-4">ログイン</h1>
<form
	method="post"
	action="?/login"
	class="max-w-md mx-auto shadow-md rounded-token px-8 py-6 bg-surface-100-800-token space-y-6"
	use:enhance
>
	<label class="label">
		<span>ユーザー名</span>
		<input
			class="input"
			type="text"
			name="username"
			placeholder="ユーザー名"
			bind:value={$form.username}
		/>
	</label>
	<label class="label">
		<span>パスワード</span>
		<input
			class="input"
			type="password"
			name="password"
			placeholder="******************"
			bind:value={$form.password}
		/>
	</label>
	<button class="btn variant-filled"> ログイン </button>
</form>
