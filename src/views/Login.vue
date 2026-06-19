<template>
  <div class="min-h-screen bg-bg flex items-center justify-center p-4">
    <div class="login-container w-full max-w-sm bg-card rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6 relative overflow-hidden">
      <div class="absolute top-0 left-0 right-0 h-1" :class="roleColor === 'parent' ? 'bg-gradient-to-r from-parent to-[#e8b88a]' : 'bg-gradient-to-r from-child to-[#a8c5e0]'"></div>
      
      <div class="brand-section text-center mb-6">
        <img src="/logo.png" alt="夕阳智语" class="logo-wrapper w-12 h-12 rounded-xl mx-auto mb-3 shadow-[0_4px_12px_rgba(0,0,0,0.1)] object-contain">
        <h1 class="brand-title text-xl font-bold text-text mb-1">夕阳智语</h1>
        <p :class="['brand-subtitle text-xs', roleColor === 'parent' ? 'text-parent' : 'text-child']">{{ roleTitle }}</p>
      </div>

      <div :class="['login-tabs flex gap-2 mb-5 p-1 rounded-xl', roleColor === 'parent' ? 'bg-parent-light' : 'bg-child-light']">
        <button @click="loginType = 'account'" :class="['flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all', loginType === 'account' ? (roleColor === 'parent' ? 'bg-card shadow-sm text-parent' : 'bg-card shadow-sm text-child') : 'text-text-muted hover:text-text']">账号密码</button>
        <button @click="loginType = 'phone'" :class="['flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all', loginType === 'phone' ? (roleColor === 'parent' ? 'bg-card shadow-sm text-parent' : 'bg-card shadow-sm text-child') : 'text-text-muted hover:text-text']">手机号登录</button>
      </div>

      <div v-if="loginType === 'account'" class="space-y-4">
        <div class="input-group">
          <label class="block text-text-secondary text-sm mb-2 font-medium">账号</label>
          <input v-model="accountForm.username" type="text" placeholder="请输入账号" :class="['w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none text-lg transition-all', roleColor === 'parent' ? 'border-border focus:border-parent' : 'border-border focus:border-child']">
        </div>
        <div class="input-group">
          <label class="block text-text-secondary text-sm mb-2 font-medium">密码</label>
          <input v-model="accountForm.password" type="password" placeholder="请输入密码" :class="['w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none text-lg transition-all', roleColor === 'parent' ? 'border-border focus:border-parent' : 'border-border focus:border-child']">
        </div>
      </div>

      <div v-else class="space-y-4">
        <div class="input-group">
          <label class="block text-text-secondary text-sm mb-2 font-medium">手机号</label>
          <input v-model="phoneForm.phone" type="tel" placeholder="请输入手机号" maxlength="11" :class="['w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none text-lg transition-all', roleColor === 'parent' ? 'border-border focus:border-parent' : 'border-border focus:border-child']">
        </div>
        <div class="flex gap-3">
          <div class="flex-1 input-group">
            <label class="block text-text-secondary text-sm mb-2 font-medium">验证码</label>
            <input v-model="phoneForm.code" type="text" placeholder="请输入验证码" maxlength="6" :class="['w-full px-4 py-3.5 border-2 rounded-xl focus:outline-none text-lg transition-all', roleColor === 'parent' ? 'border-border focus:border-parent' : 'border-border focus:border-child']">
          </div>
          <div class="pt-6">
            <button @click="sendCode" :disabled="countdown > 0" :class="['px-4 py-3.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap', roleColor === 'parent' ? (countdown > 0 ? 'bg-border text-text-muted cursor-not-allowed' : 'bg-parent-bg text-[#8b6914] hover:bg-parent-hover') : (countdown > 0 ? 'bg-border text-text-muted cursor-not-allowed' : 'bg-child-bg text-[#1a5276] hover:bg-child-hover')]">
              {{ countdown > 0 ? countdown + 's' : '获取验证码' }}
            </button>
          </div>
        </div>
      </div>

      <button @click="handleLogin" :class="['w-full mt-6 py-3.5 rounded-xl font-bold text-lg transition-all shadow-lg', roleColor === 'parent' ? 'bg-gradient-to-r from-parent to-parent-hover text-white hover:shadow-xl' : 'bg-gradient-to-r from-child to-child-hover text-white hover:shadow-xl']">
        登录
      </button>

      <div class="mt-5 text-center">
        <button @click="router.push('/')" class="text-text-muted text-sm hover:text-parent transition-colors flex items-center justify-center gap-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
            <path d="M19 12H5M12 19l-7-7 7-7"></path>
          </svg>
          返回入口
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAppStore } from '../stores/appStore'

const router = useRouter()
const route = useRoute()
const store = useAppStore()

const loginType = ref('account')
const countdown = ref(0)
const role = ref('')
const roleTitle = ref('')

const accountForm = ref({
  username: '',
  password: ''
})

const phoneForm = ref({
  phone: '',
  code: ''
})

const roleColor = computed(() => {
  return role.value.startsWith('parent') ? 'parent' : 'child'
})

onMounted(() => {
  role.value = route.query.role || ''
  const titles = {
    'parent-mobile': '父母移动端 - 请登录',
    'parent-desktop': '父母桌面端 - 请登录',
    'child-mobile': '子女移动端 - 请登录',
    'child-desktop': '子女桌面端 - 请登录'
  }
  roleTitle.value = titles[role.value] || '用户登录'
})

const sendCode = () => {
  if (!phoneForm.value.phone || phoneForm.value.phone.length !== 11) {
    alert('请输入正确的手机号')
    return
  }
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
  alert('验证码已发送：123456')
}

const handleLogin = () => {
  if (loginType.value === 'account') {
    if (!accountForm.value.username.trim()) {
      alert('请输入账号')
      return
    }
    if (!accountForm.value.password.trim()) {
      alert('请输入密码')
      return
    }

    if (accountForm.value.username === 'admin' && accountForm.value.password === 'admin123') {
      store.setLoginStatus({
        isLoggedIn: true,
        role: 'admin',
        username: 'admin',
        isAdmin: true
      })
      router.push('/admin')
      return
    }
  } else {
    if (!phoneForm.value.phone || phoneForm.value.phone.length !== 11) {
      alert('请输入正确的手机号')
      return
    }
    if (!phoneForm.value.code || phoneForm.value.code !== '123456') {
      alert('验证码错误')
      return
    }
  }

  store.setLoginStatus({
    isLoggedIn: true,
    role: role.value,
    username: accountForm.value.username || phoneForm.value.phone,
    isAdmin: false
  })

  const routes = {
    'parent-mobile': '/parent',
    'parent-desktop': '/desktop',
    'child-mobile': '/child',
    'child-desktop': '/desktop/child'
  }

  const targetRoute = routes[role.value]
  if (targetRoute) {
    router.push(targetRoute)
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.login-container {
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

input::placeholder {
  color: #888888;
}
</style>