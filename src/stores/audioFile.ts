import { AudioFile } from '../types'
import { writable, Writable } from 'svelte/store'
import { getSavedAudioUrl } from '../storage'

const audioUrlPrefix = 'https://partials-music.s3.amazonaws.com/recordings/'

const audioFile: Writable<AudioFile> = writable({
	name: 'Loading',
	url: ''
})

export async function setName (name: string): Promise<void> {
	const savedUrl = await getSavedAudioUrl()
	// Currently if our embed URL ends with ".mp3" Notion tries to embed it
	// as an audio file. Which we don't want. We want it to be embedded as a
	// web page. So we work around this by assuming that it's an mp3 file.
	//
	// We'll probably have to do something smarter when we want to work with
	// non-mp3 files, but this is good enough for now.
	const nonSavedUrl = audioUrlPrefix + name + '.mp3'

	const url = savedUrl ? savedUrl : nonSavedUrl

	audioFile.update($audioFile => {
		return {
			...$audioFile,
			name,
			url
		}
	})
}

export default audioFile
