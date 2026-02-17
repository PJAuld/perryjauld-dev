<script>
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
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

<div class="video-overlay" aria-hidden="true"></div>

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
		{#key $page.url.pathname}
			<div in:fade={{ duration: 250 }} >
				{@render children()}
			</div>
		{/key}
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

	.video-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.15);
		z-index: 0;
		pointer-events: none;
	}

	.layout-container {
		animation: fadeIn 0.5s ease-out;
		position: relative;
		z-index: 1;
		min-height: 100vh;
	}

	.body-content {
		background: rgba(255, 255, 255, 0.7);
		backdrop-filter: blur(20px) saturate(180%);
		-webkit-backdrop-filter: blur(20px) saturate(180%);
		box-shadow: 
			-4px 0 20px rgba(0, 0, 0, 0.15),
			inset 0 0 0 1px rgba(255, 255, 255, 0.3);
		margin-left: 200px;
		min-height: calc(100vh - 100px);
		height: 100%;
		animation: fadeIn 0.6s ease-out;
		border-left: 1px solid rgba(255, 255, 255, 0.2);
	}

	.home-icon {
		background: rgba(255, 255, 255, 0.65);
		backdrop-filter: blur(20px) saturate(180%);
		-webkit-backdrop-filter: blur(20px) saturate(180%);
		border-bottom: 1px solid rgba(255, 255, 255, 0.3);
		box-shadow: 
			0 4px 6px rgba(0, 0, 0, 0.1),
			inset 0 0 0 1px rgba(255, 255, 255, 0.3);
		height: 100px;
		left: 0;
		position: fixed;
		top: 0;
		width: 200px;
	}

	.nav-bar {
		background: rgba(255, 255, 255, 0.65);
		backdrop-filter: blur(20px) saturate(180%);
		-webkit-backdrop-filter: blur(20px) saturate(180%);
		box-shadow: 
			2px 0 10px rgba(0, 0, 0, 0.1),
			inset 0 0 0 1px rgba(255, 255, 255, 0.3);
		color: var(--color-text);
		height: calc(100vh - 100px);
		left: 0;
		padding: var(--spacing-md);
		position: fixed;
		top: 100px;
		width: 200px;
		border-right: 1px solid rgba(255, 255, 255, 0.2);

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
			transition: all 0.2s;
			padding-left: 1.5rem;

			&:hover {
				background-color: rgba(255, 255, 255, 0.4);
				backdrop-filter: blur(10px);
				text-decoration: none;
			}
		}
	}

	.title-banner {
		border-bottom: 1px solid rgba(255, 255, 255, 0.3);
		height: 100px;
		background: rgba(255, 255, 255, 0.05);
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			// transform: translateY(10px);
		}
		to {
			opacity: 1;
			// transform: translateY(0);
		}
	}

	@media (max-width: 768px) {
		.background-video, .video-overlay {
			display: none;
		}
		
		.body-content, .nav-bar, .home-icon {
			backdrop-filter: none;
			-webkit-backdrop-filter: none;
			background: rgba(255, 255, 255, 0.95);
		}
		
		.body-content {
			margin-left: 0;
			padding-top: 100px;
		}

		.home-icon {
			display: none;
		}
		
		.nav-bar {
			width: 100%;
			height: 100px;
			position: fixed;
			top: 0;
			
			ul {
				flex-direction: row;
				justify-content: center;
			}
		}
	}
</style>
