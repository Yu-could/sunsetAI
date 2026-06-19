<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-gradient-to-r from-parent to-parent-hover text-white py-5 px-6">
      <div class="flex items-center justify-between max-w-7xl mx-auto">
        <div class="flex items-center gap-3">
          <div class="text-3xl">👑</div>
          <div>
            <h1 class="text-xl font-bold">夕阳智语 - 管理员后台</h1>
            <p class="text-orange-200 text-xs">管理系统用户和数据</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-white">{{ store.loginStatus.username }}</span>
          <button @click="logout" class="bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg text-sm">退出登录</button>
        </div>
      </div>
    </header>

    <div class="p-6 max-w-7xl mx-auto">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-xl shadow-sm p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-xs">父母用户</p>
              <p class="text-2xl font-bold text-parent mt-1">{{ parentCount }}</p>
            </div>
            <div class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-xl">👵</div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-sm p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-xs">子女用户</p>
              <p class="text-2xl font-bold text-child mt-1">{{ childCount }}</p>
            </div>
            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl">👧</div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-sm p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-xs">今日签到</p>
              <p class="text-2xl font-bold text-green-500 mt-1">{{ todaySignInCount }}</p>
            </div>
            <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-xl">✅</div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-sm p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-xs">健康记录</p>
              <p class="text-2xl font-bold text-red-500 mt-1">{{ healthRecordCount }}</p>
            </div>
            <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-xl">❤️</div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div class="lg:col-span-2 bg-white rounded-xl shadow-sm p-4">
          <h2 class="text-base font-bold text-gray-800 mb-3">用户列表</h2>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-gray-200">
                  <th class="text-left py-2 px-3 text-gray-600 text-xs">用户ID</th>
                  <th class="text-left py-2 px-3 text-gray-600 text-xs">用户名</th>
                  <th class="text-left py-2 px-3 text-gray-600 text-xs">角色</th>
                  <th class="text-left py-2 px-3 text-gray-600 text-xs">登录时间</th>
                  <th class="text-left py-2 px-3 text-gray-600 text-xs">状态</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(user, index) in users" :key="index" class="border-b border-gray-100 hover:bg-gray-50">
                  <td class="py-2 px-3 text-sm">{{ index + 1 }}</td>
                  <td class="py-2 px-3 font-medium text-sm">{{ user.username }}</td>
                  <td class="py-2 px-3">
                    <span :class="user.role === 'admin' ? 'bg-purple-100 text-purple-600' : (user.role.includes('parent') ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600')" class="px-2 py-0.5 rounded-full text-xs">
                      {{ user.role === 'admin' ? '管理员' : (user.role.includes('parent') ? '父母' : '子女') }}
                    </span>
                  </td>
                  <td class="py-2 px-3 text-gray-500 text-xs">{{ user.loginTime || '-' }}</td>
                  <td class="py-2 px-3">
                    <span class="text-green-500 text-sm">在线</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-4">
          <h2 class="text-base font-bold text-gray-800 mb-3">系统统计</h2>
          <div class="space-y-3">
            <div>
              <div class="flex justify-between text-xs mb-1.5">
                <span class="text-gray-600">签到率</span>
                <span class="font-bold text-sm">{{ signInRate }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-1.5">
                <div class="bg-green-500 h-1.5 rounded-full" :style="{ width: signInRate + '%' }"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-xs mb-1.5">
                <span class="text-gray-600">健康记录完整率</span>
                <span class="font-bold text-sm">{{ healthRate }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-1.5">
                <div class="bg-red-500 h-1.5 rounded-full" :style="{ width: healthRate + '%' }"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-xs mb-1.5">
                <span class="text-gray-600">用药依从率</span>
                <span class="font-bold text-sm">{{ medicineRate }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-1.5">
                <div class="bg-purple-500 h-1.5 rounded-full" :style="{ width: medicineRate + '%' }"></div>
              </div>
            </div>
          </div>

          <h3 class="text-sm font-bold text-gray-800 mt-4 mb-3">最近活动</h3>
          <div class="space-y-2">
            <div v-for="(activity, index) in recentActivities" :key="index" class="flex items-start gap-2">
              <span class="text-lg">{{ activity.icon }}</span>
              <div>
                <p class="text-xs text-gray-700">{{ activity.text }}</p>
                <p class="text-xs text-gray-400">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4 bg-white rounded-xl shadow-sm p-4">
        <h2 class="text-base font-bold text-gray-800 mb-3">数据管理</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button @click="exportAllData" class="flex flex-col items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <span class="text-2xl mb-1">📤</span>
            <span class="text-xs font-medium text-blue-600">导出全部数据</span>
          </button>
          <button @click="clearAllData" class="flex flex-col items-center p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
            <span class="text-2xl mb-1">🗑️</span>
            <span class="text-xs font-medium text-red-600">清除全部数据</span>
          </button>
          <button @click="viewLogs" class="flex flex-col items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <span class="text-2xl mb-1">📋</span>
            <span class="text-xs font-medium text-green-600">查看日志</span>
          </button>
          <button @click="systemSettings" class="flex flex-col items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <span class="text-2xl mb-1">⚙️</span>
            <span class="text-xs font-medium text-gray-600">系统设置</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores/appStore'

const router = useRouter()
const store = useAppStore()

const users = computed(() => {
  const allUsers = []
  if (store.loginStatus.isLoggedIn) {
    allUsers.push({
      username: store.loginStatus.username,
      role: store.loginStatus.role,
      loginTime: new Date().toLocaleString('zh-CN'),
      isOnline: true
    })
  }
  const connectedChildren = store.connectedChildren.map(c => ({
    username: c.name || '子女用户',
    role: 'child-mobile',
    loginTime: '-',
    isOnline: true
  }))
  return [...allUsers, ...connectedChildren]
})

const parentCount = computed(() => users.value.filter(u => u.role.includes('parent')).length)
const childCount = computed(() => users.value.filter(u => u.role.includes('child')).length)

const todaySignInCount = computed(() => {
  const today = new Date().toDateString()
  return store.signInRecords.filter(r => new Date(r.timestamp).toDateString() === today).length
})

const healthRecordCount = computed(() => store.healthRecords.length)

const signInRate = computed(() => {
  const total = store.signInRecords.length
  if (total === 0) return 0
  const thisWeek = store.signInRecords.filter(r => {
    const date = new Date(r.timestamp)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return date >= weekAgo
  }).length
  return Math.round((thisWeek / 7) * 100)
})

const healthRate = computed(() => {
  if (store.healthRecords.length === 0) return 0
  const complete = store.healthRecords.filter(r => r.status === '正常').length
  return Math.round((complete / store.healthRecords.length) * 100)
})

const medicineRate = computed(() => {
  if (store.medicineRecords.length === 0) return 0
  const taken = store.medicineRecords.filter(m => m.takenToday).length
  return Math.round((taken / store.medicineRecords.length) * 100)
})

const recentActivities = computed(() => [
  { icon: '✅', text: '用户完成今日签到', time: '刚刚' },
  { icon: '❤️', text: '用户记录健康数据', time: '5分钟前' },
  { icon: '💊', text: '用户服用药物', time: '10分钟前' },
  { icon: '📖', text: '用户创建回忆录', time: '1小时前' },
  { icon: '👨‍👩‍👧', text: '子女连接父母', time: '2小时前' }
])

const logout = () => {
  if (confirm('确定要退出管理员登录吗？')) {
    store.logout()
    router.push('/')
  }
}

const exportAllData = () => {
  const data = {
    loginStatus: store.loginStatus,
    signInRecords: store.signInRecords,
    dietRecords: store.dietRecords,
    healthRecords: store.healthRecords,
    memoryRecords: store.memoryRecords,
    medicineRecords: store.medicineRecords,
    medicineTakenRecords: store.medicineTakenRecords,
    sosRecords: store.sosRecords,
    scheduleRecords: store.scheduleRecords,
    connectedChildren: store.connectedChildren,
    userProfile: store.userProfile,
    appSettings: store.appSettings
  }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'sunsetai_admin_backup_' + new Date().toISOString().split('T')[0] + '.json'
  a.click()
  alert('数据导出成功')
}

const clearAllData = () => {
  if (confirm('确定要清除所有数据吗？此操作不可恢复！')) {
    store.clearAllData()
    alert('所有数据已清除')
    router.push('/')
  }
}

const viewLogs = () => {
  alert('日志功能开发中...')
}

const systemSettings = () => {
  alert('系统设置功能开发中...')
}

onMounted(() => {
  if (!store.loginStatus.isAdmin) {
    router.push('/')
  }
})
</script>