export function doWorkOnPrediction(predictLabel) {
	const { topChair, elgatoLight, baked, macScreen, pcScreen, bouncingLogo, googleLeds } =
		window.experience.world

	switch (predictLabel) {
		case 'xoay ghế trái':
			return topChair.rotateLeft()
		case 'xoay ghế phải':
			return topChair.rotateRight()
		case 'bật đèn':
		case 'tối quá':
		case 'bật đèn lên':
			baked.changeBaked('on')
			elgatoLight.changeLight('on')
			return
		case 'tắt đèn':
		case 'sáng quá':
		case 'tắt đèn đi':
			baked.changeBaked('off')
			elgatoLight.changeLight('off')
			return
		case 'chuyển nhạc':
			return googleLeds.playSong(true)
		case 'bật nhạc':
		case 'bật nhạc lên':
			return googleLeds.playSong()
		case 'dừng nhạc':
			return googleLeds.stopSong()
		case 'bật màn hình':
			return pcScreen.changeScreen('on')
		case 'tắt màn hình':
			return pcScreen.changeScreen('off')
		case 'bật laptop':
			return macScreen.changeScreen('on')
		case 'tắt laptop':
			return macScreen.changeScreen('off')
		case 'bật tv':
			return bouncingLogo.turnOn()
		case 'tắt tv':
			return bouncingLogo.turnOff()
		default:
			return
	}
}
