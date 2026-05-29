import { describe, expect, it } from 'vitest';
import { getPostNavContext } from './navigation.js';

const posts = Array.from({ length: 7 }, (_, index) => ({
	path: `post-${index + 1}`,
	meta: { title: `Post ${index + 1}`, date: `2026-01-0${index + 1}` },
}));

const paths = (items) => items.map((item) => item.path);

describe('getPostNavContext', () => {
	it('returns null for an empty list', () => {
		expect(getPostNavContext([], 'missing')).toBeNull();
	});

	it('returns null when the current post is not found', () => {
		expect(getPostNavContext(posts, 'missing')).toBeNull();
	});

	it('fills below when the current post is first', () => {
		const context = getPostNavContext(posts, 'post-1');

		expect(paths(context.before)).toEqual([]);
		expect(context.current.path).toBe('post-1');
		expect(paths(context.after)).toEqual(['post-2', 'post-3', 'post-4', 'post-5']);
		expect(context.hasMoreAbove).toBe(false);
		expect(context.hasMoreBelow).toBe(true);
	});

	it('keeps a balanced window for a middle post', () => {
		const context = getPostNavContext(posts, 'post-4');

		expect(paths(context.before)).toEqual(['post-2', 'post-3']);
		expect(context.current.path).toBe('post-4');
		expect(paths(context.after)).toEqual(['post-5', 'post-6']);
		expect(context.hasMoreAbove).toBe(true);
		expect(context.hasMoreBelow).toBe(true);
	});

	it('fills above when the current post is last', () => {
		const context = getPostNavContext(posts, 'post-7');

		expect(paths(context.before)).toEqual(['post-3', 'post-4', 'post-5', 'post-6']);
		expect(context.current.path).toBe('post-7');
		expect(paths(context.after)).toEqual([]);
		expect(context.hasMoreAbove).toBe(true);
		expect(context.hasMoreBelow).toBe(false);
	});

	it('handles a one-post list', () => {
		const context = getPostNavContext(posts.slice(0, 1), 'post-1');

		expect(paths(context.before)).toEqual([]);
		expect(context.current.path).toBe('post-1');
		expect(paths(context.after)).toEqual([]);
		expect(context.hasMoreAbove).toBe(false);
		expect(context.hasMoreBelow).toBe(false);
	});
});
