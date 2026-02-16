<script>
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.meta.title} - Perry J Auld</title>
</svelte:head>

<main>
	<article>
		<header>
			<h1>{data.meta.title}</h1>
			<p class="date">
				{new Date(data.meta.date).toLocaleDateString('en-US', { 
					year: 'numeric', month: 'long', day: 'numeric' 
				})}
			</p>
		</header>
		
		<div class="content">
			{#if data.content}
				{@const Content = data.content}
				<Content />
			{/if}
		</div>
	</article>
	
	<nav>
		<a href="/blog">← Back to Blog</a>
	</nav>
</main>

<style lang="scss">
	article {
		max-width: 800px;
		margin: 0 auto;
		
		header {
			margin-bottom: 2rem;
			
			h1 {
				margin-bottom: 0.5rem;
			}
			
			.date {
				color: #666;
				font-size: 0.9rem;
			}
		}
		
		.content {
			:global(h2) {
				margin-top: 2rem;
				margin-bottom: 1rem;
			}
			
			:global(h3) {
				margin-top: 1.5rem;
				margin-bottom: 0.75rem;
			}
			
			:global(pre) {
				background: #f5f5f5;
				padding: 1rem;
				border-radius: 4px;
				overflow-x: auto;
				margin: 1rem 0;
			}
			
			:global(code) {
				background: #f5f5f5;
				padding: 0.2rem 0.4rem;
				border-radius: 3px;
				font-size: 0.9em;
			}
			
			:global(pre code) {
				background: transparent;
				padding: 0;
			}
			
			:global(blockquote) {
				border-left: 4px solid var(--color-primary);
				padding-left: 1rem;
				margin: 1rem 0;
				color: #666;
			}
		}
	}
	
	nav {
		margin-top: 3rem;
		padding-top: 2rem;
		border-top: 1px solid var(--color-border);
	}
</style>
