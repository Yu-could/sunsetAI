<template>
  <div class="min-h-screen bg-gray-100 flex">
    <aside class="w-64 bg-white shadow-lg flex flex-col">
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center text-white">
            <SunIcon class="w-6 h-6" />
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-800">夕阳智语</h1>
            <p class="text-sm text-gray-500">子女端</p>
          </div>
        </div>
      </div>
      <nav class="flex-1 p-4">
        <ul class="space-y-2">
          <li v-for="item in navItems" :key="item.path">
            <router-link :to="item.path" class="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors" :class="{ 'bg-blue-50 text-blue-600': $route.name === item.name }">
              <component :is="iconComponents[item.icon]" class="w-5 h-5" />
              <span class="font-medium">{{ item.label }}</span>
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="p-4 border-t border-gray-200">
        <div class="flex items-center gap-3 px-4 py-3">
          <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <UserIcon class="w-5 h-5 text-gray-500" />
          </div>
          <div>
            <p class="font-medium text-gray-800">子女用户</p>
            <p class="text-sm text-gray-500">{{ store.connectedParents.length > 0 ? '已连接' + store.connectedParents.length + '位父母' : '未连接父母' }}</p>
          </div>
        </div>
      </div>
    </aside>
    <main class="flex-1 overflow-auto p-8">
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <LinkIcon class="w-7 h-7 text-blue-500" />
          连接管理
        </h2>
        <p class="text-gray-500 mt-1">管理与父母的连接关系</p>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">我的连接</h3>
          <div v-if="store.connectedParents.length > 0" class="space-y-4">
            <div v-for="(parent, index) in store.connectedParents" :key="index" class="p-4 bg-gray-50 rounded-lg">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div class="w-14 h-14 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
                    <UserIcon class="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p class="font-medium text-gray-800">{{ parent.name }}</p>
                    <p class="text-sm text-gray-500">{{ parent.relation }} | 已连接</p>
                  </div>
                </div>
                <span :class="parent.online ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'" class="px-3 py-1 rounded-full text-sm">{{ parent.online ? '在线' : '离线' }}</span>
              </div>
              <div class="flex gap-2 mt-4">
                <button class="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                  <PhoneIcon class="w-4 h-4" />
                  <span>通话</span>
                </button>
                <button class="flex-1 flex items-center justify-center gap-2 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                  <ChatBubbleLeftIcon class="w-4 h-4" />
                  <span>消息</span>
                </button>
                <button class="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                  <EyeIcon class="w-4 h-4" />
                  <span>查看</span>
                </button>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-12 text-gray-400">
            <div class="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <UsersIcon class="w-10 h-10" />
            </div>
            <p>暂无连接</p>
            <p class="text-sm">请添加新连接</p>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-md p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">添加新连接</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-gray-600 mb-2">输入邀请码</label>
              <input v-model="inviteCode" type="text" placeholder="请输入父母端的邀请码" class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-lg">
            </div>
            <div>
              <label class="block text-gray-600 mb-2">选择关系</label>
              <select v-model="relation" class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 text-lg">
                <option value="母亲">母亲</option>
                <option value="父亲">父亲</option>
                <option value="祖母">祖母</option>
                <option value="祖父">祖父</option>
                <option value="其他">其他</option>
              </select>
            </div>
            <button @click="connect" class="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-bold text-lg hover:shadow-lg transition-shadow">确认连接</button>
            <p class="text-center text-gray-400 text-sm">父母端在亲情连接页面获取邀请码</p>
          </div>
          <div class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 class="font-medium text-blue-800 mb-2 flex items-center gap-2">
              <LightBulbIcon class="w-4 h-4" />
              连接说明
            </h4>
            <ul class="text-sm text-blue-600 space-y-1">
              <li>• 邀请码由父母端生成，有效期为24小时</li>
              <li>• 一个邀请码只能使用一次</li>
              <li>• 连接成功后即可查看父母健康状态</li>
              <li>• 支持同时连接多位家庭成员</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="mt-6 bg-white rounded-xl shadow-md p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">连接设置</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p class="font-medium text-gray-800">签到提醒</p>
              <p class="text-sm text-gray-500">父母签到时通知我</p>
            </div>
            <div class="w-12 h-6 bg-green-500 rounded-full relative">
              <div class="w-5 h-5 bg-white rounded-full absolute right-1 top-0.5"></div>
            </div>
          </div>
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p class="font-medium text-gray-800">健康预警</p>
              <p class="text-sm text-gray-500">父母健康异常时通知我</p>
            </div>
            <div class="w-12 h-6 bg-green-500 rounded-full relative">
              <div class="w-5 h-5 bg-white rounded-full absolute right-1 top-0.5"></div>
            </div>
          </div>
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p class="font-medium text-gray-800">消息通知</p>
              <p class="text-sm text-gray-500">接收父母发来的消息</p>
            </div>
            <div class="w-12 h-6 bg-green-500 rounded-full relative">
              <div class="w-5 h-5 bg-white rounded-full absolute right-1 top-0.5"></div>
            </div>
          </div>
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p class="font-medium text-gray-800">周报推送</p>
              <p class="text-sm text-gray-500">每周发送健康周报</p>
            </div>
            <div class="w-12 h-6 bg-gray-300 rounded-full relative">
              <div class="w-5 h-5 bg-white rounded-full absolute left-1 top-0.5"></div>
            </div>
          </div>
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p class="font-medium text-gray-800">紧急联系人</p>
              <p class="text-sm text-gray-500">设置紧急情况下的通知人</p>
            </div>
            <div class="w-12 h-6 bg-green-500 rounded-full relative">
              <div class="w-5 h-5 bg-white rounded-full absolute right-1 top-0.5"></div>
            </div>
          </div>
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p class="font-medium text-gray-800">定位权限</p>
              <p class="text-sm text-gray-500">查看父母位置信息</p>
            </div>
            <div class="w-12 h-6 bg-gray-300 rounded-full relative">
              <div class="w-5 h-5 bg-white rounded-full absolute left-1 top-0.5"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAppStore } from '../../stores/appStore'
