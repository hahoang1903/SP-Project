import $ from 'jquery'
import * as tf from '@tensorflow/tfjs'

import { MIC_ICON, MIC_SLASH_ICON } from './recordBtnIcons'
import { extractLogMelSpectrogram } from './prepareData'

export const allowRecord = async () => {
	// init variables
	const TARGET_SAMPLE_RATE = 16000
	const int16Range = [-32768, 32767]

	let start = false
	let chunks = []

	try {
		// run on localhost only
		const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

		// load model
		const model = await tf.loadLayersModel('/assets/model.json')
		console.log(model.summary())

		const mediaRecorder = new MediaRecorder(stream)

		handleRecordBtnClick(mediaRecorder)

		mediaRecorder.onstop = async () => {
			// data chunks -> blob -> array buffer
			const arrayBuffer = await new Blob(chunks, { type: 'audio/ogg; codecs=opus' }).arrayBuffer()

			// reset data chunks
			chunks = []

			// array buffer -> audio buffer
			const audioBuffer = await new AudioContext().decodeAudioData(arrayBuffer)

			const offlineCtx = new OfflineAudioContext(
				audioBuffer.numberOfChannels,
				audioBuffer.duration * TARGET_SAMPLE_RATE,
				TARGET_SAMPLE_RATE
			)

			const offlineSource = offlineCtx.createBufferSource()
			offlineSource.buffer = audioBuffer
			offlineSource.connect(offlineCtx.destination)
			offlineSource.start()

			// resample to 16000
			const resampledAudioBuffer = await offlineCtx.startRendering()

			// 32bit -> 16bit
			const PCM16iSamples = resampledAudioBuffer
				.getChannelData(0)
				.map(value => Math.max(Math.min(Math.floor(int16Range[1] * value), int16Range[1]), int16Range[0]))

			const audio = tf.tensor(PCM16iSamples)

			// prepare data for model
			const inputs = extractLogMelSpectrogram(audio)

			// predict
			const pred = tf.argMax(model.predict(inputs.expandDims(0)), 1)
			const predLabel = pred.dataSync()[0] // integer
			console.log(predLabel)
		}

		mediaRecorder.ondataavailable = e => {
			chunks.push(e.data)
		}
	} catch (error) {
		console.log('The following error occured: ' + error)
	}

	function handleRecordBtnClick(mediaRecorder) {
		$('.record').on('click', function () {
			if (!start) {
				mediaRecorder.start()
				console.log(`Recorder started. RecorderState: ${mediaRecorder.state}`)

				$(this).html(MIC_SLASH_ICON)
			} else {
				mediaRecorder.stop()
				console.log(`Recorder stopped. RecorderState: ${mediaRecorder.state}`)

				$(this).html(MIC_ICON)
			}

			start = !start
		})
	}
}
