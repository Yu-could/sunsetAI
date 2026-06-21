<template>
  <div class="px-4 py-6 max-w-md mx-auto">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        <AppIcon name="schedule" size="lg" class="text-indigo-500" /> 日程提醒
      </h1>
      <p class="text-gray-500">重要日期提醒，不错过每个时刻</p>
    </header>

    <!-- 今日概览 -->
    <div class="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-6 text-white mb-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-indigo-200 text-sm mb-1">{{ todayDate }}</p>
          <p class="text-4xl font-bold">{{ todaySchedules.length }}</p>
          <p class="text-indigo-200 text-sm mt-1">今日日程</p>
        </div>
        <div class="text-6xl">{{ todaySchedules.length > 0 ? '📅' : '☀️' }}</div>
      </div>
      <div v-if="todaySchedules.length > 0" class="mt-4 space-y-2">
        <div v-for="(schedule, i) in todaySchedules.slice(0, 3)" :key="i" class="bg-white/20 rounded-lg p-3 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="text-xl">{{ schedule.icon }}</span>
            <div>
              <p class="font-medium">{{ schedule.title }}</p>
              <p class="text-sm text-indigo-200">{{ schedule.time }}</p>
            </div>
          </div>
          <span :class="schedule.done ? 'bg-green-400' : 'bg-yellow-400'" class="text-xs px-2 py-1 rounded-full text-white">
            {{ schedule.done ? '已完成' : '待完成' }}
          </span>
        </div>
      </div>
    </div>

    <!-- 快速操作 -->
    <div class="grid grid-cols-2 gap-3 mb-6">
      <button @click="openAddModal('event')" class="bg-white rounded-xl shadow-md p-4 flex flex-col items-center gap-2 text-indigo-600 hover:bg-indigo-50 transition-colors">
        <span class="text-3xl">📝</span>
        <span class="text-sm font-medium">添加日程</span>
      </button>
      <button @click="openAddModal('birthday')" class="bg-white rounded-xl shadow-md p-4 flex flex-col items-center gap-2 text-pink-600 hover:bg-pink-50 transition-colors">
        <span class="text-3xl">🎂</span>
        <span class="text-sm font-medium">添加生日</span>
      </button>
    </div>

    <!-- 今日日程 -->
    <div v-if="todaySchedules.length > 0" class="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
        <span>📅</span> 今日日程
      </h3>
      <div class="space-y-3">
        <div v-for="(schedule, index) in todaySchedules" :key="index" 
          class="border border-gray-100 rounded-xl p-4 hover:border-indigo-200 transition-colors"
          :class="schedule.done ? 'opacity-60' : ''">
          <div class="flex items-start gap-3">
            <button @click="toggleDone(schedule)" class="w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors"
              :class="schedule.done ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-indigo-400'">
              <span v-if="schedule.done" class="text-sm">✓</span>
            </button>
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <span class="text-xl">{{ schedule.icon }}</span>
                <h4 class="font-bold text-gray-800">{{ schedule.title }}</h4>
              </div>
              <div class="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span class="flex items-center gap-1">
                  <span>⏰</span> {{ schedule.time }}
                </span>
                <span v-if="schedule.location" class="flex items-center gap-1">
                  <span>📍</span> {{ schedule.location }}
                </span>
              </div>
              <p v-if="schedule.notes" class="mt-2 text-xs text-gray-400 bg-gray-50 p-2 rounded-lg">
                {{ schedule.notes }}
              </p>
            </div>
          </div>
          <div class="flex gap-2 mt-3 ml-11">
            <button @click="editSchedule(schedule)" class="px-3 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">编辑</button>
            <button @click="deleteScheduleConfirm(schedule)" class="px-3 py-1 text-xs text-red-500 hover:bg-red-50 rounded-lg transition-colors">删除</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 日历视图 -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold text-gray-700 flex items-center gap-2">
          <span>🗓️</span> {{ currentMonth }}
        </h3>
        <div class="flex gap-2">
          <button @click="prevMonth" class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">‹</button>
          <button @click="nextMonth" class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">›</button>
        </div>
      </div>
      <div class="grid grid-cols-7 gap-1 text-center text-sm">
        <div v-for="day in weekDays" :key="day" class="text-gray-400 font-medium py-2">{{ day }}</div>
        <div v-for="(day, i) in calendarDays" :key="i" 
          class="aspect-square flex items-center justify-center rounded-lg text-sm cursor-pointer transition-colors"
          :class="[
            day.isToday ? 'bg-indigo-500 text-white font-bold' : '',
            day.hasEvent ? 'bg-indigo-50 font-medium' : '',
            day.isCurrentMonth ? 'text-gray-800' : 'text-gray-300'
          ]"
          @click="day.isCurrentMonth && day.day && selectDate(day)">
          <span v-if="day.day">{{ day.day }}</span>
          <span v-else class="w-2 h-2 bg-indigo-400 rounded-full"></span>
        </div>
      </div>
    </div>

    <!-- 近期日程 -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold text-gray-700 flex items-center gap-2">
          <span>📋</span> 近期日程
        </h3>
        <button @click="filterType = filterType === 'all' ? 'upcoming' : 'all'" 
          class="text-sm text-indigo-600 hover:text-indigo-800">
          {{ filterType === 'all' ? '只看未来' : '显示全部' }}
        </button>
      </div>
      <div v-if="filteredSchedules.length > 0" class="space-y-3">
        <div v-for="(schedule, index) in filteredSchedules" :key="index" 
          class="border border-gray-100 rounded-xl p-4 hover:border-indigo-200 transition-colors">
          <div class="flex items-start gap-3">
            <div class="w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex flex-col items-center justify-center">
              <span class="text-xs text-indigo-600">{{ schedule.monthDay }}</span>
              <span class="text-lg font-bold text-indigo-700">{{ schedule.day }}</span>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <span class="text-xl">{{ schedule.icon }}</span>
                <h4 class="font-bold text-gray-800">{{ schedule.title }}</h4>
              </div>
              <div class="flex items-center gap-4 mt-1 text-sm text-gray-500">
                <span>{{ schedule.weekday }}</span>
                <span v-if="schedule.time !== '00:00'">⏰ {{ schedule.time }}</span>
              </div>
              <p v-if="schedule.notes" class="mt-1 text-xs text-gray-400">{{ schedule.notes }}</p>
            </div>
            <button @click="deleteScheduleConfirm(schedule)" class="text-gray-400 hover:text-red-500">🗑️</button>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-8 text-gray-400">
        <div class="text-4xl mb-3">📅</div>
        <p>暂无日程安排</p>
        <p class="text-sm">点击上方按钮添加第一个日程</p>
      </div>
    </div>

    <!-- 重要日期 -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
        <span>🎯</span> 重要日期提醒
      </h3>
      <div class="grid grid-cols-2 gap-3">
        <button @click="openAddModal('birthday')" class="bg-red-50 rounded-lg p-4 text-center border border-red-100 hover:bg-red-100 transition-colors">
          <div class="text-3xl mb-2">🎂</div>
          <p class="text-sm text-gray-600">生日提醒</p>
          <p class="text-xs text-gray-400 mt-1">{{ birthdayCount }} 个</p>
        </button>
        <button @click="openAddModal('checkup')" class="bg-green-50 rounded-lg p-4 text-center border border-green-100 hover:bg-green-100 transition-colors">
          <div class="text-3xl mb-2">🏥</div>
          <p class="text-sm text-gray-600">体检提醒</p>
          <p class="text-xs text-gray-400 mt-1">{{ checkupCount }} 个</p>
        </button>
        <button @click="openAddModal('festival')" class="bg-yellow-50 rounded-lg p-4 text-center border border-yellow-100 hover:bg-yellow-100 transition-colors">
          <div class="text-3xl mb-2">🎉</div>
          <p class="text-sm text-gray-600">节日提醒</p>
          <p class="text-xs text-gray-400 mt-1">{{ festivalCount }} 个</p>
        </button>
        <button @click="openAddModal('followup')" class="bg-blue-50 rounded-lg p-4 text-center border border-blue-100 hover:bg-blue-100 transition-colors">
          <div class="text-3xl mb-2">💊</div>
          <p class="text-sm text-gray-600">复诊提醒</p>
          <p class="text-xs text-gray-400 mt-1">{{ followupCount }} 个</p>
        </button>
      </div>
    </div>

    <!-- 生日倒计时 -->
    <div v-if="upcomingBirthdays.length > 0" class="bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl p-6 text-white mb-6">
      <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
        <span>🎂</span> 即将到来的生日
      </h3>
      <div class="space-y-3">
        <div v-for="(birthday, i) in upcomingBirthdays" :key="i" class="bg-white/20 rounded-lg p-3 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="text-2xl">{{ birthday.icon }}</span>
            <div>
              <p class="font-medium">{{ birthday.name }}</p>
              <p class="text-sm text-pink-200">{{ birthday.date }}</p>
            </div>
          </div>
          <div class="text-center">
            <p class="text-2xl font-bold">{{ birthday.daysLeft }}</p>
            <p class="text-xs text-pink-200">天后</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 提醒设置 -->
    <div class="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-6 text-white mb-6">
      <h3 class="text-lg font-bold mb-4 flex items-center gap-2">
        <span>🔔</span> 提醒设置
      </h3>
      <div class="space-y-4">
        <div class="flex items-center justify-between bg-white/10 rounded-lg p-3">
          <div>
            <p class="font-medium">提前一天提醒</p>
            <p class="text-sm text-orange-200">前一天晚上通知</p>
          </div>
          <button @click="toggleSetting('dayBefore')" 
            :class="reminderSettings.dayBefore ? 'bg-white text-orange-500' : 'bg-white/30 text-white'" 
            class="w-14 h-7 rounded-full relative transition-colors">
            <span :class="reminderSettings.dayBefore ? 'left-7' : 'left-1'" class="absolute top-1 w-5 h-5 bg-white rounded-full transition-all"></span>
          </button>
        </div>
        <div class="flex items-center justify-between bg-white/10 rounded-lg p-3">
          <div>
            <p class="font-medium">当天提醒</p>
            <p class="text-sm text-orange-200">日程开始前提醒</p>
          </div>
          <button @click="toggleSetting('sameDay')" 
            :class="reminderSettings.sameDay ? 'bg-white text-orange-500' : 'bg-white/30 text-white'" 
            class="w-14 h-7 rounded-full relative transition-colors">
            <span :class="reminderSettings.sameDay ? 'left-7' : 'left-1'" class="absolute top-1 w-5 h-5 bg-white rounded-full transition-all"></span>
          </button>
        </div>
        <div class="flex items-center justify-between bg-white/10 rounded-lg p-3">
          <div>
            <p class="font-medium">语音播报</p>
            <p class="text-sm text-orange-200">语音朗读日程内容</p>
          </div>
          <button @click="toggleSetting('voice')" 
            :class="reminderSettings.voice ? 'bg-white text-orange-500' : 'bg-white/30 text-white'" 
            class="w-14 h-7 rounded-full relative transition-colors">
            <span :class="reminderSettings.voice ? 'left-7' : 'left-1'" class="absolute top-1 w-5 h-5 bg-white rounded-full transition-all"></span>
          </button>
        </div>
      </div>
    </div>

    <!-- 添加日程弹窗 -->
    <div v-if="showAddModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h3 class="text-lg font-bold text-gray-800 mb-4">添加日程</h3>
        
        <!-- 语音输入按钮 -->
        <button @click="toggleVoiceInput" 
          :class="isVoiceInput ? 'bg-red-500 text-white animate-pulse' : 'bg-indigo-500 text-white'"
          class="w-full py-3 rounded-xl font-medium mb-4 flex items-center justify-center gap-2 transition-all">
          <span class="text-xl">{{ isVoiceInput ? '⏹️' : '🎤' }}</span>
          {{ isVoiceInput ? '停止语音输入' : '语音输入' }}
        </button>
        <p v-if="isVoiceInput" class="text-center text-indigo-500 text-sm mb-4 animate-pulse">
          请说出日程信息，如"明天下午三点体检"或"下周一去医院复诊"
        </p>
        
        <div class="space-y-4">
          <div>
            <label class="block text-gray-600 text-sm mb-2">日程标题 *</label>
            <input v-model="newSchedule.title" type="text" placeholder="如: 体检" class="w-full border border-gray-200 rounded-lg p-3 focus:border-indigo-500">
          </div>
          <div>
            <label class="block text-gray-600 text-sm mb-2">类型</label>
            <div class="grid grid-cols-5 gap-2">
              <button v-for="type in scheduleTypes" :key="type.value" 
                @click="newSchedule.type = type.value"
                :class="newSchedule.type === type.value ? 'bg-indigo-100 border-indigo-500' : 'bg-gray-50 border-gray-200'"
                class="p-3 rounded-lg border-2 text-center hover:border-indigo-300 transition-colors">
                <span class="text-2xl">{{ type.icon }}</span>
                <p class="text-xs mt-1">{{ type.label }}</p>
              </button>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-gray-600 text-sm mb-2">日期</label>
              <input v-model="newSchedule.date" type="date" class="w-full border border-gray-200 rounded-lg p-3 focus:border-indigo-500">
            </div>
            <div>
              <label class="block text-gray-600 text-sm mb-2">时间</label>
              <input v-model="newSchedule.time" type="time" class="w-full border border-gray-200 rounded-lg p-3 focus:border-indigo-500">
            </div>
          </div>
          <div>
            <label class="block text-gray-600 text-sm mb-2">地点</label>
            <input v-model="newSchedule.location" type="text" placeholder="如: 市第一医院" class="w-full border border-gray-200 rounded-lg p-3 focus:border-indigo-500">
          </div>
          <div>
            <label class="block text-gray-600 text-sm mb-2">备注</label>
            <textarea v-model="newSchedule.notes" placeholder="附加信息" rows="2" class="w-full border border-gray-200 rounded-lg p-3 focus:border-indigo-500"></textarea>
          </div>
          <div class="flex items-center gap-2">
            <input v-model="newSchedule.repeat" type="checkbox" id="repeat" class="w-4 h-4">
            <label for="repeat" class="text-sm text-gray-600">重复提醒</label>
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
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { useAppStore } from '../stores/appStore'
import { useToastStore } from '../stores/toastStore'
import { voiceAssistant } from '../utils/voiceAssistant'
import AppIcon from '../components/AppIcon.vue'

