<script context="module">
	export function preload(page) {
		const { category = "" } = page.query;
		const categoryFilter = (post) =>
			post.categories.find((x) => x.id === category.toLowerCase());

		return this.fetch(`index.json`)
			.then((r) => r.json())
			.then((posts) => {
				let bars = {};
				let max = 0;
				posts.forEach(({ categories }) => {
					categories.forEach(({ id, label }) => {
						const currentBarCount = bars[id] ? bars[id].count + 1 : 1;
						if (currentBarCount > max) {
							max = currentBarCount;
						}
						bars = {
							...bars,
							[id]: { id, label, count: currentBarCount },
						};
					});
				});
				let barsToReturn = {};
				Object.values(bars).map((bar) => {
					barsToReturn[bar.id] = {
						...bar,
						percentage: (bar.count / max) * 100,
					};
				});

				return {
					posts: category ? posts.filter(categoryFilter) : posts,
					query: page.query,
					bars: Object.values(barsToReturn),
				};
			});
	}
</script>

<script>
	import Article from "components/Article.svelte";
	import BarChart from "components/BarChart.svelte";

	export let posts;
	export let query;
	export let bars;
</script>

<style>
	.articles-list {
		display: grid;
		grid-template-columns: 1fr;
		grid-row-gap: 12px;
		margin-top: 12px;
	}
	.articles-list > :global(a):not(:last-child) {
		padding-bottom: 12px;
		border-bottom: 1px solid var(--shadow-light);
	}
	.no-content {
		font-size: 22px;
		line-height: 30px;
		font-family: "Roboto Condensed", sans-serif;
		font-weight: 400;
	}

	/* Tablet */
	@media (max-width: 1040px) {
		.no-content {
			font-size: 20px;
			line-height: 24px;
		}
		.articles-list > :global(a):not(:last-child) {
			padding-bottom: 12px;
		}
	}
	/* Mobile */
	@media (max-width: 480px) {
		.articles-list > :global(a):not(:last-child) {
			padding-bottom: 6px;
		}
		.articles-list {
			grid-row-gap: 6px;
		}
		.no-content {
			font-size: 18px;
			line-height: 24px;
		}
	}
</style>

{#if bars.length}
	<BarChart categories={bars} category={query.category} />
{/if}

<div class="articles-list">
	{#if query.category}
		{#if !posts.length}
			<h2 class="no-content">
				Категорија коју сте затражили још увек не садржи никакаве записе.
				Покушајте одабиром једне од понуђених изнад.
			</h2>
		{/if}
	{:else if !posts.length}
		<h2 class="no-content">Тренутно не постоји ниједан запис.</h2>
	{/if}

	{#each posts as article}
		<Article {...article} category={query.category} />
	{/each}
</div>
