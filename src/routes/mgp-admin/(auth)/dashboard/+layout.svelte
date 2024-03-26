<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	console.log(data);
</script>

<div>
	<slot />
</div>
