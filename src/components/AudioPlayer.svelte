<script lang="typescript">
	import Controls from './Controls.svelte';
	import Waveform from './Waveform.svelte';
	import LoadingBar from './LoadingBar.svelte';
</script>

<div class="row">
	<LoadingBar />
	<Controls />
	<Waveform />
</div>

<style>
	.row {
		display: flex;
		width: 100%;
	}

	:global(.row .container) {
		width: 100%;
	}
</style>