import { SunIcon, HomeIcon, HeartIcon, ChatBubbleLeftIcon, LinkIcon, UsersIcon, UserIcon, PhoneIcon, EyeIcon, LightBulbIcon } from '@heroicons/vue/24/solid'

const store = useAppStore()

const iconComponents = {
  Home: HomeIcon,
  Heart: HeartIcon,
  Message: ChatBubbleLeftIcon,
  Link: LinkIcon,
  Users: UsersIcon,
  User: UserIcon
}

const navItems = [
  { path: '/desktop/child', name: 'DesktopChildHome', icon: 'Home', label: '首页' },
  { path: '/desktop/child/status', name: 'DesktopChildStatus', icon: 'Heart', label: '健康状态' },
  { path: '/desktop/child/messages', name: 'DesktopChildMessages', icon: 'Message', label: '消息通知' },
  { path: '/desktop/child/connect', name: 'DesktopChildConnect', icon: 'Link', label: '连接管理' },
  { path: '/desktop', name: 'DesktopHome', icon: 'User', label: '父母端' },
  { path: '/parent', name: 'Home', icon: 'Users', label: '父母移动端' }
]

const inviteCode = ref('')
const relation = ref('母亲')

const connect = () => {
  if (inviteCode.value.trim()) {
    store.connectParent({
      code: inviteCode.value.trim(),
      name: relation.value === '母亲' ? '母亲' : relation.value === '父亲' ? '父亲' : relation.value,
      relation: relation.value,
      avatar: relation.value === '母亲' ? '👵' : '👴',
      online: true
    })
    alert('连接成功！')
    inviteCode.value = ''
  } else {
    alert('请输入邀请码')
  }
}

onMounted(() => {
  store.loadConnectedParents()
})
</script>