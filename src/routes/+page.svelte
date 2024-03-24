<script lang="ts">
	import { FacebookLogo, LineLogo, XLogo } from '$lib/share-buttons';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="home">
	<div class="hero">
		<div class="flex gap-4 items-center">
			<span>Share on</span>
			<a
				href="https://www.facebook.com/sharer/sharer.php?u={data.baseMetaTags.canonical}"
				rel="external"
			>
				<img alt="Share on Facebook" src={FacebookLogo} class="h-8 w-8" />
			</a>
			<a
				href="https://twitter.com/intent/tweet?url={data.baseMetaTags.canonical}&text={data
					.baseMetaTags.title}"
				class="h-8 w-8 bg-black rounded-full"
				rel="external"
			>
				<img alt="Share on X" src={XLogo} class="scale-50" />
			</a>
			<a
				href="https://social-plugins.line.me/lineit/share?url={data.baseMetaTags.canonical}"
				class="h-8 w-8"
				rel="external"
			>
				<img alt="Share on Line" src={LineLogo} class="rounded-full" />
			</a>
		</div>
		<div class="text-center">
			<h1>MuGenP</h1>
			<p class="pl-1">Muddled Generated Practices</p>
		</div>
		<p class="text-2xl text-center">中学校で学習する数学の主要な計算問題を無限に演習</p>
		<button class="btn variant-filled-primary">さぁ始めよう！</button>
	</div>
	<div class="feature bg-surface-200-700-token">
		<div>
			<h2>muddled</h2>
			<p>
				MuGenPは、暗算で計算できるような問題から途中式が必要となる複雑な計算まで
				幅広いレベルの問題を出題します。
				正誤数に応じて問題のレベルが変化するので、反復練習に適しています。
			</p>
		</div>
		<div>
			<h2>generated</h2>
			<p>
				ランダムな数字や文字を使って問題が自動生成されるので、
				様々なパターンの問題に触れることができます。
				もちろん同じ問題が連続して出題されるようなことはありません。
			</p>
		</div>
		<div>
			<h2>practices</h2>
			<p>練習！ 演習！ 反復こそ上達の近道です！</p>
		</div>
	</div>
	<div class="dependencies">
		<p>MuGenPはいくつもの有用なライブラリ・サービスを使って開発・運用しています。</p>
		<h3>dependencies</h3>
		<div class="flex gap-8">
			<div>
				<a href="https://svelte.jp/" rel="external">Svelte</a> /
				<a href="https://kit.svelte.jp/" rel="external">SvelteKit</a>
			</div>
			<div>
				<a href="https://www.skeleton.dev/" rel="external">Skeleton</a>
			</div>
			<div>
				<a href="https://www.prisma.io/" rel="external">Prisma</a>
			</div>
			<div>
				<a href="https://katex.org/" rel="external">KaTeX</a>
			</div>
			<div>
				<a href="https://github.com/rawify/Fraction.js" rel="external">Fraction.js</a>
			</div>
			<div>
				<a href="https://github.com/unplugin/unplugin-icons" rel="external">unplugin-icons</a>
			</div>
			<div>
				<a href="https://web.arena.ne.jp/vps-cloud/" rel="external">WebARENA VPS Cloud</a>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.home {
		& > div {
			@apply px-4;
		}
		& .hero {
			@apply flex flex-col items-center py-16 gap-8;

			& h1 {
				@apply text-7xl;
			}
		}
		& .feature {
			@apply text-xl grid py-16 md:px-12 lg:grid-cols-3 gap-16;

			& h2 {
				@apply leading-tight text-3xl sm:text-4xl;
			}
			& p {
				@apply my-5;
			}
		}
		& .dependencies {
			@apply text-xl py-16 md:px-12;

			& h3 {
				@apply leading-tight text-2xl sm:text-3xl;
			}
			& p {
				@apply my-5;
			}
			& > div {
				@apply my-6;

				& a {
					@apply anchor;
				}
			}
		}
	}
</style>
