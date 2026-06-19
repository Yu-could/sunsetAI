<template>
  <div class="px-4 py-6 max-w-md mx-auto">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-2">⚙️ 个人设置</h1>
      <p class="text-gray-500">管理个人信息和应用设置</p>
    </header>

    <!-- 用户信息 -->
    <div class="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-6 text-white mb-6">
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl">{{ userProfile.avatar || '👵' }}</div>
        <div>
          <h3 class="text-xl font-bold">{{ userProfile.name || '父母用户' }}</h3>
          <p class="text-orange-200">{{ userProfile.phone || '未设置手机号' }}</p>
        </div>
      </div>
      <button @click="showEditProfile = true" class="mt-4 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm">编辑个人信息</button>
    </div>

    <!-- 基本设置 -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4">基本设置</h3>
      <div class="space-y-4">
        <div class="flex items-center justify-between py-3 border-b border-gray-100">
          <div class="flex items-center gap-3">
            <span class="text-xl">🔊</span>
            <span class="text-gray-700">语音播报</span>
          </div>
          <div class="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer" @click="toggleVoice">
            <div class="w-5 h-5 bg-white rounded-full absolute right-1 top-0.5 transition-all" :class="{ 'right-1': settings.voiceEnabled, 'left-1': !settings.voiceEnabled }"></div>
          </div>
        </div>
        <div class="flex items-center justify-between py-3 border-b border-gray-100">
          <div class="flex items-center gap-3">
            <span class="text-xl">🔔</span>
            <span class="text-gray-700">消息通知</span>
          </div>
          <div class="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer" @click="toggleNotification">
            <div class="w-5 h-5 bg-white rounded-full absolute right-1 top-0.5 transition-all" :class="{ 'right-1': settings.notificationEnabled, 'left-1': !settings.notificationEnabled }"></div>
          </div>
        </div>
        <div class="flex items-center justify-between py-3 border-b border-gray-100">
          <div class="flex items-center gap-3">
            <span class="text-xl">🌙</span>
            <span class="text-gray-700">夜间模式</span>
          </div>
          <div class="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer" @click="toggleDarkMode">
            <div class="w-5 h-5 bg-white rounded-full absolute left-1 top-0.5 transition-all" :class="{ 'right-1': settings.darkMode, 'left-1': !settings.darkMode }"></div>
          </div>
        </div>
        <div class="flex items-center justify-between py-3">
          <div class="flex items-center gap-3">
            <span class="text-xl">🔤</span>
            <span class="text-gray-700">大字体</span>
          </div>
          <div class="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer" @click="toggleLargeFont">
            <div class="w-5 h-5 bg-white rounded-full absolute right-1 top-0.5 transition-all" :class="{ 'right-1': settings.largeFont, 'left-1': !settings.largeFont }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 提醒时间设置 -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4">提醒时间</h3>
      <div class="space-y-4">
        <div class="flex items-center justify-between py-3 border-b border-gray-100">
          <span class="text-gray-700">签到提醒时间</span>
          <input v-model="settings.signInReminderTime" type="time" class="border border-gray-200 rounded-lg px-3 py-1 text-sm">
        </div>
        <div class="flex items-center justify-between py-3 border-b border-gray-100">
          <span class="text-gray-700">饮食提醒时间</span>
          <input v-model="settings.mealReminderTimes" type="text" placeholder="如: 08:00,12:00,18:00" class="border border-gray-200 rounded-lg px-3 py-1 text-sm w-32">
        </div>
        <div class="flex items-center justify-between py-3">
          <span class="text-gray-700">用药提醒提前</span>
          <select v-model="settings.medicineReminderAdvance" class="border border-gray-200 rounded-lg px-3 py-1 text-sm">
            <option value="5">5分钟</option>
            <option value="10">10分钟</option>
            <option value="15">15分钟</option>
            <option value="30">30分钟</option>
          </select>
        </div>
      </div>
      <button @click="saveSettings" class="mt-4 w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600">保存设置</button>
    </div>

    <!-- 数据管理 -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4">数据管理</h3>
      <div class="space-y-3">
        <button @click="exportData" class="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
          <div class="flex items-center gap-3">
            <span class="text-xl">📤</span>
            <span class="text-gray-700">导出数据</span>
          </div>
          <span class="text-gray-400">→</span>
        </button>
        <button @click="confirmClearData" class="w-full flex items-center justify-between p-3 bg-red-50 rounded-lg hover:bg-red-100 text-red-600">
          <div class="flex items-center gap-3">
            <span class="text-xl">🗑️</span>
            <span class="text-red-600">清除所有数据</span>
          </div>
          <span class="text-red-400">→</span>
        </button>
      </div>
    </div>

    <!-- 关于应用 -->
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
      <h3 class="text-lg font-bold text-gray-700 mb-4">关于应用</h3>
      <div class="space-y-3 text-sm text-gray-600">
        <div class="flex justify-between">
          <span>应用名称</span>
          <span class="text-gray-800">夕阳智语 SunsetAI</span>
        </div>
        <div class="flex justify-between">
          <span>版本号</span>
          <span class="text-gray-800">v1.0.0</span>
        </div>
        <div class="flex justify-between">
          <span>开发者</span>
          <span class="text-gray-800">TRAE AI 创造力大赛</span>
        </div>
      </div>
    </div>

    <!-- 退出登录 -->
    <button @click="logout" class="w-full bg-gray-100 text-gray-600 py-4 rounded-xl hover:bg-gray-200 flex items-center justify-center gap-2">
      <span class="text-xl">👋</span>
      <span class="font-medium">退出登录</span>
    </button>

    <!-- 编辑个人信息弹窗 -->
    <div v-if="showEditProfile" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl p-6 w-full max-w-sm">
        <h3 class="text-lg font-bold text-gray-800 mb-4">编辑个人信息</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-gray-600 text-sm mb-2">姓名</label>
            <input v-model="editProfile.name" type="text" placeholder="请输入姓名" class="w-full border border-gray-200 rounded-lg p-3 focus:border-orange-500">
          </div>
          <div>
            <label class="block text-gray-600 text-sm mb-2">手机号</label>
            <input v-model="editProfile.phone" type="tel" maxlength="11" placeholder="请输入手机号" class="w-full border border-gray-200 rounded-lg p-3 focus:border-orange-500">
          </div>
          <div>
            <label class="block text-gray-600 text-sm mb-2">年龄</label>
            <input v-model="editProfile.age" type="number" placeholder="请输入年龄" class="w-full border border-gray-200 rounded-lg p-3 focus:border-orange-500">
          </div>
          <div>
            <label class="block text-gray-600 text-sm mb-2">头像</label>
            <div class="flex gap-3">
              <button v-for="avatar in avatarOptions" :key="avatar" @click="editProfile.avatar = avatar" :class="editProfile.avatar === avatar ? 'border-orange-500 bg-orange-50' : 'border-gray-200'" class="w-12 h-12 rounded-full border-2 flex items-center justify-center text-2xl">{{ avatar }}</button>
            </div>
          </div>
        </div>
        <div class="flex gap-3 mt-6">
          <button @click="showEditProfile = false" class="flex-1 bg-gray-100 text-gray-600 py-3 rounded-lg hover:bg-gray-200">取消</button>
          <button @click="saveProfile" class="flex-1 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores/appStore'

