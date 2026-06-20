# 夕阳智语 SunsetAI — 优化修改文档

> 修改日期：2026-06-20  
> 项目路径：`c:\Users\26293\Desktop\创意大赛`  
> 运行地址：http://localhost:5175/sunsetAI/#/

---

## 一、配色优化 🎨

### 1.1 主色调调整

| 变量 | 旧值 | 新值 | 说明 |
|------|------|------|------|
| parent (父母端主色) | `#d4a574` | `#E8843C` | 温暖夕阳橙，更亮更亲和 |
| parent-hover | `#c49564` | `#D4732E` | 悬停态加深 |
| parent-light | `#fffbf7` | `#FFF5ED` | 浅色背景 |
| parent-bg | `#ffe8cc` | `#FFE8D6` | 底色 |
| child (子女端主色) | `#74a5d4` | `#5B9BD5` | 清晰蓝 |
| child-hover | `#6495c4` | `#4A8AC4` | 悬停态 |
| child-light | `#f7fcff` | `#F0F7FD` | 浅色背景 |
| child-bg | `#cce8ff` | `#D6EAFF` | 底色 |
| bg (页面背景) | `#f8f6f3` | `#FFF9F5` | 暖奶油色 |
| text (正文) | `#1a1a1a` | `#2D2D2D` | 略深便于阅读 |
| text-secondary | `#555555` | `#5A5A5A` | 次要文字 |
| text-muted | `#888888` | `#909090` | 辅助文字 |
| border | `#e8e5e0` | `#EDE8E3` | 边框 |

### 1.2 新增语义色

| 颜色 | 值 | 用途 |
|------|------|------|
| success | `#27AE60` | 签到/正常状态 |
| warning | `#F39C12` | 待处理/提醒 |
| danger | `#E74C3C` | 紧急/异常 |
| info | `#3498DB` | 提示/信息 |

### 涉及文件
- `tailwind.config.js` — 更新 colors 配置
- `src/style.css` — 更新 CSS 自定义属性

---

## 二、图标升级 🏷️

### 2.1 新建 `src/components/AppIcon.vue`
统一图标组件，映射 **60+ Heroicons SVG**，覆盖所有功能场景：

| 分类 | 图标名 | Heroicon |
|------|--------|----------|
| 导航 | home, health, medicine, memories, safety, family, schedule, sos, settings | HomeIcon, HeartIcon, DeviceTabletIcon, BookOpenIcon, CheckCircleIcon, UsersIcon, CalendarDaysIcon, ExclamationTriangleIcon, CogIcon |
| 通讯 | chat, message, phone, mail | ChatBubbleLeftIcon, PhoneIcon, EnvelopeIcon |
| 数据 | chart, clock, clipboard, document | ChartBarIcon, ClockIcon, ClipboardDocumentIcon, DocumentTextIcon |
| 媒体 | mic, photo, video, music | MicrophoneIcon, PhotoIcon, VideoCameraIcon, MusicalNoteIcon |
| 状态 | star, sparkles, fire, bell, flag | StarIcon, SparklesIcon, FireIcon, BellIcon, FlagIcon |
| 安全 | shield, security, warning | ShieldCheckIcon, ExclamationTriangleIcon |
| UI | plus, minus, close, play, stop, search | PlusCircleIcon, MinusCircleIcon, XCircleIcon, PlayCircleIcon, StopCircleIcon, MagnifyingGlassIcon |

### 2.2 页面 Emoji 替换

所有页面的标题 emoji 替换为 AppIcon 组件：

