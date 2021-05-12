<script lang="typescript">
	import player from '../stores/player';
</script>

{#if !$player.loaded}
	<div class="loading">
		{#if $player.state === 'loading'}
			{'Loading ' + $player.loadingProgress + '%'}
		{:else if $player.state === 'drawing'}
			Drawing
		{/if}
	</div>
{/if}

<style>
	.loading {
		font-size: 128px;
		text-transform: uppercase;
	}
</style>
