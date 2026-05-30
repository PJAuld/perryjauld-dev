<script>
	import { formatDate } from '$lib/utils/format';
	import MarkdownContent from './MarkdownContent.svelte';

	let {
		content = null,
		meta,
	} = $props();
</script>

<article>
	<header>
		<h1>{meta.title}</h1>
		<p class="date">{formatDate(meta.date)}</p>
	</header>

	<MarkdownContent {content} />
</article>

<style lang="scss">
	article {
		margin: 0 auto;
		max-width: 800px;

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
	}
</style>
