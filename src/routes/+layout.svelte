<script>
	import favicon from '#lib/assets/favicon.svg';

	/** @type {{children: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<style>
	:root {
		color-scheme: dark;
		font-family: sans-serif;
	}
</style>

{@render children()}
