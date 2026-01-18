import { describe, it, expect } from 'vitest';
import { formatDate, timeAgo, daysBetween } from './date';

describe('date utils', () => {
  describe('formatDate', () => {
    it('formats date correctly with default locale', () => {
      const date = new Date('2023-01-01T12:00:00Z');
      // Note: This test might be sensitive to the running environment's time zone if not handled carefully.
      // However, Intl.DateTimeFormat uses local time by default.
      // To make it deterministic in tests, we can check if it returns a string format.
      // Better yet, for basic smoke test, checking the structure or specific parts.
      // Given the implementation uses Intl.DateTimeFormat, exact output depends on browser/node locale support.
      // We will assume "ja-JP" default and check for typical format or parts.
      
      const formatted = formatDate(date);
      expect(formatted).toMatch(/2023/);
      expect(formatted).toMatch(/01/);
    });

    it('formats date string correctly', () => {
      const formatted = formatDate('2023-12-31');
      expect(formatted).toMatch(/2023/);
      expect(formatted).toMatch(/12/);
      expect(formatted).toMatch(/31/);
    });

    it('respects custom locale and options', () => {
      const date = new Date('2023-01-01T00:00:00');
      const formatted = formatDate(date, 'en-US', { month: 'long', year: 'numeric' });
      expect(formatted).toBe('January 2023');
    });
  });

  describe('timeAgo', () => {
    it('returns "seconds ago" for recent times', () => {
      const now = new Date();
      const past = new Date(now.getTime() - 1000 * 30); // 30 seconds ago
      expect(timeAgo(past)).toBe('30 seconds ago');
    });

    it('returns "minutes ago"', () => {
      const now = new Date();
      const past = new Date(now.getTime() - 1000 * 60 * 5); // 5 minutes ago
      expect(timeAgo(past)).toBe('5 minutes ago');
    });

    it('returns "hours ago"', () => {
      const now = new Date();
      const past = new Date(now.getTime() - 1000 * 60 * 60 * 2); // 2 hours ago
      expect(timeAgo(past)).toBe('2 hours ago');
    });
    
    it('returns "days ago"', () => {
        const now = new Date();
        const past = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 5); // 5 days ago
        expect(timeAgo(past)).toBe('5 days ago');
    });

    it('returns "months ago"', () => {
        const now = new Date();
        const past = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 60); // 60 days ~ 2 months
        expect(timeAgo(past)).toBe('2 months ago');
    });

    it('returns "years ago"', () => {
        const now = new Date();
        const past = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 400); // 400 days ~ 1 year
        expect(timeAgo(past)).toBe('1 years ago');
    });
  });

  describe('daysBetween', () => {
    it('calculates days correctly', () => {
      const start = new Date('2023-01-01');
      const end = new Date('2023-01-10');
      expect(daysBetween(start, end)).toBe(9);
    });
    
    it('returns 0 for same day', () => {
        const start = new Date('2023-01-01T10:00:00');
        const end = new Date('2023-01-01T20:00:00');
        expect(daysBetween(start, end)).toBe(0);
    });

    it('works with string inputs', () => {
        expect(daysBetween('2023-01-01', '2023-01-02')).toBe(1);
    });
  });
});
