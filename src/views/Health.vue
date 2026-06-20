<template>
  <div class="px-4 py-6 max-w-md mx-auto">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        <AppIcon name="health" size="lg" class="text-red-500" /> 健康监测
      </h1>
      <p class="text-gray-500">记录健康数据，关注身体状况</p>
    </header>

    <!-- 快速录入 -->
    <div class="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-6 text-white mb-6">
      <h3 class="text-lg font-bold mb-4">快速录入今日数据</h3>
      <div class="grid grid-cols-3 gap-3">
        <button @click="openInput('bloodPressure')" class="bg-white/20 hover:bg-white/30 py-3 rounded-lg text-center">
          <div class="text-2xl mb-1">🩺</div>
          <p class="text-sm">血压</p>
        </button>
        <button @click="openInput('bloodSugar')" class="bg-white/20 hover:bg-white/30 py-3 rounded-lg text-center">
          <div class="text-2xl mb-1">💉</div>
          <p class="text-sm">血糖</p>
        </button>
        <button @click="openInput('heartRate')" class="bg-white/20 hover:bg-white/30 py-3 rounded-lg text-center">
          <div class="text-2xl mb-1">💓</div>
          <p class="text-sm">心率</p>
        </button>
      </div>
    </div>

    <!-- 今日数据概览 -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4">今日健康概览</h3>
      <div v-if="todayHealthData.length > 0" class="space-y-4">
        <div v-for="data in todayHealthData" :key="data.type" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div class="flex items-center gap-3">
            <span class="text-2xl">{{ data.icon }}</span>
            <div>
              <p class="font-medium text-gray-800">{{ data.name }}</p>
              <p class="text-sm text-gray-500">{{ formatTime(data.timestamp) }}</p>
            </div>
          </div>
          <div class="text-right">
            <p class="font-bold text-gray-800">{{ data.value }}</p>
            <p :class="data.status === '正常' ? 'text-green-500' : 'text-orange-500'" class="text-sm">{{ data.status }}</p>
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
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-600">血压趋势</span>
            <span class="text-sm text-gray-400">近7天</span>
          </div>
          <div class="h-16 bg-gray-50 rounded-lg flex items-end px-2 gap-1">
            <div v-for="(val, i) in bloodPressureTrend" :key="i" class="flex-1 bg-red-400 rounded-t" :style="{ height: val + '%' }"></div>
            <div v-if="bloodPressureTrend.length === 0" class="flex-1 text-center text-gray-400 text-sm py-4">暂无数据</div>
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-600">心率趋势</span>
            <span class="text-sm text-gray-400">近7天</span>
          </div>
          <div class="h-16 bg-gray-50 rounded-lg flex items-end px-2 gap-1">
            <div v-for="(val, i) in heartRateTrend" :key="i" class="flex-1 bg-pink-400 rounded-t" :style="{ height: val + '%' }"></div>
            <div v-if="heartRateTrend.length === 0" class="flex-1 text-center text-gray-400 text-sm py-4">暂无数据</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 健康建议 -->
    <div class="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white">
      <h3 class="text-lg font-bold mb-3">💡 健康建议</h3>
      <div class="space-y-3">
        <div class="flex items-start gap-3">
          <span class="text-xl">🥗</span>
          <p class="text-sm">保持均衡饮食，多吃蔬菜水果</p>
        </div>
        <div class="flex items-start gap-3">
          <span class="text-xl">🚶</span>
          <p class="text-sm">每天适量运动，散步30分钟</p>
        </div>
        <div class="flex items-start gap-3">
          <span class="text-xl">😴</span>
          <p class="text-sm">保证充足睡眠，早睡早起</p>
        </div>
      </div>
    </div>

    <!-- 输入弹窗 -->
    <div v-if="showInputModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl p-6 w-full max-w-sm">
        <h3 class="text-lg font-bold text-gray-800 mb-4">{{ inputTitle }}</h3>
        <div class="space-y-4">
          <div v-if="inputType === 'bloodPressure'">
            <label class="block text-gray-600 text-sm mb-2">收缩压 (高压)</label>
            <input v-model="inputData.highPressure" type="number" placeholder="如: 120" class="w-full border border-gray-200 rounded-lg p-3 focus:border-red-500">
            <label class="block text-gray-600 text-sm mb-2 mt-4">舒张压 (低压)</label>
            <input v-model="inputData.lowPressure" type="number" placeholder="如: 80" class="w-full border border-gray-200 rounded-lg p-3 focus:border-red-500">
          </div>
          <div v-else-if="inputType === 'bloodSugar'">
            <label class="block text-gray-600 text-sm mb-2">血糖值 (mmol/L)</label>
            <input v-model="inputData.bloodSugar" type="number" step="0.1" placeholder="如: 5.6" class="w-full border border-gray-200 rounded-lg p-3 focus:border-red-500">
          </div>
          <div v-else-if="inputType === 'heartRate'">
            <label class="block text-gray-600 text-sm mb-2">心率 (次/分)</label>
            <input v-model="inputData.heartRate" type="number" placeholder="如: 72" class="w-full border border-gray-200 rounded-lg p-3 focus:border-red-500">
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
import { ref, onMounted, computed } from 'vue'
import { useAppStore } from '../stores/appStore'
import { useToastStore } from '../stores/toastStore'
import AppIcon from '../components/AppIcon.vue'

