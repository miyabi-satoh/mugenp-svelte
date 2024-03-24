<script lang="ts">
	import { page } from '$app/stores';
	import { AppBar, AppShell, LightSwitch, Modal, initializeStores } from '@skeletonlabs/skeleton';
	import extend from 'just-extend';
	import 'katex/dist/katex.min.css';
	import { MetaTags, type MetaTagsProps } from 'svelte-meta-tags';
	import '../app.postcss';

	initializeStores();
	export let data;
	let metaTags: MetaTagsProps;
	$: metaTags = extend(true, {}, data.baseMetaTags, $page.data.pageMetaTags);
</script>

<MetaTags {...metaTags} />

<Modal />

<AppShell slotPageFooter="bg-surface-100-800-token py-8 space-y-8">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/"><h1 class="text-xl sm:text-3xl font-bold">MuGenP</h1></a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch rounded="rounded-full" />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<slot />

	<svelte:fragment slot="pageFooter">
		<div class="text-center">&copy; 2024 amiiby.com</div>
	</svelte:fragment>
</AppShell>
