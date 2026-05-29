/** Load blog post and all posts for contextual navigation */
import { error } from '@sveltejs/kit';
import { getAllPostMetadata, getPostBySlug } from '$lib/content/blog.js';

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
	const [allPosts, post] = await Promise.all([getAllPostMetadata(), getPostBySlug(slug)]);

	if (!post) {
		throw error(404, `Could not find ${slug}`);
	}

	return {
		content: post.content,
		meta: post.meta,
		allPosts,
	};
}
