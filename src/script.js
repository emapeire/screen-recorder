const $button = document.querySelector('button')
let isRecording = false
let mediaRecorder
let mediaStream

async function startRecording() {
  try {
    mediaStream = await navigator.mediaDevices.getDisplayMedia({
      video: { frameRate: { ideal: 30 } }
    })
    mediaRecorder = new MediaRecorder(mediaStream, {
      mimeType: 'video/webm;codecs=vp8,opus'
    })

    mediaRecorder.addEventListener('dataavailable', (e) => {
      const link = document.createElement('a')
      link.href = URL.createObjectURL(e.data)
      link.download = 'clip.webm'
      link.click()
    })

    mediaRecorder.start()
    $button.textContent = '⏹️ Stop recording and download your clip'
    isRecording = true
  } catch (error) {
    console.error('Error al iniciar la grabación: ', error)
  }
}

function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop()
  }
  if (mediaStream) {
    mediaStream.getTracks().forEach((track) => track.stop())
  }
  $button.textContent = '⏺️ Start recording your screen'
  isRecording = false
}

$button.addEventListener('click', () => {
  if (!isRecording) {
    startRecording()
  } else {
    stopRecording()
  }
})
