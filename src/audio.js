import $ from 'jquery'
import * as tf from '@tensorflow/tfjs'

import { MIC_ICON, MIC_SLASH_ICON } from './recordBtnIcons'

export const allowRecord = async () => {
	// init variables
	const TARGET_SAMPLE_RATE = 16000
	const int16Range = [-32768, 32767]

	let start = false
	let chunks = []

	try {
		const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

		const mediaRecorder = new MediaRecorder(stream)

		start = handleRecordBtnClick(mediaRecorder)

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

			// print to browser console
			tf.tensor(PCM16iSamples).print()

			// download for testing
			downloadWav(PCM16iSamples)
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

/*
 *
 * HELPER FUNCTIONS FOR TESTING ONLY
 *
 */
function downloadWav(PCM16iSamples) {
	const pcm16 = new Int16Array(PCM16iSamples)
	const wavBytes = getWavBytes(pcm16.buffer, {
		isFloat: false, // floating point or 16-bit integer
		numChannels: 1,
		sampleRate: 16000
	})
	const wav = new Blob([wavBytes], { type: 'audio/wav' })
	const a = document.createElement('a')
	document.body.appendChild(a)
	a.style = 'display: none'
	const url = window.URL.createObjectURL(wav)
	a.href = url
	a.download = 'test.wav'
	a.click()
	window.URL.revokeObjectURL(url)
}

// Returns Uint8Array of WAV bytes
function getWavBytes(buffer, options) {
	const type = options.isFloat ? Float32Array : Uint16Array
	const numFrames = buffer.byteLength / type.BYTES_PER_ELEMENT

	const headerBytes = getWavHeader(Object.assign({}, options, { numFrames }))
	const wavBytes = new Uint8Array(headerBytes.length + buffer.byteLength)

	// prepend header, then add pcmBytes
	wavBytes.set(headerBytes, 0)
	wavBytes.set(new Uint8Array(buffer), headerBytes.length)

	return wavBytes
}

// adapted from https://gist.github.com/also/900023
// returns Uint8Array of WAV header bytes
function getWavHeader(options) {
	const numFrames = options.numFrames
	const numChannels = options.numChannels || 2
	const sampleRate = options.sampleRate || 44100
	const bytesPerSample = options.isFloat ? 4 : 2
	const format = options.isFloat ? 3 : 1

	const blockAlign = numChannels * bytesPerSample
	const byteRate = sampleRate * blockAlign
	const dataSize = numFrames * blockAlign

	const buffer = new ArrayBuffer(44)
	const dv = new DataView(buffer)

	let p = 0

	function writeString(s) {
		for (let i = 0; i < s.length; i++) {
			dv.setUint8(p + i, s.charCodeAt(i))
		}
		p += s.length
	}

	function writeUint32(d) {
		dv.setUint32(p, d, true)
		p += 4
	}

	function writeUint16(d) {
		dv.setUint16(p, d, true)
		p += 2
	}

	writeString('RIFF') // ChunkID
	writeUint32(dataSize + 36) // ChunkSize
	writeString('WAVE') // Format
	writeString('fmt ') // Subchunk1ID
	writeUint32(16) // Subchunk1Size
	writeUint16(format) // AudioFormat https://i.stack.imgur.com/BuSmb.png
	writeUint16(numChannels) // NumChannels
	writeUint32(sampleRate) // SampleRate
	writeUint32(byteRate) // ByteRate
	writeUint16(blockAlign) // BlockAlign
	writeUint16(bytesPerSample * 8) // BitsPerSample
	writeString('data') // Subchunk2ID
	writeUint32(dataSize) // Subchunk2Size

	return new Uint8Array(buffer)
}
