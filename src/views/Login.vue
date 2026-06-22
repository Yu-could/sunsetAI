﻿﻿﻿﻿﻿﻿﻿<template>
  <div class="min-h-screen bg-bg flex items-center justify-center p-4">
    <div class="login-container w-full max-w-sm bg-card rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6 relative overflow-hidden">
      <div class="absolute top-0 left-0 right-0 h-1" :class="roleColor === 'parent' ? 'bg-gradient-to-r from-parent to-[#e8b88a]' : 'bg-gradient-to-r from-child to-[#a8c5e0]'"></div>
      
      <div class="brand-section text-center mb-5">
        <img src="/logo.png?v=20260620-1518" alt="夕阳智语" class="w-24 h-24 mx-auto mb-4 rounded-full object-cover">
        <h1 class="brand-title text-xl font-bold text-text mb-1">夕阳智语</h1>
        <p :class="['brand-subtitle text-xs', roleColor === 'parent' ? 'text-parent' : 'text-child']">{{ roleTitle }}</p>
      </div>

      <div class="flex gap-2 mb-4 p-1 rounded-xl bg-gray-100">
        <button @click="isRegister = false" :class="['flex-1 py-2 rounded-lg text-sm font-semibold transition-all', !isRegister ? 'bg-card shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700']">登录</button>
        <button @click="isRegister = true" :class="['flex-1 py-2 rounded-lg text-sm font-semibold transition-all', isRegister ? 'bg-card shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700']">注册</button>
      </div>

      <div v-if="!isRegister">
        <div :class="['login-tabs flex gap-2 mb-4 p-1 rounded-xl', roleColor === 'parent' ? 'bg-parent-light' : 'bg-child-light']">
          <button @click="loginType = 'account'" :class="['flex-1 py-2 rounded-lg text-sm font-semibold transition-all', loginType === 'account' ? (roleColor === 'parent' ? 'bg-card shadow-sm text-parent' : 'bg-card shadow-sm text-child') : 'text-text-muted hover:text-text']">账号密码</button>
          <button @click="loginType = 'phone'" :class="['flex-1 py-2 rounded-lg text-sm font-semibold transition-all', loginType === 'phone' ? (roleColor === 'parent' ? 'bg-card shadow-sm text-parent' : 'bg-card shadow-sm text-child') : 'text-text-muted hover:text-text']">手机号登录</button>
        </div>

        <div v-if="loginType === 'account'" class="space-y-3">
          <div class="input-group">
            <label class="block text-text-secondary text-sm mb-1.5 font-medium">账号</label>
            <input v-model="accountForm.username" type="text" placeholder="请输入账号" :class="['w-full px-4 py-3 border-2 rounded-xl focus:outline-none text-base transition-all', roleColor === 'parent' ? 'border-border focus:border-parent' : 'border-border focus:border-child']">
          </div>
          <div class="input-group">
            <label class="block text-text-secondary text-sm mb-1.5 font-medium">密码</label>
            <input v-model="accountForm.password" type="password" placeholder="请输入密码" :class="['w-full px-4 py-3 border-2 rounded-xl focus:outline-none text-base transition-all', roleColor === 'parent' ? 'border-border focus:border-parent' : 'border-border focus:border-child']">
          </div>
        </div>

        <div v-else class="space-y-3">
          <div class="input-group">
            <label class="block text-text-secondary text-sm mb-1.5 font-medium">手机号</label>
            <input v-model="phoneForm.phone" type="tel" placeholder="请输入手机号" maxlength="11" :class="['w-full px-4 py-3 border-2 rounded-xl focus:outline-none text-base transition-all', roleColor === 'parent' ? 'border-border focus:border-parent' : 'border-border focus:border-child']">
          </div>
          <div class="flex gap-3">
            <div class="flex-1 input-group">
              <label class="block text-text-secondary text-sm mb-1.5 font-medium">验证码</label>
              <input v-model="phoneForm.code" type="text" placeholder="请输入验证码" maxlength="6" :class="['w-full px-4 py-3 border-2 rounded-xl focus:outline-none text-base transition-all', roleColor === 'parent' ? 'border-border focus:border-parent' : 'border-border focus:border-child']">
            </div>
            <div class="pt-5">
              <button @click="sendCode" :disabled="countdown > 0" :class="['px-3 py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap', roleColor === 'parent' ? (countdown > 0 ? 'bg-border text-text-muted cursor-not-allowed' : 'bg-parent-bg text-[#8b6914] hover:bg-parent-hover') : (countdown > 0 ? 'bg-border text-text-muted cursor-not-allowed' : 'bg-child-bg text-[#1a5276] hover:bg-child-hover')]">
                {{ countdown > 0 ? countdown + 's' : '获取验证码' }}
              </button>
            </div>
          </div>
        </div>

        <button @click="handleLogin" :class="['w-full mt-5 py-3 rounded-xl font-bold text-base transition-all shadow-lg', roleColor === 'parent' ? 'bg-gradient-to-r from-parent to-parent-hover text-white hover:shadow-xl' : 'bg-gradient-to-r from-child to-child-hover text-white hover:shadow-xl']">
          登录
        </button>
      </div>

      <div v-else>
        <div :class="['login-tabs flex gap-2 mb-4 p-1 rounded-xl', roleColor === 'parent' ? 'bg-parent-light' : 'bg-child-light']">
          <button @click="registerType = 'account'" :class="['flex-1 py-2 rounded-lg text-sm font-semibold transition-all', registerType === 'account' ? (roleColor === 'parent' ? 'bg-card shadow-sm text-parent' : 'bg-card shadow-sm text-child') : 'text-text-muted hover:text-text']">账号注册</button>
          <button @click="registerType = 'phone'" :class="['flex-1 py-2 rounded-lg text-sm font-semibold transition-all', registerType === 'phone' ? (roleColor === 'parent' ? 'bg-card shadow-sm text-parent' : 'bg-card shadow-sm text-child') : 'text-text-muted hover:text-text']">手机注册</button>
        </div>

        <div v-if="registerType === 'account'" class="space-y-3">
          <div class="input-group">
            <label class="block text-text-secondary text-sm mb-1.5 font-medium">账号</label>
            <input v-model="registerForm.username" type="text" placeholder="请输入账号（4-20位）" :class="['w-full px-4 py-3 border-2 rounded-xl focus:outline-none text-base transition-all', roleColor === 'parent' ? 'border-border focus:border-parent' : 'border-border focus:border-child']">
          </div>
          <div class="input-group">
            <label class="block text-text-secondary text-sm mb-1.5 font-medium">密码</label>
            <input v-model="registerForm.password" type="password" placeholder="请输入密码（6-20位）" :class="['w-full px-4 py-3 border-2 rounded-xl focus:outline-none text-base transition-all', roleColor === 'parent' ? 'border-border focus:border-parent' : 'border-border focus:border-child']">
          </div>
          <div class="input-group">
            <label class="block text-text-secondary text-sm mb-1.5 font-medium">确认密码</label>
            <input v-model="registerForm.confirmPassword" type="password" placeholder="请再次输入密码" :class="['w-full px-4 py-3 border-2 rounded-xl focus:outline-none text-base transition-all', roleColor === 'parent' ? 'border-border focus:border-parent' : 'border-border focus:border-child']">
          </div>
          <div class="input-group">
            <label class="block text-text-secondary text-sm mb-1.5 font-medium">手机号</label>
            <input v-model="registerForm.phone" type="tel" placeholder="请输入手机号" maxlength="11" :class="['w-full px-4 py-3 border-2 rounded-xl focus:outline-none text-base transition-all', roleColor === 'parent' ? 'border-border focus:border-parent' : 'border-border focus:border-child']">
          </div>
        </div>

        <div v-else class="space-y-3">
          <div class="input-group">
            <label class="block text-text-secondary text-sm mb-1.5 font-medium">手机号</label>
            <input v-model="registerPhoneForm.phone" type="tel" placeholder="请输入手机号" maxlength="11" :class="['w-full px-4 py-3 border-2 rounded-xl focus:outline-none text-base transition-all', roleColor === 'parent' ? 'border-border focus:border-parent' : 'border-border focus:border-child']">
          </div>
          <div class="flex gap-3">
            <div class="flex-1 input-group">
              <label class="block text-text-secondary text-sm mb-1.5 font-medium">验证码</label>
              <input v-model="registerPhoneForm.code" type="text" placeholder="请输入验证码" maxlength="6" :class="['w-full px-4 py-3 border-2 rounded-xl focus:outline-none text-base transition-all', roleColor === 'parent' ? 'border-border focus:border-parent' : 'border-border focus:border-child']">
            </div>
            <div class="pt-5">
              <button @click="sendRegisterCode" :disabled="registerCountdown > 0" :class="['px-3 py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap', roleColor === 'parent' ? (registerCountdown > 0 ? 'bg-border text-text-muted cursor-not-allowed' : 'bg-parent-bg text-[#8b6914] hover:bg-parent-hover') : (registerCountdown > 0 ? 'bg-border text-text-muted cursor-not-allowed' : 'bg-child-bg text-[#1a5276] hover:bg-child-hover')]">
                {{ registerCountdown > 0 ? registerCountdown + 's' : '获取验证码' }}
              </button>
            </div>
          </div>
          <div class="input-group">
            <label class="block text-text-secondary text-sm mb-1.5 font-medium">设置密码</label>
            <input v-model="registerPhoneForm.password" type="password" placeholder="请设置登录密码（6-20位）" :class="['w-full px-4 py-3 border-2 rounded-xl focus:outline-none text-base transition-all', roleColor === 'parent' ? 'border-border focus:border-parent' : 'border-border focus:border-child']">
          </div>
          <div class="input-group">
            <label class="block text-text-secondary text-sm mb-1.5 font-medium">确认密码</label>
            <input v-model="registerPhoneForm.confirmPassword" type="password" placeholder="请再次输入密码" :class="['w-full px-4 py-3 border-2 rounded-xl focus:outline-none text-base transition-all', roleColor === 'parent' ? 'border-border focus:border-parent' : 'border-border focus:border-child']">
          </div>
        </div>

        <button @click="handleRegister" :class="['w-full mt-5 py-3 rounded-xl font-bold text-base transition-all shadow-lg', roleColor === 'parent' ? 'bg-gradient-to-r from-parent to-parent-hover text-white hover:shadow-xl' : 'bg-gradient-to-r from-child to-child-hover text-white hover:shadow-xl']">
          注册
        </button>
      </div>

      <div class="mt-4 text-center">
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

