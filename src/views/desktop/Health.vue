<template>
  <div class="p-8 max-w-7xl mx-auto">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">健康监测</h2>
        <p class="text-gray-500 mt-1">记录健康数据，关注身体状况</p>
      </div>
      <div class="flex gap-3">
        <button @click="refreshHealthData" class="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          <AppIcon name="refresh" size="md" />
          <span>刷新数据</span>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-red-200 text-sm mb-1">今日健康评分</p>
            <p class="text-5xl font-bold">{{ healthScore }}</p>
            <p class="text-red-200 text-sm mt-1">{{ healthStatus }}</p>
          </div>
          <div class="text-6xl">{{ scoreEmoji }}</div>
        </div>
        <div class="mt-4">
          <div class="flex justify-between text-xs text-red-200 mb-1">
            <span>数据完整度</span>
            <span>{{ dataCompleteness }}%</span>
          </div>
          <div class="w-full bg-white/20 rounded-full h-2">
            <div class="bg-white h-2 rounded-full transition-all" :style="{ width: dataCompleteness + '%' }"></div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-md p-6">
        <h3 class="text-lg font-bold text-gray-700 mb-4">今日数据概览</h3>
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-red-50 rounded-lg p-4 text-center">
            <p class="text-red-500 text-2xl font-bold">{{ latestData.bloodPressure || '--' }}</p>
            <p class="text-gray-500 text-xs mt-1">血压 (mmHg)</p>
          </div>
          <div class="bg-purple-50 rounded-lg p-4 text-center">
            <p class="text-purple-500 text-2xl font-bold">{{ latestData.bloodSugar || '--' }}</p>
            <p class="text-gray-500 text-xs mt-1">血糖 (mmol/L)</p>
          </div>
          <div class="bg-pink-50 rounded-lg p-4 text-center">
            <p class="text-pink-500 text-2xl font-bold">{{ latestData.heartRate || '--' }}</p>
            <p class="text-gray-500 text-xs mt-1">心率 (bpm)</p>
          </div>
          <div class="bg-blue-50 rounded-lg p-4 text-center">
            <p class="text-blue-500 text-2xl font-bold">{{ latestData.sleepHours || '--' }}h</p>
            <p class="text-gray-500 text-xs mt-1">睡眠时长</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-md p-6">
        <h3 class="text-lg font-bold text-gray-700 mb-4">健康小贴士</h3>
        <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <AppIcon name="sparkles" size="lg" class="text-green-500 flex-shrink-0" />
            <div>
              <p class="text-sm font-medium text-gray-800">{{ currentTip.title }}</p>
              <p class="text-xs text-gray-600 mt-1">{{ currentTip.content }}</p>
            </div>
          </div>
        </div>
        <button @click="refreshTip" class="mt-3 text-xs text-parent hover:text-parent-hover">换一个</button>
      </div>
    </div>

    <div class="mt-6 bg-white rounded-xl shadow-md p-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4">快速录入</h3>
      <div class="grid grid-cols-4 gap-4">
        <button @click="openInput('bloodPressure')" class="flex flex-col items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
          <span class="text-2xl mb-2">🩺</span>
          <span class="text-sm text-gray-600">血压</span>
        </button>
        <button @click="openInput('bloodSugar')" class="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
          <span class="text-2xl mb-2">💉</span>
          <span class="text-sm text-gray-600">血糖</span>
        </button>
        <button @click="openInput('heartRate')" class="flex flex-col items-center p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors">
          <span class="text-2xl mb-2">💓</span>
          <span class="text-sm text-gray-600">心率</span>
        </button>
        <button @click="openInput('sleep')" class="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
          <span class="text-2xl mb-2">😴</span>
          <span class="text-sm text-gray-600">睡眠</span>
        </button>
        <button @click="openInput('weight')" class="flex flex-col items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
          <span class="text-2xl mb-2">⚖️</span>
          <span class="text-sm text-gray-600">体重</span>
        </button>
        <button @click="openInput('temperature')" class="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
          <span class="text-2xl mb-2">🌡️</span>
          <span class="text-sm text-gray-600">体温</span>
        </button>
        <button @click="openInput('oxygen')" class="flex flex-col items-center p-4 bg-cyan-50 rounded-lg hover:bg-cyan-100 transition-colors">
          <span class="text-2xl mb-2">🫁</span>
          <span class="text-sm text-gray-600">血氧</span>
        </button>
        <button @click="openInput('activity')" class="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
          <span class="text-2xl mb-2">🚶</span>
          <span class="text-sm text-gray-600">活动</span>
        </button>
      </div>
    </div>

    <div class="mt-6 bg-white rounded-xl shadow-md p-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4">健康趋势</h3>
      <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm font-medium text-gray-700">血压趋势</span>
            <span class="text-xs text-gray-400">7天</span>
          </div>
          <div class="flex items-end gap-2 h-20">
            <div v-for="(val, i) in trendData.bloodPressure" :key="i" class="flex-1 bg-red-400 rounded-t" :style="{ height: val + '%' }"></div>
          </div>
        </div>
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm font-medium text-gray-700">心率趋势</span>
            <span class="text-xs text-gray-400">7天</span>
          </div>
          <div class="flex items-end gap-2 h-20">
            <div v-for="(val, i) in trendData.heartRate" :key="i" class="flex-1 bg-pink-400 rounded-t" :style="{ height: val + '%' }"></div>
          </div>
        </div>
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="flex items-center justify-between mb-3">
            <span class="text-sm font-medium text-gray-700">体重趋势</span>
            <span class="text-xs text-gray-400">7天</span>
          </div>
          <div class="flex items-end gap-2 h-20">
            <div v-for="(val, i) in trendData.weight" :key="i" class="flex-1 bg-indigo-400 rounded-t" :style="{ height: val + '%' }"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 bg-white rounded-xl shadow-md p-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4">健康记录</h3>
      <div v-if="healthRecords.length > 0" class="space-y-3">
        <div v-for="(record, index) in healthRecords" :key="index" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">{{ record.icon }}</div>
            <div>
              <p class="font-medium text-gray-800">{{ record.type }}</p>
              <p class="text-xs text-gray-500">{{ formatTime(record.timestamp) }}</p>
            </div>
          </div>
          <p class="font-bold text-gray-700">{{ record.value }}</p>
        </div>
      </div>
      <div v-else class="text-center py-8 text-gray-400">
        <AppIcon name="heart" size="xl" class="mx-auto mb-2" />
        <p>暂无健康记录</p>
      </div>
    </div>

    <div v-if="showInputModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" @click.self="showInputModal = false">
      <div class="bg-white w-full max-w-md rounded-2xl p-6">
        <div class="flex items-center justify-between mb-4">
          <h4 class="text-lg font-bold text-gray-800">{{ inputModalTitle }}</h4>
          <button @click="showInputModal = false" class="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>
        <div class="space-y-4">
          <input v-model="inputValue" type="number" :placeholder="inputPlaceholder" class="w-full px-4 py-3 bg-gray-100 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <div v-if="currentInputType === 'bloodPressure'" class="flex gap-3">
            <input v-model="inputValue2" type="number" placeholder="舒张压" class="flex-1 px-4 py-3 bg-gray-100 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button @click="saveInput" class="w-full bg-blue-500 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '../../stores/appStore'
