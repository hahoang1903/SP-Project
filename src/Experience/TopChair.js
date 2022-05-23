import * as THREE from 'three'

import Experience from './Experience.js'

export default class TopChair {
	constructor() {
		this.experience = new Experience()
		this.resources = this.experience.resources
		this.debug = this.experience.debug
		this.scene = this.experience.scene
		this.world = this.experience.world
		this.time = this.experience.time

		this.rotatingLeft = false
		this.leftThreshold = 0

		this.rotatingRight = false
		this.rightThreshold = -3.15

		this.rotateSpeed = 0.02

		this.setModel()
	}

	setModel() {
		this.model = {}

		this.model.group = this.resources.items.topChairModel.scene.children[0]
		this.scene.add(this.model.group)

		this.model.group.traverse(_child => {
			if (_child instanceof THREE.Mesh) {
				_child.material = this.world.baked.model.material
			}
		})

		this.model.group.rotation.y = -1.5
	}

	rotateLeft() {
		this.rotatingRight = false
		this.rotatingLeft = true
	}

	rotateRight() {
		this.rotatingLeft = false
		this.rotatingRight = true
	}

	update() {
		if (this.rotatingLeft && this.model.group.rotation.y <= this.leftThreshold) {
			this.model.group.rotation.y += this.rotateSpeed

			if (this.model.group.rotation.y == this.leftThreshold) {
				this.rotatingLeft = false
			}
		}

		if (this.rotatingRight && this.model.group.rotation.y >= this.rightThreshold) {
			this.model.group.rotation.y -= this.rotateSpeed

			if (this.model.group.rotation.y == this.rightThreshold) {
				this.rotatingRight = false
			}
		}
	}
}
