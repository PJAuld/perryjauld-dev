<script>
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { onNavigate } from '$app/navigation';
	import './styles.scss';

	let backgroundVideoSrc = $state('');
	let { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

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
		<div class="page-content">
			{@render children()}
		</div>
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
		position: relative;
		z-index: 1;
		min-height: 100vh;
	}

	.body-content {
		background: rgba(255, 255, 255, 0.7);
		backdrop-filter: blur(20px) saturate(180%);
		-webkit-backdrop-filter: blur(20px) saturate(180%);
		border-top-left-radius: var(--corner-rounding);
		box-shadow: 
			-4px 0 20px rgba(0, 0, 0, 0.15),
			inset 0 0 0 1px rgba(255, 255, 255, 0.3);
		margin-left: 210px;
		margin-top: 20px;
		min-height: calc(100vh - 100px);
		height: 100%;
		border-left: 1px solid rgba(255, 255, 255, 0.2);

		.page-content {
			view-transition-name: main-content;
			border-top-left-radius: var(--corner-rounding);
			height: 100%;
			min-height: inherit;
		}
	}

	.home-icon {
		background: rgba(255, 255, 255, 0.65);
		backdrop-filter: blur(20px) saturate(180%);
		-webkit-backdrop-filter: blur(20px) saturate(180%);
		border-bottom: 1px solid rgba(255, 255, 255, 0.3);
		border-bottom-right-radius: var(--corner-rounding);
		box-shadow: 
			0 4px 6px rgba(0, 0, 0, 0.1),
			inset 0 0 0 1px rgba(255, 255, 255, 0.3);
		height: 90px;
		left: 0;
		position: fixed;
		top: 0;
		width: 190px;
	}

	.nav-bar {
		background: rgba(255, 255, 255, 0.65);
		backdrop-filter: blur(20px) saturate(180%);
		-webkit-backdrop-filter: blur(20px) saturate(180%);
		box-shadow: 
			2px 0 10px rgba(0, 0, 0, 0.1),
			inset 0 0 0 1px rgba(255, 255, 255, 0.3);
		border-top-right-radius: var(--corner-rounding);
		color: var(--color-text);
		height: calc(100vh - 110px);
		left: 0;
		padding: var(--spacing-md);
		position: fixed;
		top: 110px;
		width: 190px;
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
			transition: background-color 0.2s, backdrop-filter 0.2s;
			padding-left: 1.5rem;

			&:hover {
				background-color: rgba(255, 255, 255, 0.4);
				backdrop-filter: blur(10px);
				text-decoration: none;
			}
		}
	}

	.title-banner {
		background: rgba(255, 255, 255, 0.10);
		border-bottom: 1px solid rgba(255, 255, 255, 0.3);
		border-left: 1px solid rgba(255, 255, 255, 0.3);
		border-bottom-left-radius: var(--corner-rounding);
		height: 90px;
		margin-bottom: 10px;
		margin-left: 210px;
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

	@media (prefers-reduced-motion: no-preference) {
		::view-transition-old(main-content) {
			animation-name: fade-out;
			animation-duration: 0.15s;
			animation-timing-function: ease-in-out;
		}

		::view-transition-new(main-content) {
			animation-name: fade-in;
			animation-duration: 0.15s;
			animation-delay: 0.15s;
			animation-timing-function: ease-in-out;
		}

		@keyframes fade-out {
			to {
				opacity: 0;
			}
		}

		@keyframes fade-in {
			from {
				opacity: 0;
			}
		}
	}
</style>
