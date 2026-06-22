<template>
  <div
    ref="sosButton"
    @pointerdown="onPointerDown"
    class="fixed z-50 w-14 h-14 bg-danger rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all active:scale-90 animate-pulse-sos cursor-pointer select-none"
    :style="{ top: position.y + 'px', left: position.x + 'px', touchAction: 'none' }"
    role="button"
    tabindex="0"
    @keydown.enter="handleClick"
  >
    <span class="text-2xl font-bold">SOS</span>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToastStore } from '../stores/toastStore'
import { useAppStore } from '../stores/appStore'

const router = useRouter()
const toast = useToastStore()
const store = useAppStore()

const sosButton = ref(null)
const isDragging = ref(false)
const startPos = reactive({ x: 0, y: 0 })
const startPointerPos = reactive({ x: 0, y: 0 })
const movedDistance = ref(0)

const position = reactive({
  x: 0,
  y: 0
})

const savePosition = () => {
  localStorage.setItem('sos_button_position', JSON.stringify(position))
}

const loadPosition = () => {
  const saved = localStorage.getItem('sos_button_position')
  if (saved) {
    const pos = JSON.parse(saved)
    position.x = pos.x
    position.y = pos.y
  } else {
    resetPosition()
  }
}

const resetPosition = () => {
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight
  position.x = screenWidth - 72
  position.y = screenHeight - 140
}

const onPointerDown = (e) => {
  console.log('SOS button pointerdown:', e.type, e.clientX, e.clientY)
  
  e.preventDefault()
  e.stopPropagation()
  
  isDragging.value = true
  movedDistance.value = 0
  
  startPointerPos.x = e.clientX
  startPointerPos.y = e.clientY
  startPos.x = position.x
  startPos.y = position.y
  
  document.addEventListener('pointermove', onPointerMove)
  document.addEventListener('pointerup', onPointerUp)
  document.addEventListener('pointercancel', onPointerUp)
}

const onPointerMove = (e) => {
  if (!isDragging.value) return
  
  e.preventDefault()
  e.stopPropagation()
  
  const deltaX = e.clientX - startPointerPos.x
  const deltaY = e.clientY - startPointerPos.y
  
  movedDistance.value += Math.abs(deltaX) + Math.abs(deltaY)
  
  const buttonWidth = 56
  const buttonHeight = 56
  const maxX = window.innerWidth - buttonWidth
  const maxY = window.innerHeight - buttonHeight
  
  position.x = Math.max(0, Math.min(maxX, startPos.x + deltaX))
  position.y = Math.max(0, Math.min(maxY, startPos.y + deltaY))
  
  console.log('Dragging:', position.x, position.y, 'distance:', movedDistance.value)
}

const onPointerUp = (e) => {
  if (!isDragging.value) return
  
  console.log('Pointer up, moved distance:', movedDistance.value)
  
  isDragging.value = false
  document.removeEventListener('pointermove', onPointerMove)
  document.removeEventListener('pointerup', onPointerUp)
  document.removeEventListener('pointercancel', onPointerUp)
  
  if (movedDistance.value <= 5) {
    handleClick()
  } else {
    savePosition()
    console.log('Position saved:', position)
  }
}

const handleClick = () => {
  console.log('SOS clicked!')
  
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

onMounted(() => {
  loadPosition()
  window.addEventListener('resize', resetPosition)
  console.log('SOS button mounted at position:', position)
})

onUnmounted(() => {
  document.removeEventListener('pointermove', onPointerMove)
  document.removeEventListener('pointerup', onPointerUp)
  document.removeEventListener('pointercancel', onPointerUp)
  window.removeEventListener('resize', resetPosition)
})
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
