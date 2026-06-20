<template>
  <div class="px-4 py-4 max-w-md mx-auto pb-24">
    <div class="bg-gradient-to-br from-parent to-parent-hover rounded-2xl p-4 text-white mb-4">
      <div class="flex items-center justify-between mb-3">
        <div>
          <p class="text-orange-100 text-sm">{{ greeting }}</p>
          <h1 class="text-2xl font-bold">夕阳智语</h1>
        </div>
        <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">👵</div>
      </div>
      <p class="text-orange-100 text-xs">SunsetAI - 您的智能健康伴侣</p>
    </div>

    <div class="grid grid-cols-2 gap-3 mb-4">
      <div v-for="card in featureCards" :key="card.title" @click="goToPage(card.route)" class="bg-white rounded-xl shadow-sm p-3 text-center hover:shadow-md transition-all cursor-pointer active:scale-95">
        <div :class="card.bgColor" class="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2">
          <component :is="iconComponents[card.icon]" :class="card.color" class="w-6 h-6" />
        </div>
        <h3 class="text-base font-bold text-gray-800">{{ card.title }}</h3>
        <p class="text-xs text-gray-500 mt-0.5">{{ card.desc }}</p>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-4 mb-4">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-lg font-bold text-gray-800">今日状态</h2>
        <span class="text-xs text-gray-400">{{ today }}</span>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div class="bg-green-50 rounded-lg p-3 text-center">
          <div class="flex items-center justify-center gap-1 mb-1">
            <CheckCircleIcon class="w-5 h-5 text-green-500" />
            <span class="text-sm text-gray-600">签到</span>
          </div>
          <span :class="safetyStatus ? 'text-green-600' : 'text-gray-400'" class="text-xl font-bold">{{ safetyStatus ? '已完成' : '未签到' }}</span>
          <button v-if="!safetyStatus" @click="handleSignIn" class="mt-2 text-xs bg-green-500 text-white px-3 py-1 rounded-full">立即签到</button>
        </div>
        <div class="bg-blue-50 rounded-lg p-3 text-center">
          <div class="flex items-center justify-center gap-1 mb-1">
            <HeartIcon class="w-5 h-5 text-blue-500" />
            <span class="text-sm text-gray-600">记录次数</span>
          </div>
          <span class="text-xl font-bold text-blue-600">{{ todayRecords }}</span>
          <p class="text-xs text-gray-500 mt-1">健康数据记录</p>
        </div>
        <div class="bg-purple-50 rounded-lg p-3 text-center">
          <div class="flex items-center justify-center gap-1 mb-1">
            <DeviceTabletIcon class="w-5 h-5 text-purple-500" />
            <span class="text-sm text-gray-600">用药提醒</span>
          </div>
          <span class="text-xl font-bold text-purple-600">{{ pendingMedicine }}</span>
          <p class="text-xs text-gray-500 mt-1">待服药次数</p>
        </div>
        <div class="bg-orange-50 rounded-lg p-3 text-center">
          <div class="flex items-center justify-center gap-1 mb-1">
            <UsersIcon class="w-5 h-5 text-orange-500" />
            <span class="text-sm text-gray-600">亲情连接</span>
          </div>
          <span class="text-xl font-bold text-orange-600">{{ connectedChildren }}</span>
          <p class="text-xs text-gray-500 mt-1">已连接子女</p>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-4 mb-4">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-lg font-bold text-gray-800">今日用药</h2>
        <button @click="goToPage('/medicine')" class="text-xs text-parent hover:text-parent-hover">查看全部</button>
      </div>
      <div v-if="todayMedicines.length > 0" class="space-y-2">
        <div v-for="(med, index) in todayMedicines" :key="index" class="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">💊</div>
            <div>
              <p class="text-sm font-medium text-gray-800">{{ med.name }}</p>
              <p class="text-xs text-gray-500">{{ med.dose }}</p>
            </div>
          </div>
          <div class="text-right">
            <p class="text-sm font-bold" :class="med.taken ? 'text-green-500' : 'text-gray-400'">{{ med.time }}</p>
            <span v-if="med.taken" class="text-xs text-green-500">已服用</span>
            <span v-else class="text-xs text-amber-500">待服用</span>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-4 text-gray-400 text-sm">
        今日暂无用药计划
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-4 mb-4">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-lg font-bold text-gray-800">健康小贴士</h2>
        <button @click="refreshTip" class="text-xs text-parent hover:text-parent-hover">换一个</button>
      </div>
      <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3">
        <div class="flex items-start gap-2">
          <span class="text-xl">🌿</span>
          <div>
            <p class="text-sm font-medium text-gray-800">{{ currentTip.title }}</p>
            <p class="text-xs text-gray-600 mt-1">{{ currentTip.content }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-4 mb-4">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-lg font-bold text-gray-800">最近活动</h2>
        <button @click="goToPage('/safety')" class="text-xs text-parent hover:text-parent-hover">查看更多</button>
      </div>
      <div class="space-y-2">
        <div v-for="(activity, index) in recentActivities" :key="index" class="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
          <span class="text-lg">{{ activity.icon }}</span>
          <div class="flex-1">
            <p class="text-sm text-gray-800">{{ activity.text }}</p>
            <p class="text-xs text-gray-400">{{ activity.time }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-4 text-white">
      <div class="flex items-center justify-center gap-2 mb-2">
        <PhoneIcon class="w-7 h-7" />
        <h3 class="text-lg font-bold">语音小助手</h3>
      </div>
      <button @click="showHelp = true" class="text-xs text-white/80 hover:text-white underline mb-3 block text-center">
        点击查看语音指令帮助
      </button>
      <button @click="handleVoiceClick" :disabled="isSpeaking" class="bg-white text-orange-500 px-5 py-2 rounded-full font-bold text-sm hover:bg-orange-50 transition-colors block mx-auto disabled:opacity-70">
        {{ isListening ? '停止收听' : (isSpeaking ? '正在说话...' : '开始语音') }}
      </button>
      <p v-if="recognizedText" class="mt-3 bg-white/20 rounded-lg p-2 text-xs text-left">{{ recognizedText }}</p>
      <p v-if="!voiceSupported" class="mt-3 bg-white/20 rounded-lg p-2 text-xs text-center">您的浏览器不支持语音识别</p>
    </div>

    <div v-if="showHelp" class="fixed inset-0 bg-black/50 z-50 flex items-end justify-center" @click.self="showHelp = false">
      <div class="bg-white w-full max-w-md rounded-t-2xl p-4 animate-slide-up">
        <div class="flex items-center justify-between mb-4">
          <h4 class="text-lg font-bold text-gray-800">🎤 语音小助手功能</h4>
          <button @click="showHelp = false" class="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="bg-orange-50 rounded-lg p-3">
            <p class="text-sm font-bold text-orange-600 mb-1">健康相关</p>
            <ul class="text-xs text-gray-600 space-y-0.5">
              <li>• 打开健康</li>
              <li>• 查看健康数据</li>
              <li>• 健康监测</li>
            </ul>
          </div>
          <div class="bg-purple-50 rounded-lg p-3">
            <p class="text-sm font-bold text-purple-600 mb-1">用药相关</p>
            <ul class="text-xs text-gray-600 space-y-0.5">
              <li>• 打开用药</li>
              <li>• 吃药</li>
              <li>• 用药提醒</li>
            </ul>
          </div>
          <div class="bg-blue-50 rounded-lg p-3">
            <p class="text-sm font-bold text-blue-600 mb-1">回忆录</p>
            <ul class="text-xs text-gray-600 space-y-0.5">
              <li>• 打开回忆</li>
              <li>• 回忆录</li>
              <li>• 故事</li>
            </ul>
          </div>
          <div class="bg-green-50 rounded-lg p-3">
            <p class="text-sm font-bold text-green-600 mb-1">其他功能</p>
            <ul class="text-xs text-gray-600 space-y-0.5">
              <li>• 签到</li>
              <li>• 求助</li>
              <li>• 打开饮食</li>
            </ul>
          </div>
        </div>
        <button @click="showHelp = false" class="w-full mt-4 bg-orange-500 text-white py-2 rounded-xl font-bold">
          我知道了
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores/appStore'
import { HeartIcon, DeviceTabletIcon, BookOpenIcon, ReceiptPercentIcon, CheckCircleIcon, UsersIcon, CalendarDaysIcon, ExclamationTriangleIcon, PhoneIcon, QuestionMarkCircleIcon } from '@heroicons/vue/24/solid'
import { voiceAssistant } from '../utils/voiceAssistant'

const router = useRouter()
const store = useAppStore()

const today = new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' })
const isListening = ref(false)
const isSpeaking = ref(false)
const recognizedText = ref('')
const showHelp = ref(false)
const voiceSupported = ref(true)

const hour = new Date().getHours()
const greeting = computed(() => {
  if (hour < 6) return '夜深了，注意休息'
  if (hour < 9) return '早上好'
  if (hour < 12) return '上午好'
  if (hour < 14) return '中午好'
  if (hour < 18) return '下午好'
  if (hour < 22) return '晚上好'
  return '夜深了，注意休息'
})

const safetyStatus = computed(() => {
  const todayStr = new Date().toDateString()
  return store.signInRecords.some(record => {
    return new Date(record.timestamp).toDateString() === todayStr
  })
})

const todayRecords = computed(() => {
  const todayStr = new Date().toDateString()
  return store.signInRecords.filter(record => {
    return new Date(record.timestamp).toDateString() === todayStr
  }).length + store.dietRecords.filter(record => {
    return new Date(record.timestamp).toDateString() === todayStr
  }).length + store.healthRecords.filter(record => {
    return new Date(record.timestamp).toDateString() === todayStr
  }).length
})

const pendingMedicine = computed(() => {
  return store.medicineRecords.filter(m => !m.takenToday).length
})

const connectedChildren = computed(() => {
  return store.connectedChildren.length || 0
})

const healthTips = [
  { title: '多喝水', content: '每天建议喝1500-2000毫升水，可以帮助身体代谢，促进健康。' },
  { title: '适当运动', content: '每天进行30分钟的散步或太极拳，有助于保持身体活力。' },
  { title: '按时吃药', content: '请按时服用医生开的药物，不要随意增减剂量。' },
  { title: '保持心情', content: '保持愉快的心情对身体健康很重要，多和家人朋友聊天。' },
  { title: '注意饮食', content: '饮食要清淡，多吃蔬菜水果，少吃油腻和辛辣食物。' },
  { title: '定期体检', content: '建议每年进行一次全面体检，及时发现健康问题。' },
  { title: '充足睡眠', content: '每天保证7-8小时的睡眠，有助于身体恢复和免疫力提升。' },
  { title: '晒太阳', content: '每天适当晒太阳可以帮助身体合成维生素D，促进钙吸收。' }
]

const currentTip = ref(healthTips[0])

const refreshTip = () => {
  const randomIndex = Math.floor(Math.random() * healthTips.length)
  currentTip.value = healthTips[randomIndex]
}

const todayMedicines = computed(() => {
  return [
    { name: '降压药', dose: '1粒/次', time: '08:00', taken: true },
    { name: '钙片', dose: '1粒/次', time: '12:00', taken: false },
    { name: '维生素', dose: '1粒/次', time: '20:00', taken: false }
  ]
})

const recentActivities = computed(() => [
  { icon: '✅', text: '完成今日签到', time: '今天 08:30' },
  { icon: '❤️', text: '记录血压数据', time: '今天 09:00' },
  { icon: '💊', text: '服用降压药', time: '今天 08:00' },
  { icon: '📖', text: '添加回忆录', time: '昨天 15:20' }
])

const iconComponents = {
  Heart: HeartIcon,
  Pill: DeviceTabletIcon,
  BookOpen: BookOpenIcon,
  Utensils: ReceiptPercentIcon,
  CheckCircle: CheckCircleIcon,
  Users: UsersIcon,
  CalendarDays: CalendarDaysIcon,
  AlertTriangle: ExclamationTriangleIcon
}

const featureCards = [
  { icon: 'Heart', title: '健康监测', desc: '血压血糖心率', route: '/health', color: 'text-red-500', bgColor: 'bg-red-100' },
  { icon: 'Pill', title: '用药提醒', desc: '定时提醒吃药', route: '/medicine', color: 'text-purple-500', bgColor: 'bg-purple-100' },
  { icon: 'BookOpen', title: '回忆录', desc: '语音记录人生', route: '/memories', color: 'text-blue-500', bgColor: 'bg-blue-100' },
  { icon: 'Utensils', title: '饮食管理', desc: '营养评估菜谱', route: '/diet', color: 'text-orange-500', bgColor: 'bg-orange-100' },
  { icon: 'CheckCircle', title: '平安签到', desc: '自动提醒家人', route: '/safety', color: 'text-green-500', bgColor: 'bg-green-100' },
  { icon: 'Users', title: '亲情连接', desc: '与子女同步', route: '/family', color: 'text-pink-500', bgColor: 'bg-pink-100' },
  { icon: 'CalendarDays', title: '日程提醒', desc: '重要日期提醒', route: '/schedule', color: 'text-indigo-500', bgColor: 'bg-indigo-100' },
  { icon: 'AlertTriangle', title: '紧急求助', desc: '一键求助家人', route: '/sos', color: 'text-amber-500', bgColor: 'bg-amber-100' }
]

const voiceCommands = {
  '健康': '/health',
  '打开健康': '/health',
  '查看健康': '/health',
  '健康监测': '/health',
  '用药': '/medicine',
  '打开用药': '/medicine',
  '吃药': '/medicine',
  '药': '/medicine',
  '回忆': '/memories',
  '打开回忆': '/memories',
  '回忆录': '/memories',
  '故事': '/memories',
  '饮食': '/diet',
  '打开饮食': '/diet',
  '吃饭': '/diet',
  '吃什么': '/diet',
  '签到': '/safety',
  '平安签到': '/safety',
  '安全': '/safety',
  '家人': '/family',
  '亲情': '/family',
  '子女': '/family',
  '连接': '/family',
  '日程': '/schedule',
  '日历': '/schedule',
  '提醒': '/schedule',
  '求助': '/sos',
  '紧急': '/sos',
  '救命': '/sos',
  '不舒服': '/sos',
  '难受': '/sos'
}

const handleSignIn = () => {
  store.addSignInRecord({ type: 'manual' })
  alert('签到成功！')
}

const handleVoiceResult = (text) => {
  recognizedText.value = `您说：${text}`

  if (text.includes('签到')) {
    handleSignIn()
    isSpeaking.value = true
    voiceAssistant.speak('签到成功')
    setTimeout(() => {
      isSpeaking.value = false
    }, 1500)
    return
  }

  for (const [command, route] of Object.entries(voiceCommands)) {
    if (text.includes(command)) {
      isSpeaking.value = true
      const responses = {
        '/health': '好的，为您打开健康监测页面',
        '/medicine': '好的，为您打开用药提醒页面',
        '/memories': '好的，为您打开回忆录页面',
        '/diet': '好的，为您打开饮食管理页面',
        '/safety': '好的，为您打开平安签到页面',
        '/family': '好的，为您打开亲情连接页面',
        '/schedule': '好的，为您打开日程提醒页面',
        '/sos': '别担心，我马上帮您联系家人'
      }
      const response = responses[route] || `好的，为您打开${command}页面`
      voiceAssistant.speak(response)
      setTimeout(() => {
        router.push(route)
        isSpeaking.value = false
      }, 1500)
      return
    }
  }

  isSpeaking.value = true
  voiceAssistant.speak('抱歉，我没有听懂，请再说一遍。您可以说打开健康、打开用药、打开回忆录等指令。')
  setTimeout(() => {
    isSpeaking.value = false
  }, 3000)
}

const handleVoiceEvent = (event, data) => {
  switch (event) {
    case 'start':
      isListening.value = true
      recognizedText.value = '正在听您说话，请讲...'
      break
    case 'result':
      handleVoiceResult(data)
      break
    case 'error':
      isListening.value = false
      if (data === 'browser-not-supported') {
        voiceSupported.value = false
        recognizedText.value = '您的浏览器不支持语音识别'
      } else {
        recognizedText.value = `语音识别出错：${data}`
      }
      break
    case 'end':
      isListening.value = false
      break
    case 'speak-end':
    case 'speak-error':
      isSpeaking.value = false
      break
  }
}

const handleVoiceClick = () => {
  if (isListening.value) {
    voiceAssistant.stopListening()
    recognizedText.value = '已停止收听'
  } else {
    if (!voiceAssistant.isSupported()) {
      voiceSupported.value = false
      recognizedText.value = '您的浏览器不支持语音识别，请使用Chrome浏览器'
      return
    }
    voiceAssistant.startListening()
  }
}

const goToPage = (route) => {
  router.push(route)
}

onMounted(() => {
  store.loadSignInRecords()
  store.loadDietRecords()
  store.loadMedicineRecords()
  store.loadConnectedChildren()
  voiceAssistant.addCallback(handleVoiceEvent)
  
  if (!voiceAssistant.isSupported()) {
    voiceSupported.value = false
  }
})

onUnmounted(() => {
  voiceAssistant.removeCallback(handleVoiceEvent)
  voiceAssistant.stopListening()
})
</script>