const { defineConfig } = require('electron-builder');

module.exports = defineConfig({
  appId: 'com.zenoffice.fengshui',
  productName: 'ZenOffice AI 数字风水顾问',
  copyright: 'Copyright © 2025',
  
  directories: {
    output: 'release',
    buildResources: 'build',
  },

  files: [
    'dist/**/*',
    'electron/**/*',
    'package.json',
    'node_modules/**/*',
    '!node_modules/.cache/**/*',
  ],

  win: {
    target: [
      {
        target: 'nsis',
        arch: ['x64', 'ia32'],
      },
      {
        target: 'portable',
        arch: ['x64'],
      },
    ],
    icon: 'build/icon.ico', // Windows 图标（可选）
  },

  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    shortcutName: 'ZenOffice AI',
    installerIcon: 'build/icon.ico',
    uninstallerIcon: 'build/icon.ico',
    installerHeaderIcon: 'build/icon.ico',
  },

  portable: {
    artifactName: '${productName}-${version}-便携版.${ext}',
  },

  mac: {
    target: ['dmg', 'zip'],
    category: 'public.app-category.utilities',
    icon: 'build/icon.icns', // macOS 图标（可选）
  },

  linux: {
    target: ['AppImage', 'deb'],
    category: 'Utility',
    icon: 'build/icon.png', // Linux 图标（可选）
  },

  // 压缩配置
  compression: 'maximum',
  
  // 移除未使用的依赖
  asar: true,
  
  // 发布配置（如果需要自动发布）
  publish: null,
});

