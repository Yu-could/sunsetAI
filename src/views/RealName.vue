<template>
  <div class="min-h-screen bg-bg p-4">
    <div class="max-w-md mx-auto pb-8">

      <!-- 顶部个人信息卡片 -->
      <div class="bg-gradient-to-br from-parent to-parent-hover rounded-2xl p-5 text-white mb-5 shadow-md">
        <div class="flex items-center gap-4">
          <!-- 可点击更换头像 -->
          <div class="relative cursor-pointer group" @click="triggerAvatarUpload" title="点击更换头像">
            <UserAvatar v-if="!avatarPreview" role="parent" size="2xl" />
            <img v-else :src="avatarPreview" class="w-16 h-16 rounded-full object-cover border-2 border-white/40 shadow-md" alt="头像" />
            <div class="absolute inset-0 rounded-full bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <AppIcon name="edit" size="sm" class="text-white" />
            </div>
          </div>
          <input ref="avatarInput" type="file" accept="image/*" class="hidden" @change="handleAvatarChange" />
          <div class="flex-1">
            <h1 class="text-xl font-bold">{{ realNameInfo.realName || '完善个人信息' }}</h1>
            <p class="text-white/70 text-sm mt-0.5">{{ realNameInfo.realName ? '点击头像可更换照片' : '请填写真实信息以便更好地为您服务' }}</p>
          </div>
        </div>
        <!-- 快捷信息条 -->
        <div v-if="realNameInfo.realName" class="flex gap-4 mt-4 pt-4 border-t border-white/20">
          <div class="text-center flex-1">
            <p class="text-lg font-bold">{{ realNameInfo.age || '-' }}</p>
            <p class="text-white/60 text-xs">年龄</p>
          </div>
          <div class="text-center flex-1">
            <p class="text-lg font-bold">{{ genderLabel || '-' }}</p>
            <p class="text-white/60 text-xs">性别</p>
          </div>
          <div class="text-center flex-1">
            <p class="text-lg font-bold">{{ realNameInfo.bloodType || '-' }}</p>
            <p class="text-white/60 text-xs">血型</p>
          </div>
        </div>
      </div>

      <!-- 基本信息 -->
      <div class="bg-white rounded-2xl shadow-sm p-5 mb-4">
        <h2 class="text-base font-bold text-text mb-4 flex items-center gap-2">
          <AppIcon name="user" size="sm" class="text-parent" /> 基本信息
        </h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm text-text-secondary mb-1.5 font-medium">真实姓名 <span class="text-danger">*</span></label>
            <input v-model="realNameInfo.realName" type="text" placeholder="请输入真实姓名" class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-parent focus:bg-white text-base transition-all">
          </div>
          <div class="flex gap-4">
            <div class="flex-1">
              <label class="block text-sm text-text-secondary mb-1.5 font-medium">性别 <span class="text-danger">*</span></label>
              <div class="flex gap-2">
                <button @click="realNameInfo.gender = 'male'" :class="realNameInfo.gender === 'male' ? 'bg-parent text-white border-parent' : 'bg-gray-50 text-text-secondary border-gray-100'" class="flex-1 py-3 rounded-xl border-2 font-medium text-sm transition-all">男</button>
                <button @click="realNameInfo.gender = 'female'" :class="realNameInfo.gender === 'female' ? 'bg-parent text-white border-parent' : 'bg-gray-50 text-text-secondary border-gray-100'" class="flex-1 py-3 rounded-xl border-2 font-medium text-sm transition-all">女</button>
              </div>
            </div>
            <div class="flex-1">
              <label class="block text-sm text-text-secondary mb-1.5 font-medium">出生日期</label>
              <input v-model="realNameInfo.birthDate" type="date" class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-parent focus:bg-white text-base transition-all" @change="calcAge">
            </div>
          </div>
          <div>
            <label class="block text-sm text-text-secondary mb-1.5 font-medium">身份证号 <span class="text-danger">*</span></label>
            <input v-model="realNameInfo.idCard" type="text" maxlength="18" placeholder="请输入18位身份证号" class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-parent focus:bg-white text-base transition-all">
          </div>
        </div>
      </div>

      <!-- 健康信息 -->
      <div class="bg-white rounded-2xl shadow-sm p-5 mb-4">
        <h2 class="text-base font-bold text-text mb-4 flex items-center gap-2">
          <AppIcon name="health" size="sm" class="text-danger" /> 健康信息
        </h2>
        <div class="space-y-4">
          <div class="flex gap-4">
            <div class="flex-1">
              <label class="block text-sm text-text-secondary mb-1.5 font-medium">血型</label>
              <select v-model="realNameInfo.bloodType" class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-parent focus:bg-white text-base transition-all">
                <option value="">请选择</option>
                <option value="A型">A型</option>
                <option value="B型">B型</option>
                <option value="AB型">AB型</option>
                <option value="O型">O型</option>
              </select>
            </div>
            <div class="flex-1">
              <label class="block text-sm text-text-secondary mb-1.5 font-medium">过敏史</label>
              <select v-model="realNameInfo.allergy" class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-parent focus:bg-white text-base transition-all">
                <option value="">请选择</option>
                <option value="无">无</option>
                <option value="青霉素">青霉素</option>
                <option value="头孢">头孢</option>
                <option value="海鲜">海鲜</option>
                <option value="花粉">花粉</option>
                <option value="其他">其他</option>
              </select>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="flex-1">
              <label class="block text-sm text-text-secondary mb-1.5 font-medium">身高 (cm)</label>
              <input v-model="realNameInfo.height" type="number" placeholder="如: 165" class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-parent focus:bg-white text-base transition-all">
            </div>
            <div class="flex-1">
              <label class="block text-sm text-text-secondary mb-1.5 font-medium">体重 (kg)</label>
              <input v-model="realNameInfo.weight" type="number" placeholder="如: 65" class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-parent focus:bg-white text-base transition-all">
            </div>
          </div>
          <div>
            <label class="block text-sm text-text-secondary mb-1.5 font-medium">慢性病史</label>
            <div class="flex flex-wrap gap-2">
              <button v-for="condition in healthConditions" :key="condition" @click="toggleCondition(condition)"
                :class="realNameInfo.healthConditions.includes(condition) ? 'bg-parent text-white shadow-sm' : 'bg-gray-50 text-text-secondary border border-gray-100'"
                class="px-3 py-2 rounded-lg text-sm transition-all">{{ condition }}</button>
            </div>
          </div>
          <div>
            <label class="block text-sm text-text-secondary mb-1.5 font-medium">用药备注</label>
            <textarea v-model="realNameInfo.medicationNote" rows="2" placeholder="如：每天服用降压药、钙片等"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-parent focus:bg-white text-base transition-all resize-none"></textarea>
          </div>
        </div>
      </div>

      <!-- 紧急联系人 -->
      <div class="bg-white rounded-2xl shadow-sm p-5 mb-4">
        <h2 class="text-base font-bold text-text mb-4 flex items-center gap-2">
          <AppIcon name="phone" size="sm" class="text-danger" /> 紧急联系人
        </h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm text-text-secondary mb-1.5 font-medium">联系人姓名</label>
            <input v-model="realNameInfo.emergencyContact" type="text" placeholder="紧急联系人姓名" class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-parent focus:bg-white text-base transition-all">
          </div>
          <div>
            <label class="block text-sm text-text-secondary mb-1.5 font-medium">联系电话</label>
            <input v-model="realNameInfo.emergencyPhone" type="tel" maxlength="11" placeholder="11位手机号" class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-parent focus:bg-white text-base transition-all">
          </div>
          <div>
            <label class="block text-sm text-text-secondary mb-1.5 font-medium">与本人关系</label>
            <select v-model="realNameInfo.emergencyRelation" class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-parent focus:bg-white text-base transition-all">
              <option value="">请选择</option>
              <option value="配偶">配偶</option>
              <option value="子女">子女</option>
              <option value="兄弟姐妹">兄弟姐妹</option>
              <option value="朋友">朋友</option>
              <option value="邻居">邻居</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 居住信息 -->
      <div class="bg-white rounded-2xl shadow-sm p-5 mb-6">
        <h2 class="text-base font-bold text-text mb-4 flex items-center gap-2">
          <AppIcon name="location" size="sm" class="text-parent" /> 居住信息
        </h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm text-text-secondary mb-1.5 font-medium">居住地址</label>
            <input v-model="realNameInfo.address" type="text" placeholder="省/市/区/街道" class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-parent focus:bg-white text-base transition-all">
          </div>
          <div>
            <label class="block text-sm text-text-secondary mb-1.5 font-medium">居住状况</label>
            <select v-model="realNameInfo.livingStatus" class="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-parent focus:bg-white text-base transition-all">
              <option value="">请选择</option>
              <option value="独居">独居</option>
              <option value="与配偶同住">与配偶同住</option>
              <option value="与子女同住">与子女同住</option>
              <option value="养老机构">养老机构</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <button @click="submitRealName" class="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-parent to-parent-hover text-white shadow-lg hover:shadow-xl transition-all active:scale-[0.98]">
        保存信息
      </button>
      <button @click="goBack" class="w-full mt-3 py-3 rounded-xl text-sm text-text-muted hover:text-text-secondary transition-colors">
        返回
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAppStore } from '../stores/appStore'
import { useToastStore } from '../stores/toastStore'
import AppIcon from '../components/AppIcon.vue'
import UserAvatar from '../components/UserAvatar.vue'

