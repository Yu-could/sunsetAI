<template>
  <div class="px-4 py-6 max-w-md mx-auto">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-2">💊 用药提醒</h1>
      <p class="text-gray-500">定时提醒吃药，记录用药情况</p>
    </header>

    <!-- 今日用药状态 -->
    <div class="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl p-6 text-white mb-6">
      <h3 class="text-lg font-bold mb-4">今日用药</h3>
      <div class="flex items-center justify-between">
        <div>
          <p class="text-3xl font-bold">{{ takenCount }}/{{ totalMedicines }}</p>
          <p class="text-purple-200">已服用</p>
        </div>
        <div class="text-5xl">{{ takenCount === totalMedicines && totalMedicines > 0 ? '✅' : '⏰' }}</div>
      </div>
      <div v-if="totalMedicines > 0" class="w-full bg-white/20 rounded-full h-3 mt-4">
        <div class="bg-white h-3 rounded-full transition-all" :style="{ width: (takenCount / totalMedicines * 100) + '%' }"></div>
      </div>
    </div>

    <!-- 添加药物 -->
    <button @click="showAddModal = true" class="w-full bg-white rounded-xl shadow-md p-4 mb-6 flex items-center justify-center gap-2 text-purple-600 hover:bg-purple-50 transition-colors">
      <span class="text-xl">➕</span>
      <span class="font-medium">添加新药物</span>
    </button>

    <!-- 药物列表 -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4">我的药物</h3>
      <div v-if="store.medicineRecords.length > 0" class="space-y-4">
        <div v-for="(medicine, index) in store.medicineRecords" :key="index" class="border border-gray-100 rounded-lg p-4">
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl">💊</div>
              <div>
                <h4 class="font-bold text-gray-800">{{ medicine.name }}</h4>
                <p class="text-sm text-gray-500">{{ medicine.dosage }} | {{ medicine.frequency }}</p>
                <p class="text-xs text-gray-400 mt-1">提醒时间: {{ medicine.reminderTime }}</p>
              </div>
            </div>
            <button @click="takeMedicine(index)" :disabled="medicine.takenToday" :class="medicine.takenToday ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'" class="px-3 py-1 rounded-lg text-sm font-medium">
              {{ medicine.takenToday ? '已服用' : '服用' }}
            </button>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-8 text-gray-400">
        <div class="text-4xl mb-3">💊</div>
        <p>暂无药物记录</p>
        <p class="text-sm">点击上方按钮添加药物</p>
      </div>
    </div>

    <!-- 用药记录 -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4">用药记录</h3>
      <div v-if="recentTakenRecords.length > 0" class="space-y-3">
        <div v-for="(record, index) in recentTakenRecords.slice(-5)" :key="index" class="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
          <div class="flex items-center gap-3">
            <span class="text-green-500 text-xl">✅</span>
            <span class="text-gray-700">{{ record.name }}</span>
          </div>
          <span class="text-gray-400 text-sm">{{ formatTime(record.takenAt) }}</span>
        </div>
      </div>
      <div v-else class="text-center py-6 text-gray-400">
        <p>暂无用药记录</p>
      </div>
    </div>

    <!-- 用药提醒设置 -->
    <div class="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-6 text-white">
      <h3 class="text-lg font-bold mb-4">🔔 提醒设置</h3>
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <span>用药提醒</span>
          <div class="w-12 h-6 bg-white/30 rounded-full relative">
            <div class="w-5 h-5 bg-white rounded-full absolute right-1 top-0.5"></div>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span>漏服提醒</span>
          <div class="w-12 h-6 bg-white/30 rounded-full relative">
            <div class="w-5 h-5 bg-white rounded-full absolute right-1 top-0.5"></div>
          </div>
        </div>
        <p class="text-yellow-200 text-sm mt-3">提醒将通过语音播报和消息通知</p>
      </div>
    </div>

    <!-- 添加药物弹窗 -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl p-6 w-full max-w-sm">
        <h3 class="text-lg font-bold text-gray-800 mb-4">添加药物</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-gray-600 text-sm mb-2">药物名称</label>
            <input v-model="newMedicine.name" type="text" placeholder="如: 降压药" class="w-full border border-gray-200 rounded-lg p-3 focus:border-purple-500">
          </div>
          <div>
            <label class="block text-gray-600 text-sm mb-2">剂量</label>
            <input v-model="newMedicine.dosage" type="text" placeholder="如: 1片" class="w-full border border-gray-200 rounded-lg p-3 focus:border-purple-500">
          </div>
          <div>
            <label class="block text-gray-600 text-sm mb-2">服用频率</label>
            <select v-model="newMedicine.frequency" class="w-full border border-gray-200 rounded-lg p-3 focus:border-purple-500">
              <option value="每天一次">每天一次</option>
              <option value="每天两次">每天两次</option>
              <option value="每天三次">每天三次</option>
              <option value="每周一次">每周一次</option>
            </select>
          </div>
          <div>
            <label class="block text-gray-600 text-sm mb-2">提醒时间</label>
            <input v-model="newMedicine.reminderTime" type="time" class="w-full border border-gray-200 rounded-lg p-3 focus:border-purple-500">
          </div>
        </div>
        <div class="flex gap-3 mt-6">
          <button @click="showAddModal = false" class="flex-1 bg-gray-100 text-gray-600 py-3 rounded-lg hover:bg-gray-200">取消</button>
          <button @click="addMedicine" class="flex-1 bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600">添加</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAppStore } from '../stores/appStore'

const store = useAppStore()

const showAddModal = ref(false)
const newMedicine = ref({
  name: '',
  dosage: '',
  frequency: '每天一次',
  reminderTime: '08:00'
})

const totalMedicines = computed(() => store.medicineRecords.length)

const takenCount = computed(() => store.medicineRecords.filter(m => m.takenToday).length)

const recentTakenRecords = computed(() => store.medicineTakenRecords || [])

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

const addMedicine = () => {
  if (!newMedicine.value.name.trim()) {
    alert('请输入药物名称')
    return
  }
  store.addMedicineRecord({
    ...newMedicine.value,
    takenToday: false
  })
  showAddModal.value = false
  newMedicine.value = { name: '', dosage: '', frequency: '每天一次', reminderTime: '08:00' }
  alert('药物已添加')
}

const takeMedicine = (index) => {
  const medicine = store.medicineRecords[index]
  medicine.takenToday = true
  store.addMedicineTakenRecord({
    name: medicine.name,
    takenAt: new Date().toISOString()
  })
  store.saveMedicineRecords()
  alert('已记录服用: ' + medicine.name)
}

onMounted(() => {
  store.loadMedicineRecords()
  store.loadMedicineTakenRecords()
})
</script>