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
