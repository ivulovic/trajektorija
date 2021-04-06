<script>
	import { stores } from "@sapper/app";
	import { onMount } from "svelte";
	import Sun from "icons/Sun.svelte";
	import Moon from "icons/Moon.svelte";
	import Share from "icons/Share.svelte";
	import Nav from "components/Nav.svelte";
	import Tag from "components/Tag.svelte";
	import posts from "./_content/posts.js";
	import categories from "./_content/categories.js";

	const { page } = stores();

	const formatDate = (ts) => {
		const d = new Date(ts);
		const addLeadingZero = (s) => `0${s}`.slice(-2);
		return `${addLeadingZero(d.getDate())}.${addLeadingZero(
			d.getMonth() + 1
		)}.${d.getFullYear()}.`;
	};

	let currentTheme = "light";

	const setLightTheme = () => {
		document.documentElement.style.setProperty("--text", "#353434");
		document.documentElement.style.setProperty("--text-secondary", "#636b6f");
		document.documentElement.style.setProperty("--shadow", "#abaaaa");
		document.documentElement.style.setProperty("--shadow-light", "#dedddd");
		document.documentElement.style.setProperty("--primary", "#19ce7e");
		document.documentElement.style.setProperty("--background", "#f5f8fa");
		document.documentElement.style.setProperty(
			"--background-dark",
			"#0000007a"
		);

		document.documentElement.style.setProperty(
			"--background-light",
			"#9c9c9c26"
		);
		currentTheme = "light";
		localStorage.setItem("theme", "light");
	};

	const setDarkTheme = () => {
		document.documentElement.style.setProperty("--text", "#ececec");
		document.documentElement.style.setProperty("--text-secondary", "#cacaca");
		document.documentElement.style.setProperty("--shadow", "#484343f0");
		document.documentElement.style.setProperty("--shadow-light", "#7f7f7f33");
		document.documentElement.style.setProperty("--primary", "#19ce7e");
		document.documentElement.style.setProperty("--background", "#040404");
		document.documentElement.style.setProperty(
			"--background-dark",
			"#0000007a"
		);
		document.documentElement.style.setProperty(
			"--background-light",
			"#222121f0"
		);
		currentTheme = "dark";
		localStorage.setItem("theme", "dark");
	};

	const toggleTheme = () => {
		const theme = localStorage.getItem("theme");
		if (theme) {
			if (theme === "light") {
				setDarkTheme();
			} else {
				setLightTheme();
			}
		} else {
			setLightTheme();
		}
	};

	onMount(async () => {
		const theme = localStorage.getItem("theme");
		if (theme === "dark") {
			setDarkTheme();
		} else {
			setLightTheme();
		}
	});

	let post;
	let category;
	let location;
	let tooltipVisible = false;
	if (typeof window !== "undefined" && typeof document !== "undefined") {
		page.subscribe(({ params, query }) => {
			const { slug } = params;
			location = window.location.href;
			const { category: cat = "" } = query;
			category = categories[cat.toUpperCase()];
			post = posts.find((x) => x.slug === slug);
		});
	}
	const copyLocationToClipboard = () => {
		tooltipVisible = true;
		var input = document.createElement("input");
		input.setAttribute("value", location);
		document.body.appendChild(input);
		input.select();
		var result = document.execCommand("copy");
		document.body.removeChild(input);

		setTimeout(() => {
			tooltipVisible = false;
		}, 1000);
	};
</script>

