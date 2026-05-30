/**
 * Computes contextual navigation: up to 5 posts around the current one.
 * Ordered newest-first. Fills missing slots from the other side.
 * @param {Array<{path: string, meta: object}>} allPosts
 * @param {string} slug
 * @returns {{before: Array, current: object, after: Array, hasMoreAbove: boolean, hasMoreBelow: boolean} | null}
 */
export function getPostNavContext(allPosts, slug) {
	const currentIndex = allPosts.findIndex((post) => post.path === slug);
	if (currentIndex === -1) { return null; }

	let beforeCount = 2;
	let afterCount = 2;
	const availableBefore = currentIndex;
	const availableAfter = allPosts.length - currentIndex - 1;

	if (availableBefore < beforeCount) {
		const deficit = beforeCount - availableBefore;
		afterCount = Math.min(availableAfter, afterCount + deficit);
		beforeCount = availableBefore;
	}
	else if (availableAfter < afterCount) {
		const deficit = afterCount - availableAfter;
		beforeCount = Math.min(availableBefore, beforeCount + deficit);
		afterCount = availableAfter;
	}

	return {
		before: allPosts.slice(currentIndex - beforeCount, currentIndex),
		current: allPosts[currentIndex],
		after: allPosts.slice(currentIndex + 1, currentIndex + 1 + afterCount),
		hasMoreAbove: currentIndex - beforeCount > 0,
		hasMoreBelow: currentIndex + 1 + afterCount < allPosts.length,
	};
}
