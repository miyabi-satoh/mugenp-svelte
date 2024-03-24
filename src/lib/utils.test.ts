import { describe, expect, it } from 'vitest';
import { chooseRandom, randomInt, Latex } from './utils';
import Fraction from 'fraction.js'

describe('utils モジュールのテスト', () => {
  describe('chooseRandom 関数', () => {
    it('配列からランダムな要素を返す', () => {
      const array = [1, 2, 3, 4, 5];
      const result = chooseRandom(...array);
      expect(array).toContain(result);
    });
  });

  describe('randomInt 関数', () => {
    it('指定された範囲内のランダムな整数を返す', () => {
      const min = 1;
      const max = 10;
      const result = randomInt(min, max);
      expect(result).toBeGreaterThanOrEqual(min);
      expect(result).toBeLessThanOrEqual(max);
    });
  });

  describe('Latex 関数', () => {
    it('分数を正しく LaTeX 形式に変換する', () => {
      const fraction = new Fraction(1, 2);
      const result = Latex(fraction, true);
      expect(result).toBe('\\frac{1}{2}');
    });

    it('整数を正しく LaTeX 形式に変換する', () => {
      const fraction = new Fraction(2);
      const result = Latex(fraction, false);
      expect(result).toBe('2');
    });

    it('負の分数を正しく LaTeX 形式に変換する', () => {
      const fraction = new Fraction(-3, 4);
      const result = Latex(fraction, true);
      expect(result).toBe('-\\frac{3}{4}');
    });
  });
});
