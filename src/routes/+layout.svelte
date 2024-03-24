<script lang="ts">
	import { page } from '$app/stores';
	import { IconInfoCircle } from '$lib/icons';
	import FacebookLogo from '$lib/share-buttons/Facebook_Logo_Primary.png';
	import LineLogo from '$lib/share-buttons/LINE_Brand_icon.png';
	import XLogo from '$lib/share-buttons/logo-white.png';
	import { AppShell, LightSwitch, Modal, initializeStores } from '@skeletonlabs/skeleton';
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

<AppShell>
	<svelte:fragment slot="header">
		<div class="grid grid-cols-[1fr_auto_1fr] p-4 items-center bg-surface-100-800-token">
			<div>
				<a href="/">
					<h1 class="h2 text-xl sm:text-3xl font-bold">MuGenP</h1>
				</a>
			</div>
			<div class="leading-none flex gap-2 items-center">
				<span class="hidden sm:inline">Share on</span>
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
			<div class="flex justify-end items-center gap-4">
				<a href="/about" class="anchor no-underline flex items-center gap-1">
					<IconInfoCircle />
					<span>About</span>
				</a>
				<LightSwitch rounded="rounded-full" />
			</div>
		</div>
	</svelte:fragment>

	<div class="container max-w-3xl mx-auto p-4 lg:px-0">
		<slot />
	</div>

	<svelte:fragment slot="pageFooter">
		<div class="text-center p-10">&copy; 2024 amiiby.com</div>
	</svelte:fragment>
</AppShell>
