<template>
  <div class="px-4 py-6 max-w-md mx-auto">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        <AppIcon name="medicine" size="lg" class="text-purple-500" /> 用药提醒
      </h1>
      <p class="text-gray-500">定时提醒吃药，科学管理用药</p>
    </header>

    <!-- 今日用药状态 -->
    <div class="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl p-6 text-white mb-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-purple-200 text-sm mb-1">今日服药进度</p>
          <p class="text-4xl font-bold">{{ takenCount }}/{{ totalMedicines }}</p>
          <p class="text-purple-200 text-sm mt-1">{{ complianceRate }}% 依从率</p>
        </div>
        <div class="text-6xl">{{ complianceEmoji }}</div>
      </div>
      <div v-if="totalMedicines > 0" class="w-full bg-white/20 rounded-full h-3 mt-4">
        <div class="bg-white h-3 rounded-full transition-all" :style="{ width: complianceRate + '%' }"></div>
      </div>
      <p v-if="nextMedicine" class="mt-3 text-purple-200 text-sm">
        ⏰ 下次服药: {{ nextMedicine.name }} {{ nextMedicine.time }}
      </p>
    </div>

    <!-- 快速操作 -->
    <div class="grid grid-cols-2 gap-3 mb-6">
      <button @click="showAddModal = true" class="bg-white rounded-xl shadow-md p-4 flex flex-col items-center gap-2 text-purple-600 hover:bg-purple-50 transition-colors">
        <span class="text-3xl">➕</span>
        <span class="text-sm font-medium">添加药物</span>
      </button>
      <button @click="showScanModal = true" class="bg-white rounded-xl shadow-md p-4 flex flex-col items-center gap-2 text-indigo-600 hover:bg-indigo-50 transition-colors">
        <span class="text-3xl">📷</span>
        <span class="text-sm font-medium">扫描药盒</span>
      </button>
    </div>

    <!-- 服药提醒列表 -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold text-gray-700 flex items-center gap-2">
          <span>💊</span> 我的药物
        </h3>
        <span class="text-sm text-gray-400">{{ store.medicineRecords.length }} 种</span>
      </div>
      
      <div v-if="store.medicineRecords.length > 0" class="space-y-3">
        <div v-for="(medicine, index) in store.medicineRecords" :key="index" class="border border-gray-100 rounded-xl p-4 hover:border-purple-200 transition-colors">
          <div class="flex items-start gap-3">
            <div class="w-14 h-14 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl flex items-center justify-center text-2xl">
              {{ medicine.icon || '💊' }}
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <h4 class="font-bold text-gray-800">{{ medicine.name }}</h4>
                <span :class="medicine.takenToday ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'" class="text-xs px-2 py-1 rounded-full">
                  {{ medicine.takenToday ? '已服用' : '待服用' }}
                </span>
              </div>
              <p class="text-sm text-gray-500 mt-1">{{ medicine.dosage }} | {{ medicine.frequency }}</p>
              <div class="flex items-center gap-2 mt-2">
                <span class="text-xs text-gray-400 flex items-center gap-1">
                  <span>⏰</span> {{ medicine.reminderTime }}
                </span>
                <span v-if="medicine.remaining !== undefined" class="text-xs text-gray-400 flex items-center gap-1">
                  <span>📦</span> 剩余 {{ medicine.remaining }} 天
                </span>
              </div>
              <div v-if="medicine.notes" class="mt-2 text-xs text-gray-400 bg-gray-50 p-2 rounded-lg">
                {{ medicine.notes }}
              </div>
            </div>
          </div>
          <div class="flex gap-2 mt-3">
            <button @click="takeMedicine(index)" :disabled="medicine.takenToday" 
              :class="medicine.takenToday ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-purple-500 text-white hover:bg-purple-600'"
              class="flex-1 py-2 rounded-lg text-sm font-medium transition-colors">
              {{ medicine.takenToday ? '✓ 已服用' : '确认服用' }}
            </button>
            <button @click="skipMedicine(index)" :disabled="medicine.takenToday" 
              class="px-4 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-100 transition-colors">
              跳过
            </button>
            <button @click="editMedicine(index)" class="px-4 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-100 transition-colors">
              编辑
            </button>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-12 text-gray-400">
        <div class="text-5xl mb-4">💊</div>
        <p class="text-lg mb-2">暂无药物记录</p>
        <p class="text-sm">点击上方按钮添加您的第一个药物</p>
      </div>
    </div>

    <!-- 用药时间线 -->
    <div v-if="todayTimeline.length > 0" class="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
        <span>📅</span> 今日服药时间线
      </h3>
      <div class="space-y-4">
        <div v-for="(item, i) in todayTimeline" :key="i" class="flex gap-4">
          <div class="flex flex-col items-center">
            <div :class="item.taken ? 'bg-green-500' : 'bg-gray-300'" class="w-8 h-8 rounded-full flex items-center justify-center">
              <span v-if="item.taken" class="text-white text-sm">✓</span>
              <span v-else class="text-white text-xs">{{ i + 1 }}</span>
            </div>
            <div v-if="i < todayTimeline.length - 1" class="w-0.5 h-12 bg-gray-200"></div>
          </div>
          <div class="flex-1 pb-4">
            <div class="flex items-center justify-between">
              <span class="font-medium text-gray-800">{{ item.name }}</span>
              <span class="text-sm text-gray-500">{{ item.time }}</span>
            </div>
            <p :class="item.taken ? 'text-green-600' : 'text-gray-400'" class="text-sm mt-1">
              {{ item.taken ? `已服用 · ${item.takenTime}` : item.next ? '下次服药' : '待服用' }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 用药统计 -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
        <span>📊</span> 用药统计
      </h3>
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-green-50 rounded-lg p-4 text-center">
          <p class="text-3xl font-bold text-green-600">{{ weekCompliance }}%</p>
          <p class="text-sm text-gray-600 mt-1">本周依从率</p>
        </div>
        <div class="bg-blue-50 rounded-lg p-4 text-center">
          <p class="text-3xl font-bold text-blue-600">{{ totalTakenThisWeek }}</p>
          <p class="text-sm text-gray-600 mt-1">本周服药次数</p>
        </div>
        <div class="bg-purple-50 rounded-lg p-4 text-center">
          <p class="text-3xl font-bold text-purple-600">{{ store.medicineRecords.length }}</p>
          <p class="text-sm text-gray-600 mt-1">正在服用</p>
        </div>
        <div class="bg-orange-50 rounded-lg p-4 text-center">
          <p class="text-3xl font-bold text-orange-600">{{ skippedThisWeek }}</p>
          <p class="text-sm text-gray-600 mt-1">本周跳过</p>
        </div>
      </div>
    </div>

    <!-- 用药提醒设置 -->
    <div class="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-6 text-white mb-6">
      <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
        <span>🔔</span> 提醒设置
      </h3>
      <div class="space-y-4">
        <div class="flex items-center justify-between bg-white/10 rounded-lg p-3">
          <div>
            <p class="font-medium">用药提醒</p>
            <p class="text-sm text-yellow-200">服药时间语音通知</p>
          </div>
          <button @click="toggleReminder('medicine')" :class="reminderSettings.medicine ? 'bg-white text-orange-500' : 'bg-white/30 text-white'" class="w-14 h-7 rounded-full relative transition-colors">
            <span :class="reminderSettings.medicine ? 'left-7' : 'left-1'" class="absolute top-1 w-5 h-5 bg-white rounded-full transition-all"></span>
          </button>
        </div>
        <div class="flex items-center justify-between bg-white/10 rounded-lg p-3">
          <div>
            <p class="font-medium">漏服提醒</p>
            <p class="text-sm text-yellow-200">忘记服药时提醒</p>
          </div>
          <button @click="toggleReminder('missed')" :class="reminderSettings.missed ? 'bg-white text-orange-500' : 'bg-white/30 text-white'" class="w-14 h-7 rounded-full relative transition-colors">
            <span :class="reminderSettings.missed ? 'left-7' : 'left-1'" class="absolute top-1 w-5 h-5 bg-white rounded-full transition-all"></span>
          </button>
        </div>
        <div class="flex items-center justify-between bg-white/10 rounded-lg p-3">
          <div>
            <p class="font-medium">库存提醒</p>
            <p class="text-sm text-yellow-200">药物快用完时提醒</p>
          </div>
          <button @click="toggleReminder('stock')" :class="reminderSettings.stock ? 'bg-white text-orange-500' : 'bg-white/30 text-white'" class="w-14 h-7 rounded-full relative transition-colors">
            <span :class="reminderSettings.stock ? 'left-7' : 'left-1'" class="absolute top-1 w-5 h-5 bg-white rounded-full transition-all"></span>
          </button>
        </div>
      </div>
    </div>

    <!-- 用药知识 -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
        <span>💡</span> 用药小知识
      </h3>
      <div class="space-y-3">
        <div v-for="(tip, i) in medicineTips" :key="i" class="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
          <span class="text-xl">{{ tip.icon }}</span>
          <div>
            <p class="font-medium text-gray-800 text-sm">{{ tip.title }}</p>
            <p class="text-xs text-gray-500 mt-0.5">{{ tip.desc }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 历史记录 -->
    <div class="bg-white rounded-xl shadow-md p-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
        <span>📋</span> 近期服药记录
      </h3>
      <div v-if="recentTakenRecords.length > 0" class="space-y-2 max-h-60 overflow-y-auto">
        <div v-for="(record, index) in recentTakenRecords" :key="index" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div class="flex items-center gap-3">
            <span class="text-green-500 text-lg">✓</span>
            <span class="text-gray-700">{{ record.name }}</span>
          </div>
          <span class="text-gray-400 text-sm">{{ formatTime(record.takenAt) }}</span>
        </div>
      </div>
      <div v-else class="text-center py-6 text-gray-400">
        <p class="text-sm">暂无服药记录</p>
      </div>
    </div>

    <!-- 添加药物弹窗 -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h3 class="text-lg font-bold text-gray-800 mb-4">添加药物</h3>
        
        <!-- 语音输入按钮 -->
        <button @click="toggleVoiceInput" 
          :class="isVoiceInput ? 'bg-red-500 text-white animate-pulse' : 'bg-purple-500 text-white'"
          class="w-full py-3 rounded-xl font-medium mb-4 flex items-center justify-center gap-2 transition-all">
          <span class="text-xl">{{ isVoiceInput ? '⏹️' : '🎤' }}</span>
          {{ isVoiceInput ? '停止语音输入' : '语音输入' }}
        </button>
        <p v-if="isVoiceInput" class="text-center text-purple-500 text-sm mb-4 animate-pulse">
          请说出药物信息，如"降压药每天一次早上八点吃"
        </p>
        
        <div class="space-y-4">
          <div>
            <label class="block text-gray-600 text-sm mb-2">药物名称 *</label>
            <input v-model="newMedicine.name" type="text" placeholder="如: 降压药" class="w-full border border-gray-200 rounded-lg p-3 focus:border-purple-500">
          </div>
          <div>
            <label class="block text-gray-600 text-sm mb-2">药物图标</label>
            <div class="grid grid-cols-5 gap-2">
              <button v-for="icon in medicineIcons" :key="icon" @click="newMedicine.icon = icon"
                :class="newMedicine.icon === icon ? 'bg-purple-100 border-purple-500' : 'bg-gray-50 border-gray-200'"
                class="w-12 h-12 rounded-lg text-2xl border-2 hover:border-purple-300 transition-colors">
                {{ icon }}
              </button>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-600 text-sm mb-2">剂量</label>
              <input v-model="newMedicine.dosage" type="text" placeholder="如: 1片" class="w-full border border-gray-200 rounded-lg p-3 focus:border-purple-500">
            </div>
            <div>
              <label class="block text-gray-600 text-sm mb-2">剩余数量</label>
              <input v-model="newMedicine.remaining" type="number" placeholder="天" class="w-full border border-gray-200 rounded-lg p-3 focus:border-purple-500">
            </div>
          </div>
          <div>
            <label class="block text-gray-600 text-sm mb-2">服用频率</label>
            <select v-model="newMedicine.frequency" class="w-full border border-gray-200 rounded-lg p-3 focus:border-purple-500">
              <option value="每天一次">每天一次</option>
              <option value="每天两次">每天两次</option>
              <option value="每天三次">每天三次</option>
              <option value="每周一次">每周一次</option>
              <option value="必要时">必要时</option>
            </select>
          </div>
          <div>
            <label class="block text-gray-600 text-sm mb-2">服药时间</label>
            <input v-model="newMedicine.reminderTime" type="time" class="w-full border border-gray-200 rounded-lg p-3 focus:border-purple-500">
          </div>
          <div>
            <label class="block text-gray-600 text-sm mb-2">服药说明</label>
            <textarea v-model="newMedicine.notes" placeholder="如: 饭后半小时服用" rows="2" class="w-full border border-gray-200 rounded-lg p-3 focus:border-purple-500"></textarea>
          </div>
        </div>
        <div class="flex gap-3 mt-6">
          <button @click="showAddModal = false" class="flex-1 bg-gray-100 text-gray-600 py-3 rounded-lg hover:bg-gray-200">取消</button>
          <button @click="addMedicine" class="flex-1 bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600">添加</button>
        </div>
      </div>
    </div>

    <!-- 编辑药物弹窗 -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h3 class="text-lg font-bold text-gray-800 mb-4">编辑药物</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-gray-600 text-sm mb-2">药物名称</label>
            <input v-model="editData.name" type="text" class="w-full border border-gray-200 rounded-lg p-3 focus:border-purple-500">
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-600 text-sm mb-2">剂量</label>
              <input v-model="editData.dosage" type="text" class="w-full border border-gray-200 rounded-lg p-3 focus:border-purple-500">
            </div>
            <div>
              <label class="block text-gray-600 text-sm mb-2">剩余数量(天)</label>
              <input v-model="editData.remaining" type="number" class="w-full border border-gray-200 rounded-lg p-3 focus:border-purple-500">
            </div>
          </div>
          <div>
            <label class="block text-gray-600 text-sm mb-2">提醒时间</label>
            <input v-model="editData.reminderTime" type="time" class="w-full border border-gray-200 rounded-lg p-3 focus:border-purple-500">
          </div>
        </div>
        <div class="flex gap-3 mt-6">
          <button @click="deleteMedicine" class="flex-1 bg-red-100 text-red-600 py-3 rounded-lg hover:bg-red-200">删除</button>
          <button @click="saveMedicine" class="flex-1 bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600">保存</button>
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

const showAddModal = ref(false)
const showEditModal = ref(false)
const showScanModal = ref(false)
const editingIndex = ref(-1)
const editData = ref({})
const isVoiceInput = ref(false)

const newMedicine = ref({
  name: '',
  dosage: '',
  frequency: '每天一次',
  reminderTime: '08:00',
  remaining: '',
  icon: '💊',
  notes: ''
})

const medicineIcons = ['💊', '💉', '💊', '💊', '💊', '💊', '💊', '💊', '💊', '💊']

const reminderSettings = ref({
  medicine: true,
  missed: true,
  stock: true
})

const medicineTips = [
  { icon: '⏰', title: '按时服药', desc: '尽量在固定时间服药，保持血药浓度稳定' },
  { icon: '💧', title: '用温水服用', desc: '避免用茶、咖啡或酒类饮品服药' },
  { icon: '🍽️', title: '注意空腹/饭后', desc: '有些药需要空腹服用，有些需要饭后服用' },
  { icon: '📋', title: '不要自行停药', desc: '即使症状好转，也请遵医嘱服药' }
]

const totalMedicines = computed(() => store.medicineRecords.length)
const takenCount = computed(() => store.medicineRecords.filter(m => m.takenToday).length)
const complianceRate = computed(() => {
  if (!totalMedicines.value) return 0
  return Math.round((takenCount.value / totalMedicines.value) * 100)
})

const complianceEmoji = computed(() => {
  const rate = complianceRate.value
  if (rate === 100) return '🎉'
  if (rate >= 80) return '😊'
  if (rate >= 50) return '😐'
  return '😟'
})

const nextMedicine = computed(() => {
  const now = new Date()
  const currentTime = now.getHours() * 60 + now.getMinutes()
  
  const next = store.medicineRecords
    .filter(m => !m.takenToday)
    .map(m => {
      const [h, min] = m.reminderTime.split(':').map(Number)
      const diff = h * 60 + min - currentTime
      return { ...m, diff }
    })
    .filter(m => m.diff > 0)
    .sort((a, b) => a.diff - b.diff)[0]
  
  return next
})

const recentTakenRecords = computed(() => {
  return (store.medicineTakenRecords || []).slice(-10).reverse()
})

const todayTimeline = computed(() => {
  return store.medicineRecords
    .filter(m => {
      const [h, min] = m.reminderTime.split(':').map(Number)
      const medTime = h * 60 + min
      const now = new Date()
      const currentTime = now.getHours() * 60 + now.getMinutes()
      return currentTime >= medTime - 60 && currentTime <= medTime + 120
    })
    .map(m => ({
      name: m.name,
      time: m.reminderTime,
      taken: m.takenToday,
      takenTime: m.takenAt ? formatTime(m.takenAt) : null,
      next: false
    }))
})

const weekCompliance = computed(() => {
  const records = store.medicineTakenRecords || []
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  
  const thisWeekRecords = records.filter(r => new Date(r.takenAt) >= weekAgo)
  const days = 7
  const expected = totalMedicines.value * days
  
  return expected > 0 ? Math.round((thisWeekRecords.length / expected) * 100) : 0
})

const totalTakenThisWeek = computed(() => {
  const records = store.medicineTakenRecords || []
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  
  return records.filter(r => new Date(r.takenAt) >= weekAgo).length
})

const skippedThisWeek = computed(() => {
  return 0
})

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

const toggleReminder = (type) => {
  reminderSettings.value[type] = !reminderSettings.value[type]
  toast.info(`已${reminderSettings.value[type] ? '开启' : '关闭'}提醒`, 1500)
}

const addMedicine = () => {
  if (!newMedicine.value.name.trim()) {
    toast.warning('请输入药物名称', 2000)
    return
  }
  store.addMedicineRecord({
    ...newMedicine.value,
    takenToday: false,
    remaining: parseInt(newMedicine.value.remaining) || undefined
  })
  showAddModal.value = false
  newMedicine.value = {
    name: '',
    dosage: '',
    frequency: '每天一次',
    reminderTime: '08:00',
    remaining: '',
    icon: '💊',
    notes: ''
  }
  toast.success('药物已添加', 2000)
}

const takeMedicine = (index) => {
  const medicine = store.medicineRecords[index]
  medicine.takenToday = true
  medicine.takenAt = new Date().toISOString()
  store.addMedicineTakenRecord({
    name: medicine.name,
    takenAt: medicine.takenAt
  })
  store.saveMedicineRecords()
  toast.success(`已记录服用: ${medicine.name}`, 2000)
}

const skipMedicine = (index) => {
  const medicine = store.medicineRecords[index]
  toast.info(`已跳过: ${medicine.name}`, 1500)
}

const editMedicine = (index) => {
  editingIndex.value = index
  editData.value = { ...store.medicineRecords[index] }
  showEditModal.value = true
}

const saveMedicine = () => {
  if (editingIndex.value >= 0) {
    store.medicineRecords[editingIndex.value] = { ...editData.value }
    store.saveMedicineRecords()
    toast.success('药物信息已更新', 2000)
  }
  showEditModal.value = false
}

const deleteMedicine = () => {
  if (confirm('确定要删除这个药物吗？')) {
    store.medicineRecords.splice(editingIndex.value, 1)
    store.saveMedicineRecords()
    toast.success('药物已删除', 2000)
  }
  showEditModal.value = false
}

onMounted(() => {
  store.loadMedicineRecords()
  store.loadMedicineTakenRecords()
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
    toast.info('开始语音输入，请说出药物信息...', 2000)
    voiceAssistant.startListening()
  }
}

const handleVoiceEvent = (event, data) => {
  switch (event) {
    case 'result':
      parseMedicineData(data)
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

const parseMedicineData = (text) => {
  if (!text) return
  
  // 解析药物名称
  const namePatterns = [
    /(.{2,6})药/,
    /(.{2,6})片/,
    /(.{2,6})胶囊/,
    /吃(.{2,6})/,
    /服用(.{2,6})/
  ]
  for (const pattern of namePatterns) {
    const match = text.match(pattern)
    if (match) {
      newMedicine.value.name = match[1] + '药'
      toast.success(`识别到药物：${match[1]}药`, 2000)
      break
    }
  }
  
  // 解析剂量
  const dosageMatch = text.match(/(\d+)[片粒颗]|每次(\d+)|一次(\d+)/)
  if (dosageMatch) {
    newMedicine.value.dosage = (dosageMatch[1] || dosageMatch[2] || dosageMatch[3]) + '片'
    toast.success(`识别到剂量：${newMedicine.value.dosage}`, 2000)
  }
  
  // 解析频率
  if (text.includes('每天一次') || text.includes('一日一次') || text.includes('一天一次')) {
    newMedicine.value.frequency = '每天一次'
  } else if (text.includes('每天两次') || text.includes('一日两次') || text.includes('一天两次')) {
    newMedicine.value.frequency = '每天两次'
  } else if (text.includes('每天三次') || text.includes('一日三次') || text.includes('一天三次')) {
    newMedicine.value.frequency = '每天三次'
  } else if (text.includes('每周一次') || text.includes('一周一次')) {
    newMedicine.value.frequency = '每周一次'
  }
  
  // 解析服药时间
  const timePatterns = [
    { pattern: /早上|早餐后|八点|8点/, time: '08:00' },
    { pattern: /中午|午餐后|十二点|12点/, time: '12:00' },
    { pattern: /下午|下午三点|15点/, time: '15:00' },
    { pattern: /晚上|晚餐后|六点|18点/, time: '18:00' },
    { pattern: /睡前|晚上九点|21点/, time: '21:00' }
  ]
  for (const tp of timePatterns) {
    if (tp.pattern.test(text)) {
      newMedicine.value.reminderTime = tp.time
      toast.success(`识别到服药时间：${tp.time}`, 2000)
      break
    }
  }
  
  // 解析剩余天数
  const remainingMatch = text.match(/剩(\d+)天|还有(\d+)天|(\d+)天的量/)
  if (remainingMatch) {
    newMedicine.value.remaining = remainingMatch[1] || remainingMatch[2] || remainingMatch[3]
    toast.success(`识别到剩余：${newMedicine.value.remaining} 天`, 2000)
  }
  
  // 解析服药说明
  if (text.includes('饭后')) {
    newMedicine.value.notes = '饭后服用'
  } else if (text.includes('空腹')) {
    newMedicine.value.notes = '空腹服用'
  } else if (text.includes('睡前')) {
    newMedicine.value.notes = '睡前服用'
  }
}
</script>
