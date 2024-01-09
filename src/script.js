const $button = document.querySelector('button')
let isRecording = false
let mediaRecorder

async function startRecording() {
  const media = await navigator.mediaDevices.getDisplayMedia({
    video: { frameRate: { ideal: 30 } }
  })
  mediaRecorder = new MediaRecorder(media, {
    mimeType: 'video/webm;codecs=vp8,opus'
  })

  mediaRecorder.addEventListener('dataavailable', (e) => {
    const link = document.createElement('a')
    link.href = URL.createObjectURL(e.data)
    link.download = 'clip.webm'
    link.click()
  })

  mediaRecorder.start()
  isRecording = true
  $button.textContent = '⏹️ Stop recording and download the clip'
}

function stopRecording() {
  mediaRecorder.stop()
  isRecording = false
  $button.textContent = '⏺️ Start recording your screen'
}

$button.addEventListener('click', () => {
  if (!isRecording) {
    startRecording()
  } else {
    stopRecording()
  }
})
