<template>
  <div class="px-4 py-6 max-w-md mx-auto">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        <AppIcon name="schedule" size="lg" class="text-indigo-500" /> 日程提醒
      </h1>
      <p class="text-gray-500">重要日期提醒，不错过每个时刻</p>
    </header>

    <!-- 今日提醒 -->
    <div class="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-6 text-white mb-6">
      <h3 class="text-lg font-bold mb-4">今日提醒</h3>
      <div v-if="todaySchedules.length > 0" class="space-y-3">
        <div v-for="(schedule, index) in todaySchedules" :key="index" class="bg-white/20 rounded-lg p-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="text-2xl">{{ schedule.icon }}</span>
              <div>
                <p class="font-medium">{{ schedule.title }}</p>
                <p class="text-sm text-purple-200">{{ schedule.time }}</p>
              </div>
            </div>
            <span :class="schedule.done ? 'text-green-300' : 'text-yellow-300'" class="text-sm">{{ schedule.done ? '已完成' : '待完成' }}</span>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-4">
        <div class="text-4xl mb-2">☀️</div>
        <p class="text-purple-200">今日暂无提醒</p>
      </div>
    </div>

    <!-- 添加日程 -->
    <button @click="showAddModal = true" class="w-full bg-white rounded-xl shadow-md p-4 mb-6 flex items-center justify-center gap-2 text-indigo-600 hover:bg-indigo-50 transition-colors">
      <span class="text-xl">➕</span>
      <span class="font-medium">添加新日程</span>
    </button>

    <!-- 近期日程 -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4">近期日程</h3>
      <div v-if="store.scheduleRecords.length > 0" class="space-y-3">
        <div v-for="(schedule, index) in upcomingSchedules" :key="index" class="border border-gray-100 rounded-lg p-4">
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-2xl">{{ schedule.icon }}</div>
              <div>
                <h4 class="font-bold text-gray-800">{{ schedule.title }}</h4>
                <p class="text-sm text-gray-500">{{ formatDate(schedule.date) }}</p>
                <p class="text-xs text-gray-400 mt-1">{{ schedule.time }}</p>
              </div>
            </div>
            <button @click="deleteSchedule(index)" class="text-gray-400 hover:text-red-500 text-sm">🗑️</button>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-8 text-gray-400">
        <div class="text-4xl mb-3">📅</div>
        <p>暂无日程记录</p>
        <p class="text-sm">点击上方按钮添加日程</p>
      </div>
    </div>

    <!-- 重要日期 -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4">重要日期</h3>
      <div class="grid grid-cols-2 gap-3">
        <div class="bg-red-50 rounded-lg p-4 text-center border border-red-100">
          <div class="text-2xl mb-2">🎂</div>
          <p class="text-sm text-gray-600">生日提醒</p>
          <p class="text-xs text-gray-400 mt-1">记录重要生日</p>
        </div>
        <div class="bg-green-50 rounded-lg p-4 text-center border border-green-100">
          <div class="text-2xl mb-2">🏥</div>
          <p class="text-sm text-gray-600">体检提醒</p>
          <p class="text-xs text-gray-400 mt-1">定期体检提醒</p>
        </div>
        <div class="bg-yellow-50 rounded-lg p-4 text-center border border-yellow-100">
          <div class="text-2xl mb-2">🎉</div>
          <p class="text-sm text-gray-600">节日提醒</p>
          <p class="text-xs text-gray-400 mt-1">传统节日提醒</p>
        </div>
        <div class="bg-blue-50 rounded-lg p-4 text-center border border-blue-100">
          <div class="text-2xl mb-2">💊</div>
          <p class="text-sm text-gray-600">复诊提醒</p>
          <p class="text-xs text-gray-400 mt-1">医院复诊提醒</p>
        </div>
      </div>
    </div>

    <!-- 提醒设置 -->
    <div class="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-6 text-white">
      <h3 class="text-lg font-bold mb-4">🔔 提醒设置</h3>
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <span>提前一天提醒</span>
          <div class="w-12 h-6 bg-white/30 rounded-full relative">
            <div class="w-5 h-5 bg-white rounded-full absolute right-1 top-0.5"></div>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span>当天提醒</span>
          <div class="w-12 h-6 bg-white/30 rounded-full relative">
            <div class="w-5 h-5 bg-white rounded-full absolute right-1 top-0.5"></div>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span>语音播报提醒</span>
          <div class="w-12 h-6 bg-white/30 rounded-full relative">
            <div class="w-5 h-5 bg-white rounded-full absolute right-1 top-0.5"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加日程弹窗 -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl p-6 w-full max-w-sm">
        <h3 class="text-lg font-bold text-gray-800 mb-4">添加日程</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-gray-600 text-sm mb-2">日程标题</label>
            <input v-model="newSchedule.title" type="text" placeholder="如: 孙女生日" class="w-full border border-gray-200 rounded-lg p-3 focus:border-indigo-500">
          </div>
          <div>
            <label class="block text-gray-600 text-sm mb-2">日期</label>
            <input v-model="newSchedule.date" type="date" class="w-full border border-gray-200 rounded-lg p-3 focus:border-indigo-500">
          </div>
          <div>
            <label class="block text-gray-600 text-sm mb-2">时间</label>
            <input v-model="newSchedule.time" type="time" class="w-full border border-gray-200 rounded-lg p-3 focus:border-indigo-500">
          </div>
          <div>
            <label class="block text-gray-600 text-sm mb-2">类型</label>
            <select v-model="newSchedule.type" class="w-full border border-gray-200 rounded-lg p-3 focus:border-indigo-500">
              <option value="birthday">生日</option>
              <option value="checkup">体检</option>
              <option value="festival">节日</option>
              <option value="followup">复诊</option>
              <option value="other">其他</option>
            </select>
          </div>
        </div>
        <div class="flex gap-3 mt-6">
          <button @click="showAddModal = false" class="flex-1 bg-gray-100 text-gray-600 py-3 rounded-lg hover:bg-gray-200">取消</button>
          <button @click="addSchedule" class="flex-1 bg-indigo-500 text-white py-3 rounded-lg hover:bg-indigo-600">添加</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAppStore } from '../stores/appStore'
