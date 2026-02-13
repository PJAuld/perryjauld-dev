import { describe, it, expect } from 'vitest';
import { formatDate, slugify } from './format';

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

describe('slugify', () => {
	it('converts text to slug format', () => {
		expect(slugify('Hello World')).toBe('hello-world');
	});

	it('removes special characters', () => {
		expect(slugify('Hello! World?')).toBe('hello-world');
	});

	it('handles multiple spaces and hyphens', () => {
		expect(slugify('Hello   World---Test')).toBe('hello-world-test');
	});

	it('removes leading and trailing hyphens', () => {
		expect(slugify('---hello world---')).toBe('hello-world');
	});
});
