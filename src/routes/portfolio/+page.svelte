<!-- Portfolio Page Component -->
<script>
	/**
	 * Array of portfolio projects.
	 * Each project object should contain:
	 * - title: Project name
	 * - description: Brief explanation of the project
	 * - tech: Array of technologies/frameworks used
	 * - link: Optional URL to view the project or source code
	 * @type {Array<{title: string, description: string, tech: string[], link?: string}>}
	 */
	const projects = [
		{
			title: 'Personal Website',
			description: `This site built with SvelteKit, featuring a
					blog and portfolio showcase.`,
			tech: ['SvelteKit', 'JavaScript', 'SCSS'],
			link: 'https://github.com/PJAuld/perryjauld-dev'
		}
	];
</script>

<main>
	<h1>Portfolio</h1>
	
	<p>Here are some of my projects, work, and experiments:</p>
	
	<div class="projects-grid">
		{#each projects as project}
			<article class="project-card glass-card">
				<h3>{project.title}</h3>
				<p>{project.description}</p>
				<div class="tech-tags">
					{#each project.tech as tech}
						<span class="tag">{tech}</span>
					{/each}
				</div>
				{#if project.link}
					<a href={project.link} target="_blank" rel="noopener noreferrer">View Project →</a>
				{/if}
			</article>
		{/each}
	</div>
</main>

<style lang="scss">
	/**
	 * Projects grid container - responsive grid layout for project cards.
	 * Automatically adjusts number of columns based on available space.
	 */
	.projects-grid {
		display: grid;
		gap: var(--spacing-md); /* Space between cards */
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Responsive columns */
		margin-top: var(--spacing-md);
	}
	
	/* Project card with glassmorphism design. */
	.project-card {
		padding: var(--spacing-card);
		
		h3 {
			margin-bottom: var(--spacing-sm); /* Space before description */
		}
		
		p {
			color: var(--color-text);
			margin-bottom: var(--spacing-sm);
		}
		
		.tech-tags {
			display: flex;
			flex-wrap: wrap; /* Allow tags to wrap to next line */
			gap: var(--spacing-xs);
			margin-bottom: var(--spacing-sm);
		}
		
		.tag {
			display: inline-block; /* Allow padding while staying inline */
			padding: var(--spacing-tag-v) var(--spacing-tag-h);
			background: var(--color-tag-bg);
			color: var(--color-tag-text);
			border-radius: var(--radius-tag);
			font-size: var(--font-size-tag);
			border: 1px solid var(--color-tag-border);
		}
		
		a {
			display: inline-block; /* Allow margin spacing */
			margin-top: var(--spacing-xs); /* Small space from tech tags */
			font-weight: 600; /* Semi-bold for emphasis */
		}
	}
</style>
