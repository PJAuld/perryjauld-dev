<script>
	let {
		isOpen = false,
		onToggle = () => {},
		controls = 'nav-content',
	} = $props();
</script>

<button
	class="mobile-toggle"
	onclick={onToggle}
	aria-expanded={isOpen}
	aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
	aria-controls={controls}
>
	<span class="mobile-toggle-icon" aria-hidden="true">
		{#if isOpen}✕{:else}☰{/if}
	</span>
</button>

<style lang="scss">
	.mobile-toggle {
		display: none;
	}

	@media (max-width: 768px) {
		.mobile-toggle {
			align-items: center;
			background: none;
			border: none;
			color: var(--color-text);
			cursor: pointer;
			display: flex;
			height: 100%;
			justify-content: center;
			padding: 0 var(--spacing-sm);

			&:focus-visible {
				outline: 2px solid var(--color-primary);
				outline-offset: -4px;
			}
		}

		.mobile-toggle-icon {
			font-size: 1.5rem;
			line-height: 1;
		}
	}
</style>
