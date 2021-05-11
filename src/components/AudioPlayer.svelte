<script lang="typescript">
	import Waveform from './Waveform.svelte';
	let wavesurfer;

	export let audioFileName: string;

	const audioUrlPrefix = 'https://partials-music.s3.amazonaws.com/recordings/';
	// Currently if our embed URL ends with ".mp3" Notion tries to embed it
	// as an audio file. Which we don't want. We want it to be embedded as a
	// web page. So we work around this by assuming that it's an mp3 file.
	//
	// We'll probably have to do something smarter when we want to work with
	// non-mp3 files, but this is good enough for now.
	$: audioUrl = audioUrlPrefix + audioFileName + '.mp3';

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
