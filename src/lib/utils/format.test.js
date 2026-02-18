/* Unit tests for format utility functions */
import { describe, expect, it } from 'vitest';
import { formatDate } from './format';

describe('formatDate', () => {
	it('formats a date string correctly', () => {
		const result = formatDate('2026-02-13');
		expect(result).toBe('February 13, 2026');
	});

	it('formats a Date object correctly', () => {
		const date = new Date('2026-02-13');
		const result = formatDate(date);
		expect(result).toBe('February 13, 2026');
	});
});
