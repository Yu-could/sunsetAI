<template>
  <div class="px-4 py-4 max-w-md mx-auto pb-24">
    <header class="mb-4">
      <h1 class="text-xl font-bold text-gray-800">⚙️ 个人设置</h1>
      <p class="text-sm text-gray-500 mt-1">管理个人信息和应用设置</p>
    </header>

    <div class="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-4 text-white mb-4">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">{{ userProfile.avatar || '👵' }}</div>
        <div class="flex-1">
          <h3 class="text-lg font-bold">{{ userProfile.realName || userProfile.name || '用户' }}</h3>
          <p class="text-orange-100 text-xs">{{ userProfile.phone || '未设置手机号' }}</p>
          <p v-if="userProfile.idCard" class="text-orange-100 text-xs">已实名认证 ✓</p>
        </div>
        <button @click="showEditProfile = true" class="bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg text-xs">编辑</button>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-4 mb-4">
      <h3 class="text-base font-bold text-gray-700 mb-3">账号设置</h3>
      <div class="space-y-3">
        <div class="flex items-center justify-between py-2 border-b border-gray-100">
          <span class="text-sm text-gray-600">用户名</span>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-800">{{ userProfile.username || '未设置' }}</span>
            <button @click="showEditUsername = true" class="text-xs text-orange-500 hover:text-orange-600">修改</button>
          </div>
        </div>
        <div class="flex items-center justify-between py-2 border-b border-gray-100">
          <span class="text-sm text-gray-600">实名认证</span>
          <div class="flex items-center gap-2">
            <span :class="userProfile.idCard ? 'text-green-500' : 'text-gray-400'" class="text-sm">{{ userProfile.idCard ? '已认证' : '未认证' }}</span>
            <button v-if="!userProfile.idCard" @click="router.push('/realname')" class="text-xs text-orange-500 hover:text-orange-600">去认证</button>
          </div>
        </div>
        <div class="flex items-center justify-between py-2">
          <span class="text-sm text-gray-600">修改密码</span>
          <button @click="showEditPassword = true" class="text-xs text-orange-500 hover:text-orange-600">修改</button>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-4 mb-4">
      <h3 class="text-base font-bold text-gray-700 mb-3">显示设置</h3>
      <div class="space-y-3">
        <div class="py-2 border-b border-gray-100">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-gray-600">字体大小</span>
            <span class="text-xs text-gray-400">{{ fontSizeLabel }}</span>
          </div>
          <div class="flex items-center gap-2">
            <button @click="settings.fontSize = 'small'" :class="settings.fontSize === 'small' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'" class="px-3 py-1.5 rounded-lg text-xs">小</button>
            <button @click="settings.fontSize = 'medium'" :class="settings.fontSize === 'medium' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'" class="px-3 py-1.5 rounded-lg text-xs">中</button>
            <button @click="settings.fontSize = 'large'" :class="settings.fontSize === 'large' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'" class="px-3 py-1.5 rounded-lg text-xs">大</button>
            <button @click="settings.fontSize = 'xlarge'" :class="settings.fontSize === 'xlarge' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'" class="px-3 py-1.5 rounded-lg text-xs">特大</button>
          </div>
        </div>
        <div class="py-2 border-b border-gray-100">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-gray-600">应用音量</span>
            <span class="text-xs text-gray-400">{{ settings.volume }}%</span>
          </div>
          <input v-model="settings.volume" type="range" min="0" max="100" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500">
        </div>
        <div class="flex items-center justify-between py-2 border-b border-gray-100">
          <div class="flex items-center gap-2">
            <span class="text-lg">🔊</span>
            <span class="text-sm text-gray-600">语音播报</span>
          </div>
          <div :class="settings.voiceEnabled ? 'bg-green-500' : 'bg-gray-300'" class="w-11 h-5 rounded-full relative cursor-pointer" @click="toggleVoice">
            <div :class="settings.voiceEnabled ? 'right-0.5' : 'left-0.5'" class="w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all"></div>
          </div>
        </div>
        <div class="flex items-center justify-between py-2 border-b border-gray-100">
          <div class="flex items-center gap-2">
            <span class="text-lg">🔔</span>
            <span class="text-sm text-gray-600">消息通知</span>
          </div>
          <div :class="settings.notificationEnabled ? 'bg-green-500' : 'bg-gray-300'" class="w-11 h-5 rounded-full relative cursor-pointer" @click="toggleNotification">
            <div :class="settings.notificationEnabled ? 'right-0.5' : 'left-0.5'" class="w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all"></div>
          </div>
        </div>
        <div class="flex items-center justify-between py-2">
          <div class="flex items-center gap-2">
            <span class="text-lg">🌙</span>
            <span class="text-sm text-gray-600">夜间模式</span>
          </div>
          <div :class="settings.darkMode ? 'bg-orange-500' : 'bg-gray-300'" class="w-11 h-5 rounded-full relative cursor-pointer" @click="toggleDarkMode">
            <div :class="settings.darkMode ? 'right-0.5' : 'left-0.5'" class="w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-4 mb-4">
      <h3 class="text-base font-bold text-gray-700 mb-3">提醒时间</h3>
      <div class="space-y-3">
        <div class="flex items-center justify-between py-2 border-b border-gray-100">
          <span class="text-sm text-gray-600">签到提醒</span>
          <input v-model="settings.signInReminderTime" type="time" class="border border-gray-200 rounded-lg px-2 py-1 text-xs">
        </div>
        <div class="flex items-center justify-between py-2 border-b border-gray-100">
          <span class="text-sm text-gray-600">用药提前</span>
          <select v-model="settings.medicineReminderAdvance" class="border border-gray-200 rounded-lg px-2 py-1 text-xs">
            <option value="5">5分钟</option>
            <option value="10">10分钟</option>
            <option value="15">15分钟</option>
            <option value="30">30分钟</option>
          </select>
        </div>
      </div>
      <button @click="saveSettings" class="mt-3 w-full bg-orange-500 text-white py-2.5 rounded-lg text-sm hover:bg-orange-600">保存设置</button>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-4 mb-4">
      <h3 class="text-base font-bold text-gray-700 mb-3">数据管理</h3>
      <div class="space-y-2">
        <button @click="exportData" class="w-full flex items-center justify-between p-2.5 bg-gray-50 rounded-lg hover:bg-gray-100">
          <div class="flex items-center gap-2">
            <span class="text-lg">📤</span>
            <span class="text-sm text-gray-700">导出数据</span>
          </div>
          <span class="text-gray-400 text-xs">→</span>
        </button>
        <button @click="confirmClearData" class="w-full flex items-center justify-between p-2.5 bg-red-50 rounded-lg hover:bg-red-100">
          <div class="flex items-center gap-2">
            <span class="text-lg">🗑️</span>
            <span class="text-sm text-red-600">清除所有数据</span>
          </div>
          <span class="text-red-400 text-xs">→</span>
        </button>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-4 mb-4">
      <h3 class="text-base font-bold text-gray-700 mb-3">关于应用</h3>
      <div class="space-y-2 text-xs text-gray-600">
        <div class="flex justify-between py-1">
          <span>应用名称</span>
          <span class="text-gray-800">夕阳智语 SunsetAI</span>
        </div>
        <div class="flex justify-between py-1">
          <span>版本号</span>
          <span class="text-gray-800">v1.0.0</span>
        </div>
        <div class="flex justify-between py-1">
          <span>开发者</span>
          <span class="text-gray-800">TRAE AI 创造力大赛</span>
        </div>
      </div>
    </div>

    <button @click="logout" class="w-full bg-gray-100 text-gray-600 py-3 rounded-xl hover:bg-gray-200 flex items-center justify-center gap-2">
      <span class="text-lg">👋</span>
      <span class="text-sm font-medium">退出登录</span>
    </button>

    <div v-if="showEditProfile" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl p-5 w-full max-w-sm">
        <h3 class="text-base font-bold text-gray-800 mb-3">编辑个人信息</h3>
        <div class="space-y-3">
          <div>
            <label class="block text-gray-600 text-xs mb-1">姓名</label>
            <input v-model="editProfile.realName" type="text" placeholder="请输入姓名" class="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:border-orange-500">
          </div>
          <div>
            <label class="block text-gray-600 text-xs mb-1">手机号</label>
            <input v-model="editProfile.phone" type="tel" maxlength="11" placeholder="请输入手机号" class="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:border-orange-500">
          </div>
          <div>
            <label class="block text-gray-600 text-xs mb-1">年龄</label>
            <input v-model="editProfile.age" type="number" placeholder="请输入年龄" class="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:border-orange-500">
          </div>
          <div>
            <label class="block text-gray-600 text-xs mb-1">头像</label>
            <div class="flex gap-2">
              <button v-for="avatar in avatarOptions" :key="avatar" @click="editProfile.avatar = avatar" :class="editProfile.avatar === avatar ? 'border-orange-500 bg-orange-50' : 'border-gray-200'" class="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xl">{{ avatar }}</button>
            </div>
          </div>
        </div>
        <div class="flex gap-2 mt-4">
          <button @click="showEditProfile = false" class="flex-1 bg-gray-100 text-gray-600 py-2.5 rounded-lg text-sm">取消</button>
          <button @click="saveProfile" class="flex-1 bg-orange-500 text-white py-2.5 rounded-lg text-sm">保存</button>
        </div>
      </div>
    </div>

    <div v-if="showEditUsername" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl p-5 w-full max-w-sm">
        <h3 class="text-base font-bold text-gray-800 mb-3">修改用户名</h3>
        <div>
          <label class="block text-gray-600 text-xs mb-1">新用户名</label>
          <input v-model="newUsername" type="text" placeholder="请输入新用户名（4-20位）" class="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:border-orange-500">
        </div>
        <div class="flex gap-2 mt-4">
          <button @click="showEditUsername = false" class="flex-1 bg-gray-100 text-gray-600 py-2.5 rounded-lg text-sm">取消</button>
          <button @click="saveUsername" class="flex-1 bg-orange-500 text-white py-2.5 rounded-lg text-sm">保存</button>
        </div>
      </div>
    </div>

    <div v-if="showEditPassword" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl p-5 w-full max-w-sm">
        <h3 class="text-base font-bold text-gray-800 mb-3">修改密码</h3>
        <div class="space-y-3">
          <div>
            <label class="block text-gray-600 text-xs mb-1">当前密码</label>
            <input v-model="passwordForm.oldPassword" type="password" placeholder="请输入当前密码" class="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:border-orange-500">
          </div>
          <div>
            <label class="block text-gray-600 text-xs mb-1">新密码</label>
            <input v-model="passwordForm.newPassword" type="password" placeholder="请输入新密码（6-20位）" class="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:border-orange-500">
          </div>
          <div>
            <label class="block text-gray-600 text-xs mb-1">确认新密码</label>
            <input v-model="passwordForm.confirmPassword" type="password" placeholder="请再次输入新密码" class="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:border-orange-500">
          </div>
        </div>
        <div class="flex gap-2 mt-4">
          <button @click="showEditPassword = false" class="flex-1 bg-gray-100 text-gray-600 py-2.5 rounded-lg text-sm">取消</button>
          <button @click="savePassword" class="flex-1 bg-orange-500 text-white py-2.5 rounded-lg text-sm">保存</button>
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
const showEditUsername = ref(false)
const showEditPassword = ref(false)
const avatarOptions = ['👵', '👴', '👨', '👩', '🧓']
const newUsername = ref('')
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const userProfile = computed(() => store.userProfile || {})