| 页面 | 旧 | 新 |
|------|-----|-----|
| Entry.vue | 👴 👶 📱 🖥️ | UserIcon, DevicePhoneMobileIcon, GlobeAltIcon |
| Home.vue | 👵 🌿 🎤 ✅ ❤️ 💊 📖 | UserIcon, SparklesIcon, MicrophoneIcon, CheckCircleIcon, HeartIcon, DeviceTabletIcon, BookOpenIcon |
| Health.vue | ❤️ | HeartIcon |
| Medicine.vue | 💊 | DeviceTabletIcon |
| Memories.vue | 📖 | BookOpenIcon |
| Diet.vue | 🍜 | FireIcon |
| Safety.vue | ✅ | CheckCircleIcon |
| Family.vue | 👨‍👩‍👧 | UsersIcon |
| Schedule.vue | 📅 | CalendarDaysIcon |
| Settings.vue | ⚙️ | CogIcon |
| SOS.vue | 🚨 | ExclamationTriangleIcon |
| desktop/Home.vue | 👵 ❤️ ✅ 🍜 👨‍👩‍👧 💊 📊 🌿 | 对应 AppIcon 组件 |
| desktop/Layout.vue | 🌅 👴 | SunIcon, UserAvatar |

---

## 三、新增组件 🧩

### 3.1 Toast 消息系统

| 文件 | 说明 |
|------|------|
| `src/stores/toastStore.js` | Pinia store，管理消息队列 |
| `src/components/Toast.vue` | 全局弹出消息组件，带滑入/滑出动画 |

**类型**：`success` / `error` / `warning` / `info`  
**用法**：
```js
import { useToastStore } from '../stores/toastStore'
const toast = useToastStore()
toast.success('签到成功！', 2000)
toast.error('操作失败', 3000)
toast.warning('请填写完整信息', 2500)
toast.info('正在呼叫...', 2000)
```

**已替换 alert() 的页面**：Home.vue, SOS.vue, Health.vue

### 3.2 SOS 悬浮按钮

`src/components/FabSOS.vue` — 固定在右下角的红色脉动按钮  
- **显示位置**：所有父母端非入口页面
- **触发效果**：记录 SOS + Toast 警告 + 跳转 SOS 页面
- **动画**：CSS `pulseSOS` 红色光晕扩散

### 3.3 用户智能头像

`src/components/UserAvatar.vue` — 根据实名信息切换头像

| 状态 | 显示 |
|------|------|
| 未填写实名 | 通用 UserIcon 人形图标 |
| 已填写姓名 | 姓名最后一个字 + 渐变背景 |

**已集成位置**：
- `Home.vue` — 移动端头部
- `desktop/Home.vue` — 桌面端头部
- `desktop/Layout.vue` — 桌面端侧边栏底部（同时显示真实姓名）

### 3.4 首次引导页

`src/components/Onboarding.vue` — 3 步新用户引导  
- 步骤 1：欢迎介绍 + 核心功能说明
- 步骤 2：语音操控指令示例
- 步骤 3：亲情连接步骤
- 自动检测首次访问，引导完成后不再弹出

### 3.5 骨架屏

`src/components/SkeletonCard.vue` — 数据加载占位卡片

---

## 四、页面布局优化 📐

### 4.1 移动端首页 (Home.vue)

| 改动 | 说明 |
|------|------|
| 功能卡片 3×2 网格 | 8 宫格改为 6 个卡片（健康/用药/回忆/饮食/签到/家人） |
| 紧急求助独立横幅 | 红色渐变醒目卡片，从网格中移出单独展示 |
| 用药数据真实化 | 从 store 读取 medicineRecords，不再硬编码 |
| SOS 图标脉冲动画 | `animate-pulse-sos-icon` CSS 动画 |

### 4.2 底部导航 (App.vue)

| 旧导航 | 新导航 |
|--------|--------|
| 首页 / 健康 / 用药 / **求助** / 设置 | 首页 / 健康 / 用药 / **家人** / 设置 |

- 紧急求助移至悬浮按钮
- 底部导航增加毛玻璃效果 `backdrop-blur-sm`

### 4.3 页面过渡动画 (App.vue)

`<router-view>` 外包裹 `<Transition name="page">`  
- 进入：fadeIn + slideUp (0.25s)
- 离开：fadeOut + slideDown (0.15s)

