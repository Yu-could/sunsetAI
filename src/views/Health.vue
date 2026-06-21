<template>
  <div class="px-4 py-6 max-w-md mx-auto">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        <AppIcon name="health" size="lg" class="text-red-500" /> 健康监测
      </h1>
      <p class="text-gray-500">记录健康数据，关注身体状况</p>
    </header>

    <!-- 今日健康评分 -->
    <div class="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-6 text-white mb-6">
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

    <!-- 快速录入 -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4">快速录入</h3>
      <div class="grid grid-cols-4 gap-3">
        <button @click="openInput('bloodPressure')" class="flex flex-col items-center p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
          <span class="text-2xl mb-1">🩺</span>
          <span class="text-xs text-gray-600">血压</span>
        </button>
        <button @click="openInput('bloodSugar')" class="flex flex-col items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
          <span class="text-2xl mb-1">💉</span>
          <span class="text-xs text-gray-600">血糖</span>
        </button>
        <button @click="openInput('heartRate')" class="flex flex-col items-center p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors">
          <span class="text-2xl mb-1">💓</span>
          <span class="text-xs text-gray-600">心率</span>
        </button>
        <button @click="openInput('sleep')" class="flex flex-col items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
          <span class="text-2xl mb-1">😴</span>
          <span class="text-xs text-gray-600">睡眠</span>
        </button>
      </div>
      <div class="grid grid-cols-3 gap-3 mt-3">
        <button @click="openInput('weight')" class="flex flex-col items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
          <span class="text-2xl mb-1">⚖️</span>
          <span class="text-xs text-gray-600">体重</span>
        </button>
        <button @click="openInput('temperature')" class="flex flex-col items-center p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
          <span class="text-2xl mb-1">🌡️</span>
          <span class="text-xs text-gray-600">体温</span>
        </button>
        <button @click="openInput('oxygen')" class="flex flex-col items-center p-3 bg-cyan-50 rounded-lg hover:bg-cyan-100 transition-colors">
          <span class="text-2xl mb-1">🫁</span>
          <span class="text-xs text-gray-600">血氧</span>
        </button>
      </div>
    </div>

    <!-- 今日数据概览 -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4">今日数据</h3>
      <div v-if="todayHealthData.length > 0" class="grid grid-cols-2 gap-3">
        <div v-for="data in todayHealthData" :key="data.type" class="p-3 rounded-lg" :class="getCardClass(data.type)">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-xl">{{ data.icon }}</span>
            <span class="text-sm font-medium text-gray-700">{{ data.name }}</span>
          </div>
          <p class="text-2xl font-bold">{{ data.value }}</p>
          <div class="flex items-center justify-between mt-1">
            <span class="text-xs text-gray-500">{{ formatTime(data.timestamp) }}</span>
            <span :class="getStatusClass(data.status)" class="text-xs px-2 py-0.5 rounded-full">{{ data.status }}</span>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-8 text-gray-400">
        <div class="text-4xl mb-3">📊</div>
        <p>今日暂无健康数据</p>
        <p class="text-sm">点击上方按钮开始记录</p>
      </div>
    </div>

    <!-- 健康趋势 -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4">近期趋势</h3>
      <div class="space-y-4">
        <div v-if="bloodPressureTrend.length > 0">
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-600 flex items-center gap-2">
              <span>🩺</span> 血压趋势
            </span>
            <span class="text-sm text-gray-400">近7天</span>
          </div>
          <div class="h-20 bg-gray-50 rounded-lg flex items-end px-3 py-2 gap-1">
            <div v-for="(val, i) in bloodPressureTrend" :key="i" class="flex-1 flex flex-col items-center gap-0.5">
              <div class="w-full bg-red-400 rounded-t" :style="{ height: (val.high / 200 * 100) + '%', minHeight: '4px' }"></div>
              <div class="w-full bg-red-300 rounded-t" :style="{ height: (val.low / 120 * 100) + '%', minHeight: '4px' }"></div>
            </div>
          </div>
          <div class="flex justify-between text-xs text-gray-400 mt-1 px-1">
            <span>收缩压/舒张压</span>
            <span>单位:mmHg</span>
          </div>
        </div>
        <div v-if="heartRateTrend.length > 0">
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-600 flex items-center gap-2">
              <span>💓</span> 心率趋势
            </span>
            <span class="text-sm text-gray-400">近7天</span>
          </div>
          <div class="h-20 bg-gray-50 rounded-lg flex items-end px-3 py-2 gap-1">
            <div v-for="(val, i) in heartRateTrend" :key="i" class="flex-1 bg-pink-400 rounded-t" :style="{ height: Math.min((val / 140 * 100), 100) + '%', minHeight: '4px' }"></div>
          </div>
          <div class="flex justify-between text-xs text-gray-400 mt-1 px-1">
            <span>正常范围: 60-100次/分</span>
          </div>
        </div>
        <div v-if="weightTrend.length > 0">
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-600 flex items-center gap-2">
              <span>⚖️</span> 体重趋势
            </span>
            <span class="text-sm text-gray-400">近7天</span>
          </div>
          <div class="h-20 bg-gray-50 rounded-lg flex items-end px-3 py-2 gap-1">
            <div v-for="(val, i) in weightTrend" :key="i" class="flex-1 bg-green-400 rounded-t" :style="{ height: Math.min((val / 100 * 100), 100) + '%', minHeight: '4px' }"></div>
          </div>
          <div class="flex justify-between text-xs text-gray-400 mt-1 px-1">
            <span>单位: kg</span>
            <span v-if="bmi" class="text-green-600">BMI: {{ bmi }}</span>
          </div>
        </div>
      </div>
      <div v-if="!bloodPressureTrend.length && !heartRateTrend.length && !weightTrend.length" class="text-center py-6 text-gray-400">
        <p class="text-sm">暂无趋势数据</p>
        <p class="text-xs">持续记录数据后显示趋势图</p>
      </div>
    </div>

    <!-- 健康知识 -->
    <div class="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white mb-6">
      <h3 class="text-lg font-bold mb-3 flex items-center gap-2">
        <span>💡</span> 每日健康知识
      </h3>
      <div class="bg-white/10 rounded-lg p-4">
        <p class="text-sm leading-relaxed">{{ dailyHealthTip }}</p>
      </div>
      <button @click="refreshTip" class="mt-3 text-blue-200 text-sm hover:text-white flex items-center gap-1">
        <span>🔄</span> 换一条
      </button>
    </div>

    <!-- 健康建议 -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
        <span>🎯</span> 健康建议
      </h3>
      <div class="space-y-3">
        <div v-for="(advice, i) in healthAdvices" :key="i" class="flex items-start gap-3 p-3 rounded-lg" :class="advice.bgClass">
          <span class="text-xl">{{ advice.icon }}</span>
          <div>
            <p class="font-medium text-gray-800 text-sm">{{ advice.title }}</p>
            <p class="text-xs text-gray-500 mt-0.5">{{ advice.desc }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 历史记录 -->
    <div class="bg-white rounded-xl shadow-md p-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
        <span>📋</span> 历史记录
      </h3>
      <div v-if="recentRecords.length > 0" class="space-y-2 max-h-60 overflow-y-auto">
        <div v-for="(record, i) in recentRecords" :key="i" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div class="flex items-center gap-3">
            <span class="text-lg">{{ getRecordIcon(record.type) }}</span>
            <div>
              <p class="text-sm font-medium text-gray-800">{{ getRecordName(record) }}</p>
              <p class="text-xs text-gray-400">{{ formatDate(record.timestamp) }}</p>
            </div>
          </div>
          <span :class="getStatusClass(record.status)" class="text-xs px-2 py-1 rounded-full">{{ record.status || '正常' }}</span>
        </div>
      </div>
      <div v-else class="text-center py-6 text-gray-400">
        <p class="text-sm">暂无历史记录</p>
      </div>
    </div>

    <!-- 输入弹窗 -->
    <div v-if="showInputModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl p-6 w-full max-w-sm">
        <h3 class="text-lg font-bold text-gray-800 mb-4">{{ inputTitles[inputType] }}</h3>
        
        <!-- 语音输入按钮 -->
        <button @click="toggleVoiceInput" 
          :class="isVoiceInput ? 'bg-red-500 text-white animate-pulse' : 'bg-blue-500 text-white'"
          class="w-full py-3 rounded-xl font-medium mb-4 flex items-center justify-center gap-2 transition-all">
          <span class="text-xl">{{ isVoiceInput ? '⏹️' : '🎤' }}</span>
          {{ isVoiceInput ? '停止语音输入' : '语音输入' }}
        </button>
        <p v-if="isVoiceInput" class="text-center text-blue-500 text-sm mb-4 animate-pulse">
          请说出您的健康数据，如"血压12080"或"血糖5.5"
        </p>
        
        <div class="space-y-4">
          <div v-if="inputType === 'bloodPressure'">
            <label class="block text-gray-600 text-sm mb-2">收缩压 (高压) mmHg</label>
            <input v-model="inputData.highPressure" type="number" placeholder="正常范围: 90-140" class="w-full border border-gray-200 rounded-lg p-3 focus:border-red-500">
            <label class="block text-gray-600 text-sm mb-2 mt-4">舒张压 (低压) mmHg</label>
            <input v-model="inputData.lowPressure" type="number" placeholder="正常范围: 60-90" class="w-full border border-gray-200 rounded-lg p-3 focus:border-red-500">
            <p class="text-xs text-gray-400 mt-2">参考值：正常血压 <120/80 mmHg</p>
          </div>
          <div v-else-if="inputType === 'bloodSugar'">
            <label class="block text-gray-600 text-sm mb-2">空腹血糖值 (mmol/L)</label>
            <input v-model="inputData.bloodSugar" type="number" step="0.1" placeholder="正常范围: 3.9-6.1" class="w-full border border-gray-200 rounded-lg p-3 focus:border-purple-500">
            <p class="text-xs text-gray-400 mt-2">参考值：空腹正常 <6.1 mmol/L</p>
          </div>
          <div v-else-if="inputType === 'heartRate'">
            <label class="block text-gray-600 text-sm mb-2">心率 (次/分)</label>
            <input v-model="inputData.heartRate" type="number" placeholder="正常范围: 60-100" class="w-full border border-gray-200 rounded-lg p-3 focus:border-pink-500">
            <p class="text-xs text-gray-400 mt-2">参考值：安静状态下 60-100 次/分</p>
          </div>
          <div v-else-if="inputType === 'sleep'">
            <label class="block text-gray-600 text-sm mb-2">睡眠时长 (小时)</label>
            <input v-model="inputData.sleepHours" type="number" step="0.5" placeholder="如: 7.5" class="w-full border border-gray-200 rounded-lg p-3 focus:border-blue-500">
            <label class="block text-gray-600 text-sm mb-2 mt-4">睡眠质量</label>
            <select v-model="inputData.sleepQuality" class="w-full border border-gray-200 rounded-lg p-3 focus:border-blue-500">
              <option value="很好">很好 😃</option>
              <option value="较好">较好 🙂</option>
              <option value="一般">一般 😐</option>
              <option value="较差">较差 😫</option>
            </select>
            <p class="text-xs text-gray-400 mt-2">建议：每日睡眠 7-9 小时</p>
          </div>
          <div v-else-if="inputType === 'weight'">
            <label class="block text-gray-600 text-sm mb-2">体重 (kg)</label>
            <input v-model="inputData.weight" type="number" step="0.1" placeholder="如: 65.5" class="w-full border border-gray-200 rounded-lg p-3 focus:border-green-500">
            <div v-if="latestHeight" class="mt-3 p-3 bg-green-50 rounded-lg">
              <p class="text-sm text-gray-600">根据您的身高 {{ latestHeight }}cm</p>
              <p class="text-sm font-medium text-green-600">BMI: {{ calculatedBMI }}</p>
              <p class="text-xs text-gray-500">{{ bmiAdvice }}</p>
            </div>
            <p class="text-xs text-gray-400 mt-2">建议：每周固定时间测量</p>
          </div>
          <div v-else-if="inputType === 'temperature'">
            <label class="block text-gray-600 text-sm mb-2">体温 (°C)</label>
            <input v-model="inputData.temperature" type="number" step="0.1" placeholder="正常范围: 36-37" class="w-full border border-gray-200 rounded-lg p-3 focus:border-orange-500">
            <p class="text-xs text-gray-400 mt-2">参考值：正常体温 36-37°C</p>
          </div>
          <div v-else-if="inputType === 'oxygen'">
            <label class="block text-gray-600 text-sm mb-2">血氧饱和度 (%)</label>
            <input v-model="inputData.oxygen" type="number" placeholder="正常范围: 95-100" class="w-full border border-gray-200 rounded-lg p-3 focus:border-cyan-500">
            <p class="text-xs text-gray-400 mt-2">参考值：正常 ≥95%</p>
          </div>
        </div>
        <div class="flex gap-3 mt-6">
          <button @click="showInputModal = false" class="flex-1 bg-gray-100 text-gray-600 py-3 rounded-lg hover:bg-gray-200">取消</button>
          <button @click="saveHealthData" class="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { useAppStore } from '../stores/appStore'
import { useToastStore } from '../stores/toastStore'
import { voiceAssistant } from '../utils/voiceAssistant'
import AppIcon from '../components/AppIcon.vue'

const store = useAppStore()
const toast = useToastStore()

const showInputModal = ref(false)
const inputType = ref('')
const inputData = ref({
  highPressure: '',
  lowPressure: '',
  bloodSugar: '',
  heartRate: '',
  sleepHours: '',
  sleepQuality: '较好',
  weight: '',
  temperature: '',
  oxygen: ''
})
const isVoiceInput = ref(false)

const inputTitles = {
  bloodPressure: '📊 录入血压',
  bloodSugar: '🩸 录入血糖',
  heartRate: '💓 录入心率',
  sleep: '😴 录入睡眠',
  weight: '⚖️ 录入体重',
  temperature: '🌡️ 录入体温',
  oxygen: '🫁 录入血氧'
}

const healthTips = [
  '老年人每天步行30分钟可以改善心肺功能，降低心血管疾病风险。',
  '保持每天7-8小时的睡眠有助于免疫系统修复和记忆力维持。',
  '多吃深色蔬菜和水果可以补充维生素和膳食纤维，增强免疫力。',
  '定期测量血压可以及早发现高血压，控制并发症的发生。',
  '老年人应保持适当的户外活动，接受阳光照射，促进维生素D合成。',
  '饮食少盐少油，控制热量摄入，有助于预防肥胖和相关慢性病。',
  '保持心情愉快，积极参与社交活动，有助于预防老年抑郁。',
  '定期体检可以及早发现健康问题，实现早发现、早治疗。',
  '养成记录健康数据的习惯，便于医生了解您的健康状况变化。',
  '起床时动作要缓慢，避免猛然起身导致血压波动。'
]

const dailyHealthTip = ref(healthTips[0])

const refreshTip = () => {
  const randomIndex = Math.floor(Math.random() * healthTips.length)
  dailyHealthTip.value = healthTips[randomIndex]
}

const latestHeight = computed(() => {
  const records = store.healthRecords.filter(r => r.height)
  return records.length > 0 ? records[records.length - 1].height : null
})

const calculatedBMI = computed(() => {
  if (!inputData.value.weight || !latestHeight.value) return null
  const heightM = latestHeight.value / 100
  const bmi = (inputData.value.weight / (heightM * heightM)).toFixed(1)
  return bmi
})

const bmiAdvice = computed(() => {
  if (!calculatedBMI.value) return ''
  const bmi = parseFloat(calculatedBMI.value)
  if (bmi < 18.5) return '偏瘦，建议加强营养'
  if (bmi < 24) return '正常，继续保持'
  if (bmi < 28) return '偏胖，建议适当运动'
  return '肥胖，建议咨询医生'
})

const healthScore = computed(() => {
  if (!todayHealthData.value.length) return '--'
  let score = 85
  todayHealthData.value.forEach(data => {
    if (data.status === '正常') score += 5
    else if (data.status === '偏低' || data.status === '略低') score += 2
  })
  return Math.min(score, 100)
})

const healthStatus = computed(() => {
  const score = healthScore.value
  if (score === '--') return '暂无数据'
  if (score >= 90) return '优秀'
  if (score >= 80) return '良好'
  if (score >= 70) return '一般'
  return '需注意'
})

const scoreEmoji = computed(() => {
  const score = healthScore.value
  if (score === '--') return '📊'
  if (score >= 90) return '🌟'
  if (score >= 80) return '😊'
  if (score >= 70) return '😐'
  return '😟'
})

const dataCompleteness = computed(() => {
  const types = ['bloodPressure', 'heartRate', 'bloodSugar', 'sleep', 'weight', 'temperature', 'oxygen']
  const today = todayHealthData.value.map(d => d.type)
  const count = types.filter(t => today.includes(t)).length
  return Math.round((count / 7) * 100)
})

const todayHealthData = computed(() => {
  const todayStr = new Date().toDateString()
  return store.healthRecords
    .filter(r => new Date(r.timestamp).toDateString() === todayStr)
    .map(r => {
      const typeMap = {
        bloodPressure: { name: '血压', icon: '🩺', format: () => `${r.highPressure}/${r.lowPressure} mmHg` },
        bloodSugar: { name: '血糖', icon: '🩸', format: () => `${r.bloodSugar} mmol/L` },
        heartRate: { name: '心率', icon: '💓', format: () => `${r.heartRate} 次/分` },
        sleep: { name: '睡眠', icon: '😴', format: () => `${r.sleepHours} 小时` },
        weight: { name: '体重', icon: '⚖️', format: () => `${r.weight} kg` },
        temperature: { name: '体温', icon: '🌡️', format: () => `${r.temperature} °C` },
        oxygen: { name: '血氧', icon: '🫁', format: () => `${r.oxygen}%` }
      }
      const info = typeMap[r.type] || { name: r.type, icon: '📊', format: () => '-' }
      return {
        type: r.type,
        name: info.name,
        icon: info.icon,
        value: info.format(),
        status: r.status || '正常',
        timestamp: r.timestamp
      }
    })
})

const bloodPressureTrend = computed(() => {
  const records = store.healthRecords.filter(r => r.type === 'bloodPressure').slice(-7)
  return records.map(r => ({ high: r.highPressure, low: r.lowPressure }))
})

const heartRateTrend = computed(() => {
  const records = store.healthRecords.filter(r => r.type === 'heartRate').slice(-7)
  return records.map(r => r.heartRate)
})

const weightTrend = computed(() => {
  const records = store.healthRecords.filter(r => r.type === 'weight').slice(-7)
  return records.map(r => r.weight)
})

const bmi = computed(() => {
  const weightRecords = store.healthRecords.filter(r => r.type === 'weight').slice(-1)
  if (!weightRecords.length || !latestHeight.value) return null
  const heightM = latestHeight.value / 100
  return (weightRecords[0].weight / (heightM * heightM)).toFixed(1)
})

const recentRecords = computed(() => {
  return store.healthRecords.slice(-10).reverse()
})

const healthAdvices = computed(() => {
  const advices = []
  
  const hasBloodPressure = todayHealthData.value.some(d => d.type === 'bloodPressure')
  if (!hasBloodPressure) {
    advices.push({
      icon: '🩺',
      title: '建议测量血压',
      desc: '定期监测血压有助于预防心血管疾病',
      bgClass: 'bg-red-50'
    })
  }
  
  const hasWeight = todayHealthData.value.some(d => d.type === 'weight')
  if (!hasWeight) {
    advices.push({
      icon: '⚖️',
      title: '建议记录体重',
      desc: '体重变化可能反映健康状况',
      bgClass: 'bg-green-50'
    })
  }
  
  const hasSleep = todayHealthData.value.some(d => d.type === 'sleep')
  if (!hasSleep) {
    advices.push({
      icon: '😴',
      title: '记录睡眠情况',
      desc: '良好的睡眠对健康至关重要',
      bgClass: 'bg-blue-50'
    })
  }
  
  if (advices.length === 0) {
    advices.push({
      icon: '✅',
      title: '数据记录完整',
      desc: '今日健康数据记录已完成，继续保持',
      bgClass: 'bg-green-50'
    })
  }
  
  advices.push({
    icon: '🚶',
    title: '适度运动',
    desc: '每天散步30分钟对身体有益',
    bgClass: 'bg-orange-50'
  })
  
  advices.push({
    icon: '💧',
    title: '多喝水',
    desc: '每天饮水1500-2000毫升',
    bgClass: 'bg-cyan-50'
  })
  
  return advices
})

const getCardClass = (type) => {
  const classes = {
    bloodPressure: 'bg-red-50',
    bloodSugar: 'bg-purple-50',
    heartRate: 'bg-pink-50',
    sleep: 'bg-blue-50',
    weight: 'bg-green-50',
    temperature: 'bg-orange-50',
    oxygen: 'bg-cyan-50'
  }
  return classes[type] || 'bg-gray-50'
}

const getStatusClass = (status) => {
  if (status === '正常' || status === '很好' || status === '较好') return 'bg-green-100 text-green-700'
  if (status === '偏高' || status === '略高' || status === '较差') return 'bg-red-100 text-red-700'
  if (status === '偏低' || status === '略低') return 'bg-yellow-100 text-yellow-700'
  return 'bg-gray-100 text-gray-700'
}

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

const getRecordIcon = (type) => {
  const icons = {
    bloodPressure: '🩺',
    bloodSugar: '🩸',
    heartRate: '💓',
    sleep: '😴',
    weight: '⚖️',
    temperature: '🌡️',
    oxygen: '🫁'
  }
  return icons[type] || '📊'
}

const getRecordName = (record) => {
  if (record.type === 'bloodPressure') return `血压 ${record.highPressure}/${record.lowPressure} mmHg`
  if (record.type === 'bloodSugar') return `血糖 ${record.bloodSugar} mmol/L`
  if (record.type === 'heartRate') return `心率 ${record.heartRate} 次/分`
  if (record.type === 'sleep') return `睡眠 ${record.sleepHours} 小时 (${record.sleepQuality})`
  if (record.type === 'weight') return `体重 ${record.weight} kg`
  if (record.type === 'temperature') return `体温 ${record.temperature} °C`
  if (record.type === 'oxygen') return `血氧 ${record.oxygen}%`
  return record.type
}

const openInput = (type) => {
  inputType.value = type
  inputData.value = {
    highPressure: '',
    lowPressure: '',
    bloodSugar: '',
    heartRate: '',
    sleepHours: '',
    sleepQuality: '较好',
    weight: '',
    temperature: '',
    oxygen: ''
  }
  showInputModal.value = true
}

const saveHealthData = () => {
  let record = { type: inputType.value, timestamp: new Date().toISOString() }
  
  if (inputType.value === 'bloodPressure') {
    if (!inputData.value.highPressure || !inputData.value.lowPressure) {
      toast.warning('请输入完整的血压数据', 2500)
      return
    }
    record.highPressure = parseInt(inputData.value.highPressure)
    record.lowPressure = parseInt(inputData.value.lowPressure)
    if (record.highPressure > 140 || record.lowPressure > 90) {
      record.status = '偏高'
    } else if (record.highPressure < 90 || record.lowPressure < 60) {
      record.status = '偏低'
    } else {
      record.status = '正常'
    }
  } else if (inputType.value === 'bloodSugar') {
    if (!inputData.value.bloodSugar) {
      toast.warning('请输入血糖值', 2500)
      return
    }
    record.bloodSugar = parseFloat(inputData.value.bloodSugar)
    if (record.bloodSugar > 7.0) {
      record.status = '偏高'
    } else if (record.bloodSugar < 3.9) {
      record.status = '偏低'
    } else {
      record.status = '正常'
    }
  } else if (inputType.value === 'heartRate') {
    if (!inputData.value.heartRate) {
      toast.warning('请输入心率', 2500)
      return
    }
    record.heartRate = parseInt(inputData.value.heartRate)
    if (record.heartRate > 100 || record.heartRate < 60) {
      record.status = '异常'
    } else {
      record.status = '正常'
    }
  } else if (inputType.value === 'sleep') {
    if (!inputData.value.sleepHours) {
      toast.warning('请输入睡眠时长', 2500)
      return
    }
    record.sleepHours = parseFloat(inputData.value.sleepHours)
    record.sleepQuality = inputData.value.sleepQuality
    if (record.sleepHours >= 7 && record.sleepHours <= 9) {
      record.status = record.sleepQuality
    } else if (record.sleepHours < 6) {
      record.status = '不足'
    } else {
      record.status = '过多'
    }
  } else if (inputType.value === 'weight') {
    if (!inputData.value.weight) {
      toast.warning('请输入体重', 2500)
      return
    }
    record.weight = parseFloat(inputData.value.weight)
    record.status = '正常'
  } else if (inputType.value === 'temperature') {
    if (!inputData.value.temperature) {
      toast.warning('请输入体温', 2500)
      return
    }
    record.temperature = parseFloat(inputData.value.temperature)
    if (record.temperature > 37.3) {
      record.status = '偏高'
    } else if (record.temperature < 36) {
      record.status = '偏低'
    } else {
      record.status = '正常'
    }
  } else if (inputType.value === 'oxygen') {
    if (!inputData.value.oxygen) {
      toast.warning('请输入血氧', 2500)
      return
    }
    record.oxygen = parseInt(inputData.value.oxygen)
    if (record.oxygen < 94) {
      record.status = '偏低'
    } else {
      record.status = '正常'
    }
  }
  
  store.addHealthRecord(record)
  showInputModal.value = false
  toast.success('健康数据已保存', 2000)
}

onMounted(() => {
  store.loadHealthRecords()
  voiceAssistant.addCallback(handleVoiceEvent)
})

onUnmounted(() => {
  voiceAssistant.removeCallback(handleVoiceEvent)
  voiceAssistant.stopListening()
  isVoiceInput.value = false
})

const toggleVoiceInput = () => {
  if (isVoiceInput.value) {
    isVoiceInput.value = false
    voiceAssistant.stopListening()
    toast.success('语音输入已停止', 1500)
  } else {
    if (!voiceAssistant.isSupported()) {
      toast.warning('您的浏览器不支持语音识别', 2000)
      return
    }
    isVoiceInput.value = true
    toast.info('开始语音输入，请说出您的健康数据...', 2000)
    voiceAssistant.startListening()
  }
}

const handleVoiceEvent = (event, data) => {
  switch (event) {
    case 'result':
      parseHealthData(data)
      break
    case 'error':
      isVoiceInput.value = false
      if (data === 'browser-not-supported') {
        toast.warning('您的浏览器不支持语音识别', 2000)
      } else {
        toast.warning('语音识别出错：' + data, 2000)
      }
      break
    case 'end':
      if (isVoiceInput.value) {
        isVoiceInput.value = false
        toast.success('语音输入已完成', 1500)
      }
      break
  }
}

const parseHealthData = (text) => {
  if (!text) return
  
  // 解析血压数据：如"血压12080"或"高压120低压80"
  if (inputType.value === 'bloodPressure') {
    const bpMatch = text.match(/(\d{2,3})[^\d]*(\d{2,3})/)
    if (bpMatch) {
      inputData.value.highPressure = bpMatch[1]
      inputData.value.lowPressure = bpMatch[2]
      toast.success(`识别到血压：${bpMatch[1]}/${bpMatch[2]} mmHg`, 2000)
      return
    }
    const highMatch = text.match(/高压[^\d]*(\d{2,3})|收缩压[^\d]*(\d{2,3})/)
    const lowMatch = text.match(/低压[^\d]*(\d{2,3})|舒张压[^\d]*(\d{2,3})/)
    if (highMatch) inputData.value.highPressure = highMatch[1]
    if (lowMatch) inputData.value.lowPressure = lowMatch[1]
    if (highMatch || lowMatch) {
      toast.success(`识别到血压数据`, 2000)
    }
  }
  
  // 解析血糖数据：如"血糖5.5"或"血糖值5.5"
  if (inputType.value === 'bloodSugar') {
    const bsMatch = text.match(/血糖[^\d]*(\d+\.?\d*)|(\d+\.?\d*)/)
    if (bsMatch) {
      inputData.value.bloodSugar = bsMatch[1] || bsMatch[2]
      toast.success(`识别到血糖：${inputData.value.bloodSugar} mmol/L`, 2000)
    }
  }
  
  // 解析心率数据：如"心率75"或"心跳75"
  if (inputType.value === 'heartRate') {
    const hrMatch = text.match(/心率[^\d]*(\d{2,3})|心跳[^\d]*(\d{2,3})|(\d{2,3})次/)
    if (hrMatch) {
      inputData.value.heartRate = hrMatch[1] || hrMatch[2] || hrMatch[3]
      toast.success(`识别到心率：${inputData.value.heartRate} 次/分`, 2000)
    }
  }
  
  // 解析睡眠数据：如"睡眠7.5小时"或"睡了7个小时"
  if (inputType.value === 'sleep') {
    const sleepMatch = text.match(/睡眠[^\d]*(\d+\.?\d*)|睡了[^\d]*(\d+\.?\d*)|(\d+\.?\d*)小时/)
    if (sleepMatch) {
      inputData.value.sleepHours = sleepMatch[1] || sleepMatch[2] || sleepMatch[3]
      toast.success(`识别到睡眠：${inputData.value.sleepHours} 小时`, 2000)
    }
    // 解析睡眠质量
    if (text.includes('很好') || text.includes('很好睡')) inputData.value.sleepQuality = '很好'
    else if (text.includes('较好') || text.includes('还行')) inputData.value.sleepQuality = '较好'
    else if (text.includes('一般') || text.includes('不太好')) inputData.value.sleepQuality = '一般'
    else if (text.includes('较差') || text.includes('没睡好')) inputData.value.sleepQuality = '较差'
  }
  
  // 解析体重数据：如"体重65"或"65公斤"
  if (inputType.value === 'weight') {
    const weightMatch = text.match(/体重[^\d]*(\d+\.?\d*)|(\d+\.?\d*)公斤|(\d+\.?\d*)斤/)
    if (weightMatch) {
      let weight = parseFloat(weightMatch[1] || weightMatch[2] || weightMatch[3])
      // 如果是"斤"，转换为公斤
      if (weightMatch[3]) weight = weight / 2
      inputData.value.weight = weight
      toast.success(`识别到体重：${weight} kg`, 2000)
    }
  }
  
  // 解析体温数据：如"体温36.5"或"36.5度"
  if (inputType.value === 'temperature') {
    const tempMatch = text.match(/体温[^\d]*(\d+\.?\d*)|(\d+\.?\d*)度/)
    if (tempMatch) {
      inputData.value.temperature = tempMatch[1] || tempMatch[2]
      toast.success(`识别到体温：${inputData.value.temperature} °C`, 2000)
    }
  }
  
  // 解析血氧数据：如"血氧98"或"98%"
  if (inputType.value === 'oxygen') {
    const oxyMatch = text.match(/血氧[^\d]*(\d{2,3})|(\d{2,3})%/)
    if (oxyMatch) {
      inputData.value.oxygen = oxyMatch[1] || oxyMatch[2]
      toast.success(`识别到血氧：${inputData.value.oxygen}%`, 2000)
    }
  }
}
</script>
