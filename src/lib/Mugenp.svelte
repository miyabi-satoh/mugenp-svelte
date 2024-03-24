<script lang="ts" context="module">
	export type Practice = {
		question: string;
		answer: string;
		result?: number;
		attributs?: Record<string, unknown>;
	};
	export type PracticeFactory = () => Practice;
	export type NextEvent = {
		history: Practice[];
	};
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Katex from './Katex.svelte';

	const dispatch = createEventDispatcher<{
		next: NextEvent;
		commit: Practice;
	}>();
	export let factory: PracticeFactory;

	let showAnswer = false;
	let disableNext = true;
	let practices: Practice[] = [];
	let history: Practice[] = [];
	let totalPractices = 0;
	let correctCount = 0;

	function handleChangeRadio() {
		disableNext = !!practices.find((p) => p.result === undefined);
	}

	function handleClickNext() {
		// 結果集計
		totalPractices += practices.length;
		correctCount += practices.filter((p) => p.result! > 0).length;

		dispatch('next', { history });

		const newPactices: Practice[] = [];
		let start = Date.now();

		let loopCount = 1;
		while (newPactices.length < 4) {
			const p = factory();
			// 同じ問題や答えをチェック
			const found = history.find(
				(item) => item.question === p.question || item.answer === p.answer
			);
			if (found) {
				const millis = Date.now() - start;
				if (millis > 100) {
					console.log({ millis, loopCount }, history.length);
					history = history.slice(4);
					start = Date.now();
				}
			} else {
				dispatch('commit', p);
				history.push(p);
				newPactices.push(p);
			}
			loopCount++;
		}

		showAnswer = false;
		disableNext = true;
		practices = newPactices;
	}

	handleClickNext();

	$: accuracy = Math.round((100 * correctCount) / totalPractices);
</script>

<div class="grid sm:grid-cols-2 gap-4 my-8">
	{#each practices as practice, i}
		<div class="space-y-2">
			<div>
				<span class="inline-block w-8">({i + 1})</span>
				<Katex>{practice.question}</Katex>
			</div>
			<div class="pl-8 min-h-16 space-y-2">
				{#if showAnswer}
					<p class="text-error-500-400-token">
						<Katex>{practice.answer}</Katex>
					</p>
					<div class="flex gap-16">
						<label class="flex items-center space-x-2">
							<input
								class="radio"
								type="radio"
								name="result_{i}"
								value={1}
								bind:group={practice.result}
								on:change={handleChangeRadio}
							/>
							<p>正解</p>
						</label>
						<label class="flex items-center space-x-2">
							<input
								class="radio"
								type="radio"
								name="result_{i}"
								bind:group={practice.result}
								on:change={handleChangeRadio}
								value={-1}
							/>
							<p>不正解</p>
						</label>
					</div>
				{/if}
			</div>
		</div>
	{/each}
</div>
<div class="flex gap-4 items-center">
	<button class="btn btn-sm variant-filled-secondary" on:click={() => (showAnswer = !showAnswer)}
		>解答を{showAnswer ? '隠す' : '表示'}</button
	>
	<button
		class="btn btn-sm variant-filled-primary"
		on:click={handleClickNext}
		disabled={disableNext}>次の問題</button
	>
	{#if totalPractices > 0}
		<div>
			{totalPractices}問中 {correctCount}問正解 ({accuracy}%)
		</div>
	{/if}
</div>
