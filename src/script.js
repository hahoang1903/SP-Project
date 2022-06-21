import './style.css'
import Experience from './Experience/Experience.js'
import $ from 'jquery'
import { init } from './audio'

window.experience = new Experience({
	targetElement: document.querySelector('.experience')
})

$(async () => {
	init()
})
