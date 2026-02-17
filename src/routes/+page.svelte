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
			font-size: 4rem;
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

	.link-card {
		padding: var(--spacing-md);
		background: rgba(255, 255, 255, 0.5);
		// backdrop-filter: blur(10px);
		// -webkit-backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.4);
		border-radius: 12px;
		box-shadow: 
			0 4px 6px rgba(0, 0, 0, 0.1),
			inset 0 0 0 1px rgba(255, 255, 255, 0.3);
		transition: all 0.3s ease;

		&:hover {
			transform: translateY(-4px);
			box-shadow: 
				0 8px 16px rgba(0, 0, 0, 0.15),
				inset 0 0 0 1px rgba(255, 255, 255, 0.4);
			background: rgba(255, 255, 255, 0.6);
			border-color: rgba(255, 255, 255, 0.5);
			text-decoration: none;
		}
	}
</style>
