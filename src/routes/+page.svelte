<!-- Home Page -->
<main>
	<section class="hero">
		<h1>Perry J Auld</h1>
	</section>

	<section class="about">
		<h2>Welcome</h2>
		<p>
			This is my personal website where I share my thoughts, projects, and experiments.
		</p>
	</section>

	<section class="quick-links">
		<a href="/blog" class="link-card">
			<h3>Blog</h3>
			<p>Read my latest posts and thoughts</p>
		</a>
		<a href="/portfolio" class="link-card">
			<h3>Portfolio</h3>
			<p>Explore my projects and work</p>
		</a>
	</section>
</main>

<style lang="scss">
	.hero {
		text-align: center;
		padding: var(--spacing-lg) 0;

		h1 {
			font-size: var(--font-size-hero);
		}
	}

	.about {
		margin: var(--spacing-md) 0;
	}

	.quick-links {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: var(--spacing-md);
		margin: var(--spacing-md) 0;
	}

	/* Link card with glassmorphism styling. */
	.link-card {
		padding: var(--spacing-md);
		@include glass-card;

		&:hover {
			text-decoration: none;
		}
	}
</style>
