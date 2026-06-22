<template>
  <div class="p-8 max-w-7xl mx-auto">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">用药提醒</h2>
        <p class="text-gray-500 mt-1">定时提醒吃药，管理用药记录</p>
      </div>
      <div class="flex gap-3">
        <button @click="openAddMedicineModal" class="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
          <span class="text-xl">➕</span>
          <span>添加药物</span>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-xl shadow-md p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">本周依从率</p>
            <p class="text-3xl font-bold text-green-500 mt-2">{{ complianceRate }}%</p>
            <p class="text-gray-400 text-sm mt-1">按时服药</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">✅</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-md p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">本周服药次数</p>
            <p class="text-3xl font-bold text-purple-500 mt-2">{{ weeklyTakenCount }}</p>
            <p class="text-gray-400 text-sm mt-1">次</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">💊</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-md p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">正在服用药物</p>
            <p class="text-3xl font-bold text-blue-500 mt-2">{{ medicines.length }}</p>
            <p class="text-gray-400 text-sm mt-1">种</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">📦</div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-md p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm">本周跳过次数</p>
            <p class="text-3xl font-bold text-amber-500 mt-2">{{ weeklySkippedCount }}</p>
            <p class="text-gray-400 text-sm mt-1">次</p>
          </div>
          <div class="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-2xl">⏭️</div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-xl shadow-md p-6">
        <h3 class="text-lg font-bold text-gray-700 mb-4">今日用药</h3>
        <div v-if="todayMedicines.length > 0" class="space-y-3">
          <div v-for="(med, index) in todayMedicines" :key="index" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-xl">💊</div>
              <div>
                <p class="font-bold text-gray-800">{{ med.name }}</p>
                <p class="text-sm text-gray-500">{{ med.dose }} · {{ med.frequency }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-bold" :class="med.taken ? 'text-green-500' : 'text-gray-800'">{{ med.time }}</p>
              <button v-if="!med.taken" @click="toggleTakeMedicine(index)" class="mt-1 px-4 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600">
                服用
              </button>
              <span v-else class="text-green-500 text-sm">已服用</span>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-8 text-gray-400">
          <span class="text-3xl mb-2">💊</span>
          <p>今日暂无用药计划</p>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-md p-6">
        <h3 class="text-lg font-bold text-gray-700 mb-4">用药时间线</h3>
        <div class="relative">
          <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          <div v-for="(timeSlot, index) in timeSlots" :key="index" class="relative pl-10 pb-4">
            <div class="absolute left-2 w-4 h-4 rounded-full border-2" :class="timeSlot.taken ? 'bg-green-500 border-green-500' : timeSlot.pending ? 'bg-white border-amber-500' : 'bg-gray-200 border-gray-200'"></div>
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium text-gray-800">{{ timeSlot.time }}</p>
                <p class="text-sm text-gray-500">{{ timeSlot.medicines }}种药物</p>
              </div>
              <span :class="timeSlot.taken ? 'text-green-500' : timeSlot.pending ? 'text-amber-500' : 'text-gray-400'" class="text-sm">
                {{ timeSlot.taken ? '已服用' : timeSlot.pending ? '待服用' : '未到时间' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 bg-white rounded-xl shadow-md p-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4">药物列表</h3>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div v-for="(med, index) in medicines" :key="index" class="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-xl">💊</div>
              <div>
                <p class="font-bold text-gray-800">{{ med.name }}</p>
                <p class="text-sm text-gray-500">{{ med.dose }}</p>
              </div>
            </div>
            <button @click="editMedicine(index)" class="text-gray-400 hover:text-gray-600">✏️</button>
          </div>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-500">服用时间</span>
              <span class="text-gray-800">{{ med.time }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">服用频率</span>
              <span class="text-gray-800">{{ med.frequency }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">剩余天数</span>
              <span :class="med.daysLeft <= 3 ? 'text-red-500' : 'text-gray-800'">{{ med.daysLeft }}天</span>
            </div>
          </div>
          <p class="text-xs text-gray-400 mt-3">{{ med.note }}</p>
        </div>
      </div>
    </div>

    <div class="mt-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-xl">📚</div>
        <div>
          <h4 class="font-bold text-gray-800">用药小知识</h4>
          <p class="text-sm text-gray-600 mt-1">服药时请用温水送服，不要用茶、咖啡或牛奶。如果忘记服药，不要在下次服用双倍剂量。长期服药的老年人建议定期复查，以便医生调整用药方案。</p>
        </div>
      </div>
    </div>

    <div v-if="showAddModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" @click.self="showAddModal = false">
      <div class="bg-white w-full max-w-md rounded-2xl p-6">
        <div class="flex items-center justify-between mb-4">
          <h4 class="text-lg font-bold text-gray-800">{{ isEditing ? '编辑药物' : '添加药物' }}</h4>
          <button @click="showAddModal = false" class="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>
        <div class="space-y-4">
          <input v-model="newMedicine.name" type="text" placeholder="药物名称" class="w-full px-4 py-3 bg-gray-100 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input v-model="newMedicine.dose" type="text" placeholder="剂量（如：1粒/次）" class="w-full px-4 py-3 bg-gray-100 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input v-model="newMedicine.time" type="text" placeholder="服用时间（如：08:00）" class="w-full px-4 py-3 bg-gray-100 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input v-model="newMedicine.frequency" type="text" placeholder="服用频率（如：每日一次）" class="w-full px-4 py-3 bg-gray-100 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input v-model="newMedicine.daysLeft" type="number" placeholder="剩余天数" class="w-full px-4 py-3 bg-gray-100 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <textarea v-model="newMedicine.note" placeholder="备注说明" rows="2" class="w-full px-4 py-3 bg-gray-100 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          <button @click="saveMedicine" class="w-full bg-purple-500 text-white py-3 rounded-xl font-bold hover:bg-purple-600 transition-colors">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAppStore } from '../../stores/appStore'

const store = useAppStore()

const showAddModal = ref(false)
const isEditing = ref(false)
const editingIndex = ref(-1)
const newMedicine = ref({
  name: '',
  dose: '',
  time: '',
  frequency: '',
  daysLeft: 30,
  note: ''
})

const medicines = ref([])

const todayMedicines = ref([])

const timeSlots = computed(() => {
  const slots = [
    { time: '06:00', medicines: 0, taken: false, pending: false },
    { time: '08:00', medicines: 1, taken: true, pending: false },
    { time: '12:00', medicines: 1, taken: false, pending: true },
    { time: '15:00', medicines: 0, taken: false, pending: false },
    { time: '18:00', medicines: 0, taken: false, pending: false },
    { time: '20:00', medicines: 1, taken: false, pending: true }
  ]
  const currentHour = new Date().getHours()
  slots.forEach(slot => {
    const slotHour = parseInt(slot.time.split(':')[0])
    if (!slot.taken) {
      slot.pending = slotHour <= currentHour
    }
  })
  return slots
})

const complianceRate = computed(() => {
  const total = 7
  const taken = 4
  return Math.round((taken / total) * 100)
})

const weeklyTakenCount = computed(() => {
  return 25
})

const weeklySkippedCount = computed(() => {
  return 2
})

const openAddMedicineModal = () => {
  isEditing.value = false
  editingIndex.value = -1
  newMedicine.value = { name: '', dose: '', time: '', frequency: '', daysLeft: 30, note: '' }
  showAddModal.value = true
}

const editMedicine = (index) => {
  isEditing.value = true
  editingIndex.value = index
  newMedicine.value = { ...medicines.value[index] }
  showAddModal.value = true
}

const saveMedicine = () => {
  if (!newMedicine.value.name || !newMedicine.value.time) return
  if (isEditing.value) {
    medicines.value[editingIndex.value] = { ...newMedicine.value }
  } else {
    medicines.value.push({ ...newMedicine.value })
  }
  showAddModal.value = false
}

const toggleTakeMedicine = (index) => {
  todayMedicines.value[index].taken = true
}
</script>
