<script>
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import './styles.scss';

	let backgroundVideoSrc = $state('');
	let { children } = $props();

	onMount(() => {
		const rootStyles = getComputedStyle(document.documentElement);
		const rawSrc = rootStyles.getPropertyValue('--background-video').trim();
		const match = rawSrc.match(/^url\(['"]?(.+?)['"]?\)$/);
		backgroundVideoSrc = match ? match[1] : rawSrc;
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Perry J Auld</title>
</svelte:head>

<video
	class="background-video"
	autoplay
	muted
	loop
	playsinline
	aria-hidden="true"
	poster="/media/background-image.jpeg"
>
	{#if backgroundVideoSrc}
		<source src={backgroundVideoSrc} type="video/mp4" />
	{/if}
</video>

<div class="layout-container">
	<div class="home-icon"></div>

	<nav class="nav-bar">
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/blog">Blog</a></li>
			<li><a href="/portfolio">Portfolio</a></li>
		</ul>
	</nav>

	<div class="title-banner"></div>

	<div class="body-content">
		{@render children()}
	</div>
</div>

<style lang="scss">
	.background-video {
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		pointer-events: none;
		z-index: 0;
		
		@media (prefers-reduced-motion: reduce) {
			display: none;
		}
	}

	.layout-container {
		position: relative;
		z-index: 1;
		min-height: 100vh;
	}

	.body-content {
		background: var(--color-bg);
		backdrop-filter: blur(8px) saturate(120%);
		-webkit-backdrop-filter: blur(8px) saturate(120%);
		box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
		margin-left: 200px;
		min-height: calc(100vh - 100px);
		height: 100%;
		animation: fadeIn 0.6s ease-out;
	}

	.home-icon {
		background: var(--color-bg-secondary);
		backdrop-filter: blur(10px) saturate(120%);
		-webkit-backdrop-filter: blur(10px) saturate(120%);
		border-bottom: 1px solid var(--color-border);
		height: 100px;
		left: 0;
		position: fixed;
		top: 0;
		width: 200px;
	}

	.nav-bar {
		background: var(--color-bg-secondary);
		backdrop-filter: blur(10px) saturate(120%);
		-webkit-backdrop-filter: blur(10px) saturate(120%);
		box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
		color: var(--color-text);
		height: calc(100vh - 100px);
		left: 0;
		padding: var(--spacing-md);
		position: fixed;
		top: 100px;
		width: 200px;

		ul {
			list-style: none;
			display: flex;
			flex-direction: column;
			gap: var(--spacing-sm);
		}

		a {
			color: var(--color-text);
			display: block;
			padding: var(--spacing-xs);
			border-radius: 4px;
			transition: background-color 0.2s;
			padding-left: 1.5rem;

			&:hover {
				background-color: rgba(255, 255, 255, 0.1);
				text-decoration: none;
			}
		}
	}

	.title-banner {
		border-bottom: 1px solid var(--color-border);
		height: 100px;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (max-width: 768px) {
		.background-video {
			display: none;
		}
		
		.body-content, .nav-bar, .home-icon {
			backdrop-filter: none;
			-webkit-backdrop-filter: none;
		}
		
		.body-content {
			margin-left: 0;
			padding-top: 100px;
		}
		
		.nav-bar {
			width: 100%;
			height: auto;
			position: relative;
			top: 0;
			
			ul {
				flex-direction: row;
				justify-content: center;
			}
		}
	}
</style>
