import { writable, Writable } from 'svelte/store'
import { AudioFile } from '../types'

const audioUrlPrefix = 'https://partials-music.s3.amazonaws.com/recordings/'

const audioFile: Writable<AudioFile> = writable({
	name: 'Loading',
	url: ''
})

export function setName (name: string): void {
	// Currently if our embed URL ends with ".mp3" Notion tries to embed it
	// as an audio file. Which we don't want. We want it to be embedded as a
	// web page. So we work around this by assuming that it's an mp3 file.
	//
	// We'll probably have to do something smarter when we want to work with
	// non-mp3 files, but this is good enough for now.
	const url = audioUrlPrefix + name + '.mp3'

	audioFile.update($audioFile => {
		return {
			...$audioFile,
			name,
			url
		}
	})
}

export default audioFile
