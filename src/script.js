const $button = document.querySelector('button')

let isRecording = false
let mediaRecorder
let mediaStream

async function startRecording() {
  try {
    mediaStream = await navigator.mediaDevices.getDisplayMedia({
      video: { frameRate: { ideal: 30 } }
    })
    setupMediaRecorder(mediaStream)
    mediaRecorder.start()
    updateUIForRecording()
  } catch (error) {
    console.error('Error starting recording: ', error)
    alert('Error starting recording. Please check console for details.')
  }
}

function setupMediaRecorder(stream) {
  mediaRecorder = new MediaRecorder(stream, {
    mimeType: 'video/webm;codecs=vp8,opus'
  })

  mediaRecorder.addEventListener('dataavailable', (e) => {
    const link = document.createElement('a')
    link.href = URL.createObjectURL(e.data)
    link.download = 'clip.webm'
    link.click()
  })

  mediaRecorder.addEventListener('stop', resetRecordingState)
}

function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop()
  }
}

function resetRecordingState() {
  mediaStream.getTracks().forEach((track) => track.stop())
  $button.textContent = '⏺️ Start recording your screen'
  isRecording = false
}

function updateUIForRecording() {
  $button.textContent = '⏹️ Stop recording and download your clip'
  isRecording = true
}

$button.addEventListener('click', () => {
  if (!isRecording) {
    startRecording()
  } else {
    stopRecording()
  }
})
