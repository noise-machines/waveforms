<script lang="typescript">
	import Controls from './Controls.svelte';
	import Waveform from './Waveform.svelte';
</script>

<div class="row">
	<Controls />
	<Waveform />
</div>

<style>
	.row {
		display: flex;
	}

	:global(.row .container) {
		width: 100%;
	}
</style>
