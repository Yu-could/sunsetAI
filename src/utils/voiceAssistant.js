export class VoiceAssistant {
  constructor() {
    this.recognition = null
    this.synthesis = window.speechSynthesis
    this.isListening = false
    this.callbacks = []
    this.currentLang = 'zh-CN'
    this.langOptions = [
      { code: 'zh-CN', name: '普通话', desc: '标准中文' },
      { code: 'zh-HK', name: '粤语', desc: '广东话' },
      { code: 'zh-TW', name: '台语', desc: '台湾方言' },
      { code: 'zh-YUE', name: '粤语(广)', desc: '广州话' }
    ]
    this.initRecognition()
  }

  initRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition()
      this.recognition.lang = this.currentLang
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

  setLang(langCode) {
    this.currentLang = langCode
    if (this.recognition) {
      this.recognition.lang = langCode
    }
  }

  getCurrentLang() {
    return this.currentLang
  }

  getLangOptions() {
    return this.langOptions
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

  speak(text, rate = 0.85) {
    if (!this.synthesis) return
    
    this.synthesis.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = this.currentLang
    utterance.rate = rate
    utterance.pitch = 1
    utterance.volume = 1

    const voices = this.synthesis.getVoices()
    const preferredVoice = voices.find(v => 
      v.lang.startsWith(this.currentLang.split('-')[0]) && v.name.includes('Google')
    ) || voices.find(v => v.lang.startsWith(this.currentLang.split('-')[0]))
    
    if (preferredVoice) {
      utterance.voice = preferredVoice
    }

    utterance.onend = () => {
      this.notifyCallbacks('speak-end')
    }

    utterance.onerror = () => {
      this.notifyCallbacks('speak-error')
    }

    this.synthesis.speak(utterance)
  }

  stopSpeaking() {
    if (this.synthesis) {
      this.synthesis.cancel()
    }
  }

  isSupported() {
    return !!this.recognition
  }
}

export const voiceAssistant = new VoiceAssistant()

export const dialectSynonyms = {
  '健康': ['健康', '建康', '见康', '体检', '身体', '血压', '血糖', '监测', '检查', '身體', '體檢', '身驱', '贱身', '贱体'],
  '用药': ['用药', '吃药', '服药', '药', '药品', '药剂', '胶囊', '药片', '打针', '吃藥', '服藥', '藥', '藥品', '藥劑', '食藥', '吃药子', '食药', '药子'],
  '回忆': ['回忆', '回忆录', '故事', '往事', '记忆', '纪念', '相册', '照片', '記憶', '紀念', '憶', '回亿', '回忔'],
  '饮食': ['饮食', '吃饭', '吃什么', '饭', '餐', '菜谱', '食谱', '营养', '飲食', '吃飯', '楗硷', '饮食', '饭食', '吃东西'],
  '签到': ['签到', '平安', '打卡', '报平安', '报个平安', '平安签到', '簽到', '簽到', '簽導', '签導', '报到', '报道'],
  '家人': ['家人', '亲情', '子女', '孩子', '联系', '连接', '家庭', '親情', '連接', '老豆', '妈咪'],
  '日程': ['日程', '日历', '提醒', '安排', '计划', '时间', '约会', '日曆', '約會', '日程表'],
  '求助': ['求助', '紧急', '救命', '不舒服', '难受', '帮忙', '救命啊', '緊急', '幫忙', '救命呀', '帮我']
}

export const dialectPronunciationMap = {
  '健康': ['jiankang', 'jian kan', 'jiankan'],
  '用药': ['yongyao', 'chi yao', 'chiyao'],
  '回忆': ['huiyi', 'hui yi', 'gu shi'],
  '饮食': ['yinshi', 'chi fan', 'chifan'],
  '签到': ['qiandao', 'qiandao', 'baopingan'],
  '家人': ['jiaren', 'qinqing', 'zinv'],
  '日程': ['richeng', 'rili', 'ti xing'],
  '求助': ['qiuzhu', 'jinji', 'jiu ming']
}

export function fuzzyMatch(text, commands) {
  const normalizedText = text.toLowerCase().replace(/\s+/g, '')
  
  for (const [command, route] of Object.entries(commands)) {
    if (normalizedText.includes(command.toLowerCase())) {
      return { matched: true, command, route, confidence: 1.0 }
    }
  }

  const synonyms = dialectSynonyms
  for (const [baseCommand, syns] of Object.entries(synonyms)) {
    for (const syn of syns) {
      if (normalizedText.includes(syn.toLowerCase())) {
        const route = commands[baseCommand] || commands[syn]
        if (route) {
          return { matched: true, command: baseCommand, route, confidence: 0.8 }
        }
      }
    }
  }

  const charMatchThreshold = 0.6
  for (const [command, route] of Object.entries(commands)) {
    const commandChars = command.split('')
    let matchedChars = 0
    let textIndex = 0
    
    for (const char of commandChars) {
      const foundIndex = normalizedText.indexOf(char, textIndex)
      if (foundIndex !== -1) {
        matchedChars++
        textIndex = foundIndex + 1
      }
    }
    
    const matchRatio = matchedChars / commandChars.length
    if (matchRatio >= charMatchThreshold) {
      return { matched: true, command, route, confidence: matchRatio }
    }
  }

  return { matched: false, command: null, route: null, confidence: 0 }
}

export function getVoiceCommands() {
  return {
    '健康': '/health',
    '打开健康': '/health',
    '查看健康': '/health',
    '健康监测': '/health',
    '体检': '/health',
    '身体': '/health',
    '血压': '/health',
    '血糖': '/health',
    '用药': '/medicine',
    '打开用药': '/medicine',
    '吃药': '/medicine',
    '服药': '/medicine',
    '药': '/medicine',
    '药品': '/medicine',
    '回忆': '/memories',
    '打开回忆': '/memories',
    '回忆录': '/memories',
    '故事': '/memories',
    '往事': '/memories',
    '记忆': '/memories',
    '饮食': '/diet',
    '打开饮食': '/diet',
    '吃饭': '/diet',
    '吃什么': '/diet',
    '餐': '/diet',
    '签到': '/safety',
    '平安签到': '/safety',
    '平安': '/safety',
    '打卡': '/safety',
    '报平安': '/safety',
    '家人': '/family',
    '亲情': '/family',
    '子女': '/family',
    '孩子': '/family',
    '联系': '/family',
    '日程': '/schedule',
    '日历': '/schedule',
    '提醒': '/schedule',
    '安排': '/schedule',
    '求助': '/sos',
    '紧急': '/sos',
    '救命': '/sos',
    '不舒服': '/sos',
    '难受': '/sos',
    '帮忙': '/sos'
  }
}