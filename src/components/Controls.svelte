<script lang="typescript">
	import PlayPauseButton from './PlayPauseButton.svelte';
	import player from '../stores/player';
</script>

<div class="row">
	{#if $player.state === 'paused' || $player.state === 'playing'}
		<PlayPauseButton playing={$player.state === 'playing'} on:click={player.togglePlaying} />
	{/if}
</div>

<style>
	.row {
		display: flex;
	}
</style>
