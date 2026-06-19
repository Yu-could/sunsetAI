<template>
  <div class="min-h-screen bg-bg flex items-center justify-center p-6">
    <div class="entry-container w-full max-w-md bg-card rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-10 relative overflow-hidden">
      <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-parent to-child"></div>
      
      <div class="brand-section text-center mb-10">
        <img src="/logo.png" alt="夕阳智语" class="logo-wrapper w-22 h-22 rounded-xl mx-auto mb-5 shadow-[0_4px_16px_rgba(212,165,116,0.3)] object-contain">
        <h1 class="brand-title text-4xl font-bold text-text mb-2 tracking-wider">夕阳智语</h1>
        <p class="brand-subtitle text-sm text-text-muted mb-5">SunsetAI - AI语音助老助手</p>
      </div>

      <div id="step1" v-show="currentStep === 1" :class="animationClass" class="step-page">
        <div class="step-indicator flex items-center justify-center gap-4 mb-8">
          <div class="step-dot w-3 h-3 rounded-full bg-parent scale-125 transition-all"></div>
          <div class="step-dot w-3 h-3 rounded-full bg-border transition-all"></div>
        </div>
        <p class="step-text text-center text-sm text-text-muted font-medium mb-6">第 1 步 / 共 2 步</p>
        <p class="guide-text text-center text-2xl font-semibold text-text mb-8 leading-relaxed">您是长辈还是子女？</p>
        
        <div class="options-list flex flex-col gap-5 mb-8">
          <button @click="selectRole('parent')" class="option-btn parent w-full border-3 border-parent rounded-xl p-8 bg-card cursor-pointer flex flex-col items-center gap-3 transition-all relative overflow-hidden hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(212,165,116,0.2)]">
            <div class="option-icon w-16 h-16 rounded-lg flex items-center justify-center text-4xl bg-parent-bg relative z-10">👴</div>
            <div class="relative z-10">
              <div class="option-label text-3xl font-bold text-text">我是父母</div>
              <div class="option-desc text-sm text-text-muted">我是长辈，想使用助老服务</div>
            </div>
          </button>
          
          <button @click="selectRole('child')" class="option-btn child w-full border-3 border-child rounded-xl p-8 bg-card cursor-pointer flex flex-col items-center gap-3 transition-all relative overflow-hidden hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(116,165,212,0.2)]">
            <div class="option-icon w-16 h-16 rounded-lg flex items-center justify-center text-4xl bg-child-bg relative z-10">👶</div>
            <div class="relative z-10">
              <div class="option-label text-3xl font-bold text-text">我是子女</div>
              <div class="option-desc text-sm text-text-muted">我是子女，想关心父母状况</div>
            </div>
          </button>
        </div>
        
        <div class="info-box bg-info-bg rounded-lg p-5 text-center text-sm text-text-muted leading-relaxed">
          请选择与您身份相符的选项，我们将为您推荐最适合的使用方式
        </div>
      </div>

      <div id="step2" v-show="currentStep === 2" :class="animationClass" class="step-page">
        <div class="step-indicator flex items-center justify-center gap-4 mb-8">
          <div class="step-dot w-3 h-3 rounded-full bg-parent transition-all"></div>
          <div class="step-dot w-3 h-3 rounded-full bg-parent scale-125 transition-all"></div>
        </div>
        <p class="step-text text-center text-sm text-text-muted font-medium mb-6">第 2 步 / 共 2 步</p>
        
        <div class="selection-summary text-center mb-6">
          <div :class="['role-badge inline-block px-5 py-2 rounded-md text-base font-semibold mb-3', currentRole === 'parent' ? 'bg-parent-bg text-[#8b6914]' : 'bg-child-bg text-[#1a5276]']">
            {{ currentRole === 'parent' ? '👴 我是父母' : '👶 我是子女' }}
          </div>
          <div class="device-hint text-sm text-text-muted">请选择您当前使用的设备</div>
        </div>
        
        <div class="options-list flex flex-col gap-5 mb-6">
          <button @click="selectDevice('mobile')" :class="['option-btn w-full border-3 rounded-xl p-8 bg-card cursor-pointer flex flex-col items-center gap-3 transition-all relative overflow-hidden hover:-translate-y-1', currentRole === 'parent' ? 'border-parent hover:shadow-[0_8px_24px_rgba(212,165,116,0.2)]' : 'border-child hover:shadow-[0_8px_24px_rgba(116,165,212,0.2)]']">
            <div :class="['option-icon w-16 h-16 rounded-lg flex items-center justify-center text-4xl', currentRole === 'parent' ? 'bg-parent-bg' : 'bg-child-bg']">📱</div>
            <div>
              <div class="option-label text-3xl font-bold text-text">手机访问</div>
              <div class="option-desc text-sm text-text-muted">适合手机、平板等移动设备</div>
            </div>
          </button>
          
          <button @click="selectDevice('desktop')" :class="['option-btn w-full border-3 rounded-xl p-8 bg-card cursor-pointer flex flex-col items-center gap-3 transition-all relative overflow-hidden hover:-translate-y-1', currentRole === 'parent' ? 'border-parent hover:shadow-[0_8px_24px_rgba(212,165,116,0.2)]' : 'border-child hover:shadow-[0_8px_24px_rgba(116,165,212,0.2)]']">
            <div :class="['option-icon w-16 h-16 rounded-lg flex items-center justify-center text-4xl', currentRole === 'parent' ? 'bg-parent-bg' : 'bg-child-bg']">🖥️</div>
            <div>
              <div class="option-label text-3xl font-bold text-text">电脑访问</div>
              <div class="option-desc text-sm text-text-muted">适合电脑、笔记本等桌面设备</div>
            </div>
          </button>
        </div>
        
        <button @click="goBack" class="back-btn flex items-center justify-center gap-2 w-full py-4 bg-transparent border-2 border-border rounded-lg text-base font-medium text-text-secondary cursor-pointer transition-all hover:bg-info-bg hover:border-text-muted hover:text-text">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
            <path d="M19 12H5M12 19l-7-7 7-7"></path>
          </svg>
          返回上一步
        </button>
      </div>

      <div id="redirectPage" v-show="currentStep === 3" class="step-page animate-fade-in">
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentStep = ref(1)
const currentRole = ref(null)
const redirectTarget = ref('')
const animationDirection = ref('forward')

const animationClass = computed(() => {
  return animationDirection.value === 'forward' ? 'animate-slide-right' : 'animate-slide-left'
})

const selectRole = (role) => {
  currentRole.value = role
  animationDirection.value = 'forward'
  currentStep.value = 2
}

const selectDevice = (device) => {
  const roleLabel = currentRole.value === 'parent' ? '父母' : '子女'
  const deviceLabel = device === 'mobile' ? '移动端' : '桌面端'
  redirectTarget.value = `${roleLabel}${deviceLabel}`
  
  currentStep.value = 3
  
  setTimeout(() => {
    router.push({ path: '/login', query: { role: `${currentRole.value}-${device}` } })
  }, 1500)
}

const goBack = () => {
  animationDirection.value = 'backward'
  currentStep.value = 1
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

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-right {
  animation: slideInRight 0.4s ease;
}

.animate-slide-left {
  animation: slideInLeft 0.4s ease;
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
