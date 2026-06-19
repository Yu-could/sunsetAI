<template>
  <div class="min-h-screen bg-bg flex items-center justify-center p-6">
    <div class="entry-container w-full max-w-md bg-card rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-10 relative overflow-hidden">
      <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-parent to-child"></div>
      
      <div class="brand-section text-center mb-10">
        <img src="/logo.png" alt="夕阳智语" class="logo-wrapper w-22 h-22 rounded-xl mx-auto mb-5 shadow-[0_4px_16px_rgba(212,165,116,0.3)] object-contain">
        <h1 class="brand-title text-4xl font-bold text-text mb-2 tracking-wider">夕阳智语</h1>
        <p class="brand-subtitle text-sm text-text-muted mb-5">SunsetAI - AI语音助老助手</p>
      </div>

      <div class="device-badge text-center mb-6">
        <span :class="['inline-block px-4 py-2 rounded-full text-sm font-medium', isMobile ? 'bg-child-bg text-[#1a5276]' : 'bg-parent-bg text-[#8b6914]']">
          {{ isMobile ? '📱 移动端' : '🖥️ 桌面端' }}
        </span>
      </div>

      <p class="guide-text text-center text-2xl font-semibold text-text mb-8 leading-relaxed">您是长辈还是子女？</p>
      
      <div class="options-list flex flex-col gap-5 mb-8">
        <button @click="selectRole('parent')" class="option-btn parent w-full border-3 border-parent rounded-xl p-8 bg-card cursor-pointer flex flex-col items-center gap-3 transition-all relative overflow-hidden hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(212,165,116,0.2)]">
          <div class="option-icon w-16 h-16 rounded-lg flex items-center justify-center text-4xl bg-parent-bg relative z-10">👴</div>
          <div class="relative z-10">
            <div class="option-label text-3xl font-bold text-text">我是父母</div>
            <div class="option-desc text-sm text-text-muted">{{ isMobile ? '适合手机、平板等移动设备' : '适合电脑、笔记本等桌面设备' }}</div>
          </div>
        </button>
        
        <button @click="selectRole('child')" class="option-btn child w-full border-3 border-child rounded-xl p-8 bg-card cursor-pointer flex flex-col items-center gap-3 transition-all relative overflow-hidden hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(116,165,212,0.2)]">
          <div class="option-icon w-16 h-16 rounded-lg flex items-center justify-center text-4xl bg-child-bg relative z-10">👶</div>
          <div class="relative z-10">
            <div class="option-label text-3xl font-bold text-text">我是子女</div>
            <div class="option-desc text-sm text-text-muted">{{ isMobile ? '适合手机、平板等移动设备' : '适合电脑、笔记本等桌面设备' }}</div>
          </div>
        </button>
      </div>
      
      <div class="info-box bg-info-bg rounded-lg p-5 text-center text-sm text-text-muted leading-relaxed">
        请选择与您身份相符的选项，我们将为您推荐最适合的使用方式
      </div>

      <div id="redirectPage" v-show="showRedirect" class="step-page animate-fade-in">
        <div class="redirect-notice text-center py-10 px-6">
          <div class="spinner w-12 h-12 border-4 border-border border-t-parent rounded-full animate-spin mx-auto mb-6"></div>
          <p class="text-lg text-text-secondary">正在进入</p>
          <div class="redirect-target text-xl font-bold text-text mt-3">{{ redirectTarget }}</div>
        </div>
      </div>

      <div class="footer text-center text-xs text-text-muted pt-6 border-t border-border">
        <p>夕阳智语 SunsetAI © 2026</p>
        <div class="footer-links flex justify-center gap-6 mt-3">
          <a href="#" class="hover:text-parent transition-colors">使用帮助</a>
          <a href="#" class="hover:text-parent transition-colors">联系我们</a>
          <a href="#" class="hover:text-parent transition-colors">隐私政策</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

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
  }, 1500)
}
</script>

<style scoped>
.step-page {
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

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.option-btn:active {
  transform: translateY(-1px) !important;
}

@media (min-width: 768px) {
  .entry-container {
    max-width: 520px;
    padding: 48px 40px;
  }
  
  .brand-title {
    font-size: 36px;
  }
  
  .option-btn {
    padding: 40px 32px;
    flex-direction: row;
    justify-content: flex-start;
    gap: 20px;
  }
  
  .option-icon {
    width: 72px;
    height: 72px;
    font-size: 40px;
  }
  
  .option-label {
    font-size: 26px;
  }
  
  .guide-text {
    font-size: 22px;
  }
}

@media (max-width: 360px) {
  .entry-container {
    padding: 32px 20px;
  }
  
  .brand-title {
    font-size: 28px;
  }
  
  .option-label {
    font-size: 22px;
  }
  
  .option-btn {
    padding: 24px 16px;
  }
}
</style>