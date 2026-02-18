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
			description: `This personal website built with SvelteKit, featuring a
					blog and portfolio showcase.`,
			tech: ['SvelteKit', 'JavaScript', 'SCSS'],
			link: 'https://github.com/PJAuld/perryjauld-dev'
		}
	];
</script>

<main>
	<h1>Portfolio</h1>
	
	<p>Here are some of my projects and work:</p>
	
	<div class="projects-grid">
		{#each projects as project}
			<article class="project-card">
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
		gap: 2rem; /* Space between cards */
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Responsive columns */
		margin-top: 2rem;
	}
	
	/* Project card with glassmorphism design. */
	.project-card {
		backdrop-filter: blur(10px); /* Frosted glass effect */
		-webkit-backdrop-filter: blur(10px); /* Safari compatibility */
		background: rgba(255, 255, 255, 0.5);
		border: 1px solid rgba(255, 255, 255, 0.4);
		border-radius: 12px;
		box-shadow: 
			0 4px 6px rgba(0, 0, 0, 0.1), /* Soft drop shadow */
			inset 0 0 0 1px rgba(255, 255, 255, 0.3); /* Inner highlight */
		padding: 1.5rem;
		transition: all 0.3s ease;
		
		/* On hover increase opacity and shadow to highlight */
		&:hover {
			background: rgba(255, 255, 255, 0.65);
			box-shadow: 
				0 8px 16px rgba(0, 0, 0, 0.15),
				inset 0 0 0 1px rgba(255, 255, 255, 0.4);
		}
		
		h3 {
			margin-bottom: 1rem; /* Space before description */
		}
		
		p {
			color: var(--color-text);
			margin-bottom: 1rem;
		}
		
		.tech-tags {
			display: flex;
			flex-wrap: wrap; /* Allow tags to wrap to next line */
			gap: 0.5rem;
			margin-bottom: 1rem;
		}
		
		.tag {
			display: inline-block; /* Allow padding while staying inline */
			padding: 0.25rem 0.75rem;
			background: rgba(227, 242, 253, 0.8);
			color: #0066cc;
			border-radius: 4px;
			font-size: 0.85rem;
			border: 1px solid rgba(0, 102, 204, 0.2);
		}
		
		a {
			display: inline-block; /* Allow margin spacing */
			margin-top: 0.5rem; /* Small space from tech tags */
			font-weight: 600; /* Semi-bold for emphasis */
		}
	}
</style>
