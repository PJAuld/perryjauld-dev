<!-- Individual Blog Post Page Component -->
<script>
	import { page } from '$app/state';
	import { formatDate } from '$lib/utils/format';
	let { data } = $props();

	/**
	 * Computes contextual navigation: up to 5 posts window around the current one.
	 * Ordered newest-first. Fills missing slots from the other side.
	 * @param {Array} allPosts - All posts sorted by date descending (newest first)
	 * @param {string} slug - Current post's path/slug
	 * @returns {Object|null} Navigation context or null if current post not found
	 */
	const getNavContext = (allPosts, slug) => {
		const currentIndex = allPosts.findIndex((p) => p.path === slug);
		if (currentIndex === -1) { return null; }

		let beforeCount = 2;
		let afterCount = 2;
		const availableBefore = currentIndex;
		const availableAfter = allPosts.length - currentIndex - 1;

		if (availableBefore < beforeCount) {
			const deficit = beforeCount - availableBefore;
			afterCount = Math.min(availableAfter, afterCount + deficit);
			beforeCount = availableBefore;
		}
		else if (availableAfter < afterCount) {
			const deficit = afterCount - availableAfter;
			beforeCount = Math.min(availableBefore, beforeCount + deficit);
			afterCount = availableAfter;
		}

		return {
			before: allPosts.slice(currentIndex - beforeCount, currentIndex),
			current: allPosts[currentIndex],
			after: allPosts.slice(currentIndex + 1, currentIndex + 1 + afterCount),
			hasMoreAbove: currentIndex - beforeCount > 0,
			hasMoreBelow: currentIndex + 1 + afterCount < allPosts.length,
		};
	};

	const navContext = $derived.by(() =>
		data.allPosts ? getNavContext(data.allPosts, page.params.slug) : null
	);
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

	<nav class="post-nav" aria-label="Post navigation">
		<a href="/blog" class="all-posts-link">← All Posts</a>
		{#if navContext}
			<ul class="post-list">
				{#if navContext.hasMoreAbove}
					<li class="ellipsis" aria-hidden="true">…</li>
				{/if}
				{#each navContext.before as post}
					<li>
						<a href="/blog/{post.path}" class="post-nav-link glass-card">
							<span class="post-nav-title">{post.meta.title}</span>
							<span class="post-nav-date">{formatDate(post.meta.date)}</span>
						</a>
					</li>
				{/each}
				<li class="post-nav-current glass-card" aria-current="page">
					<span class="post-nav-title">{navContext.current.meta.title}</span>
					<span class="post-nav-date">{formatDate(navContext.current.meta.date)}</span>
				</li>
				{#each navContext.after as post}
					<li>
						<a href="/blog/{post.path}" class="post-nav-link glass-card">
							<span class="post-nav-title">{post.meta.title}</span>
							<span class="post-nav-date">{formatDate(post.meta.date)}</span>
						</a>
					</li>
				{/each}
				{#if navContext.hasMoreBelow}
					<li class="ellipsis" aria-hidden="true">…</li>
				{/if}
			</ul>
		{/if}
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

	.post-nav {
		border-top: 1px solid var(--color-border);
		margin-top: var(--spacing-xl);
		padding-top: var(--spacing-md);

		.all-posts-link {
			color: var(--color-primary);
			display: inline-block;
			margin-bottom: var(--spacing-sm);
		}

		.post-list {
			list-style: none;

			.ellipsis {
				color: var(--color-text-muted);
				font-size: 1.2rem;
				padding: var(--spacing-xs) var(--spacing-sm);
				text-align: center;
			}

			li {
				margin-bottom: var(--spacing-xs);
			}

			.post-nav-link {
				color: var(--color-text);
				display: flex;
				flex-direction: column;
				padding: var(--spacing-xs) var(--spacing-sm);

				&:hover {
					text-decoration: none;
				}
			}

			.post-nav-current {
				border-color: var(--color-primary);
				display: flex;
				flex-direction: column;
				padding: var(--spacing-xs) var(--spacing-sm);

				&:hover {
					border-color: var(--color-primary);
				}

				.post-nav-title {
					color: var(--color-primary);
					font-weight: 600;
				}
			}

			.post-nav-title {
				font-weight: 500;
			}

			.post-nav-date {
				color: var(--color-text-muted);
				font-size: var(--font-size-date);
			}
		}
	}
</style>