const router = useRouter()
const store = useAppStore()

const showEditProfile = ref(false)
const avatarOptions = ['👵', '👴', '👨', '👩']

const userProfile = computed(() => store.userProfile || {})

const editProfile = ref({
  name: '',
  phone: '',
  age: '',
  avatar: '👵'
})

const settings = ref({
  voiceEnabled: true,
  notificationEnabled: true,
  darkMode: false,
  largeFont: true,
  signInReminderTime: '08:00',
  mealReminderTimes: '08:00,12:00,18:00',
  medicineReminderAdvance: '10'
})

const toggleVoice = () => {
  settings.value.voiceEnabled = !settings.value.voiceEnabled
}

const toggleNotification = () => {
  settings.value.notificationEnabled = !settings.value.notificationEnabled
}

const toggleDarkMode = () => {
  settings.value.darkMode = !settings.value.darkMode
}

const toggleLargeFont = () => {
  settings.value.largeFont = !settings.value.largeFont
}

const saveSettings = () => {
  store.saveAppSettings(settings.value)
  alert('设置已保存')
}

const saveProfile = () => {
  store.saveUserProfile(editProfile.value)
  showEditProfile.value = false
  alert('个人信息已保存')
}

const exportData = () => {
  const data = {
    signInRecords: store.signInRecords,
    dietRecords: store.dietRecords,
    healthRecords: store.healthRecords,
    memoryRecords: store.memoryRecords,
    scheduleRecords: store.scheduleRecords
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'sunsetai_data_' + new Date().toISOString().split('T')[0] + '.json'
  a.click()
  alert('数据已导出')
}

const confirmClearData = () => {
  if (confirm('确定要清除所有数据吗？此操作不可恢复！')) {
    store.clearAllData()
    alert('所有数据已清除')
    router.push('/')
  }
}

const logout = () => {
  if (confirm('确定要退出登录吗？')) {
    store.logout()
    router.push('/')
  }
}

onMounted(() => {
  store.loadUserProfile()
  store.loadAppSettings()
  if (store.userProfile) {
    editProfile.value = { ...store.userProfile }
  }
  if (store.appSettings) {
    settings.value = { ...store.appSettings }
  }
})
</script>