const store = useAppStore()
const toast = useToastStore()

const showAddModal = ref(false)
const filterType = ref('upcoming')
const currentMonthDate = ref(new Date())
const selectedDate = ref(null)
const isVoiceInput = ref(false)

const newSchedule = ref({
  title: '',
  date: '',
  time: '09:00',
  type: 'other',
  location: '',
  notes: '',
  repeat: false,
  done: false
})

const scheduleTypes = [
  { value: 'birthday', label: '生日', icon: '🎂' },
  { value: 'checkup', label: '体检', icon: '🏥' },
  { value: 'festival', label: '节日', icon: '🎉' },
  { value: 'followup', label: '复诊', icon: '💊' },
  { value: 'other', label: '其他', icon: '📅' }
]

const typeIcons = {
  birthday: '🎂',
  checkup: '🏥',
  festival: '🎉',
  followup: '💊',
  other: '📅'
}

const reminderSettings = ref({
  dayBefore: true,
  sameDay: true,
  voice: true
})

const weekDays = ['日', '一', '二', '三', '四', '五', '六']

const todayDate = computed(() => {
  return new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' })
})

const currentMonth = computed(() => {
  return currentMonthDate.value.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' })
})

const calendarDays = computed(() => {
  const year = currentMonthDate.value.getFullYear()
  const month = currentMonthDate.value.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()
  
  const today = new Date()
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  
  const days = []
  
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: daysInPrevMonth - i, isCurrentMonth: false, isToday: false, hasEvent: false })
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
    const hasEvent = store.scheduleRecords.some(s => s.date === dateStr)
    days.push({
      day: i,
      isCurrentMonth: true,
      isToday: dateStr === todayStr,
      hasEvent,
      date: dateStr
    })
  }
  
  const remaining = 42 - days.length
  for (let i = 1; i <= remaining; i++) {
    days.push({ day: i, isCurrentMonth: false, isToday: false, hasEvent: false })
  }
  
  return days
})

