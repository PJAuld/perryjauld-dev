<script>
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
					<p class="date">{new Date(post.meta.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
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
		list-style: none;

		.blog-item {
			margin-bottom: var(--spacing-md);
			padding: var(--spacing-md);
			background: rgba(255, 255, 255, 0.5);
			border: 1px solid rgba(255, 255, 255, 0.3);
			border-radius: 8px;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
			transition: background 0.2s, box-shadow 0.2s;

			&:hover {
				background: rgba(255, 255, 255, 0.6);
				box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
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
