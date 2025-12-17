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

## 📦 构建与部署

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览构建结果

```bash
npm run preview
```

### 部署到服务器

#### 方式一：静态文件部署

1. 执行 `npm run build` 生成 `dist` 目录
2. 将 `dist` 目录内容上传到静态服务器（Nginx、Apache、Vercel、Netlify 等）
3. 配置服务器支持 SPA 路由（所有路由指向 `index.html`）

**Nginx 配置示例：**

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### 方式二：Docker 部署

创建 `Dockerfile`：

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

构建并运行：

```bash
docker build -t fengshui-app .
docker run -p 80:80 fengshui-app
```

#### 方式三：Vercel / Netlify

1. 将代码推送到 GitHub
2. 在 Vercel/Netlify 中导入项目
3. 配置环境变量 `VITE_DASHSCOPE_API_KEY`
4. 部署完成

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

#### macOS

```bash
# 打包 macOS 应用（.dmg）
npm run electron:build:mac
```

#### Linux

```bash
# 打包 Linux 应用（AppImage / deb）
npm run electron:build:linux
```

#### 仅打包不生成安装程序（测试用）

```bash
# 打包到 release 目录，不生成安装程序
npm run electron:pack
```

### 打包配置

打包配置在 `electron-builder.config.js` 中，可以自定义：
- 应用图标
- 安装程序样式
- 输出格式
- 压缩选项

**注意**：
- 首次打包会下载 Electron 二进制文件，可能需要一些时间
- Windows 打包需要安装 [NSIS](https://nsis.sourceforge.io/Download)（可选，用于生成安装程序）
- macOS 打包需要在 macOS 系统上进行
- Linux 打包可以在任何系统上进行

### 环境变量处理

打包后的应用需要用户手动配置 API Key。你可以：

1. **在应用内添加配置界面**：让用户输入 API Key
2. **使用配置文件**：在应用目录创建 `config.json` 存储 API Key
3. **使用系统环境变量**：读取系统环境变量（不推荐，安全性较低）

**推荐方案**：在应用首次启动时提示用户输入 API Key，并保存到本地配置文件。

## ⚙️ 配置说明

### 环境变量

| 变量名 | 说明 | 必需 |
|--------|------|------|
| `VITE_DASHSCOPE_API_KEY` | 阿里云百炼 API Key | ✅ |

### 文件上传限制

- **最大文件大小**：10MB
- **支持格式**：图片（jpg, png, gif 等）、视频（mp4, mov 等）

### 端口配置

默认端口为 `3000`，可在 `vite.config.ts` 中修改：

```typescript
server: {
  port: 3000,  // 修改为你想要的端口
  host: '0.0.0.0',
}
```

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

### 主要接口

- `analyzeOfficeSpace(file: File, orientation: string)`: 分析办公空间，返回风水报告
- `fileToGenerativePart(file: File)`: 将文件转换为 base64 格式

## ⚠️ 注意事项

1. **API 密钥安全**：
   - ⚠️ **重要**：当前实现中 API Key 会暴露在前端代码中
   - 仅适用于内部使用或受控环境
   - 生产环境建议使用后端代理 API 调用

2. **浏览器兼容性**：
   - 支持现代浏览器（Chrome、Firefox、Safari、Edge 最新版本）
   - 需要支持 ES6+ 和 FileReader API

3. **API 配额**：
   - 注意阿里云百炼的 API 调用配额和费用
   - 建议设置合理的调用频率限制

## 🐛 常见问题

### Q: 提示 "API Key not found"
**A:** 检查 `.env.local` 文件是否存在，且变量名为 `VITE_DASHSCOPE_API_KEY`（注意 `VITE_` 前缀）

### Q: 上传文件后没有反应
**A:** 
- 检查浏览器控制台是否有错误
- 确认 API Key 有效且有足够配额
- 检查文件大小是否超过 10MB



**提示**：使用本应用时，请确保遵守相关法律法规，风水分析仅供参考，不构成专业建议。
