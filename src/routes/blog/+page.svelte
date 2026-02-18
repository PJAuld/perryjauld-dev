<!-- Blog Listing Page Component -->
<script>
	import { formatDate } from '$lib/utils/format';
	let { data } = $props();
</script>

<main>
	<h1>Blog</h1>
	
	{#if data.posts.length === 0}
		<p>No blog posts yet. Check back soon!</p>
	{:else}
		<ul class="blog-list">
			{#each data.posts as post}
				<li class="blog-item glass-card">
					<h3>
						<a href="/blog/{post.path}">{post.meta.title}</a>
					</h3>
					<p class="date">{formatDate(post.meta.date)}</p>
					{#if post.meta.excerpt}
						<p class="excerpt">{post.meta.excerpt}</p>
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
</main>

<style lang="scss">
	.blog-list {
		list-style: none; /* Removes bullet points */

		/* Card-style layout with glassmorphism design. */
		.blog-item {
			@include glass-card;
			margin-bottom: var(--spacing-md);
			padding: var(--spacing-md);

			h3 {
				margin-bottom: var(--spacing-xs);
			}

			.date {
				color: var(--color-text-muted);
				font-size: var(--font-size-date);
				margin-bottom: var(--spacing-xs);
			}

			.excerpt {
				color: var(--color-text-subtle);
			}
		}
	}
</style>
