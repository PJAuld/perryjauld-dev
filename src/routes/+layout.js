/**
 * Enables pre-rendering for all pages in the application (SSG)
 * @type {boolean}
 */
export const prerender = true;

/**
 * Load blog post metadata for the nav bar sub-menu.
 * @returns {Promise<{navPosts: Array<{meta: object, path: string}>}>}
 */
export async function load() {
  const allPostFiles = import.meta.glob('/src/content/blog/*.md');
  const allPosts = await Promise.all(
    Object.entries(allPostFiles).map(async ([path, resolver]) => {
      const { metadata } = await resolver();
      const postPath = path.slice('/src/content/blog/'.length, -'.md'.length);
      return { meta: metadata, path: postPath };
    })
  );

  const sortedPosts = allPosts.sort((a, b) =>
    new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
  );

  return { navPosts: sortedPosts };
}
