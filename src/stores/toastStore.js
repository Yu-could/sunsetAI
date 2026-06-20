import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const toasts = ref([])
  let nextId = 0

  const addToast = (message, type = 'info', duration = 3000) => {
    const id = nextId++
    toasts.value.push({ id, message, type, duration })
    if (duration > 0) {
      setTimeout(() => removeToast(id), duration)
    }
    return id
  }

  const removeToast = (id) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const success = (msg, duration) => addToast(msg, 'success', duration)
  const error = (msg, duration) => addToast(msg, 'error', duration)
  const warning = (msg, duration) => addToast(msg, 'warning', duration)
  const info = (msg, duration) => addToast(msg, 'info', duration)

  return { toasts, addToast, removeToast, success, error, warning, info }
})
