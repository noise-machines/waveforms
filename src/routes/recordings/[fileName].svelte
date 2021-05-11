<script lang="typescript">
	import { page } from '$app/stores';
	import AudioPlayer from '../../components/AudioPlayer.svelte';
</script>

<AudioPlayer audioFileName={$page.params.fileName} />
