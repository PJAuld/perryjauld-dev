<script>
	import FontSizeToggle from '$lib/components/font_size_toggle.svelte';
	import ThemeToggle from '$lib/components/theme_toggle.svelte';

	let {
		currentTheme = 'light',
		onToggle = () => {},
		currentFontSize = 'normal',
		onFontSizeToggle = () => {},
		variant = 'desktop',
	} = $props();
</script>

<div class="reader-controls" data-variant={variant}>
	<FontSizeToggle {currentFontSize} onToggle={onFontSizeToggle} />
	<ThemeToggle {currentTheme} {onToggle} />
</div>

<style lang="scss">
	.reader-controls {
		align-items: center;
		display: flex;
		gap: 8px;
	}

	.reader-controls[data-variant="mobile"] {
		justify-content: flex-end;
	}
</style>
