<script lang="ts">
	import katex from 'katex';
	import 'katex/dist/katex.min.css';
	import { afterUpdate } from 'svelte';

	export let displayMode = false;
	let output: HTMLSpanElement;
	let latex: HTMLSpanElement;
	// trigger re-rendering on state change
	afterUpdate(async () => {
		if (latex.textContent) {
			katex.render(latex.textContent, output, { displayMode });
		}
	});
</script>

<!--LaTeX markout passed through slot stored in a hidden node-->
<span bind:this={latex} style="display: none;">
	<slot />
</span>

<!-- Display rendered math-->
<span bind:this={output} />
