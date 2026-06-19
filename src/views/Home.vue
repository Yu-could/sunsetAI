<template>
  <div class="px-4 py-4 max-w-md mx-auto">
    <header class="text-center mb-4">
      <h1 class="text-2xl font-bold text-primary">夕阳智语</h1>
      <p class="text-gray-500 text-sm mt-1">SunsetAI</p>
    </header>

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
      <div class="space-y-2">
        <div class="flex items-center justify-between py-2 border-b border-gray-100">
          <span class="text-gray-600">签到状态</span>
          <span :class="safetyStatus ? 'text-green-500' : 'text-red-500'" class="font-bold">{{ safetyStatus ? '已签到' : '未签到' }}</span>
        </div>
        <div class="flex items-center justify-between py-2 border-b border-gray-100">
          <span class="text-gray-600">记录次数</span>
          <span class="text-gray-800 font-bold">{{ todayRecords }}</span>
        </div>
        <div class="flex items-center justify-between py-2">
          <span class="text-gray-600">身心健康</span>
          <span class="text-gray-800 font-bold">良好</span>
        </div>
      </div>
    </div>

    <div class="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-4 text-white">
      <div class="flex items-center justify-center gap-2 mb-2">
        <PhoneIcon class="w-7 h-7" />
        <div class="relative">
          <QuestionMarkCircleIcon @click="showHelp = true" class="w-6 h-6 cursor-pointer hover:text-orange-200 transition-colors" />
          <div v-if="showHelp" @click="showHelp = false" class="absolute right-0 top-5 w-56 bg-white text-gray-800 rounded-lg shadow-lg p-3 z-50">
            <h4 class="font-bold text-xs mb-1">语音小助手功能</h4>
            <ul class="text-xs text-gray-600 space-y-0.5">
              <li>• 通过语音指令控制应用</li>
              <li>• 说"打开回忆录"查看故事</li>
              <li>• 说"记录饮食"添加餐食</li>
              <li>• 说"我不舒服"寻求帮助</li>
            </ul>
            <div class="absolute -top-1.5 right-3 w-3 h-3 bg-white rotate-45"></div>
          </div>
        </div>
      </div>
      <h3 class="text-lg font-bold text-center">语音小助手</h3>
      <button @click="handleVoiceClick" class="mt-3 bg-white text-orange-500 px-5 py-2 rounded-full font-bold text-sm hover:bg-orange-50 transition-colors block mx-auto">
        {{ isListening ? '停止收听' : '开始语音' }}
      </button>
      <p v-if="recognizedText" class="mt-3 bg-white/20 rounded-lg p-2 text-xs text-left">{{ recognizedText }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores/appStore'
import { HeartIcon, DeviceTabletIcon, BookOpenIcon, ReceiptPercentIcon, CheckCircleIcon, UsersIcon, CalendarDaysIcon, ExclamationTriangleIcon, PhoneIcon, QuestionMarkCircleIcon } from '@heroicons/vue/24/solid'

const router = useRouter()
const store = useAppStore()

const today = new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' })
const isListening = ref(false)
const recognizedText = ref('')
const showHelp = ref(false)

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
  }).length
})

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

const goToPage = (route) => {
  router.push(route)
}

const handleVoiceClick = () => {
  if (isListening.value) {
    isListening.value = false
    recognizedText.value = '已停止收听'
  } else {
    isListening.value = true
    recognizedText.value = '正在收听...'
    setTimeout(() => {
      isListening.value = false
      recognizedText.value = '好的！你说要看什么功能？'
    }, 3000)
  }
}

onMounted(() => {
  store.loadSignInRecords()
  store.loadDietRecords()
})
</script>