const isRegister = ref(false)
const loginType = ref('account')
const registerType = ref('account')
const countdown = ref(0)
const registerCountdown = ref(0)
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

const registerForm = ref({
  username: '',
  password: '',
  confirmPassword: '',
  phone: ''
})

const registerPhoneForm = ref({
  phone: '',
  code: '',
  password: '',
  confirmPassword: ''
})

const roleColor = computed(() => {
  return role.value.startsWith('parent') ? 'parent' : 'child'
})

onMounted(() => {
  role.value = route.query.role || ''
  const titles = {
    'parent-mobile': '父母移动端',
    'parent-desktop': '父母桌面端',
    'child-mobile': '子女移动端',
    'child-desktop': '子女桌面端'
  }
  roleTitle.value = titles[role.value] || '用户登录/注册'
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

const sendRegisterCode = () => {
  if (!registerPhoneForm.value.phone || registerPhoneForm.value.phone.length !== 11) {
    alert('请输入正确的手机号')
    return
  }
  registerCountdown.value = 60
  const timer = setInterval(() => {
    registerCountdown.value--
    if (registerCountdown.value <= 0) {
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

const handleRegister = () => {
  if (registerType.value === 'account') {
    if (!registerForm.value.username.trim()) {
      alert('请输入账号')
      return
    }
    if (registerForm.value.username.length < 4 || registerForm.value.username.length > 20) {
      alert('账号长度需在4-20位之间')
      return
    }
    if (!registerForm.value.password.trim()) {
      alert('请输入密码')
      return
    }
    if (registerForm.value.password.length < 6 || registerForm.value.password.length > 20) {
      alert('密码长度需在6-20位之间')
      return
    }
    if (registerForm.value.password !== registerForm.value.confirmPassword) {
      alert('两次输入的密码不一致')
      return
    }
    if (!registerForm.value.phone || registerForm.value.phone.length !== 11) {
      alert('请输入正确的手机号')
      return
    }
  } else {
    if (!registerPhoneForm.value.phone || registerPhoneForm.value.phone.length !== 11) {
      alert('请输入正确的手机号')
      return
    }
    if (!registerPhoneForm.value.code || registerPhoneForm.value.code !== '123456') {
      alert('验证码错误')
      return
    }
    if (!registerPhoneForm.value.password.trim()) {
      alert('请输入密码')
      return
    }
    if (registerPhoneForm.value.password.length < 6 || registerPhoneForm.value.password.length > 20) {
      alert('密码长度需在6-20位之间')
      return
    }
    if (registerPhoneForm.value.password !== registerPhoneForm.value.confirmPassword) {
      alert('两次输入的密码不一致')
      return
    }
  }

  alert('注册成功！请完善实名信息')
  
  store.setLoginStatus({
    isLoggedIn: true,
    role: role.value,
    username: registerType.value === 'account' ? registerForm.value.username : registerPhoneForm.value.phone,
    isAdmin: false
  })

  router.push('/realname?role=' + role.value)
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
