<script lang="typescript">
	import Waveform from './Waveform.svelte';
	let wavesurfer;

	export let audioFileName: string;

	const audioUrlPrefix = 'https://partials-music.s3.amazonaws.com/recordings/';
	$: audioUrl = audioUrlPrefix + audioFileName;

	let isPlaying = false;

	function toggleIsPlaying() {
		wavesurfer.playPause();
		isPlaying = wavesurfer.isPlaying();
	}
</script>

<Waveform {audioUrl} bind:wavesurfer />
<button on:click={toggleIsPlaying}>
	{#if isPlaying}
		Pause
	{:else}
		Play
	{/if}
</button>
