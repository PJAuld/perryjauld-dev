<video
	class="background-video"
	autoplay
	muted
	loop
	playsinline
	aria-hidden="true"
	poster="/media/rocky-coast.jpeg"
>
	<source src="/media/rocky-coast.mp4" type="video/mp4" />
</video>

<div class="video-overlay" aria-hidden="true"></div>

<style lang="scss">
	.background-video {
		height: 100%;
		inset: 0;
		object-fit: cover;
		pointer-events: none;
		position: fixed;
		width: 100%;
		z-index: var(--z-index-background);

		@media (prefers-reduced-motion: reduce) {
			display: none;
		}
	}

	.video-overlay {
		background: var(--video-overlay-bg);
		inset: 0;
		pointer-events: none;
		position: fixed;
		z-index: var(--z-index-background);
	}

	@media (max-width: 768px) {
		.background-video {
			filter: blur(2px);
		}

		.video-overlay {
			background: var(--video-overlay-mobile-bg);
		}
	}
</style>
