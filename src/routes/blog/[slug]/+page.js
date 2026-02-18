/** Load blog posts for a given slug */
import { error } from '@sveltejs/kit';

/**
 * Loads a specific blog post by its slug, and returns its contents and metadata.
 * @param {Object} ctx - SvelteKit load context
 * @param {Object} ctx.params - URL parameters
 * @param {string} ctx.params.slug - The blog post slug from the URL
 * @returns {Promise<{content: Component, meta: object}>} The post content component and metadata
 * @throws {404} When the requested blog post file doesn't exist
 * @example
 * // For URL /blog/welcome, params.slug will be 'welcome'
 * // Returns: { content: WelcomeComponent, meta: { title: '...', date: '...' } }
 */
export async function load({ params: { slug } }) {
	try {
		const post = await import(`../../../content/blog/${slug}.md`);

		return {
			content: post.default,
			meta: post.metadata
		};
	} catch (e) {
		throw error(404, `Could not find ${slug}`);
	}
}
