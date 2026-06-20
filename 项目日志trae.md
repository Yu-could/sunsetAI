# 夕阳智语 SunsetAI - 项目日志

## 项目概述

**项目名称**：夕阳智语 SunsetAI  
**项目类型**：AI语音助老助手  
**技术栈**：Vue 3 + Vite + Tailwind CSS + Vue Router + Pinia  
**部署方式**：GitHub Pages  

---

## 📅 日志记录

### 2026年6月18日

#### 1. 品牌配色与字体方案设计

**目标**：为产品制定一套符合"温暖+科技"的品牌配色和字体方案

**方案选择**：方案二 - 现代科技型

**配色系统**（[tailwind.config.js](file:///C:/Users/26293/Desktop/创意大赛/tailwind.config.js)）：
- **主色**：暖金橙 `#F39C12`（品牌主色、主按钮、Logo）
- **主色深**：琥珀金 `#D68910`（按下状态、渐变深色端）
- **科技蓝**：`#3498DB`（AI功能、语音识别）
- **天际蓝**：`#85C1E9`（悬停状态、渐变过渡）
- **智能青**：`#1ABC9C`（成功状态、连接在线）
- **警示红**：`#E74C3C`（紧急提醒、SOS）
- **月光白**：`#FAFBFC`（页面主背景）
- **云白**：`#FFFFFF`（卡片背景）
- **石墨灰**：`#2C3E50`（主标题、重要文字）
- **银灰**：`#7F8C8D`（副标题、说明文字）
- **铅灰**：`#BDBDBD`（分割线、禁用状态）

**字体系统**（[src/style.css](file:///C:/Users/26293/Desktop/创意大赛/src/style.css)）：
- **中文标题**：Source Han Sans SC / PingFang SC
- **中文正文**：PingFang SC / Microsoft YaHei
- **英文标题**：Poppins（Google Fonts）
- **英文正文**：Inter（Google Fonts）

**字号层级**：
| 元素 | 字号 | 用途 |
|------|------|------|
| 主标题 | 40px / 2.5rem | 品牌名、核心功能标题 |
| 副标题 | 26px / 1.625rem | 功能模块标题 |
| 卡片标题 | 20px / 1.25rem | 功能卡片标题 |
| 正文 | 18px / 1.125rem | 主要内容文字（适老化基准） |

#### 2. 配置文件更新

**修改文件**：
- [tailwind.config.js](file:///C:/Users/26293/Desktop/创意大赛/tailwind.config.js) - 配置完整配色和字体系统
- [src/style.css](file:///C:/Users/26293/Desktop/创意大赛/src/style.css) - 全局样式、CSS变量、按钮组件样式
- [index.html](file:///C:/Users/26293/Desktop/创意大赛/index.html) - 引入 Google Fonts（Poppins + Inter）

**新增组件样式**：
- `.btn-primary` - 主按钮（橙金渐变）
- `.btn-secondary` - 辅助按钮（科技蓝）
- `.btn-accent` - 强调按钮（警示红）
- `.card` - 卡片组件
- `.safe-area-top / .safe-area-bottom` - 安全区域适配

#### 3. 路由模式修改

**目标**：将路由从 History 模式改为 Hash 模式，支持静态部署

**修改文件**：[src/router/index.js](file:///C:/Users/26293/Desktop/创意大赛/src/router/index.js)

```javascript
// 修改前
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({ history: createWebHistory() })

// 修改后
import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({ history: createWebHashHistory() })
```

**原因**：Hash 路由（`/#/parent`）无需服务器配置，适合 GitHub Pages 静态部署

#### 4. 项目构建验证

**执行命令**：`npm run build`  
**结果**：✅ 构建成功

---

## 2026年6月20日

### 1. Logo 更新

**目标**：使用用户提供的 Logo 替换应用 Logo

**更新文件**：
- [Entry.vue](file:///C:/Users/26293/Desktop/创意大赛/src/views/Entry.vue) - 入口页 Logo
- [Login.vue](file:///C:/Users/26293/Desktop/创意大赛/src/views/Login.vue) - 登录页 Logo

**处理说明**：
- 将含空格的 `LOGO (2).png` 复制为 `logo.png`，避免 URL 编码问题
- 同时保留 `logo.svg` 作为矢量备选

### 2. Logo 设计方案展示页

**目标**：展示品牌 Logo 设计方向

**新增文件**：[src/views/LogoShowcase.vue](file:///C:/Users/26293/Desktop/创意大赛/src/views/LogoShowcase.vue)

**设计方案**：
- 方案一：温暖守护（夕阳 + 老人剪影 + 声波）
- 方案二：智能陪伴（对话气泡 + 声波 + AI 节点）
- 方案三：夕阳智语（几何 + 夕阳 + 心形网络）

**访问链接**：https://Yu-could.github.io/sunsetAI/#/logo-showcase

### 3. 设置模块完善

**目标**：解决设置页面功能不完整、字体不生效等问题

**新增功能**：
- 字体大小设置（小/中/大/特大），支持无刷新自动切换
- 应用音量控制（0-100% 滑块）
- 语音播报开关
- 消息通知开关
- 夜间模式开关

**修复内容**：
- 设置页面无法点击问题
- 字体大小切换不生效问题（使用 `!important` 强制覆盖）
- 保存后跳转逻辑（根据角色跳转对应首页）

**更新文件**：
- [src/views/Settings.vue](file:///C:/Users/26293/Desktop/创意大赛/src/views/Settings.vue)
- [src/App.vue](file:///C:/Users/26293/Desktop/创意大赛/src/App.vue) - 添加字体大小应用逻辑
- [index.html](file:///C:/Users/26293/Desktop/创意大赛/index.html) - 初始化字体大小

### 4. 注册功能

**目标**：新增用户注册功能

**注册方式**：
- 账号注册（账号、密码、确认密码、手机号）
- 手机注册（手机号、验证码、密码）

**表单验证**：
- 账号：4-20 位字符
- 密码：6-20 位字符
- 手机号：11 位数字
- 验证码：固定 `123456`（测试用）

**流程**：注册成功 → 跳转实名信息填写 → 进入主页

**更新文件**：[src/views/Login.vue](file:///C:/Users/26293/Desktop/创意大赛/src/views/Login.vue)

### 5. 实名信息功能

**目标**：注册后填写用户真实信息

**字段**：
- 真实姓名、身份证号、性别、出生日期
- 紧急联系人、联系电话、居住地址、健康状况

**支持**："暂不填写，稍后完善"跳过

**更新文件**：[src/views/RealName.vue](file:///C:/Users/26293/Desktop/创意大赛/src/views/RealName.vue)

### 6. 纯语音识别功能（方案 D）

**目标**：实现语音助手功能，无需外部 API

**技术实现**：
- 基于 Web Speech API（语音识别 + 语音合成）
- 语音命令解析（30+ 指令）
- 浏览器不支持时给出友好提示

**支持指令**：
- 健康相关："打开健康"、"查看健康数据"、"健康监测"
- 用药相关："打开用药"、"吃药"、"用药提醒"
- 回忆录："打开回忆"、"回忆录"、"故事"
- 其他："签到"、"求助"、"打开饮食"、"日程"

**更新文件**：
- [src/utils/voiceAssistant.js](file:///C:/Users/26293/Desktop/创意大赛/src/utils/voiceAssistant.js) - 新建
- [src/views/Home.vue](file:///C:/Users/26293/Desktop/创意大赛/src/views/Home.vue) - 集成语音按钮

### 7. 首页内容丰富

**目标**：解决首页内容太少的问题

**手机端首页新增**：
- 顶部时间问候语（早上好/中午好/晚上好）
- 今日状态统计（4 宫格：签到、健康记录、待服药、子女）
- 今日用药清单（药物名称、剂量、时间、服用状态）
- 健康小贴士（可刷新建议卡片）
- 最近活动记录
- 语音小助手支持"签到"指令

**桌面端首页新增**：
- 顶部问候横幅（渐变背景）
- 数据统计卡片（6 个：健康评分、本月签到、今日热量、已连接子女、待服药物、健康记录）
- 功能入口卡片（8 个：健康、用药、回忆录、饮食、签到、亲情、日程、紧急）
- 今日用药清单
- 健康小贴士
- 快捷功能（4 个：语音录入、平安签到、联系子女、设置）
- 最近活动记录

**更新文件**：
- [src/views/Home.vue](file:///C:/Users/26293/Desktop/创意大赛/src/views/Home.vue)
- [src/views/desktop/Home.vue](file:///C:/Users/26293/Desktop/创意大赛/src/views/desktop/Home.vue)

### 8. 语音小助手帮助提示优化

**目标**：修复帮助提示框遮挡页面内容的问题

**修改前**：小气泡从右侧弹出，遮挡内容，无法完整浏览
**修改后**：底部弹窗（Bottom Sheet），分类展示，全屏遮罩

**分类内容**：
- 健康相关指令
- 用药相关指令
- 回忆录指令
- 其他功能指令

**更新文件**：[src/views/Home.vue](file:///C:/Users/26293/Desktop/创意大赛/src/views/Home.vue)

### 9. 登录页底部菜单隐藏

**目标**：修复登录页显示底部导航栏的问题

**修改内容**：
- [App.vue](file:///C:/Users/26293/Desktop/创意大赛/src/App.vue) 中 `isEntry` 判断增加 `/login` 路径
- 同时添加 `/realname` 路径，实名信息页也不显示底部菜单

```javascript
const isEntry = computed(() => {
  return route.path === '/' || route.path.startsWith('/login') || route.path.startsWith('/realname')
})
```

### 10. 管理员后台页面优化

**目标**：优化布局，确保内容控制在一页内

**优化内容**：
- 缩小页面内边距（p-8 → p-6）
- 缩小卡片内边距（p-6 → p-4）
- 缩小卡片间距（gap-6 → gap-4）
- 缩小字体大小（text-2xl → text-xl）
- 添加页面最大宽度限制（max-w-7xl）

**更新文件**：[src/views/Admin.vue](file:///C:/Users/26293/Desktop/创意大赛/src/views/Admin.vue)

### 11. 界面布局优化（整合在一页）

**目标**：解决页面内容过长，需要滚动的问题

**优化页面**：
- **入口页（Entry.vue）**：缩小 Logo、放大字体、移除底部菜单
- **登录页（Login.vue）**：缩小间距、精简布局、去除多余媒体查询
- **父母移动端首页（Home.vue）**：缩小卡片、减少间距、精简语音助手区域
- **子女移动端首页（ChildHome.vue）**：缩小卡片、减少间距
- **桌面端首页（desktop/Home.vue）**：缩小卡片、减少内边距、优化网格

**优化策略**：
- 缩小间距：mb-8 → mb-4，gap-4 → gap-3
- 缩小卡片：p-6 → p-4，图标尺寸缩小
- 精简内容：移除冗余描述、简化布局
- 统一风格：保持视觉一致性，去除复杂动画

### 12. 手机端和电脑端分离

**目标**：根据设备类型自动展示对应界面

**实现逻辑**：
```javascript
onMounted(() => {
  const userAgent = navigator.userAgent.toLowerCase()
  const mobileKeywords = ['iphone', 'ipad', 'ipod', 'android', 'windows phone', 'mobile']
  isMobile.value = mobileKeywords.some(keyword => userAgent.includes(keyword))
})
```

**效果**：
- 手机访问：自动展示移动端选项（父母移动端、子女移动端）
- 电脑访问：自动展示桌面端选项（父母桌面端、子女桌面端）

**更新文件**：[src/views/Entry.vue](file:///C:/Users/26293/Desktop/创意大赛/src/views/Entry.vue)

---

### 2026年6月19日

#### 1. 部署准备

**Git 仓库初始化**：
- `git init`
- 创建 [.gitignore](file:///C:/Users/26293/Desktop/创意大赛/.gitignore) 文件
- 安装 gh-pages 工具：`npm install --save-dev gh-pages`
- 配置部署脚本：`"deploy": "npm run build && gh-pages -d dist"`

**代码提交**：
- 首次提交：`Initial commit: SunsetAI - AI语音助老助手`

#### 2. GitHub 仓库配置

**仓库信息**：
- GitHub 用户名：`Yu-could`
- 仓库名：`sunsetAI`
- 仓库地址：https://github.com/Yu-could/sunsetAI

**远程仓库配置**：
```bash
git remote add origin https://github.com/Yu-could/sunsetAI.git
git branch -M main
git push -u origin main
```

#### 3. GitHub Actions 部署配置

**创建文件**：[.github/workflows/deploy.yml](file:///C:/Users/26293/Desktop/创意大赛/.github/workflows/deploy.yml)

**工作流设计**：
- 触发条件：push 到 main 分支
- 运行环境：Ubuntu latest
- 步骤：
  1. 检出代码（actions/checkout@v4）
  2. 设置 Node.js 20（actions/setup-node@v4）
  3. 安装依赖（npm ci）
  4. 构建项目（npm run build）
  5. 部署到 GitHub Pages（JamesIves/github-pages-deploy-action@v4）

**权限配置**：`permissions: contents: write`

**提交记录**：
- `Add GitHub Actions deploy workflow`
- `Fix GitHub Pages deployment workflow`
- `Use JamesIves/github-pages-deploy-action`

#### 4. Base Path 修复

**问题**：GitHub Pages 部署后页面空白，资源路径错误

**修复方案**：修改 [vite.config.js](file:///C:/Users/26293/Desktop/创意大赛/vite.config.js)

```javascript
export default defineConfig({
  base: '/sunsetAI/',  // ← 新增：GitHub Pages 子路径
  // ...
})
```

**提交记录**：`Fix base path for GitHub Pages deployment`

#### 5. 部署验证

**GitHub Pages 配置**：
- 源：Deploy from a branch
- 分支：gh-pages
- 访问链接：https://Yu-could.github.io/sunsetAI/#/

---

## 📊 项目状态

### 完成项 ✅

| 任务 | 状态 | 完成时间 |
|------|------|---------|
| 品牌配色方案设计 | ✅ 完成 | 6月18日 |
| 字体系统配置 | ✅ 完成 | 6月18日 |
| 路由模式改为 Hash | ✅ 完成 | 6月18日 |
| 项目构建验证 | ✅ 通过 | 6月18日 |
| Git 仓库初始化 | ✅ 完成 | 6月19日 |
| GitHub 仓库推送 | ✅ 完成 | 6月19日 |
| GitHub Actions 配置 | ✅ 完成 | 6月19日 |
| Base Path 修复 | ✅ 完成 | 6月19日 |
| GitHub Pages 部署 | ✅ 完成 | 6月19日 |

### 访问链接

- **GitHub 仓库**：https://github.com/Yu-could/sunsetAI
- **线上预览**：https://Yu-could.github.io/sunsetAI/#/
- **本地开发**：http://localhost:5175/

---

## 🔧 技术文档

### 文件结构

```
创意大赛/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 部署配置
├── dist/                       # 构建输出目录
├── src/
│   ├── router/
│   │   └── index.js            # 路由配置（Hash模式）
│   ├── views/                  # 页面组件
│   ├── App.vue                 # 根组件
│   ├── main.js                 # 入口文件
│   └── style.css               # 全局样式（品牌配色）
├── index.html                  # HTML模板（引入Google Fonts）
├── vite.config.js              # Vite配置（base: '/sunsetAI/'）
├── tailwind.config.js          # Tailwind配置（品牌配色系统）
└── package.json                # 项目配置（部署脚本）
```

### 常用命令

```bash
npm run dev          # 启动开发服务器（http://localhost:5175/）
npm run build        # 构建生产版本
npm run deploy       # 构建并部署到GitHub Pages
git push origin main # 推送代码（触发自动部署）
```

### 部署流程

```
代码修改 → git commit → git push → GitHub Actions 自动构建 → GitHub Pages 自动部署
```

---

## 📝 后续建议

1. **代码更新**：修改代码后执行 `git push origin main`，GitHub Actions 会自动部署
2. **配置更新**：修改配置文件后需要重新构建并推送
3. **监控部署**：访问 https://github.com/Yu-could/sunsetAI/actions 查看部署状态
4. **域名配置**：如需自定义域名，在 GitHub Pages 设置中添加 CNAME 文件