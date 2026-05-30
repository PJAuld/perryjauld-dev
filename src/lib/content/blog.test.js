import { describe, expect, it } from 'vitest';
import { slugFromContentPath, sortPostsByDateDesc } from './blog.js';

describe('slugFromContentPath', () => {
	it('extracts the slug from a blog markdown content path', () => {
		expect(slugFromContentPath('/src/content/blog/welcome.md')).toBe('welcome');
	});

	it('preserves nested slug characters inside the filename', () => {
		expect(slugFromContentPath('/src/content/blog/hello-world-2026.md')).toBe('hello-world-2026');
	});
});

describe('sortPostsByDateDesc', () => {
	it('sorts posts newest first', () => {
		const posts = [
			{ path: 'middle', meta: { date: '2026-02-13' } },
			{ path: 'newest', meta: { date: '2026-05-29' } },
			{ path: 'oldest', meta: { date: '2025-12-31' } },
		];

		expect(sortPostsByDateDesc(posts).map((post) => post.path)).toEqual([
			'newest',
			'middle',
			'oldest',
		]);
	});

	it('does not mutate the input array', () => {
		const posts = [
			{ path: 'oldest', meta: { date: '2025-12-31' } },
			{ path: 'newest', meta: { date: '2026-05-29' } },
		];

		const sorted = sortPostsByDateDesc(posts);

		expect(sorted).not.toBe(posts);
		expect(posts.map((post) => post.path)).toEqual(['oldest', 'newest']);
		expect(sorted.map((post) => post.path)).toEqual(['newest', 'oldest']);
	});
});
