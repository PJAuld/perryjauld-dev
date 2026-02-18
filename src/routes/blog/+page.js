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
export async function load() {
	// Use Vite's import.meta.glob to discover all markdown files
	const allPostFiles = import.meta.glob('/src/content/blog/*.md');
	const iterablePostFiles = Object.entries(allPostFiles);

	// Load metadata from each post file in parallel
	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			const { metadata } = await resolver();
			const postPath = path.slice('/src/content/blog/'.length, -'.md'.length);

			return { meta: metadata, path: postPath };
		})
	);

	// Sort by date in descending order (newest first)
	const sortedPosts = allPosts.sort((a, b) => {
		return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
	});

	return { posts: sortedPosts };
}
