<template>
  <div class="min-h-screen bg-bg flex items-center justify-center p-4">
    <div class="w-full max-w-sm bg-card rounded-2xl shadow-lg p-6">
      <div class="text-center mb-5">
        <div class="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <span class="text-2xl">📝</span>
        </div>
        <h1 class="text-xl font-bold text-gray-800">完善实名信息</h1>
        <p class="text-sm text-gray-500 mt-1">请填写真实信息以便更好地为您服务</p>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-sm text-gray-600 mb-1.5 font-medium">真实姓名 <span class="text-red-500">*</span></label>
          <input v-model="realNameInfo.realName" type="text" placeholder="请输入真实姓名" class="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-orange-500 text-base">
        </div>

        <div>
          <label class="block text-sm text-gray-600 mb-1.5 font-medium">身份证号 <span class="text-red-500">*</span></label>
          <input v-model="realNameInfo.idCard" type="text" maxlength="18" placeholder="请输入身份证号" class="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-orange-500 text-base">
        </div>

        <div>
          <label class="block text-sm text-gray-600 mb-1.5 font-medium">性别 <span class="text-red-500">*</span></label>
          <div class="flex gap-3">
            <button @click="realNameInfo.gender = 'male'" :class="realNameInfo.gender === 'male' ? 'bg-orange-500 text-white border-orange-500' : 'bg-gray-50 text-gray-600 border-gray-200'" class="flex-1 py-3 rounded-xl border-2 font-medium transition-all">男</button>
            <button @click="realNameInfo.gender = 'female'" :class="realNameInfo.gender === 'female' ? 'bg-orange-500 text-white border-orange-500' : 'bg-gray-50 text-gray-600 border-gray-200'" class="flex-1 py-3 rounded-xl border-2 font-medium transition-all">女</button>
          </div>
        </div>

        <div>
          <label class="block text-sm text-gray-600 mb-1.5 font-medium">出生日期</label>
          <input v-model="realNameInfo.birthDate" type="date" class="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-orange-500 text-base">
        </div>

        <div>
          <label class="block text-sm text-gray-600 mb-1.5 font-medium">紧急联系人</label>
          <input v-model="realNameInfo.emergencyContact" type="text" placeholder="联系人姓名" class="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-orange-500 text-base">
        </div>

        <div>
          <label class="block text-sm text-gray-600 mb-1.5 font-medium">紧急联系电话</label>
          <input v-model="realNameInfo.emergencyPhone" type="tel" maxlength="11" placeholder="联系人电话" class="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-orange-500 text-base">
        </div>

        <div>
          <label class="block text-sm text-gray-600 mb-1.5 font-medium">居住地址</label>
          <input v-model="realNameInfo.address" type="text" placeholder="请输入居住地址" class="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-orange-500 text-base">
        </div>

        <div>
          <label class="block text-sm text-gray-600 mb-1.5 font-medium">健康状况</label>
          <div class="flex flex-wrap gap-2">
            <button v-for="condition in healthConditions" :key="condition" @click="toggleCondition(condition)" :class="realNameInfo.healthConditions.includes(condition) ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'" class="px-3 py-1.5 rounded-lg text-sm transition-all">{{ condition }}</button>
          </div>
        </div>
      </div>

      <button @click="submitRealName" class="w-full mt-6 py-3.5 rounded-xl font-bold text-base bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg hover:shadow-xl transition-all">
        提交信息
      </button>

      <button @click="skipRealName" class="w-full mt-3 py-3 rounded-xl text-sm text-gray-500 hover:text-gray-700 transition-colors">
        暂不填写，稍后完善
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAppStore } from '../stores/appStore'

const router = useRouter()
const route = useRoute()
const store = useAppStore()

const healthConditions = ['高血压', '糖尿病', '心脏病', '关节炎', '骨质疏松', '视力问题', '听力问题', '无重大疾病']

const realNameInfo = ref({
  realName: '',
  idCard: '',
  gender: '',
  birthDate: '',
  emergencyContact: '',
  emergencyPhone: '',
  address: '',
  healthConditions: []
})

const toggleCondition = (condition) => {
  const index = realNameInfo.value.healthConditions.indexOf(condition)
  if (index > -1) {
    realNameInfo.value.healthConditions.splice(index, 1)
  } else {
    realNameInfo.value.healthConditions.push(condition)
  }
}

const validateIdCard = (idCard) => {
  const reg = /^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/
  return reg.test(idCard)
}

const submitRealName = () => {
  if (!realNameInfo.value.realName.trim()) {
    alert('请输入真实姓名')
    return
  }
  if (!realNameInfo.value.idCard.trim()) {
    alert('请输入身份证号')
    return
  }
  if (!validateIdCard(realNameInfo.value.idCard)) {
    alert('身份证号格式不正确')
    return
  }
  if (!realNameInfo.value.gender) {
    alert('请选择性别')
    return
  }

  store.saveRealNameInfo(realNameInfo.value)
  alert('实名信息已保存')

  const role = route.query.role || store.loginStatus?.role || ''
  const routes = {
    'parent-mobile': '/parent',
    'parent-desktop': '/desktop',
    'child-mobile': '/child',
    'child-desktop': '/desktop/child'
  }
  router.push(routes[role] || '/')
}

const skipRealName = () => {
  const role = route.query.role || store.loginStatus?.role || ''
  const routes = {
    'parent-mobile': '/parent',
    'parent-desktop': '/desktop',
    'child-mobile': '/child',
    'child-desktop': '/desktop/child'
  }
  router.push(routes[role] || '/')
}

onMounted(() => {
  store.loadRealNameInfo()
  if (store.realNameInfo) {
    realNameInfo.value = { ...store.realNameInfo }
  }
})
</script>