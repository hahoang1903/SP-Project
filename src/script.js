import './style.css'
import Experience from './Experience/Experience.js'
import * as tf from '@tensorflow/tfjs'
import $ from 'jquery'
import { allowRecord } from './audio'

window.experience = new Experience({
	targetElement: document.querySelector('.experience')
})

// window.onload = function () {
// 	document.addEventListener('keypress', e => {
// 		if (e.key == 'r') {
// 			const topChair = window.experience.world.topChair

// 			if (topChair.rotating) {
// 				const current = Math.sin(topChair.time.elapsed * 0.0005) * 0.5
// 				topChair.update = () => {
// 					topChair.model.group.rotation.y = current
// 				}
// 				topChair.rotating = false
// 			} else {
// 				topChair.update = () => {
// 					topChair.model.group.rotation.y = Math.sin(topChair.time.elapsed * 0.0005) * 0.5
// 				}
// 				topChair.rotating = true
// 			}
// 		}
// 	})
// }

$(async () => {
	const model = await tf.loadLayersModel('/assets/model.json')
	console.log(model.summary())
	allowRecord()
})
