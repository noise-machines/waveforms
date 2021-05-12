<script lang="typescript">
	import AudioPlayer from '../../components/AudioPlayer.svelte';
	import { page } from '$app/stores';
	import { setName } from '../../stores/audioFile';

	$: setName($page.params.fileName);
</script>

<AudioPlayer />
