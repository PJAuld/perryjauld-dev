<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Perry Jauld - Developer & Writer</title>
</svelte:head>

<nav class="nav">
	<ul>
		<li><a href="/">Home</a></li>
		<li><a href="/blog">Blog</a></li>
		<li><a href="/portfolio">Portfolio</a></li>
	</ul>
</nav>

{@render children()}
