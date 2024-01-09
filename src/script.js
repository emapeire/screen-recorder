const $button = document.querySelector('button')
let isRecording = false
let mediaRecorder

$button.addEventListener('click', async () => {
  if (!isRecording) {
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
    $button.textContent = '⏹️ Stop recording and save the clip'
    isRecording = true

    const [video] = media.getVideoTracks()
    video.addEventListener('ended', () => {
      mediaRecorder.stop()
    })
  } else {
    mediaRecorder.stop()
    $button.textContent = '⏺️ Start recording your screen'
    isRecording = false
  }
})
