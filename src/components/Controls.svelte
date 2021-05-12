<script lang="typescript">
	import PlayIcon from './icons/Play.svelte';
	import PauseIcon from './icons/Pause.svelte';
	import player from '../stores/player';
</script>

{#if $player.loaded}
	<div class="iconContainer">
		{#if $player.state === 'playing'}
			<PauseIcon on:click={player.togglePlaying} />
		{:else}
			<PlayIcon on:click={player.togglePlaying} />
		{/if}
	</div>
{/if}

<style>
	.iconContainer {
		display: flex;
		align-items: center;
		margin-right: 16px;
	}

	:global(.iconContainer .icon) {
		width: 64px;
		height: 64px;
	}
</style>
