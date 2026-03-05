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
			margin-bottom: var(--spacing-md);
			
			h1 {
				margin-bottom: var(--spacing-xs);
			}
			
			.date {
				color: var(--color-text-muted);
				font-size: var(--font-size-date);
			}
		}
		
		/* Content wrapper uses :global() to style elements rendered by markdown */
		.content {
			:global(ul) {
				padding-left: var(--spacing-card);
			}
			
			:global(h2) {
				margin-bottom: var(--spacing-sm);
				margin-top: var(--spacing-md);
			}

			:global(h3) {
				margin-bottom: var(--spacing-sm);
				margin-top: var(--spacing-card);
			}
			
			/* Code blocks */
			:global(pre) {
				background: var(--color-code-bg);
				border-radius: var(--radius-code);
				margin: var(--spacing-sm) 0;
				overflow-x: auto; /* Horizontal scroll for long lines */
				padding: var(--spacing-sm);
			}
			
			/* Inline code */
			:global(code) {
				background: var(--color-code-bg);
				border-radius: var(--radius-code);
				font-size: var(--font-size-code);
				padding: var(--spacing-code-v) var(--spacing-code-h);
			}
			
			/* Code inside pre blocks - removes inline code styling */
			:global(pre code) {
				background: transparent;
				padding: 0;
			}
			
			/* Quoted content */
			:global(blockquote) {
				border-left: 4px solid var(--color-primary);
				color: var(--color-text-muted);
				margin: var(--spacing-sm) 0;
				padding-left: var(--spacing-sm);
			}
		}
	}
	
	nav {
		border-top: 1px solid var(--color-border);
		margin-top: var(--spacing-xl);
		padding-top: var(--spacing-md);
	}
</style>
