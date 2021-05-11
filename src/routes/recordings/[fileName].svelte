<script lang="typescript">
	import { page } from '$app/stores';
	import AudioPlayer from '../../components/AudioPlayer.svelte';

	$: console.debug($page.params.fileName);
</script>

<AudioPlayer audioFileName={$page.params.fileName} />
