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
		background: rgba(255, 255, 255, 0.5);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
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
		}
		
		h3 {
			margin-bottom: 1rem;
		}
		
		p {
			color: var(--color-text);
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
			background: rgba(227, 242, 253, 0.8);
			backdrop-filter: blur(5px);
			color: #0066cc;
			border-radius: 4px;
			font-size: 0.85rem;
			border: 1px solid rgba(0, 102, 204, 0.2);
		}
		
		a {
			display: inline-block;
			margin-top: 0.5rem;
			font-weight: 600;
		}
	}
</style>
