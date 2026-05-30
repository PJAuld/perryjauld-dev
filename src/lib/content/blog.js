const BLOG_CONTENT_PREFIX = '/src/content/blog/';
const BLOG_MARKDOWN_EXTENSION = '.md';

const postModules = import.meta.glob('/src/content/blog/*.md');

/**
 * Converts a Vite glob content path into the public blog slug.
 * @param {string} path
 * @returns {string}
 */
export function slugFromContentPath(path) {
	return path.slice(BLOG_CONTENT_PREFIX.length, -BLOG_MARKDOWN_EXTENSION.length);
}

/**
 * Sorts post metadata records newest-first without mutating the input array.
 * @param {Array<{meta: {date: string}, path: string}>} posts
 * @returns {Array<{meta: {date: string}, path: string}>}
 */
export function sortPostsByDateDesc(posts) {
	return [...posts].sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
}

/**
 * Loads metadata for every blog post.
 * @returns {Promise<Array<{meta: object, path: string}>>}
 */
export async function getAllPostMetadata() {
	const posts = await Promise.all(
		Object.entries(postModules).map(async ([path, resolver]) => {
			const { metadata } = await resolver();
			return { meta: metadata, path: slugFromContentPath(path) };
		})
	);

	return sortPostsByDateDesc(posts);
}

/**
 * Loads a blog post component and its metadata by slug.
 * @param {string} slug
 * @returns {Promise<{content: import('svelte').Component, meta: object, path: string} | null>}
 */
export async function getPostBySlug(slug) {
	const resolver = postModules[`${BLOG_CONTENT_PREFIX}${slug}${BLOG_MARKDOWN_EXTENSION}`];

	if (!resolver) {
		return null;
	}

	const post = await resolver();

	return {
		content: post.default,
		meta: post.metadata,
		path: slug,
	};
}
