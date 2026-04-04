/** Load blog post and all posts for contextual navigation */
import { error } from '@sveltejs/kit';

/**
 * Loads a specific blog post by its slug and all posts for contextual navigation.
 * @param {Object} ctx - SvelteKit load context
 * @param {Object} ctx.params - URL parameters
 * @param {string} ctx.params.slug - The blog post slug from the URL
 * @returns {Promise<{content: Component, meta: object, allPosts: Array}>}
 *     The post content component, metadata, and all posts sorted by date descending
 * @throws {404} When the requested blog post file doesn't exist
 * @example
 * // For URL /blog/welcome, params.slug will be 'welcome'
 * // Returns: { content: WelcomeComponent, meta: { title: '...', date: '...' }, allPosts: [...] }
 */
export async function load({ params: { slug } }) {
	const allPostFiles = import.meta.glob('/src/content/blog/*.md');
	const postFile = allPostFiles[`/src/content/blog/${slug}.md`];

	if (!postFile) {
		throw error(404, `Could not find ${slug}`);
	}

	const iterablePostFiles = Object.entries(allPostFiles);

	// Load all post metadata and the current post content in parallel
	const [allPostsData, currentPost] = await Promise.all([
		Promise.all(
			iterablePostFiles.map(async ([path, resolver]) => {
				const { metadata } = await resolver();
				const postPath = path.slice('/src/content/blog/'.length, -'.md'.length);
				return { meta: metadata, path: postPath };
			})
		),
		postFile(),
	]);

	// Sort by date in descending order (newest first)
	const allPosts = allPostsData.sort((a, b) =>
		new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
	);

	return {
		content: currentPost.default,
		meta: currentPost.metadata,
		allPosts,
	};
}
