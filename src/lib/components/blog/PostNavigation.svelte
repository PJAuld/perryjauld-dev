<script>
	import { formatDate } from '$lib/utils/format';

	let { navContext = null } = $props();
</script>

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

<style lang="scss">
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
