<script context="module">
	export async function preload({ params }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`${params.slug}.json`);
		const data = await res.json();

		if (res.status === 200) {
			return { post: data };
		} else {
			this.error(res.status, data.message);
		}
	}
</script>

<script>
	import { fade } from "svelte/transition";
	export let post;
</script>

<style>
	.content {
		margin: 6px 0px 6px 0px;
		position: relative;
	}

	.content :global(p),
	.content :global(li) {
		line-height: 28px;
		color: var(--text);
	}

	.content :global(ul) {
		list-style-position: inside;
	}

	.content :global(strong) {
		font-weight: 500;
	}

	.content :global(p),
	.content :global(ul),
	.content :global(pre) {
		margin-bottom: 12px;
	}

	.content :global(img) {
		display: block;
	}

	.content :global(a) {
		color: var(--text);
		transition: color 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
	}

	.content :global(h2) {
		font-size: 20px;
		font-weight: 400;
		color: var(--text);
		margin: 15px 0px 10px 0px;
		font-family: "Roboto Condensed", sans-serif;
	}

	.content :global(a):hover {
		color: #19ce7e;
	}

	.content :global(img) {
		margin: 0 auto;
		max-width: 100%;
	}
	.content :global(.code),
	.content :global(pre) {
		padding: 6px 10px;
		overflow: auto;
		border-radius: 4px;
		line-height: 20px;
		background-color: var(--background-light);
		color: var(--text);
		box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
	}
	.content :global(.inline) {
		display: inline-block;
	}
	.content :global(span.code) {
		white-space: nowrap;
	}
	.content :global(.code),
	.content :global(code) :global(pre) {
		font-family: monospace;
	}

	h1 {
		font-size: 22px;
		line-height: 30px;
		font-family: "Roboto Condensed", sans-serif;
		font-weight: 500;
		margin-bottom: 12px;
	}

	@media (max-width: 1040px) {
	}
	@media (max-width: 480px) {
		h1 {
			font-size: 18px;
			line-height: 24px;
		}
		.content :global(p),
		.content :global(li) {
			font-size: 14px;
			line-height: 24px;
		}
		.content :global(h2) {
			font-size: 16px;
		}
		.content :global(p),
		.content :global(ul),
		.content :global(pre) {
			margin-bottom: 8px;
		}
	}
</style>

<svelte:head>
	<title>{post.title} | Трајекторија</title>

	<!-- Keywords-->
	<meta name="keywords" content={post.metadata.keywords} />

	<!-- Title -->
	<meta name="title" content={post.metadata.title} />
	<meta property="og:title" content={post.metadata.title} />
	<meta property="twitter:title" content={post.metadata.title} />

	<!-- Description -->
	<meta name="description" content={post.metadata.description} />
	<meta property="og:description" content={post.metadata.description} />
	<meta property="twitter:description" content={post.metadata.description} />

	<!-- Image -->

	<meta property="og:image" content={post.metadata.thumb} />
	<meta property="twitter:image" content={post.metadata.thumb} />

	<!-- Image alt -->
	<meta property="og:image:alt" content={post.metadata.thumbAlt} />
	<meta property="twitter:image:alt" content={post.metadata.thumbAlt} />

	<!-- URL -->
	<meta property="og:url" content={post.metadata.url} />

	<!-- Card-->
	<meta property="og:type" content="article" />
	<meta property="twitter:card" content="summary_large_image" />
</svelte:head>

<div in:fade={{ duration: 250 }}>
	<h1>{post.title}</h1>
	<div class="content">
		{@html post.html}
	</div>
</div>