### 4.4 桌面端侧边栏 (desktop/Layout.vue)

| 改动 | 说明 |
|------|------|
| 导航分组 | 主要功能 / 其他 两个分组 |
| 激活状态 | 橙色背景 + 右侧圆点指示器 |
| Logo 图标 | 渐变圆角方块 + SunIcon |
| 用户信息 | UserAvatar 头像 + 真实姓名 |
| 背景色 | bg-gray-100 → bg-bg |

---

## 五、Bug 修复 🐛

### 5.1 子女端导航错误

**问题**：子女端底部导航显示父母端菜单  
**原因**：`App.vue` 中 `currentNavItems` 使用 `window.location.pathname` 判断路由，但项目使用 Hash 模式（`createWebHashHistory`），`pathname` 始终为 `/sunsetAI/`，无法识别 `/child` 路由  
**修复**：改为 `route.path.startsWith('/child')`

### 5.2 Tailwind 配置冲突

**问题**：`info` 颜色重复定义  
**修复**：删除旧的 `info: { bg: '#F8F5F2' }`，保留语义色配置

---

## 六、文件变更清单

### 新建文件（9 个）

| 文件 | 用途 |
|------|------|
| `src/components/AppIcon.vue` | 统一图标组件 |
| `src/components/UserAvatar.vue` | 智能用户头像 |
| `src/components/Toast.vue` | 全局消息提示 |
| `src/components/FabSOS.vue` | SOS 悬浮按钮 |
| `src/components/Onboarding.vue` | 首次引导页 |
| `src/components/SkeletonCard.vue` | 骨架屏占位 |
| `src/stores/toastStore.js` | Toast 状态管理 |

### 修改文件（17 个）

| 文件 | 改动摘要 |
|------|----------|
| `tailwind.config.js` | 配色体系全面更新 |
| `src/style.css` | CSS 变量更新 |
| `src/App.vue` | Toast/Onboarding 集成、底部导航调整、页面过渡动画、子女端路由修复 |
| `src/views/Entry.vue` | emoji → AppIcon + UserAvatar |
| `src/views/Home.vue` | 首页重布局、Toast 替换 alert、用药数据真实化、emoji → AppIcon + UserAvatar |
| `src/views/Health.vue` | emoji → AppIcon、Toast 替换 alert |
| `src/views/Medicine.vue` | emoji → AppIcon |
| `src/views/Memories.vue` | emoji → AppIcon |
| `src/views/Diet.vue` | emoji → AppIcon |
| `src/views/Safety.vue` | emoji → AppIcon |
| `src/views/Family.vue` | emoji → AppIcon |
| `src/views/Schedule.vue` | emoji → AppIcon |
| `src/views/Settings.vue` | emoji → AppIcon |
| `src/views/SOS.vue` | emoji → AppIcon、Toast 替换 alert |
| `src/views/desktop/Home.vue` | emoji → AppIcon + UserAvatar |
| `src/views/desktop/Layout.vue` | 侧边栏重设计、UserAvatar 集成 |

---

## 七、验证方法

```bash
cd "c:\Users\26293\Desktop\创意大赛"
npm run dev
# 访问 http://localhost:5175/sunsetAI/#/
```

1. **配色**：页面背景为暖奶油色，头部横幅为夕阳橙色
2. **Toast**：点击签到/用药/健康录入，弹出动画消息替代 alert
3. **SOS 悬浮按钮**：父母端任意子页面右下角红色脉动按钮
4. **图标**：所有页面标题和功能按钮使用统一 Heroicons SVG
5. **头像**：前往设置→实名认证填写姓名，返回首页头像变为姓名末字
6. **引导页**：清除 `localStorage` 中 `sunsetai_onboarding_done` 后刷新
7. **子女端**：/child 路径底部导航正确显示子女端菜单
8. **构建**：`npm run build` 无报错
