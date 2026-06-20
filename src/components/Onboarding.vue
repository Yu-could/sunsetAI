<template>
  <Teleport to="body">
    <div v-if="showModal" class="fixed inset-0 bg-black/60 z-[9998] flex items-end md:items-center justify-center" @click.self="closeModal">
      <div class="bg-white w-full max-w-md rounded-t-2xl md:rounded-2xl p-5 animate-slide-up max-h-[80vh] overflow-y-auto">
        <!-- 引导步骤指示器 -->
        <div class="flex items-center justify-center gap-1.5 mb-5">
          <div v-for="i in steps" :key="i" class="w-2 h-2 rounded-full transition-all" :class="i === currentStep ? 'bg-parent w-6' : (i < currentStep ? 'bg-parent/50' : 'bg-gray-200')"></div>
        </div>

        <!-- 步骤 1: 欢迎 -->
        <div v-if="currentStep === 1" class="text-center">
          <img src="/logo.png" alt="夕阳智语" class="w-20 h-20 mx-auto mb-4 rounded-2xl shadow-md" />
          <h2 class="text-2xl font-bold text-text mb-2">欢迎使用夕阳智语</h2>
          <p class="text-text-secondary mb-4">您的 AI 语音智能助老助手，让生活更便捷、更安心</p>
          <div class="bg-parent-light rounded-xl p-4 text-left">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-8 h-8 bg-parent rounded-lg flex items-center justify-center flex-shrink-0">
                <AppIcon name="microphone" size="sm" class="text-white" />
              </div>
              <p class="text-sm text-text-secondary">用声音控制一切 — 说"打开健康"即可跳转</p>
            </div>
            <div class="flex items-center gap-3 mb-3">
              <div class="w-8 h-8 bg-red-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <AppIcon name="health" size="sm" class="text-white" />
              </div>
              <p class="text-sm text-text-secondary">随时记录健康数据，让子女更放心</p>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <AppIcon name="sos" size="sm" class="text-white" />
              </div>
              <p class="text-sm text-text-secondary">紧急情况一键求助，快速联系家人</p>
            </div>
          </div>
        </div>

        <!-- 步骤 2: 语音操控 -->
        <div v-if="currentStep === 2" class="text-center">
          <img src="/logo.png" alt="夕阳智语" class="w-20 h-20 mx-auto mb-4 rounded-2xl shadow-md" />
          <h2 class="text-2xl font-bold text-text mb-2">语音操控</h2>
          <p class="text-text-secondary mb-4">点击首页的语音按钮，说出您想要的</p>
          <div class="grid grid-cols-2 gap-2 mb-4">
            <div class="bg-red-50 rounded-lg p-3 text-left"><p class="text-xs font-bold text-red-600">试试说</p><p class="text-sm text-gray-700">"打开健康"</p></div>
            <div class="bg-purple-50 rounded-lg p-3 text-left"><p class="text-xs font-bold text-purple-600">试试说</p><p class="text-sm text-gray-700">"我要吃药"</p></div>
            <div class="bg-blue-50 rounded-lg p-3 text-left"><p class="text-xs font-bold text-blue-600">试试说</p><p class="text-sm text-gray-700">"记录回忆"</p></div>
            <div class="bg-red-50 rounded-lg p-3 text-left"><p class="text-xs font-bold text-red-600">紧急时说</p><p class="text-sm text-gray-700">"救命"</p></div>
          </div>
        </div>

        <!-- 步骤 3: 亲情连接 -->
        <div v-if="currentStep === 3" class="text-center">
          <img src="/logo.png" alt="夕阳智语" class="w-20 h-20 mx-auto mb-4 rounded-2xl shadow-md" />
          <h2 class="text-2xl font-bold text-text mb-2">连接家人</h2>
          <p class="text-text-secondary mb-4">让子女随时了解您的健康状况</p>
          <div class="bg-blue-50 rounded-xl p-4 text-left">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">1</div>
              <p class="text-sm text-text-secondary">在"亲情连接"页面生成邀请码</p>
            </div>
            <div class="flex items-center gap-3 mb-3">
              <div class="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">2</div>
              <p class="text-sm text-text-secondary">将邀请码分享给子女</p>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">3</div>
              <p class="text-sm text-text-secondary">子女输入邀请码后即可查看您的状态</p>
            </div>
          </div>
        </div>

        <!-- 底部按钮 -->
        <div class="flex gap-3 mt-5">
          <button v-if="currentStep > 1" @click="currentStep--" class="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors">
            上一步
          </button>
          <button v-if="currentStep < steps" @click="currentStep++" class="flex-1 bg-parent text-white py-3 rounded-xl font-bold hover:bg-parent-hover transition-colors shadow-md">
            下一步
          </button>
          <button v-if="currentStep === steps" @click="closeModal" class="flex-1 bg-parent text-white py-3 rounded-xl font-bold hover:bg-parent-hover transition-colors shadow-md">
            开始使用
          </button>
        </div>

        <button @click="closeModal" class="mt-3 w-full text-center text-sm text-text-muted hover:text-text-secondary py-1">
          跳过引导
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AppIcon from './AppIcon.vue'

const emit = defineEmits(['close'])

const showModal = ref(false)
const currentStep = ref(1)
const steps = 3

const closeModal = () => {
  showModal.value = false
  localStorage.setItem('sunsetai_onboarding_done', 'true')
  emit('close')
}

const show = () => {
  showModal.value = true
  currentStep.value = 1
}

onMounted(() => {
  const done = localStorage.getItem('sunsetai_onboarding_done')
  if (!done) {
    // 首次使用，延迟显示
    setTimeout(() => {
      showModal.value = true
    }, 800)
  }
})

defineExpose({ show })
</script>

<style scoped>
.animate-slide-up {
  animation: slideUp 0.35s ease;
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(100%); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