const todaySchedules = computed(() => {
  const todayStr = new Date().toISOString().split('T')[0]
  return store.scheduleRecords
    .filter(s => s.date === todayStr)
    .map(s => ({
      ...s,
      icon: typeIcons[s.type] || '📅'
    }))
    .sort((a, b) => a.time.localeCompare(b.time))
})

const filteredSchedules = computed(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  let schedules = store.scheduleRecords.map(s => {
    const date = new Date(s.date)
    date.setHours(0, 0, 0, 0)
    return {
      ...s,
      icon: typeIcons[s.type] || '📅',
      dateObj: date,
      day: date.getDate(),
      monthDay: date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }).replace('月', '').replace('日', ''),
      weekday: date.toLocaleDateString('zh-CN', { weekday: 'short' })
    }
  })
  
  if (filterType.value === 'upcoming') {
    schedules = schedules.filter(s => s.dateObj >= today)
  }
  
  return schedules.sort((a, b) => a.dateObj - b.dateObj).slice(0, 10)
})

const birthdayCount = computed(() => {
  return store.scheduleRecords.filter(s => s.type === 'birthday').length
})

const checkupCount = computed(() => {
  return store.scheduleRecords.filter(s => s.type === 'checkup').length
})

const festivalCount = computed(() => {
  return store.scheduleRecords.filter(s => s.type === 'festival').length
})

