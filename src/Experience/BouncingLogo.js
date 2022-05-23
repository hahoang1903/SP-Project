import * as THREE from 'three'

import Experience from './Experience.js'

export default class BouncingLogo {
	constructor() {
		this.experience = new Experience()
		this.resources = this.experience.resources
		this.debug = this.experience.debug
		this.scene = this.experience.scene
		this.world = this.experience.world
		this.time = this.experience.time

		this.turningOn = false
		this.turnedOn = false
		this.turnOnTimePassed = 0
		this.setModel()
	}

	setModel() {
		this.model = {}

		this.model.group = new THREE.Group()
		this.model.group.position.x = 4.2
		this.model.group.position.y = 2.71
		this.model.group.position.z = 1.8
		this.scene.add(this.model.group)

		this.model.geometry = new THREE.PlaneGeometry(4, 1, 1, 1)
		this.model.geometry.rotateY(-Math.PI * 0.5)

		this.model.mesh = new THREE.Mesh(this.model.geometry, this.model.material)
		this.model.mesh.scale.y = 0
		this.model.mesh.scale.z = 0
		this.model.group.add(this.model.mesh)
	}

	turnOn() {
		if (this.turnedOn || this.turningOn) return
		this.model.group.remove(this.model.mesh)

		this.model.group.position.x = 4.2
		this.model.group.position.y = 2.717
		this.model.group.position.z = 1.63

		this.model.texture = this.resources.items.threejsJourneyLogoTexture
		this.model.texture.encoding = THREE.sRGBEncoding

		this.model.material = new THREE.MeshBasicMaterial({
			transparent: true,
			premultipliedAlpha: true,
			map: this.model.texture
		})

		this.model.mesh = new THREE.Mesh(this.model.geometry, this.model.material)
		this.model.mesh.scale.y = 0.359
		this.model.mesh.scale.z = 0.424
		this.model.group.add(this.model.mesh)

		this.audio = new Audio('/music/Never Gonna Give You Up - Rick Astley.mp3')

		this.model.element = document.createElement('video')
		this.model.element.muted = true
		this.model.element.loop = true
		this.model.element.controls = true
		this.model.element.playsInline = true
		this.model.element.src = '/assets/videoRickRoll.mp4'

		this.turningOn = true
		this.turnOnTimePassed = 0
	}

	turnOff() {
		if (!this.turnedOn) return

		this.model.group.remove(this.model.mesh)
		this.model.mesh.scale.y = 0
		this.model.mesh.scale.z = 0
		this.model.group.add(this.model.mesh)

		this.audio.pause()

		this.turnedOn = false
		this.turningdOn = false
	}

	update() {
		if (this.turningOn) {
			this.turnOnTimePassed += this.time.delta

			if (this.turnOnTimePassed >= 800) {
				this.model.group.remove(this.model.mesh)

				this.model.group.position.x = 4.2
				this.model.group.position.y = 2.71
				this.model.group.position.z = 1.8

				// Texture
				this.model.texture = new THREE.VideoTexture(this.model.element)
				this.model.texture.encoding = THREE.sRGBEncoding

				// Material
				this.model.material = new THREE.MeshBasicMaterial({
					map: this.model.texture
				})

				this.model.mesh = new THREE.Mesh(this.model.geometry, this.model.material)
				this.model.mesh.scale.y = 2.35
				this.model.mesh.scale.z = 1.062
				this.model.group.add(this.model.mesh)

				this.audio.play()

				// có thể điều chỉnh để thời gian nhạc khớp với thời gian video
				if (this.turnOnTimePassed >= 1600) {
					this.model.element.play()
					this.turningOn = false
					this.turnedOn = true
				}
			}
		}
	}
}
