import { getAllPostMetadata } from '$lib/content/blog.js';

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
  const navPosts = await getAllPostMetadata();

  return { navPosts };
}