const store = useAppStore()
const toast = useToastStore()

const showInputModal = ref(false)
const inputType = ref('')
const inputData = ref({
  highPressure: '',
  lowPressure: '',
  bloodSugar: '',
  heartRate: ''
})

const inputTitles = {
  bloodPressure: '录入血压',
  bloodSugar: '录入血糖',
  heartRate: '录入心率'
}

const inputTitle = computed(() => inputTitles[inputType.value] || '录入数据')

const todayHealthData = computed(() => {
  const todayStr = new Date().toDateString()
  return store.healthRecords.filter(r => new Date(r.timestamp).toDateString() === todayStr)
    .map(r => ({
      type: r.type,
      name: r.type === 'bloodPressure' ? '血压' : (r.type === 'bloodSugar' ? '血糖' : '心率'),
      icon: r.type === 'bloodPressure' ? '🩺' : (r.type === 'bloodSugar' ? '💉' : '💓'),
      value: r.type === 'bloodPressure' ? `${r.highPressure}/${r.lowPressure} mmHg` : (r.type === 'bloodSugar' ? `${r.bloodSugar} mmol/L` : `${r.heartRate} 次/分`),
      status: r.status || '正常',
      timestamp: r.timestamp
    }))
})

const bloodPressureTrend = computed(() => {
  const records = store.healthRecords.filter(r => r.type === 'bloodPressure').slice(-7)
  if (records.length === 0) return []
  return records.map(r => Math.min((r.highPressure / 180) * 100, 100))
})

const heartRateTrend = computed(() => {
  const records = store.healthRecords.filter(r => r.type === 'heartRate').slice(-7)
  if (records.length === 0) return []
  return records.map(r => Math.min((r.heartRate / 120) * 100, 100))
})

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

const openInput = (type) => {
  inputType.value = type
  inputData.value = { highPressure: '', lowPressure: '', bloodSugar: '', heartRate: '' }
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
    record.status = record.highPressure > 140 || record.lowPressure > 90 ? '偏高' : '正常'
  } else if (inputType.value === 'bloodSugar') {
    if (!inputData.value.bloodSugar) {
      toast.warning('请输入血糖值', 2500)
      return
    }
    record.bloodSugar = parseFloat(inputData.value.bloodSugar)
    record.status = record.bloodSugar > 7.0 ? '偏高' : '正常'
  } else if (inputType.value === 'heartRate') {
    if (!inputData.value.heartRate) {
      toast.warning('请输入心率', 2500)
      return
    }
    record.heartRate = parseInt(inputData.value.heartRate)
    record.status = record.heartRate > 100 || record.heartRate < 60 ? '异常' : '正常'
  }
  
  store.addHealthRecord(record)
  showInputModal.value = false
  toast.success('健康数据已保存', 2000)
}

onMounted(() => {
  store.loadHealthRecords()
})
</script>