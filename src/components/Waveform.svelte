<script lang="typescript">
	import { onMount } from 'svelte';

	export let wavesurfer;
	export let audioUrl: string;

	let WaveSurfer;
	let container: HTMLElement;

	let loadingProgress = 0;
	$: isLoaded = loadingProgress >= 100;
	let state: 'loading' | 'drawing' | 'ready';

	onMount(async () => {
		console.log(audioUrl);
		const waveSurferImport = await import('wavesurfer.js');
		WaveSurfer = waveSurferImport.default;

		wavesurfer = WaveSurfer.create({
			container,
			scrollParent: true
		});

		wavesurfer.on('loading', (currentProgress) => {
			loadingProgress = currentProgress;

			if (loadingProgress < 100) {
				state = 'loading';
			} else {
				state = 'drawing';
			}
		});

		wavesurfer.on('ready', () => {
			state = 'ready';
		});

		wavesurfer.load(audioUrl);
	});
</script>

{#if state === 'loading'}
	Loading: {loadingProgress}%
{:else if state === 'drawing'}
	Drawing
{/if}

<div class="container" bind:this={container} />