const router = useRouter()
const route = useRoute()
const store = useAppStore()
const toast = useToastStore()

const avatarInput = ref(null)
const avatarPreview = ref('')

const triggerAvatarUpload = () => {
  avatarInput.value?.click()
}

const handleAvatarChange = (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  if (file.size > 2 * 1024 * 1024) {
    toast.warning('图片大小不能超过2MB', 2500)
    return
  }
  const reader = new FileReader()
  reader.onload = (ev) => {
    const base64 = ev.target.result
    avatarPreview.value = base64
    realNameInfo.value.avatar = base64
    toast.success('头像已更新', 1500)
  }
  reader.readAsDataURL(file)
}

const healthConditions = ['高血压', '糖尿病', '心脏病', '关节炎', '骨质疏松', '视力问题', '听力问题', '脑卒中', '哮喘', '无重大疾病']

const realNameInfo = ref({
  realName: '',
  idCard: '',
  gender: '',
  birthDate: '',
  age: '',
  bloodType: '',
  allergy: '',
  height: '',
  weight: '',
  medicationNote: '',
  healthConditions: [],
  emergencyContact: '',
  emergencyPhone: '',
  emergencyRelation: '',
  address: '',
  livingStatus: ''
})

const genderLabel = computed(() => {
  if (realNameInfo.value.gender === 'male') return '男'
  if (realNameInfo.value.gender === 'female') return '女'
  return ''
})

