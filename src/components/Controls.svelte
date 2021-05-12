<script lang="typescript">
	import PlayIcon from './icons/Play.svelte';
	import PauseIcon from './icons/Pause.svelte';
	import player from '../stores/player';
</script>

{#if $player.loaded}
	<div class="icon-container">
		{#if $player.state === 'playing'}
			<PauseIcon on:click={player.togglePlaying} />
		{:else}
			<PlayIcon on:click={player.togglePlaying} />
		{/if}
	</div>
{/if}

<style>
	:global(.icon-container .icon) {
		width: 128px;
		height: 128px;
	}
</style>
