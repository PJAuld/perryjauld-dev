import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('h1')).toHaveText('Perry Jauld');
});

test('navigation links work', async ({ page }) => {
	await page.goto('/');
	
	// Test blog link
	await page.click('a[href="/blog"]');
	await expect(page).toHaveURL('/blog');
	await expect(page.locator('h1')).toHaveText('Blog');
	
	// Test portfolio link
	await page.click('a[href="/portfolio"]');
	await expect(page).toHaveURL('/portfolio');
	await expect(page.locator('h1')).toHaveText('Portfolio');
});

test('blog post can be viewed', async ({ page }) => {
	await page.goto('/blog');
	
	// Check if blog posts are listed
	const blogItems = page.locator('.blog-item');
	const count = await blogItems.count();
	
	if (count > 0) {
		// Click on first blog post
		await blogItems.first().locator('a').click();
		await expect(page.locator('article')).toBeVisible();
	}
});
