import * as tf from '@tensorflow/tfjs'

export function extractLogMelSpectrogram(waveform, sr = 16000, newHeight = 64, newWidth = 64) {
    const stfts = tf.signal.stft(waveform, 1024, 256, 1024)
    const spectrograms = tf.abs(stfts)
    const numSpectrogramBins = spectrograms.shape[1]
    
    const lowerEdgeHertz = 0.0
    const upperEdgeHertz = sr / 2.0
    const numMelBins = 80

    const melWeight = linearToMelWeightMatrix(numMelBins, numSpectrogramBins, sr, lowerEdgeHertz, upperEdgeHertz)
    const melSpectrograms = tf.dot(spectrograms, melWeight)
    let logMelSpectrograms = tf.log(melSpectrograms.add(tf.scalar(1e-6)))
    logMelSpectrograms = logMelSpectrograms.expandDims(2)
    logMelSpectrograms = tf.image.resizeBilinear(logMelSpectrograms, [newWidth, newHeight])
    return logMelSpectrograms
}

function linearToMelWeightMatrix(numMelBins, numSpectrogramBins, sampleRate, lowerEdgeHertz, upperEdgeHertz) {
    var lowerEdgeHertz = tf.scalar(lowerEdgeHertz, 'float32')
    var upperEdgeHertz = tf.scalar(upperEdgeHertz, 'float32')
    const zero = tf.scalar(0.0, 'float32')

    // HTK excludes the spectrogram DC bin
    const bandsToZero = 1
    const nyquistFreq = 0.5 * sampleRate
    const linearFreq = tf.linspace(0, nyquistFreq, numSpectrogramBins).slice(bandsToZero)
    const spectrogramBinsMel = tf.expandDims(hertzToMel(linearFreq), 1)

    const bandEdgesMel = tf.signal.frame(tf.linspace(
        hertzToMel(lowerEdgeHertz).dataSync()[0], 
        hertzToMel(upperEdgeHertz).dataSync()[0], 
        numMelBins + 2), 3, 1)

    var edgeMel = tf.split(bandEdgesMel, 3, 1)
    for (var i = 0; i < edgeMel.length; i++) {
        edgeMel[i] = tf.reshape(edgeMel[i], [1, numMelBins])
    }

    // Calculate slopes for every spectrogram bin
    const lowerSlopes = tf.div(tf.sub(spectrogramBinsMel, edgeMel[0]), tf.sub(edgeMel[1], edgeMel[0]))
    const upperSlopes = tf.div(tf.sub(edgeMel[2], spectrogramBinsMel), tf.sub(edgeMel[2], edgeMel[1]))

    // Intersect the line segments with each other and zero
    const melWeightsMatrix = tf.maximum(zero, tf.minimum(lowerSlopes, upperSlopes))

    return tf.pad(melWeightsMatrix, [[bandsToZero, 0], [0, 0]])
}

function hertzToMel(hertz) {
    const MEL_BREAK_FREQUENCY_HERTZ = tf.scalar(700.0)
    const MEL_HIGH_FREQUENCY_Q = tf.scalar(1127.0)
    return tf.mul(MEL_HIGH_FREQUENCY_Q, tf.log(tf.add(tf.scalar(1.0), tf.div(hertz, MEL_BREAK_FREQUENCY_HERTZ))))
}
