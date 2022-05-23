export function getMusics() {
	const files = ['/music/Never Gonna Give You Up - Rick Astley.mp3']
	return files
}

export function getRandomFile(files = []) {
	return Math.floor(Math.random() * files.length)
}