import AppIcon from '../../components/AppIcon.vue'

const store = useAppStore()

const showInputModal = ref(false)
const currentInputType = ref('')
const inputValue = ref('')
const inputValue2 = ref('')

const healthRecords = computed(() => {
  return store.healthRecords.map(record => ({
    icon: getRecordIcon(record.type),
    type: getRecordTypeName(record.type),
    value: record.value,
    timestamp: record.timestamp
  }))
})

const latestData = computed(() => {
  const data = { bloodPressure: '', bloodSugar: '', heartRate: '', sleepHours: '' }
  store.healthRecords.forEach(record => {
    if (record.type === 'bloodPressure') data.bloodPressure = record.value
    if (record.type === 'bloodSugar') data.bloodSugar = record.value
    if (record.type === 'heartRate') data.heartRate = record.value
    if (record.type === 'sleep') data.sleepHours = record.value
  })
  return data
})

const healthScore = computed(() => {
  const records = store.healthRecords.length
  if (records === 0) return 60
  if (records < 3) return 75
  if (records < 5) return 85
  return 95
})

const healthStatus = computed(() => {
  const score = healthScore.value
  if (score >= 90) return '身体状况良好'
  if (score >= 70) return '需要关注健康'
  return '建议及时体检'
})

const scoreEmoji = computed(() => {
  const score = healthScore.value
  if (score >= 90) return '😊'
  if (score >= 70) return '🙂'
  return '😐'
})

