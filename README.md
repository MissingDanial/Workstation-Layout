# ZenOffice AI - 数字风水顾问

一个基于 AI 的办公空间风水分析应用，通过上传办公环境照片或视频，智能识别能量流动、检测煞气问题，并提供个性化的风水优化建议。

## ✨ 功能特性

- 🔮 **智能风水分析**：基于传统风水理论，结合现代办公环境特点
- 📸 **图片/视频识别**：支持上传图片或短视频进行空间分析
- 🧭 **朝向分析**：根据工位朝向提供个性化建议
- ⚠️ **煞气检测**：自动识别横梁压顶、尖角对座、杂乱等问题
- 🛡️ **化煞方案**：提供现代且实用的化解建议
- 📋 **每日 SOP**：生成可执行的微风水习惯清单
- 🗺️ **能量地图**：分析桌面物品的五行属性与摆放建议

## 🛠️ 技术栈

- **前端框架**：React 19 + TypeScript
- **构建工具**：Vite 6
- **UI 样式**：Tailwind CSS
- **AI 模型**：阿里云百炼 qwen3-vl-plus（兼容 OpenAI API）
- **图标**：自定义 SVG 组件

## 📋 环境要求

- **Node.js**：>= 18.0.0（推荐使用 LTS 版本）
- **npm**：>= 9.0.0（或 yarn/pnpm）
- **API 密钥**：阿里云百炼 API Key（[获取地址](https://help.aliyun.com/zh/model-studio/get-api-key)）

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone <repository-url>
cd fengshui
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

在项目根目录创建 `.env.local` 文件：

```env
VITE_DASHSCOPE_API_KEY=你的百炼API_Key
```

**获取 API Key：**
1. 访问 [阿里云百炼控制台](https://help.aliyun.com/zh/model-studio/get-api-key)
2. 登录后创建 API Key
3. 将 Key 复制到 `.env.local` 文件中

**注意：**
- 如果使用**新加坡区域**的模型，需要在 `services/geminiService.ts` 中将 `baseURL` 改为：
  ```
  baseURL: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1"
  ```
- 默认使用**北京区域**，无需修改

### 4. 启动开发服务器

```bash
npm run dev
```
应用将在 `http://localhost:3000` 启动（端口可在 `vite.config.ts` 中修改）。

## 💻 打包成桌面应用

本项目支持使用 Electron 打包成 Windows、macOS、Linux 桌面应用。

### 安装 Electron 依赖

```bash
npm install
```

### 开发模式（测试 Electron）

```bash
npm run electron:dev
```

这将同时启动 Vite 开发服务器和 Electron 窗口。

### 打包成可执行文件

#### Windows

```bash
# 打包 Windows 安装包（.exe）
npm run electron:build:win
```

打包完成后，在 `release` 目录下会生成：
- **安装版**：`ZenOffice AI 数字风水顾问 Setup 1.0.0.exe`（NSIS 安装程序）
- **便携版**：`ZenOffice AI 数字风水顾问-1.0.0-便携版.exe`（无需安装，直接运行）

### 环境变量处理

打包后的应用需要用户手动配置 API Key。你可以：

1. **在应用内添加配置界面**：让用户输入 API Key
2. **使用配置文件**：在应用目录创建 `config.json` 存储 API Key
3. **使用系统环境变量**：读取系统环境变量（不推荐，安全性较低）
**推荐方案**：在应用首次启动时提示用户输入 API Key，并保存到本地配置文件。

## 🔧 开发说明

### 项目结构

```
fengshui/
├── components/          # React 组件
│   ├── AnalysisView.tsx # 分析结果展示
│   └── Icons.tsx        # 图标组件
├── services/            # 服务层
│   └── geminiService.ts # AI 分析服务
├── types/               # TypeScript 类型定义
│   ├── openai.d.ts      # OpenAI SDK 类型
│   └── ...
├── App.tsx              # 主应用组件
├── index.html           # HTML 入口
├── vite.config.ts       # Vite 配置
└── tsconfig.json        # TypeScript 配置
```

**提示**：使用本应用时，请确保遵守相关法律法规，风水分析仅供参考，不构成专业建议。
##  使用说明
### 上传工位照片
<img width="340" height="724" alt="1" src="https://github.com/user-attachments/assets/37d7f135-c8e1-4a6f-b99c-3fe76b8acb8f" />

### 获取结果
<img width="320" height="751" alt="2" src="https://github.com/user-attachments/assets/7764001a-61d0-45f3-87bf-9c27da06ce73" />
<img width="319" height="475" alt="3" src="https://github.com/user-attachments/assets/12053bf9-1cc7-48ec-a144-f9d6f360909f" />
<img width="286" height="469" alt="4" src="https://github.com/user-attachments/assets/bb494150-309a-4d1e-a6f3-2c016db0c9f3" />
包括气场分析、每日风水SOP、能量地图分析
