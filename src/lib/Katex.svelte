<script lang="ts">
	import katex from 'katex';
	import { afterUpdate } from 'svelte';

	export let displayMode = false;
	export let displayStyle = true;
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
						return katex.renderToString(
							(displayStyle ? '\\displaystyle' : '') + text.slice(1, -1),
							options
						);
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

<!-- eslint-disable-next-line svelte/no-at-html-tags -->
{@html output}
