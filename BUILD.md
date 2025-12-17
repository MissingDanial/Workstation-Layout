# 打包指南

## 快速打包步骤

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量（可选）

在 `.env.local` 中配置 API Key（开发时使用）：

```env
VITE_DASHSCOPE_API_KEY=你的API_Key
```

**注意**：打包后的应用不会自动包含 API Key，需要在应用内配置。

### 3. 构建 Web 应用

```bash
npm run build
```

### 4. 打包桌面应用

#### Windows

```bash
npm run electron:build:win
```

生成的文件在 `release` 目录：
- `ZenOffice AI 数字风水顾问 Setup 1.0.0.exe` - 安装程序
- `ZenOffice AI 数字风水顾问-1.0.0-便携版.exe` - 便携版（推荐）

#### 所有平台

```bash
npm run electron:build
```

### 5. 分发应用

打包完成后，将 `release` 目录下的文件分发给用户即可。

## 打包选项说明

### 安装版 vs 便携版

- **安装版**：需要安装，会在开始菜单和桌面创建快捷方式
- **便携版**：无需安装，解压后直接运行，适合临时使用

### 自定义配置

编辑 `electron-builder.config.js` 可以修改：
- 应用名称和版本
- 图标文件路径
- 打包格式
- 安装程序选项

## 常见问题

### Q: 打包失败，提示找不到 Electron

**A:** 首次打包需要下载 Electron 二进制文件，确保网络畅通。如果下载失败，可以手动下载并放到缓存目录。

### Q: Windows 打包提示需要 NSIS

**A:** NSIS 用于生成安装程序，可选安装。如果只需要便携版，可以修改 `electron-builder.config.js` 移除 NSIS 目标。

### Q: 打包后的应用很大

**A:** 这是正常的，Electron 应用包含 Chromium 浏览器内核。可以使用 `compression: 'maximum'` 选项压缩。

### Q: 如何添加应用图标

**A:** 
1. 准备图标文件：
   - Windows: `build/icon.ico` (256x256)
   - macOS: `build/icon.icns` (512x512)
   - Linux: `build/icon.png` (512x512)
2. 将图标文件放到 `build` 目录
3. 重新打包

### Q: 打包后的应用如何配置 API Key

**A:** 当前版本需要在代码中添加配置界面。建议：
1. 在应用启动时检查是否有配置
2. 如果没有，显示配置对话框
3. 将 API Key 保存到本地文件（使用 Electron 的 `app.getPath('userData')`）

## 测试打包结果

打包完成后，可以在 `release` 目录找到生成的文件。建议：
1. 在干净的系统中测试安装
2. 测试所有功能是否正常
3. 检查文件大小是否合理

