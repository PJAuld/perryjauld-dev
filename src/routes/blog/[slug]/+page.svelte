<!-- Individual Blog Post Page Component -->
<script>
	import { formatDate } from '$lib/utils/format';
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.meta.title} - Perry J Auld</title>
</svelte:head>

<main>
	<article>
		<header>
			<h1>{data.meta.title}</h1>
			<p class="date">{formatDate(data.meta.date)}</p>
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
		max-width: 800px; /* Optimal line length for reading */
		margin: 0 auto; /* Center horizontally */

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
		
		/* Content wrapper uses :global() to style elements rendered by markdown */
		.content {
			:global(ul) {
				padding-left: 1.5rem;
			}
			
			:global(h2) {
				margin-bottom: 1rem;
				margin-top: 2rem;
			}

			:global(h3) {
				margin-bottom: 0.75rem;
				margin-top: 1.5rem;
			}
			
			/* Code blocks */
			:global(pre) {
				background: #f5f5f5;
				border-radius: 4px;
				margin: 1rem 0;
				overflow-x: auto; /* Horizontal scroll for long lines */
				padding: 1rem;
			}
			
			/* Inline code */
			:global(code) {
				background: #f5f5f5;
				border-radius: 3px;
				font-size: 0.9em;
				padding: 0.2rem 0.4rem;
			}
			
			/* Code inside pre blocks - removes inline code styling */
			:global(pre code) {
				background: transparent;
				padding: 0;
			}
			
			/* Quoted content */
			:global(blockquote) {
				border-left: 4px solid var(--color-primary);
				color: #666;
				margin: 1rem 0;
				padding-left: 1rem;
			}
		}
	}
	
	nav {
		border-top: 1px solid var(--color-border);
		margin-top: 3rem;
		padding-top: 2rem;
	}
</style>
