export type PlayerState = 'loading' | 'drawing' | 'paused' | 'playing'

export interface AudioFile {
	name: string
	url: string
}

export interface AudioPlayer {
	state: PlayerState
	loadingProgress: number
	loaded: boolean
}