const followupCount = computed(() => {
  return store.scheduleRecords.filter(s => s.type === 'followup').length
})

const upcomingBirthdays = computed(() => {
  const today = new Date()
  const thisYear = today.getFullYear()
  
  return store.scheduleRecords
    .filter(s => s.type === 'birthday')
    .map(s => {
      const birthdayThisYear = new Date(thisYear, parseInt(s.date.split('-')[1]) - 1, parseInt(s.date.split('-')[2]))
      if (birthdayThisYear < today) {
        birthdayThisYear.setFullYear(thisYear + 1)
      }
      const daysLeft = Math.ceil((birthdayThisYear - today) / (1000 * 60 * 60 * 24))
      return {
        ...s,
        icon: '🎂',
        date: birthdayThisYear.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' }),
        daysLeft
      }
    })
    .filter(b => b.daysLeft <= 30)
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, 3)
})

const prevMonth = () => {
  currentMonthDate.value = new Date(currentMonthDate.value.getFullYear(), currentMonthDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentMonthDate.value = new Date(currentMonthDate.value.getFullYear(), currentMonthDate.value.getMonth() + 1, 1)
}

const selectDate = (day) => {
  selectedDate.value = day.date
  newSchedule.value.date = day.date
  showAddModal.value = true
}

const openAddModal = (type) => {
  newSchedule.value = {
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    type,
    location: '',
    notes: '',
    repeat: false,
    done: false
  }
  showAddModal.value = true
}

const addSchedule = () => {
  if (!newSchedule.value.title.trim()) {
    toast.warning('请输入日程标题', 2000)
    return
  }
  if (!newSchedule.value.date) {
    toast.warning('请选择日期', 2000)
    return
  }
  
  store.addScheduleRecord({ ...newSchedule.value })
  showAddModal.value = false
  toast.success('日程已添加', 2000)
}

const editSchedule = (schedule) => {
  toast.info('编辑功能开发中', 1500)
}

const deleteScheduleConfirm = (schedule) => {
  if (confirm(`确定删除日程"${schedule.title}"吗？`)) {
    const index = store.scheduleRecords.findIndex(s => s.title === schedule.title && s.date === schedule.date)
    if (index > -1) {
      store.deleteScheduleRecord(index)
      toast.success('日程已删除', 2000)
    }
  }
}

const toggleDone = (schedule) => {
  schedule.done = !schedule.done
  store.saveScheduleRecords()
  toast.success(schedule.done ? '已标记为完成' : '已取消完成', 1500)
}

const toggleSetting = (key) => {
  reminderSettings.value[key] = !reminderSettings.value[key]
  toast.info(`已${reminderSettings.value[key] ? '开启' : '关闭'}提醒`, 1500)
}

onMounted(() => {
  store.loadScheduleRecords()
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
    toast.info('开始语音输入，请说出日程信息...', 2000)
    voiceAssistant.startListening()
  }
}

const handleVoiceEvent = (event, data) => {
  switch (event) {
    case 'result':
      parseScheduleData(data)
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

const parseScheduleData = (text) => {
  if (!text) return
  
  // 解析日程标题
  const titlePatterns = [
    { pattern: /体检/, title: '体检', type: 'checkup' },
    { pattern: /复诊|复查/, title: '复诊', type: 'followup' },
    { pattern: /生日/, title: '生日', type: 'birthday' },
    { pattern: /医院|看病/, title: '看病', type: 'other' },
    { pattern: /约会|见面/, title: '约会', type: 'other' },
    { pattern: /聚会|聚餐/, title: '聚会', type: 'festival' },
    { pattern: /旅游|旅行/, title: '旅游', type: 'festival' }
  ]
  for (const tp of titlePatterns) {
    if (tp.pattern.test(text)) {
      newSchedule.value.title = tp.title
      newSchedule.value.type = tp.type
      toast.success(`识别到日程：${tp.title}`, 2000)
      break
    }
  }
  
  // 解析日期
  const today = new Date()
  const datePatterns = [
    { pattern: /今天/, date: today },
    { pattern: /明天/, date: new Date(today.getTime() + 86400000) },
    { pattern: /后天/, date: new Date(today.getTime() + 172800000) },
    { pattern: /下周一/, date: getNextWeekday(1) },
    { pattern: /下周二/, date: getNextWeekday(2) },
    { pattern: /下周三/, date: getNextWeekday(3) },
    { pattern: /下周四/, date: getNextWeekday(4) },
    { pattern: /下周五/, date: getNextWeekday(5) },
    { pattern: /下周六/, date: getNextWeekday(6) },
    { pattern: /下周日/, date: getNextWeekday(0) }
  ]
  for (const dp of datePatterns) {
    if (dp.pattern.test(text)) {
      newSchedule.value.date = dp.date.toISOString().split('T')[0]
      toast.success(`识别到日期：${dp.date.toLocaleDateString('zh-CN')}`, 2000)
      break
    }
  }
  
  // 解析时间
  const timePatterns = [
    { pattern: /早上|上午|八点|8点/, time: '08:00' },
    { pattern: /九点|9点/, time: '09:00' },
    { pattern: /十点|10点/, time: '10:00' },
    { pattern: /中午|十二点|12点/, time: '12:00' },
    { pattern: /下午一点|13点/, time: '13:00' },
    { pattern: /下午两点|14点/, time: '14:00' },
    { pattern: /下午三点|15点/, time: '15:00' },
    { pattern: /下午四点|16点/, time: '16:00' },
    { pattern: /下午五点|17点/, time: '17:00' },
    { pattern: /晚上|六点|18点/, time: '18:00' }
  ]
  for (const tp of timePatterns) {
    if (tp.pattern.test(text)) {
      newSchedule.value.time = tp.time
      toast.success(`识别到时间：${tp.time}`, 2000)
      break
    }
  }
  
  // 解析地点
  const locationPatterns = [
    /在(.{2,10})/,
    /去(.{2,10})/,
    /到(.{2,10})/
  ]
  for (const pattern of locationPatterns) {
    const match = text.match(pattern)
    if (match) {
      newSchedule.value.location = match[1]
      toast.success(`识别到地点：${match[1]}`, 2000)
      break
    }
  }
}

const getNextWeekday = (targetDay) => {
  const today = new Date()
  const currentDay = today.getDay()
  let daysToAdd = targetDay - currentDay
  if (daysToAdd <= 0) daysToAdd += 7
  return new Date(today.getTime() + daysToAdd * 86400000)
}
</script>
