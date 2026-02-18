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
				<li class="blog-item">
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
			backdrop-filter: blur(10px); /* Frosted glass effect */
			-webkit-backdrop-filter: blur(10px); /* Safari compatibility */
			background: rgba(255, 255, 255, 0.5);
			border: 1px solid rgba(255, 255, 255, 0.4);
			border-radius: 12px;
			box-shadow: 
				0 4px 6px rgba(0, 0, 0, 0.1), /* Soft drop shadow */
				inset 0 0 0 1px rgba(255, 255, 255, 0.3); /* Inner highlight */
			margin-bottom: var(--spacing-md);
			padding: var(--spacing-md);
			transition: all 0.3s ease;

			/* On hover increase opacity and shadow to highlight */
			&:hover {
				background: rgba(255, 255, 255, 0.65);
				box-shadow: 
					0 8px 16px rgba(0, 0, 0, 0.15),
					inset 0 0 0 1px rgba(255, 255, 255, 0.4);
			}

			h3 {
				margin-bottom: var(--spacing-xs);
			}

			.date {
				color: #666;
				font-size: 0.9rem;
				margin-bottom: var(--spacing-xs);
			}

			.excerpt {
				color: #555;
			}
		}
	}
</style>