const editProfile = ref({
  realName: '',
  phone: '',
  age: '',
  avatar: '👵'
})

const settings = ref({
  fontSize: 'medium',
  volume: 80,
  voiceEnabled: true,
  notificationEnabled: true,
  darkMode: false,
  signInReminderTime: '08:00',
  medicineReminderAdvance: '10'
})

const fontSizeLabel = computed(() => {
  const labels = { small: '小', medium: '中', large: '大', xlarge: '特大' }
  return labels[settings.value.fontSize] || '中'
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

const saveSettings = () => {
  store.saveAppSettings(settings.value)
  alert('设置已保存')
}

const saveProfile = () => {
  store.saveUserProfile(editProfile.value)
  showEditProfile.value = false
  alert('个人信息已保存')
}

const saveUsername = () => {
  if (!newUsername.value.trim()) {
    alert('请输入用户名')
    return
  }
  if (newUsername.value.length < 4 || newUsername.value.length > 20) {
    alert('用户名长度需在4-20位之间')
    return
  }
  store.updateUsername(newUsername.value)
  showEditUsername.value = false
  alert('用户名已修改')
}

const savePassword = () => {
  if (!passwordForm.value.oldPassword.trim()) {
    alert('请输入当前密码')
    return
  }
  if (!passwordForm.value.newPassword.trim()) {
    alert('请输入新密码')
    return
  }
  if (passwordForm.value.newPassword.length < 6 || passwordForm.value.newPassword.length > 20) {
    alert('新密码长度需在6-20位之间')
    return
  }
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    alert('两次输入的密码不一致')
    return
  }
  showEditPassword.value = false
  alert('密码已修改')
  passwordForm.value = { oldPassword: '', newPassword: '', confirmPassword: '' }
}

const exportData = () => {
  const data = {
    signInRecords: store.signInRecords,
    dietRecords: store.dietRecords,
    healthRecords: store.healthRecords,
    memoryRecords: store.memoryRecords,
    scheduleRecords: store.scheduleRecords,
    userProfile: store.userProfile,
    realNameInfo: store.realNameInfo
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
  store.loadRealNameInfo()
  store.loadAppSettings()
  if (store.userProfile) {
    editProfile.value = { ...store.userProfile }
  }
  if (store.appSettings) {
    settings.value = { ...store.appSettings }
  }
  newUsername.value = store.userProfile?.username || ''
})
</script>