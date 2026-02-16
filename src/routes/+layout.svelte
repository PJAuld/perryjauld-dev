<script>
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Perry J Auld</title>
</svelte:head>

<div class="layout-container">
	<nav class="nav-bar">
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/blog">Blog</a></li>
			<li><a href="/portfolio">Portfolio</a></li>
		</ul>
	</nav>

	<div class="title-section">
		
	</div>

	<div class="body-content">
		{@render children()}
	</div>
</div>
