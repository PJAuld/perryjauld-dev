<!-- Individual Blog Post Page Component -->
<script>
	import { getPostNavContext } from '$lib/blog/navigation.js';
	import PostArticle from '$lib/components/blog/PostArticle.svelte';
	import PostNavigation from '$lib/components/blog/PostNavigation.svelte';

	let { data } = $props();

	const navContext = $derived.by(() =>
		data.allPosts ? getPostNavContext(data.allPosts, data.slug) : null
	);
</script>

<svelte:head>
	<title>{data.meta.title} - Perry J Auld</title>
</svelte:head>

<main>
	<PostArticle content={data.content} meta={data.meta} />
	<PostNavigation {navContext} />
</main>