<style>
	:global(body) {
		background-color: var(--background);
	}
	:global(html) {
		min-height: 100%;
		position: relative;
	}
	main {
		margin: 0 auto;
		max-width: 1366px;
		box-sizing: border-box;
		margin-bottom: 36px;
		padding: 0px 6px;
	}
	footer {
		width: 100%;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		z-index: 1;
		padding: 0px;
		background: var(--background);
		margin-top: auto;
	}
	.footer-content {
		border-top: 1px solid var(--shadow-light);
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 auto;
		max-width: 1366px;
		padding: 4px 6px;
	}
	footer p,
	footer .copyright-link,
	footer button {
		font-size: 12px;
		font-weight: 500;
		color: var(--text);
		-webkit-tap-highlight-color: transparent;
	}
	footer .copyright-link,
	footer p {
		position: relative;
		text-transform: uppercase;
		text-decoration: none;
	}
	.copy {
		bottom: -6px;
		font-size: 18px;
		position: absolute;
	}
	.date {
		margin-left: 14px;
	}
	footer button {
		background-color: transparent;
		border: none;
		outline: none;
		padding: 0px 0px;
		position: relative;
		top: 1.5px;
		cursor: pointer;
	}
	.tooltip {
		position: absolute;
		bottom: 24px;
		width: 80px;
		left: -45px;
		font-size: 12px;
		text-align: center;
		border: 1px solid var(--shadow-light);
		border-bottom: none;
		padding: 5px 0px;
		/* line-height: 16px; */
		text-transform: uppercase;
		transition: opacity 0.3s ease;
		background-color: var(--background);
	}
	.tooltip.visible {
		opacity: 1;
	}
	.tooltip.invisible {
		opacity: 0;
	}
	@media (hover: hover) and (pointer: fine) {
		footer button:hover :global(svg) {
			transition: all 0.3s ease;
			fill: var(--primary);
		}
	}
	.grid-row {
		display: grid;
		grid-template-columns: auto auto;
	}
	.info {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: auto;
	}
	.info a {
		padding: 0px;
		margin-right: 5px;
		text-decoration: none;
	}
	.info a:last-child {
		margin-right: 0px;
	}
	.controls {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 5px;
		margin-left: 5px;
	}
	.ellipsis {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-right: 3px;
		width: 100%;
	}
	@media (max-width: 1040px) {
		main {
			margin: 0px 0px 36px 0px;
		}
	}
	@media (max-width: 480px) {
		main {
			margin: 0px 0px 30px 0px;
		}
		.copy {
			top: 2px;
			position: relative;
			font-size: 14px;
		}
		.date {
			margin-left: 0px;
		}
		.copyright-link {
			display: flex;
			align-items: center;
		}
		footer .copyright-link,
		footer p {
			font-size: 10px;
		}
		.tooltip {
			font-size: 10px;
		}
	}
</style>

<Nav on:themeChange={toggleTheme} />

<main>
	<slot />
</main>

<footer>
	<div class="footer-content">
		{#if post}
			<div class="grid-row">
				<p class="ellipsis">{post.title}</p>
				<p class="ellipsis">&middot; {formatDate(post.date)}</p>
			</div>
			<div class="info">
				{#each post.categories as category}
					<a rel="prefetch" href={`?category=${category.id}`}>
						<Tag title={category.label} />
					</a>
				{/each}
			</div>
		{:else if category}
			<a href="/" class="copyright-link">
				Трајекторија<span class="copy">&copy;</span><span
					class="date">{new Date().getFullYear()}</span>
			</a>
			<div class="info">
				<a rel="prefetch" href={``}>
					<Tag title={category.label} />
				</a>
			</div>
		{:else}
			<a href="/" class="copyright-link">
				Трајекторија<span class="copy">&copy;</span><span
					class="date">{new Date().getFullYear()}</span>
			</a>
		{/if}
		<div class="controls">
			<button on:click={copyLocationToClipboard}>
				{#if tooltipVisible}
					<div class="tooltip {tooltipVisible ? 'visible' : 'invisible'}">
						Линк ископиран
					</div>
				{/if}
				<Share />
			</button>
			<button on:click={toggleTheme}>
				{#if currentTheme === 'light'}
					<Moon />
				{:else}
					<Sun />
				{/if}
			</button>
		</div>
	</div>
</footer>
