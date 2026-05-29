<script>
	let {
		item,
		active = false,
		current = false,
	} = $props();
</script>

<a
	href={item.path}
	class="nav-link"
	class:nav-link--active={active}
	aria-current={current ? 'page' : undefined}
>
	{item.label}
</a>

<style lang="scss">
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
</style>
