import { describe, it, expect } from 'vitest';
import { truncate, toTitleCase } from './string';

describe('string utils', () => {
  describe('truncate', () => {
    it('truncates string longer than length', () => {
      expect(truncate('hello world', 5)).toBe('hello...');
    });

    it('returns original string if shorter than or equal to length', () => {
      expect(truncate('hello', 10)).toBe('hello');
      expect(truncate('hello', 5)).toBe('hello');
    });

    it('returns empty string for empty input', () => {
      expect(truncate('', 5)).toBe('');
    });
  });

  describe('toTitleCase', () => {
    it('converts string to title case', () => {
      expect(toTitleCase('hello world')).toBe('Hello World');
      expect(toTitleCase('HELLO WORLD')).toBe('Hello World');
      expect(toTitleCase('hElLo wOrLd')).toBe('Hello World');
    });

    it('handles empty string', () => {
      expect(toTitleCase('')).toBe('');
    });

    it('handles single word', () => {
      expect(toTitleCase('javascript')).toBe('Javascript');
    });
  });
});
