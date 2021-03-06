import Experience from './Experience.js'
import * as THREE from 'three'
import { getMusics, getRandomFile } from '../file.js'

export default class GoogleLeds {
	constructor() {
		this.experience = new Experience()
		this.resources = this.experience.resources
		this.debug = this.experience.debug
		this.scene = this.experience.scene
		this.time = this.experience.time

		// Debug
		if (this.debug) {
			this.debugFolder = this.debug.addFolder({
				title: 'googleLeds',
				expanded: false
			})
		}

		this.songs = getMusics()
		this.currentSong = null
		this.currentSongIndex = -1

		this.setModel()
	}

	setModel() {
		this.model = {}

		this.model.items = []

		const colors = ['#196aff', '#ff0000', '#ff5d00', '#7db81b']

		// Texture
		this.model.texture = this.resources.items.googleHomeLedMaskTexture

		// Children
		const children = [...this.resources.items.googleHomeLedsModel.scene.children]
		children.sort((_a, _b) => {
			if (_a.name < _b.name) return -1

			if (_a.name > _b.name) return 1

			return 0
		})

		let i = 0
		for (const _child of children) {
			const item = {}

			item.index = i

			item.color = colors[item.index]

			item.material = new THREE.MeshBasicMaterial({
				color: item.color,
				transparent: true,
				alphaMap: this.model.texture
			})

			item.mesh = _child
			item.mesh.material = item.material
			this.scene.add(item.mesh)

			this.model.items.push(item)

			// Debug
			if (this.debug) {
				this.debugFolder.addInput(item, 'color', { view: 'color' }).on('change', () => {
					item.material.color.set(item.color)
				})
			}

			i++
		}
	}

	update() {
		for (const _item of this.model.items) {
			_item.material.opacity = Math.sin(this.time.elapsed * 0.002 - _item.index * 0.5) * 0.5 + 0.5
		}
	}

	playSong(switchSong = false) {
		if (switchSong && !this.currentSong) return

		if (!switchSong && this.currentSong) return

		this.stopSong()
		this.currentSongIndex =
			this.currentSongIndex == -1 || this.currentSongIndex >= this.songs.length - 1
				? getRandomFile(this.songs)
				: this.currentSongIndex + 1
		this.currentSong = new Audio(this.songs[this.currentSongIndex])
		this.currentSong.volume = 0.15
		this.currentSong.play()
	}

	stopSong() {
		if (!this.currentSong) return
		this.currentSong.pause()
		this.currentSong = null
	}
}
