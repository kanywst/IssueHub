import { describe, it, expect } from 'vitest';
import { groupBy, unique, chunk } from './array';

describe('array utils', () => {
  describe('groupBy', () => {
    it('groups objects by key', () => {
      const data = [
        { category: 'A', value: 1 },
        { category: 'B', value: 2 },
        { category: 'A', value: 3 },
      ];
      const result = groupBy(data, 'category');
      
      expect(result['A']).toHaveLength(2);
      expect(result['A'][0].value).toBe(1);
      expect(result['A'][1].value).toBe(3);
      expect(result['B']).toHaveLength(1);
      expect(result['B'][0].value).toBe(2);
    });

    it('handles empty array', () => {
      expect(groupBy([], 'category')).toEqual({});
    });
  });

  describe('unique', () => {
    it('removes duplicates from array', () => {
      expect(unique([1, 2, 2, 3, 1])).toEqual([1, 2, 3]);
    });

    it('works with strings', () => {
      expect(unique(['a', 'b', 'a'])).toEqual(['a', 'b']);
    });
    
    it('handles empty array', () => {
        expect(unique([])).toEqual([]);
    });
  });

  describe('chunk', () => {
    it('chunks array into smaller arrays', () => {
      const data = [1, 2, 3, 4, 5];
      const result = chunk(data, 2);
      
      expect(result).toHaveLength(3);
      expect(result[0]).toEqual([1, 2]);
      expect(result[1]).toEqual([3, 4]);
      expect(result[2]).toEqual([5]);
    });

    it('handles empty array', () => {
      expect(chunk([], 2)).toEqual([]);
    });

    it('returns one chunk if size is larger than array length', () => {
      expect(chunk([1, 2], 5)).toEqual([[1, 2]]);
    });
  });
});
