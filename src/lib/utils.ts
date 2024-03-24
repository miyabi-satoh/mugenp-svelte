import Fraction from 'fraction.js'

export function randomInt(max: number, min: number = 0): number {
	if (min > max) {
		[max, min] = [min, max];
	}
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function chooseRandom<T>(...array: T[]): T {
	const rand = randomInt(array.length - 1);
	const rValue = array[rand];
	return rValue;
}

export function Latex(f: Fraction, frac: boolean = true) {
	if (frac && f.d !== 1) {
		return `${f.s < 0 ? '-' : ''}\\frac{${f.n}}{${f.d}}`
	}
	return f.toString()
}