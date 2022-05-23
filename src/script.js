import './style.css'
import Experience from './Experience/Experience.js'
import $ from 'jquery'
import { init } from './audio'
import { preprocess } from './enableK'

window.experience = new Experience({
	targetElement: document.querySelector('.experience')
})

$(async () => {
	init()

	setTimeout(() => {
		preprocess()
	}, 1500)
})
