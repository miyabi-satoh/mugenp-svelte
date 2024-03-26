<script lang="ts">
	import { page } from '$app/stores';
	import {
		AppBar,
		AppShell,
		Drawer,
		LightSwitch,
		Modal,
		getDrawerStore,
		initializeStores
	} from '@skeletonlabs/skeleton';
	import extend from 'just-extend';
	import 'katex/dist/katex.min.css';
	import { MetaTags, type MetaTagsProps } from 'svelte-meta-tags';
	import '../app.postcss';
	import { IconClose, IconMenu } from '$lib/icons';
	import Navigation from '$lib/components/Navigation.svelte';

	initializeStores();
	const drawerStore = getDrawerStore();

	export let data;
	let metaTags: MetaTagsProps;
	$: metaTags = extend(true, {}, data.baseMetaTags, $page.data.pageMetaTags);

	let classSidebar: string;
	let menuItems: {
		href: string;
		label: string;
	}[] = [];
	page.subscribe((page) => {
		const { pathname } = page.url;
		if (pathname.match(/^\/mgp-admin\/dashboard(\/|$)/)) {
			menuItems = [{ href: '/mgp-admin/dashboard', label: 'Dashboard' }];
		} else {
			menuItems = [];
			// console.log('pathname', pathname);
		}
		classSidebar = menuItems.length > 0 ? 'w-0 lg:w-64' : 'w-0';
	});
</script>

<MetaTags {...metaTags} />

<Modal />

<Drawer>
	<div class="flex justify-end">
		<button class="btn btn-sm" on:click={() => drawerStore.close()}>
			<span><IconClose /></span>
		</button>
	</div>
	<Navigation items={menuItems} />
</Drawer>

<AppShell slotSidebarLeft="bg-surface-500/5 {classSidebar}" slotPageFooter="py-8 space-y-8">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="btn btn-sm mr-4 lg:hidden" on:click={() => drawerStore.open({})}>
						<span><IconMenu /></span>
					</button>
				</div>
				<a href="/" class="text-xl sm:text-3xl font-bold">MuGenP</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch rounded="rounded-full" />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft"><Navigation items={menuItems} /></svelte:fragment>

	<slot />

	<svelte:fragment slot="pageFooter">
		<div class="text-center">&copy; 2024 amiiby.com</div>
	</svelte:fragment>
</AppShell>
