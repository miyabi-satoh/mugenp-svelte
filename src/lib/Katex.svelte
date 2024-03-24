<script lang="ts">
	import katex from 'katex';
	import { afterUpdate } from 'svelte';

	export let displayMode = false;
	const options: katex.KatexOptions = {
		displayMode,
		throwOnError: false
	};

	let latex: HTMLSpanElement;
	let output: string;
	// trigger re-rendering on state change
	afterUpdate(async () => {
		if (latex.textContent) {
			// ${...}$ の部分だけkatexでレンダリングする
			output = latex.textContent
				.split('$')
				.map((text) => {
					if (/^\{.*\}$/.test(text)) {
						return katex.renderToString(text.slice(1, -1), options);
					}
					return text;
				})
				.join('');
		}
	});
</script>

<!--LaTeX markout passed through slot stored in a hidden node-->
<span bind:this={latex} style="display: none;">
	<slot />
</span>

{@html output}
