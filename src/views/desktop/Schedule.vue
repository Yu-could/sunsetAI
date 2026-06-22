<template>
  <div class="p-8 max-w-7xl mx-auto">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">日程提醒</h2>
        <p class="text-gray-500 mt-1">管理重要日期，设置智能提醒</p>
      </div>
      <div class="flex gap-3">
        <button @click="openAddScheduleModal" class="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
          <span class="text-xl">➕</span>
          <span>添加日程</span>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
        <div class="flex items-center justify-between mb-6">
          <button @click="prevMonth" class="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">‹</button>
          <h3 class="text-lg font-bold text-gray-800">{{ currentMonthYear }}</h3>
          <button @click="nextMonth" class="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">›</button>
        </div>
        <div class="grid grid-cols-7 gap-2 mb-2">
          <div v-for="day in weekDays" :key="day" class="text-center text-sm font-medium text-gray-500 py-2">
            {{ day }}
          </div>
        </div>
        <div class="grid grid-cols-7 gap-2">
          <div v-for="(day, index) in calendarDays" :key="index" class="aspect-square flex items-center justify-center rounded-lg text-sm" :class="getDayClass(day)">
            <span v-if="day.date">{{ day.date }}</span>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-md p-6">
        <h3 class="text-lg font-bold text-gray-700 mb-4">近期日程</h3>
        <div v-if="recentSchedules.length > 0" class="space-y-3">
          <div v-for="(schedule, index) in recentSchedules" :key="index" class="p-3 rounded-lg" :class="getScheduleClass(schedule.type)">
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm">{{ schedule.icon }}</div>
              <div class="flex-1">
                <p class="font-medium text-gray-800">{{ schedule.title }}</p>
                <p class="text-xs text-gray-500">{{ schedule.date }} {{ schedule.time }}</p>
              </div>
              <input type="checkbox" :checked="schedule.completed" @change="toggleComplete(index)" class="mt-1" />
            </div>
          </div>
        </div>
        <div v-else class="text-center py-8 text-gray-400">
          <span class="text-3xl mb-2">📅</span>
          <p>暂无日程安排</p>
        </div>
      </div>
    </div>

    <div class="mt-6 bg-white rounded-xl shadow-md p-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4">生日倒计时</h3>
      <div v-if="upcomingBirthdays.length > 0" class="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div v-for="(birthday, index) in upcomingBirthdays" :key="index" class="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-4 text-center">
          <p class="text-3xl mb-2">🎂</p>
          <p class="font-bold text-gray-800">{{ birthday.name }}</p>
          <p class="text-sm text-gray-500">{{ birthday.date }}</p>
          <p class="text-xl font-bold text-pink-500 mt-2">{{ birthday.daysLeft }}天后</p>
        </div>
      </div>
      <div v-else class="text-center py-8 text-gray-400">
        <span class="text-3xl mb-2">🎂</span>
        <p>近期没有生日提醒</p>
      </div>
    </div>

    <div class="mt-6 bg-white rounded-xl shadow-md p-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4">日程分类统计</h3>
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div class="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
          <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">📅</div>
          <div>
            <p class="text-2xl font-bold text-blue-500">{{ categoryStats.total }}</p>
            <p class="text-sm text-gray-600">总日程</p>
          </div>
        </div>
        <div class="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
          <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">✅</div>
          <div>
            <p class="text-2xl font-bold text-green-500">{{ categoryStats.completed }}</p>
            <p class="text-sm text-gray-600">已完成</p>
          </div>
        </div>
        <div class="flex items-center gap-4 p-4 bg-amber-50 rounded-lg">
          <div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">🏥</div>
          <div>
            <p class="text-2xl font-bold text-amber-500">{{ categoryStats.health }}</p>
            <p class="text-sm text-gray-600">健康相关</p>
          </div>
        </div>
        <div class="flex items-center gap-4 p-4 bg-pink-50 rounded-lg">
          <div class="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">🎂</div>
          <div>
            <p class="text-2xl font-bold text-pink-500">{{ categoryStats.birthday }}</p>
            <p class="text-sm text-gray-600">生日提醒</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showAddModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" @click.self="showAddModal = false">
      <div class="bg-white w-full max-w-md rounded-2xl p-6">
        <div class="flex items-center justify-between mb-4">
          <h4 class="text-lg font-bold text-gray-800">添加日程</h4>
          <button @click="showAddModal = false" class="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>
        <div class="space-y-4">
          <input v-model="newSchedule.title" type="text" placeholder="日程标题" class="w-full px-4 py-3 bg-gray-100 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <div class="flex gap-3">
            <input v-model="newSchedule.date" type="date" class="flex-1 px-4 py-3 bg-gray-100 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <input v-model="newSchedule.time" type="time" class="flex-1 px-4 py-3 bg-gray-100 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <select v-model="newSchedule.type" class="w-full px-4 py-3 bg-gray-100 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="birthday">🎂 生日提醒</option>
            <option value="health">🏥 体检提醒</option>
            <option value="holiday">🎉 节日提醒</option>
            <option value="appointment">💊 复诊提醒</option>
            <option value="other">📝 其他</option>
          </select>
          <textarea v-model="newSchedule.note" placeholder="备注说明" rows="2" class="w-full px-4 py-3 bg-gray-100 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
          <button @click="saveSchedule" class="w-full bg-indigo-500 text-white py-3 rounded-xl font-bold hover:bg-indigo-600 transition-colors">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const showAddModal = ref(false)
