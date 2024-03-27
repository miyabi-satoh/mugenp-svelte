<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	function getUrl(category: PageData['category'], action: string) {
		let basePath = '/mgp-admin/categories';
		if (category) basePath += `/${category.id}`;
		if (action) basePath += `/${action}`;

		return basePath;
	}
</script>

<div>
	<a class="btn variant-filled" href={getUrl(data.category, 'add')}>Add category</a>
</div>
<div>list</div>