const dataCompleteness = computed(() => {
  const types = ['bloodPressure', 'bloodSugar', 'heartRate', 'sleep', 'weight', 'temperature', 'oxygen']
  const recordedTypes = new Set(store.healthRecords.map(r => r.type))
  return Math.round((recordedTypes.size / types.length) * 100)
})

const healthTips = [
  { title: '多喝水', content: '每天建议喝1500-2000毫升水，可以帮助身体代谢，促进健康。' },
  { title: '适当运动', content: '每天进行30分钟的散步或太极拳，有助于保持身体活力。' },
  { title: '按时吃药', content: '请按时服用医生开的药物，不要随意增减剂量。' },
  { title: '保持心情', content: '保持愉快的心情对身体健康很重要，多和家人朋友聊天。' },
  { title: '注意饮食', content: '饮食要清淡，多吃蔬菜水果，少吃油腻和辛辣食物。' }
]

const currentTip = ref(healthTips[0])

const trendData = ref({
  bloodPressure: [70, 75, 80, 72, 78, 82, 75],
  heartRate: [65, 70, 68, 72, 66, 74, 68],
  weight: [80, 80, 79, 81, 80, 79, 79]
})

const inputModalTitle = computed(() => {
  const titles = {
    bloodPressure: '记录血压',
    bloodSugar: '记录血糖',
    heartRate: '记录心率',
    sleep: '记录睡眠',
    weight: '记录体重',
    temperature: '记录体温',
    oxygen: '记录血氧',
    activity: '记录活动'
  }
  return titles[currentInputType.value] || '记录健康数据'
})

const inputPlaceholder = computed(() => {
  const placeholders = {
    bloodPressure: '收缩压',
    bloodSugar: '血糖值',
    heartRate: '心率',
    sleep: '睡眠时长(小时)',
    weight: '体重(kg)',
    temperature: '体温(°C)',
    oxygen: '血氧饱和度(%)',
    activity: '活动时长(分钟)'
  }
  return placeholders[currentInputType.value] || ''
})

const getRecordIcon = (type) => {
  const icons = {
    bloodPressure: '🩺',
    bloodSugar: '💉',
    heartRate: '💓',
    sleep: '😴',
    weight: '⚖️',
    temperature: '🌡️',
    oxygen: '🫁',
    activity: '🚶'
  }
  return icons[type] || '📝'
}

const getRecordTypeName = (type) => {
  const names = {
    bloodPressure: '血压记录',
    bloodSugar: '血糖记录',
    heartRate: '心率记录',
    sleep: '睡眠记录',
    weight: '体重记录',
    temperature: '体温记录',
    oxygen: '血氧记录',
    activity: '活动记录'
  }
  return names[type] || type
}

const formatTime = (timestamp) => {
  if (!timestamp) return '刚刚'
  const date = new Date(timestamp)
  return `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

const openInput = (type) => {
  currentInputType.value = type
  inputValue.value = ''
  inputValue2.value = ''
  showInputModal.value = true
}

const saveInput = () => {
  if (!inputValue.value) return
  let value = inputValue.value
  if (currentInputType.value === 'bloodPressure' && inputValue2.value) {
    value = `${inputValue.value}/${inputValue2.value}`
  }
  store.addHealthRecord({
    type: currentInputType.value,
    value: value,
    timestamp: Date.now()
  })
  showInputModal.value = false
}

const refreshTip = () => {
  const randomIndex = Math.floor(Math.random() * healthTips.length)
  currentTip.value = healthTips[randomIndex]
}

const refreshHealthData = () => {
  refreshTip()
}
</script>
