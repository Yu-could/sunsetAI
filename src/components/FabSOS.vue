<template>
  <button
    @click="handleSOS"
    class="fixed bottom-24 right-4 z-40 w-14 h-14 bg-danger rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all active:scale-90 animate-pulse-sos"
    aria-label="紧急求助"
  >
    <span class="text-2xl font-bold">SOS</span>
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useToastStore } from '../stores/toastStore'
import { useAppStore } from '../stores/appStore'

const router = useRouter()
const toast = useToastStore()
const store = useAppStore()

const handleSOS = () => {
  if (confirm('确认发送紧急求助通知给所有子女？')) {
    store.addSOSRecord({
      type: '紧急求助（快速按钮）',
      status: '已发送',
      timestamp: new Date().toISOString()
    })
    toast.warning('🚨 紧急求助已发送！子女将收到通知。', 4000)
    router.push('/sos')
  }
}
</script>

<style scoped>
@keyframes pulseSOS {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(231, 76, 60, 0.5);
  }
  50% {
    box-shadow: 0 0 0 12px rgba(231, 76, 60, 0);
  }
}
.animate-pulse-sos {
  animation: pulseSOS 2s infinite;
}
</style>
