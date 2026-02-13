<script>
	const projects = [
		{
			title: 'Personal Website',
			description: 'A modern personal website built with SvelteKit, featuring a blog and portfolio showcase.',
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
	.projects-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 2rem;
		margin-top: 2rem;
	}
	
	.project-card {
		padding: 1.5rem;
		border: 2px solid var(--color-border);
		border-radius: 8px;
		transition: transform 0.2s, box-shadow 0.2s;
		
		&:hover {
			transform: translateY(-4px);
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		}
		
		h3 {
			margin-bottom: 1rem;
		}
		
		p {
			color: #555;
			margin-bottom: 1rem;
		}
		
		.tech-tags {
			display: flex;
			flex-wrap: wrap;
			gap: 0.5rem;
			margin-bottom: 1rem;
		}
		
		.tag {
			display: inline-block;
			padding: 0.25rem 0.75rem;
			background: #e3f2fd;
			color: #0066cc;
			border-radius: 4px;
			font-size: 0.85rem;
		}
		
		a {
			display: inline-block;
			margin-top: 0.5rem;
			font-weight: 600;
		}
	}
</style>
