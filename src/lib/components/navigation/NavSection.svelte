<script>
	import BlogSubnav from './BlogSubnav.svelte';

	let {
		item,
		active = false,
		current = false,
		expanded = false,
		posts = [],
		isActive = () => false,
		onToggle = () => {},
	} = $props();
</script>

<div class="nav-section">
	<a
		href={item.path}
		class="nav-link"
		class:nav-link--active={active}
		aria-current={current ? 'page' : undefined}
	>
		{item.label}
	</a>
	<button
		class="caret-btn"
		class:caret-btn--expanded={expanded}
		onclick={() => onToggle(item.path)}
		aria-expanded={expanded}
		aria-label={`${expanded ? 'Collapse' : 'Expand'} ${item.label}`}
	>
		<svg
			class="caret-icon"
			viewBox="0 0 10 10"
			aria-hidden="true"
			focusable="false"
		>
			<path
				d="M3 2 L7 5 L3 8"
				stroke="currentColor"
				fill="none"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</button>
</div>

{#if expanded}
	<BlogSubnav {posts} {isActive} />
{/if}

<style lang="scss">
	.nav-section {
		align-items: center;
		display: flex;
		gap: 0;
	}

	.nav-link {
		border-radius: var(--radius-link);
		color: var(--color-text);
		display: block;
		flex: 1;
		padding: var(--spacing-xs);
		padding-left: var(--padding-link-left);
		text-decoration: none;
		transition:
			background-color var(--transition-link),
			backdrop-filter var(--transition-link);

		&:hover {
			backdrop-filter: var(--glass-blur-hover);
			background: var(--glass-bg-hover);
			text-decoration: none;
		}

		&.nav-link--active {
			color: var(--color-primary);
			font-weight: 600;
		}
	}

	.caret-btn {
		align-items: center;
		background: none;
		border: none;
		border-radius: var(--radius-link);
		color: var(--color-text);
		cursor: pointer;
		display: flex;
		flex-shrink: 0;
		justify-content: center;
		padding: var(--spacing-xs);
		transition: color var(--transition-link);

		&:hover {
			background: var(--glass-bg-hover);
		}

		&:focus-visible {
			outline: 2px solid var(--color-primary);
			outline-offset: 2px;
		}
	}

	.caret-icon {
		height: 12px;
		transition: transform 0.2s ease;
		width: 12px;

		@media (prefers-reduced-motion: reduce) {
			transition: none;
		}
	}

	.caret-btn--expanded .caret-icon {
		transform: rotate(90deg);
	}
</style>
