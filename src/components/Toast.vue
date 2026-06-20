<template>
  <Teleport to="body">
    <div class="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-2 pointer-events-none">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toastStore.toasts"
          :key="toast.id"
          :class="toastClasses(toast.type)"
          class="pointer-events-auto px-5 py-3 rounded-xl shadow-lg flex items-center gap-2.5 text-sm font-medium max-w-xs animate-toast-in"
        >
          <span class="text-lg flex-shrink-0">{{ iconMap[toast.type] }}</span>
          <span class="text-gray-800">{{ toast.message }}</span>
          <button
            v-if="toast.duration === 0"
            @click="toastStore.removeToast(toast.id)"
            class="ml-1 text-gray-400 hover:text-gray-600 flex-shrink-0"
          >&times;</button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { useToastStore } from '../stores/toastStore'

const toastStore = useToastStore()

const iconMap = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️'
}

const toastClasses = (type) => ({
  success: 'bg-green-50 border border-green-200',
  error: 'bg-red-50 border border-red-200',
  warning: 'bg-amber-50 border border-amber-200',
  info: 'bg-blue-50 border border-blue-200'
}[type] || 'bg-gray-50 border border-gray-200')
</script>

<style scoped>
.toast-enter-active {
  animation: toastIn 0.35s ease;
}
.toast-leave-active {
  animation: toastOut 0.25s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

@keyframes toastIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
@keyframes toastOut {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
}
</style>
