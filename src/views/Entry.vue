<template>
  <div class="min-h-screen bg-bg flex items-center justify-center p-4">
    <div class="entry-container w-full max-w-sm bg-card rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6 relative overflow-hidden">
      <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-parent to-child"></div>
      
      <div class="brand-section text-center mb-5">
        <img src="/logo.png?v=20260620-1518" alt="夕阳智语" class="w-20 h-20 mx-auto mb-4 rounded-full object-cover">
        <h1 class="brand-title text-3xl font-bold text-text mb-1">夕阳智语</h1>
        <p class="brand-subtitle text-sm text-text-muted">SunsetAI - AI语音助老助手</p>
      </div>

      <div class="device-badge text-center mb-4">
        <span :class="['inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium', isMobile ? 'bg-child-bg text-child' : 'bg-parent-bg text-parent']">
          <AppIcon :name="isMobile ? 'mobile' : 'globe'" size="sm" />
          {{ isMobile ? '移动端' : '桌面端' }}
        </span>
      </div>

      <p class="guide-text text-center text-xl font-semibold text-text mb-6">您是长辈还是子女？</p>

      <div class="options-list flex flex-col gap-4">
        <button @click="selectRole('parent')" class="option-btn parent w-full border-2 border-parent rounded-xl p-6 bg-card cursor-pointer flex items-center gap-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(232,132,60,0.15)]">
          <div class="option-icon w-14 h-14 rounded-lg flex items-center justify-center bg-parent-bg">
            <AppIcon name="parent" size="2xl" class="text-parent" />
          </div>
          <div>
            <div class="option-label text-2xl font-bold text-text">我是父母</div>
            <div class="option-desc text-sm text-text-muted">我是长辈，想使用助老服务</div>
          </div>
        </button>

        <button @click="selectRole('child')" class="option-btn child w-full border-2 border-child rounded-xl p-6 bg-card cursor-pointer flex items-center gap-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(91,155,213,0.15)]">
          <div class="option-icon w-14 h-14 rounded-lg flex items-center justify-center bg-child-bg">
            <AppIcon name="child_icon" size="2xl" class="text-child" />
          </div>
          <div>
            <div class="option-label text-2xl font-bold text-text">我是子女</div>
            <div class="option-desc text-sm text-text-muted">我是子女，想关心父母状况</div>
          </div>
        </button>
      </div>

      <div id="redirectPage" v-show="showRedirect" class="step-page">
        <div class="redirect-notice text-center py-8">
          <div class="spinner w-10 h-10 border-3 border-border border-t-parent rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-sm text-text-secondary">正在进入</p>
          <div class="redirect-target text-lg font-bold text-text mt-2">{{ redirectTarget }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppIcon from '../components/AppIcon.vue'

const router = useRouter()
const isMobile = ref(false)
const showRedirect = ref(false)
const redirectTarget = ref('')

onMounted(() => {
  const userAgent = navigator.userAgent.toLowerCase()
  const mobileKeywords = ['iphone', 'ipad', 'ipod', 'android', 'windows phone', 'mobile']
  isMobile.value = mobileKeywords.some(keyword => userAgent.includes(keyword))
})

const selectRole = (role) => {
  const device = isMobile.value ? 'mobile' : 'desktop'
  const roleLabel = role === 'parent' ? '父母' : '子女'
  const deviceLabel = device === 'mobile' ? '移动端' : '桌面端'
  redirectTarget.value = `${roleLabel}${deviceLabel}`
  
  showRedirect.value = true
  
  setTimeout(() => {
    router.push({ path: '/login', query: { role: `${role}-${device}` } })
  }, 1200)
}
</script>

<style scoped>
.step-page {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.option-btn:active {
  transform: translateY(-0.5px) !important;
}
</style>
