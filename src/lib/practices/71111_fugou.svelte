<script lang="ts">
	import Mugenp, { type NextEvent, type Practice, type PracticeFactory } from '$lib/Mugenp.svelte';
	import { Latex, chooseRandom, randomInt } from '$lib/utils';
	import Fraction from 'fraction.js';

	type Attributes = {
		level: number;
	};
	let balance: number[] = [0, 0, 0, 0];

	const factory: PracticeFactory = () => {
		let a: Fraction;
		let q: Fraction;
		let t: string;
		let frac = false;

		let level = randomInt(100) > 30 ? balance[0] : randomInt(balance[0]);
		if (level < 1) {
			// 1 - 9
			q = new Fraction(randomInt(9, 1));
			level = 0;
		} else if (level < 2) {
			// X.XX
			q = new Fraction(`${randomInt(10)}.${randomInt(100, 1)}`);
			level = 1;
		} else {
			// fraction
			q = new Fraction(randomInt(10, 1), randomInt(10, 2));
			frac = true;
			level = 2;
		}

		if (chooseRandom(true, false)) {
			t = '大きな';
			a = q;
		} else {
			t = '小さな';
			a = q.neg();
		}
		return {
			question: '${0}$ よりも ${' + Latex(q, frac) + '}$ ' + t + '数',
			answer: '${' + (a.s > 0 ? '+' : '') + Latex(a, frac) + '}$',
			attributs: {
				level
			} satisfies Attributes
		};
	};

	function handleCommit(_event: CustomEvent<Practice>) {
		balance.shift();
	}

	function handleNext(event: CustomEvent<NextEvent>) {
		const { history } = event.detail;
		balance = [0, 0, 0, 0];
		for (let i = history.length - 1; i >= 0; i--) {
			const result = history[i].result;
			if (result !== undefined) {
				const attributs = history[i].attributs as Attributes;
				balance.unshift(attributs.level + result);
				if (balance.length >= 8) {
					break;
				}
			}
		}
	}
</script>

<Mugenp {factory} on:next={handleNext} on:commit={handleCommit} />
