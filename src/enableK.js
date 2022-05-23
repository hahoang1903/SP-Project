import $ from 'jquery'

export const preprocess = () => {
	window.keyC = true
	const { topChair, elgatoLight, baked, macScreen, pcScreen, bouncingLogo, googleLeds } =
		window.experience.world

	$(document).on('keypress', e => {
		switch (e.originalEvent.key) {
			case '1':
				return topChair.rotateLeft()
			case '2':
				return topChair.rotateRight()
			case '3':
				baked.changeBaked('on')
				elgatoLight.changeLight('on')
				return
			case '4':
				baked.changeBaked('off')
				elgatoLight.changeLight('off')
				return
			case '5':
				return googleLeds.playSong()
			case '6':
				return googleLeds.stopSong()
			case '7':
				return pcScreen.changeScreen('on')
			case '8':
				return pcScreen.changeScreen('off')
			case '9':
				return macScreen.changeScreen('on')
			case '0':
				return macScreen.changeScreen('off')
			case '-':
				return bouncingLogo.turnOn()
			case '=':
				return bouncingLogo.turnOff()
			default:
				return
		}
	})
}
