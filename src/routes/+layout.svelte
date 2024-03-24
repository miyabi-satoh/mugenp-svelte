<script lang="ts">
	import { page } from '$app/stores';
	import FacebookLogo from '$lib/share-buttons/Facebook_Logo_Primary.png';
	import LineLogo from '$lib/share-buttons/LINE_Brand_icon.png';
	import XLogo from '$lib/share-buttons/logo-white.png';
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

	<div class="container max-w-3xl mx-auto p-4 pb-16 lg:px-0">
		<slot />
	</div>

	<svelte:fragment slot="pageFooter">
		<div class="grid grid-cols-2 px-4">
			<div class="leading-none flex gap-2 items-center">
				<span>Share on</span>
				<a href="https://www.facebook.com/sharer/sharer.php?u={metaTags.canonical}" rel="external">
					<img alt="Share on Facebook" src={FacebookLogo} class="h-8 w-8" />
				</a>
				<a
					href="https://twitter.com/intent/tweet?url={metaTags.canonical}&text={metaTags.title}"
					class="h-8 w-8 bg-black rounded-full"
					rel="external"
				>
					<img alt="Share on X" src={XLogo} class="scale-50" />
				</a>
				<a
					href="https://social-plugins.line.me/lineit/share?url={metaTags.canonical}"
					class="h-8 w-8"
					rel="external"
				>
					<img alt="Share on Line" src={LineLogo} class="rounded-full" />
				</a>
			</div>
			<div class="flex justify-end">
				<ul class="space-y-2">
					<li><a href="/" class="anchor">Home</a></li>
					<li><a href="/about" class="anchor">About</a></li>
				</ul>
			</div>
		</div>
		<div class="text-center">&copy; 2024 amiiby.com</div>
	</svelte:fragment>
</AppShell>
