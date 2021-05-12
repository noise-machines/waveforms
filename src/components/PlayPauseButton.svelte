<script lang="typescript">
	import PlayIcon from './icons/Play.svelte';
	import PauseIcon from './icons/Pause.svelte';

	export let playing: boolean;
</script>

<div class="icon-container">
	{#if playing}
		<PauseIcon on:click />
	{:else}
		<PlayIcon on:click />
	{/if}
</div>

<style>
	:global(.icon-container .icon) {
		width: 128px;
		height: 128px;
	}
</style>
