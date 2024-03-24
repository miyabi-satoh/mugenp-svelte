<script lang="ts">
	import Katex from '$lib/Katex.svelte';
	import { IconHome } from '$lib/icons';
</script>

<div class="space-y-16">
	<div>
		<a class="anchor no-underline flex items-center gap-1" href="/">
			<IconHome /><span>Home</span>
		</a>
	</div>
	<div>
		<h2>このサイトについて</h2>
		<p>
			公立の中学校で学習する数学の主要な計算問題を 無限に演習できる無料サイトです。
			<br />
			学校での小テストや定期テスト対策として、何度でも練習できます。
			<br />
			現在開発中であり、単元は今後も増えていく予定です。
		</p>
	</div>

	<!-- <Adsense /> -->

	<div>
		<h3>経緯(いきさつ)</h3>
		<p>
			当初は紙ベースの演習プリントを作成する仕組みを構築しようとして
			「無限プリント」から「MuGenP」というプロジェクト名を付けました。
		</p>
		<p>その後「いやこれ印刷じゃなくて画面表示で良くない？」となり、 現在の形になりました。</p>
		<p>
			MuGenP は <span class="font-bold">Mu</span>ddled(ごちゃまぜに)
			<span class="font-bold">Gen</span>erated(生成された)
			<span class="font-bold">P</span>ractice(練習問題)の意味です。(後付け)
		</p>
	</div>
	<div>
		<h3>計算能力の向上に役立ちます</h3>
		<p>
			計算能力を向上させるには、一にも二にも反復演習です。
			<br />
			このサイトは問題をランダムに自動生成するので、 様々なパターンの問題を繰り返し演習することができます。
		</p>
		<p>
			また、独自の判定ロジックにより、 正解数に応じて問題のパターンが変化するようになっています。
			これにより適度なレベルの演習を積むことができます。
		</p>
		<p>注意点としては、問題と解答だけの構成になっており、 途中式や解説はございません。</p>
	</div>
	<div>
		<h3>お手軽に利用できます</h3>
		<p>
			このサイトのコンテンツはすべて無料で利用できます。
			<br />
			面倒なユーザー登録などもありません。
		</p>
		<p>
			Google ChromeやSafariなどの、 いわゆるモダンブラウザをターゲットに制作しています。
			<br />
			PC、スマートフォン、タブレットなどから利用できます。
			<br />
			問題生成は端末側で行われるので、 ページが表示された後はサーバーとの通信を必要としません。
		</p>
	</div>
	<div>
		<h3>主要な技術的要素</h3>
		<div class="space-y-8">
			<p>このサイトは主に以下のプロダクトやサービスを使用しています。</p>
			<div>
				<h4>
					<a href="https://nextjs.org/" rel="external">Next.js</a>
				</h4>
				<p>
					強力な React フレームワークです。
					<a href="https://ja.reactjs.org/" rel="external">React</a>
					はインタラクティブなユーザインターフェイス構築のための JavaScript ライブラリです。
					<a href="https://developer.mozilla.org/ja/docs/Web/JavaScript" rel="external">
						JavaScript
					</a>
					はウェブページでよく使用されるスクリプト言語ですが、 このサイトではTypeScriptを採用しています。
					<a href="https://www.typescriptlang.org/" rel="external"> TypeScript </a>
					はマイクロソフトによって開発されたJavaScriptの拡張言語で、 静的型付けやクラスベースオブジェクト指向が特徴です。
				</p>
			</div>
			<div>
				<h4>
					<a href="https://chakra-ui.com/" rel="external">Chakra UI</a>
				</h4>
				<p>シンプルなUIコンポーネントフレームワークです。</p>
			</div>
			<div>
				<h4>
					<a href="https://github.com/fast-reflexes/better-react-mathjax" rel="external">
						better-react-mathjax
					</a>
				</h4>
				<p>
					MathJaxを使うためのReactコンポーネントです。
					<a href="https://github.com/mathjax/MathJax" rel="external"> MathJax </a>
					は<Katex>\\LaTeX</Katex>
					等で記述された数式をウェブブラウザで表示するJavaScriptライブラリです。
					<a href="https://ja.wikipedia.org/wiki/LaTeX" rel="external">
						<Katex>\\LaTeX</Katex>
					</a>
					は学術論文などでも使用される、テキストベースの組版処理システムです。
				</p>
			</div>
			<div>
				<h4>
					<a href="https://jestjs.io/ja/" rel="external">Jest</a>
				</h4>
				<p>シンプルさを重視した、 快適な JavaScript テスティングフレームワークです。</p>
			</div>
			<div>
				<h4>
					<a href="https://github.com/puppeteer/puppeteer" rel="external"> Puppeteer </a>
				</h4>
				<p>
					ChromeまたはChromiumを制御するためのライブラリです。 問題をランダムに生成する性質上、
					Jestだけではテストできないので
					Puppeteerでスクリーンショットを撮り、問題・解答を目視で検証しています。
				</p>
			</div>
			<div>
				<h4>
					<a href="https://web.arena.ne.jp/vps-cloud/" rel="external"> WebARENA VPSクラウド </a>
				</h4>
				<p>
					このサイトをホスティングしている NTTPCコミュニケーションズのサービスです。
					いっちゃん安い月額396円（税込）のプランを使っています。
					<a href="https://ja.wikipedia.org/wiki/VPS" rel="external"> VPS </a>
					は Virtual Private Server の略称で、 一台の物理的なサーバコンピュータ上に構築された 仮想的なサーバコンピュータのことです。
				</p>
			</div>
		</div>
	</div>
	<div>
		<h3>製作者について</h3>
		<p>
			某個別指導塾の現役講師です。 某大学の工学部情報処理学科卒、
			某この木なんの木気になる木系列の会社でSEをしていたという経歴はありますが
			プログラミングはすべて独学です。
		</p>
		<p>
			プログラミングに限らず、何事もすべて独力で学べます。
			学ぶためのツールやリソースは探せばいくらでもあります。
			大切なのは、易しすぎず難しすぎず、適切なレベルの教材に出会えるか？です。
		</p>
		<p>このサイトが利用するすべての人にとって「適切なレベル」であるよう、 改善を続けていきます。</p>
	</div>
</div>

<style lang="postcss">
	h2 {
		@apply h2 my-4;
	}
	h3 {
		@apply h3 my-4 p-2 border-l-8 border-orange-600;
	}
	h4 {
		@apply h4 my-1;
	}
	a[rel='external'] {
		@apply anchor;
	}
</style>