const toggleCondition = (condition) => {
  const idx = realNameInfo.value.healthConditions.indexOf(condition)
  if (idx > -1) {
    realNameInfo.value.healthConditions.splice(idx, 1)
  } else {
    realNameInfo.value.healthConditions.push(condition)
  }
}

const calcAge = () => {
  if (realNameInfo.value.birthDate) {
    const birth = new Date(realNameInfo.value.birthDate)
    const now = new Date()
    let age = now.getFullYear() - birth.getFullYear()
    const m = now.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--
    realNameInfo.value.age = age > 0 ? age : ''
  }
}

const validateIdCard = (idCard) => {
  const reg = /^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/
  return reg.test(idCard)
}

const submitRealName = () => {
  if (!realNameInfo.value.realName.trim()) {
    toast.warning('请输入真实姓名', 2500)
    return
  }
  if (!realNameInfo.value.idCard.trim()) {
    toast.warning('请输入身份证号', 2500)
    return
  }
  if (!validateIdCard(realNameInfo.value.idCard)) {
    toast.warning('身份证号格式不正确', 2500)
    return
  }
  if (!realNameInfo.value.gender) {
    toast.warning('请选择性别', 2500)
    return
  }
  calcAge()
  store.saveRealNameInfo({ ...realNameInfo.value })
  toast.success('个人信息已保存', 2000)
}

const goBack = () => {
  const role = store.loginStatus?.role || ''
  const routes = {
    'parent-mobile': '/parent',
    'parent-desktop': '/desktop',
    'child-mobile': '/child',
    'child-desktop': '/desktop/child'
  }
  router.push(routes[role] || (route.query.role ? { 'parent-mobile': '/parent', 'parent-desktop': '/desktop', 'child-mobile': '/child', 'child-desktop': '/desktop/child' }[route.query.role] : '/'))
}

onMounted(() => {
  store.loadRealNameInfo()
  if (store.realNameInfo && Object.keys(store.realNameInfo).length > 0) {
    realNameInfo.value = { ...realNameInfo.value, ...store.realNameInfo }
    if (store.realNameInfo.avatar) {
      avatarPreview.value = store.realNameInfo.avatar
    }
    calcAge()
  }
})
</script>
