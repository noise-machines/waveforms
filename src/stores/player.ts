import { writable, Writable, get } from 'svelte/store'
import type { AudioPlayer } from '../types'
import audioFile from './audioFile'

const player: Writable<AudioPlayer> = writable({ state: 'loading', loadingProgress: 0 })
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

	wavesurfer = WaveSurfer.create({
		container,
		scrollParent: true,
		normalize: true,
		partialRender: true,
		autoCenter: false,
		progressColor: 'hsl(42, 8%, 20%)',
		waveColor: 'hsl(45, 2%, 52%)'
	})

	wavesurfer.on('loading', (loadingProgress: number) => {
		updatePlayer({ loadingProgress })

		if (loadingProgress < 100) {
			updatePlayer({ state: 'loading' })
		} else {
			updatePlayer({ state: 'drawing' })
		}
	})

	wavesurfer.on('ready', () => {
		updatePlayer({ state: 'paused' })
	})

	wavesurfer.on('pause', () => {
		updatePlayer({ state: 'paused' })
	})

	wavesurfer.on('play', () => {
		updatePlayer({ state: 'playing' })
	})

	const $audioFile = get(audioFile)
	wavesurfer.load($audioFile.url)
}

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
