/**
 * Find all markdown content, extract metadata, sort by date, and list for display.
 * @returns {Promise<{posts: Array<{meta: object, path: string}>}>} Object containing
 *     sorted array of post data
 * @example
 * // {
 * //   posts: [
 * //     { meta: { title: '...', date: '...' }, path: 'welcome' },
 * //     ...
 * //   ]
 * // }
 */
export async function load({ parent }) {
	const { navPosts } = await parent();

	return { posts: navPosts };
}
