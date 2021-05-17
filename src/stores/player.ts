import { writable, Writable, get } from 'svelte/store'
import { AudioPlayer } from '../types'
import audioFile from './audioFile'
import { mid, dark } from '../colors'
import { hasSavedAudio, saveAudioBuffer } from '../storage'

const player: Writable<AudioPlayer> = writable({
	state: 'loading',
	loadingProgress: 0,
	loaded: false
})

let wavesurfer

function updatePlayer (updates: Partial<AudioPlayer>) {
	player.update($player => {
		return {
			...$player,
			...updates
		}
	})
}

async function setContainer (container: HTMLElement): Promise<void> {
	const waveSurferImport = await import('wavesurfer.js')
	const WaveSurfer = waveSurferImport.default

	const playheadImport = await import('wavesurfer.js/dist/plugin/wavesurfer.playhead')
	const playhead = playheadImport.default

	wavesurfer = WaveSurfer.create({
		container,
		scrollParent: true,
		normalize: true,
		partialRender: true,
		autoCenter: false,
		progressColor: dark,
		waveColor: mid,
		plugins: [
			playhead.create({
				returnOnPause: true,
				moveOnSeek: true,
				draw: false
			})
		]
	})

	wavesurfer.on('loading', (loadingProgress: number) => {
		updatePlayer({ loadingProgress })

		if (loadingProgress < 100) {
			updatePlayer({ state: 'loading' })
		} else {
			updatePlayer({ state: 'drawing' })
		}
	})

	wavesurfer.on('ready', async () => {
		const alreadySaved = await hasSavedAudio()

		if (!alreadySaved) {
			await saveAudioBuffer(wavesurfer.backend.buffer)
		}

		updatePlayer({ state: 'paused', loaded: true })
	})

	wavesurfer.on('pause', () => {
		updatePlayer({ state: 'paused' })
	})

	wavesurfer.on('play', () => {
		updatePlayer({ state: 'playing' })
	})

	loadAudioFileUrl()
}

function loadAudioFileUrl () {
	const $audioFile = get(audioFile)
	if (wavesurfer && $audioFile.url) {
		wavesurfer.load($audioFile.url)
	}
}

audioFile.subscribe(loadAudioFileUrl)

function togglePlaying (): void {
	if (wavesurfer) {
		wavesurfer.playPause()
	}
}

export default {
	subscribe: player.subscribe,
	togglePlaying,
	setContainer
}
