<script lang="ts">
	import { PUBLIC_APP_TITLE, PUBLIC_APP_URL } from '$env/static/public';
	import FacebookLogo from '$lib/share-buttons/Facebook_Logo_Primary.png';
	import LineLogo from '$lib/share-buttons/LINE_Brand_icon.png';
	import XLogo from '$lib/share-buttons/logo-white.png';
	import { AppShell, LightSwitch, Modal, initializeStores } from '@skeletonlabs/skeleton';
	import '../app.postcss';

	initializeStores();
	const url = encodeURIComponent(PUBLIC_APP_URL);
	const title = encodeURIComponent(PUBLIC_APP_TITLE);
</script>

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
				<span class="hidden sm:inline">SNSでシェア</span>
				<a href="https://www.facebook.com/sharer/sharer.php?u={url}">
					<img alt="Share on Facebook" src={FacebookLogo} class="h-8 w-8" />
				</a>
				<a
					href="https://twitter.com/intent/tweet?url={url}&text={title}"
					class="h-8 w-8 bg-black rounded-full"
				>
					<img alt="Share on X" src={XLogo} class="scale-50" />
				</a>
				<a href="https://social-plugins.line.me/lineit/share?url={url}" class="h-8 w-8">
					<img alt="Share on Line" src={LineLogo} class="rounded-full" />
				</a>
			</div>
			<div class="flex justify-end">
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
