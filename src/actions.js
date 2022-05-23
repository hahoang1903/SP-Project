import { getMusics, getRandomFile } from './file'

export function doWorkOnPrediction(predictLabel, currentPlayingMusic) {
	const { topChair, elgatoLight, baked, macScreen, pcScreen, bouncingLogo, googleLeds } =
		window.experience.world

	switch (predictLabel) {
		case 0:
			return topChair.rotateLeft()
		case 1:
			return topChair.rotateRight()
		case 2:
		case 3:
		case 7:
			baked.changeBaked('on')
			elgatoLight.changeLight('on')
			return
		case 4:
		case 5:
		case 6:
			baked.changeBaked('off')
			elgatoLight.changeLight('off')
			return
		case 8:
		case 9:
		case 11:
			return googleLeds.playSong()
		case 10:
			return googleLeds.stopSong()
		case 12:
			return pcScreen.changeScreen('on')
		case 13:
			return pcScreen.changeScreen('off')
		case 14:
			return macScreen.changeScreen('on')
		case 15:
			return macScreen.changeScreen('off')
		case 16:
			return bouncingLogo.turnOn()
		case 17:
			return bouncingLogo.turnOff()
		default:
			return
	}
}