import AppIcon from '../components/AppIcon.vue'

const store = useAppStore()

const showAddModal = ref(false)
const newSchedule = ref({
  title: '',
  date: '',
  time: '09:00',
  type: 'other'
})

const typeIcons = {
  birthday: '🎂',
  checkup: '🏥',
  festival: '🎉',
  followup: '💊',
  other: '📅'
}

const todaySchedules = computed(() => {
  const todayStr = new Date().toISOString().split('T')[0]
  return store.scheduleRecords.filter(s => s.date === todayStr)
    .map(s => ({
      ...s,
      icon: typeIcons[s.type] || '📅'
    }))
})

const upcomingSchedules = computed(() => {
  const today = new Date()
  return store.scheduleRecords
    .filter(s => new Date(s.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5)
    .map(s => ({
      ...s,
      icon: typeIcons[s.type] || '📅'
    }))
})

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
}

const addSchedule = () => {
  if (!newSchedule.value.title.trim()) {
    alert('请输入日程标题')
    return
  }
  if (!newSchedule.value.date) {
    alert('请选择日期')
    return
  }
  store.addScheduleRecord({
    ...newSchedule.value,
    done: false
  })
  showAddModal.value = false
  newSchedule.value = { title: '', date: '', time: '09:00', type: 'other' }
  alert('日程已添加')
}

const deleteSchedule = (index) => {
  if (confirm('确定删除此日程？')) {
    store.deleteScheduleRecord(index)
  }
}

onMounted(() => {
  store.loadScheduleRecords()
})
</script>