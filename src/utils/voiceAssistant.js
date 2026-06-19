export class VoiceAssistant {
  constructor() {
    this.recognition = null
    this.synthesis = window.speechSynthesis
    this.isListening = false
    this.callbacks = []
    this.initRecognition()
  }

  initRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition()
      this.recognition.lang = 'zh-CN'
      this.recognition.continuous = false
      this.recognition.interimResults = false

      this.recognition.onstart = () => {
        this.isListening = true
        this.notifyCallbacks('start')
      }

      this.recognition.onresult = (event) => {
        const text = event.results[0][0].transcript
        this.notifyCallbacks('result', text)
      }

      this.recognition.onerror = (event) => {
        this.isListening = false
        this.notifyCallbacks('error', event.error)
      }

      this.recognition.onend = () => {
        this.isListening = false
        this.notifyCallbacks('end')
      }
    }
  }

  addCallback(callback) {
    this.callbacks.push(callback)
  }

  removeCallback(callback) {
    this.callbacks = this.callbacks.filter(cb => cb !== callback)
  }

  notifyCallbacks(event, data) {
    this.callbacks.forEach(cb => cb(event, data))
  }

  startListening() {
    if (!this.recognition) {
      this.notifyCallbacks('error', 'browser-not-supported')
      return
    }
    if (this.isListening) {
      this.stopListening()
    }
    try {
      this.recognition.start()
    } catch (e) {
      this.notifyCallbacks('error', e.message)
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop()
    }
  }

  speak(text, rate = 0.9) {
    if (!this.synthesis) return
    
    this.synthesis.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'zh-CN'
    utterance.rate = rate
    utterance.pitch = 1
    utterance.volume = 1

    utterance.onend = () => {
      this.notifyCallbacks('speak-end')
    }

    utterance.onerror = () => {
      this.notifyCallbacks('speak-error')
    }

    this.synthesis.speak(utterance)
  }

  isSupported() {
    return !!this.recognition
  }
}

export const voiceAssistant = new VoiceAssistant()