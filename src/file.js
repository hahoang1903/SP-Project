export function getMusics() {
	const musics = [
		'Never Gonna Give You Up - Rick Astley',
		'anya waku waku song',
		'NicotNe-hooligan',
		'Perfect - Ed Sheeran',
		'Thinking Out Loud - Ed Sheeran',
		'34_35 - Ariana Grande'
	]
	return musics.map(music => `/music/${music}.mp3`)
}

export function getRandomFile(files = []) {
	return Math.floor(Math.random() * files.length)
}
