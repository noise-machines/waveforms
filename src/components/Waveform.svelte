<script lang="typescript">
	import { onMount } from 'svelte';
	import player from '../stores/player';

	let container: HTMLElement;

	onMount(async () => {
		player.setContainer(container);
	});
</script>

<div class="container" bind:this={container} class:loading={!$player.loaded} />

<style>
	.container {
		display: flex;
		align-items: center;
		margin-right: 16px;
	}

	:global(.container wave) {
		width: 100%;
	}

	.loading {
		display: none;
	}
</style>