const newSchedule = ref({
  title: '',
  date: '',
  time: '',
  type: 'other',
  note: ''
})

const currentDate = ref(new Date())
const weekDays = ['日', '一', '二', '三', '四', '五', '六']

const currentMonthYear = computed(() => {
  return `${currentDate.value.getFullYear()}年${currentDate.value.getMonth() + 1}月`
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  
  const days = []
  for (let i = 0; i < firstDay; i++) {
    days.push({ date: null, hasSchedule: false, isToday: false, isSelected: false })
  }
  
  const today = new Date()
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: i,
      hasSchedule: i === 15 || i === 20 || i === 25,
      isToday: today.getDate() === i && today.getMonth() === month && today.getFullYear() === year,
      isSelected: false
    })
  }
  
  return days
})

const recentSchedules = ref([
  { title: '体检预约', date: '6月15日', time: '09:00', type: 'health', icon: '🏥', completed: false },
  { title: '女儿生日', date: '6月20日', time: '18:00', type: 'birthday', icon: '🎂', completed: false },
  { title: '复诊', date: '6月25日', time: '10:00', type: 'appointment', icon: '💊', completed: false },
  { title: '端午节', date: '6月28日', time: '全天', type: 'holiday', icon: '🎉', completed: false }
])

const upcomingBirthdays = ref([
  { name: '女儿', date: '6月20日', daysLeft: 8 },
  { name: '老朋友王阿姨', date: '6月25日', daysLeft: 13 },
  { name: '孙子', date: '7月5日', daysLeft: 23 }
])

const categoryStats = computed(() => {
  return {
    total: recentSchedules.value.length,
    completed: recentSchedules.value.filter(s => s.completed).length,
    health: recentSchedules.value.filter(s => s.type === 'health' || s.type === 'appointment').length,
    birthday: recentSchedules.value.filter(s => s.type === 'birthday').length
  }
})

const getDayClass = (day) => {
  if (!day.date) return 'bg-gray-50'
  if (day.isToday) return 'bg-indigo-500 text-white font-bold'
  if (day.hasSchedule) return 'bg-indigo-100 text-indigo-700'
  return 'hover:bg-gray-100'
}

const getScheduleClass = (type) => {
  const classes = {
    birthday: 'bg-pink-50',
    health: 'bg-green-50',
    holiday: 'bg-amber-50',
    appointment: 'bg-purple-50',
    other: 'bg-gray-50'
  }
  return classes[type] || 'bg-gray-50'
}

const prevMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const openAddScheduleModal = () => {
  newSchedule.value = { title: '', date: '', time: '', type: 'other', note: '' }
  showAddModal.value = true
}

const saveSchedule = () => {
  if (!newSchedule.value.title || !newSchedule.value.date) return
  const typeIcons = { birthday: '🎂', health: '🏥', holiday: '🎉', appointment: '💊', other: '📝' }
  recentSchedules.value.push({
    title: newSchedule.value.title,
    date: newSchedule.value.date,
    time: newSchedule.value.time || '全天',
    type: newSchedule.value.type,
    icon: typeIcons[newSchedule.value.type],
    completed: false
  })
  showAddModal.value = false
}

const toggleComplete = (index) => {
  recentSchedules.value[index].completed = !recentSchedules.value[index].completed
}
</script>
