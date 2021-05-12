<script lang="typescript">
	import { onMount } from 'svelte';
	import player from '../stores/player';

	let container: HTMLElement;

	onMount(async () => {
		player.setContainer(container);
	});
</script>

{#if $player.state === 'loading'}
	Loading: {$player.loadingProgress}%
{:else if $player.state === 'drawing'}
	Drawing
{/if}

<div class="container" bind:this={container} />

<style>
	.container {
		display: flex;
		align-items: center;
	}

	:global(.container wave) {
		width: 100%;
	}
</style>
