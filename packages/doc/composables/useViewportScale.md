### 简介
一个用于实现高精度响应式 REM 适配的 Vue 3 自定义组合式函数（Composable），可根据设计稿宽度动态计算当前视口缩放比例，并自动设置` <html>` 根元素字体大小。
同时搭配 `postcss-pxtorem` 插件，将 px 转换为 rem，开启“设计稿像素级还原 + 全屏自适应”。

### 功能特性
- 精准对齐设计稿：基于指定设计稿宽度（如 1920px）计算缩放比例 `scale = viewportWidth / designWidth`
- 高分屏可选：`respectDPR` 默认关闭（CSS 像素通常已含 DPR）；确需时再开启
- 高性能更新：resize 事件防抖 + requestAnimationFrame 帧同步
- 全生命周期覆盖：
  - resize：窗口尺寸变化
  - pageshow：浏览器前进/后退缓存恢复
  - visibilitychange：页面从隐藏状态恢复可见
- 响应式状态暴露：提供 remScale 和 currentFontSize
- 内存安全：组件内可自动销毁，或手动 `destroy(resetFontSize?)`
- SSR 安全：服务端渲染环境自动降级
- 类型完备：完整 TypeScript 支持

### 安装依赖

```bash
pnpm install postcss-pxtorem
```

### 配置
```js
// 根目录下创建 postcss.config.js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 192, // 设计稿宽度
      propList: ['*'],
      selectorBlackList: ['.hairline'],
      minPixelValue: 2,
    },
  },
};
```

### 快速使用

```ts
import { useViewportScale } from '@gengjjjjj/composables';
```

### 初始化调用

```ts
// 默认设计稿宽度为 1920
useViewportScale();
```

自定义配置：
```ts
useViewportScale({
  designWidth: 1440,
  baseFontSizeAtDesign: 144,
  respectDPR: false,   // 默认 false
  debounceDelay: 150,
  autoDestroy: true,   // 仅在组件 setup 内生效
})
```

- `designWidth`: 设计稿宽度（默认 1920）
- `baseFontSizeAtDesign`: 设计稿宽度下 1rem 对应的像素值（通常为 designWidth / 10）
- `respectDPR`: 是否乘以 devicePixelRatio（默认 false）
- `debounceDelay`: resize 防抖延迟（毫秒）
- `autoDestroy`: 是否在组件卸载时自动清理（仅当存在组件实例时）

### 在组件中获取缩放比例

```vue
<script setup lang="ts">
import { useViewportScale } from '@gengjjjjj/composables';

const { remScale, currentFontSize } = useViewportScale({
  designWidth: 1920,
});
</script>

<template>
  <div>
    <h2>当前 REM 缩放比例：{{ remScale }}</h2>
    <h2>根字体大小：{{ currentFontSize }}px</h2>
  </div>
</template>
```

### 清理与销毁

在 `main.ts` 中调用不会注册 `onUnmounted`；微前端卸载时可手动清理：

```ts
const { destroy } = useViewportScale({ designWidth: 1920 });
// destroy(true) 会同时清空 html 的 font-size
```

### 注意事项

- 建议全局只初始化一次
- 所有 UI 尺寸需基于同一设计稿宽度
- 默认 `respectDPR: false`，避免视网膜屏过度放大
