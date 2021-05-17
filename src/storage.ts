import { audioBufferToWavBlob } from './audio'

let cachedLocalForage
async function importLocalForage (): Promise<LocalForage> {
	if (!cachedLocalForage) {
		cachedLocalForage = await import('localforage')
	}

	return cachedLocalForage
}

export async function saveAudioBuffer (buffer: AudioBuffer): Promise<void> {
	const blob = audioBufferToWavBlob(buffer)

	const localForage = await importLocalForage()
	await localForage.setItem('audioFile', blob)
}

export async function getSavedAudioUrl (): Promise<string | null> {
	const localForage = await importLocalForage()
	const blob = await localForage.getItem('audioFile')

	if (blob == null) {
		return null
	}

	const url = window.URL.createObjectURL(blob)
	return url
}

export async function hasSavedAudio (): Promise<boolean> {
	const localForage = await importLocalForage()
	const blob = await localForage.getItem('audioFile')
	return blob != null
}
