<script>
	let {
		posts = [],
		isActive = () => false,
	} = $props();
</script>

{#if posts.length > 0}
	<ul class="sub-nav-list">
		{#each posts as post}
			<li class="sub-nav-item">
				<a
					href="/blog/{post.path}"
					class="sub-nav-link"
					class:sub-nav-link--active={isActive('/blog/' + post.path)}
					aria-current={isActive('/blog/' + post.path) ? 'page' : undefined}
				>
					{post.meta.title}
				</a>
			</li>
		{/each}
	</ul>
{/if}

<style lang="scss">
	.sub-nav-list {
		display: flex;
		flex-direction: column;
		gap: 0;
		list-style: none;
		margin-top: 2px;
		padding-left: var(--padding-link-left);
	}

	.sub-nav-link {
		border-radius: var(--radius-link);
		color: var(--color-text-muted);
		display: block;
		font-size: 0.875rem;
		overflow: hidden;
		padding: 0.2rem var(--spacing-xs);
		text-decoration: none;
		text-overflow: ellipsis;
		transition:
			background-color var(--transition-link),
			color var(--transition-link);
		white-space: nowrap;

		&:hover {
			background: var(--glass-bg-hover);
			color: var(--color-text);
		}

		&.sub-nav-link--active {
			color: var(--color-primary);
			font-weight: 600;
		}
	}
</style>
