import './style.css'
import Experience from './Experience/Experience.js'
import $ from 'jquery'
import * as THREE from 'three'
import { init } from './audio'
import { getMusics } from './file'

window.experience = new Experience({
	targetElement: document.querySelector('.experience')
})

$(async () => {
	init()
})
