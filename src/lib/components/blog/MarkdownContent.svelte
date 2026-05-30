<script>
	let { content = null } = $props();
</script>

<div class="content">
	{#if content}
		{@const Content = content}
		<Content />
	{/if}
</div>

<style lang="scss">
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

		:global(pre) {
			background: var(--color-code-bg);
			border-radius: var(--radius-code);
			margin: var(--spacing-sm) 0;
			overflow-x: auto;
			padding: var(--spacing-sm);
		}

		:global(code) {
			background: var(--color-code-bg);
			border-radius: var(--radius-code);
			font-size: var(--font-size-code);
			padding: var(--spacing-code-v) var(--spacing-code-h);
		}

		:global(pre code) {
			background: transparent;
			padding: 0;
		}

		:global(blockquote) {
			border-left: 4px solid var(--color-primary);
			color: var(--color-text-muted);
			margin: var(--spacing-sm) 0;
			padding-left: var(--spacing-sm);
		}
	}
</style>
