### 📌 简介
是一个用于实现响应式 REM 适配的 Vue 自定义 Hook，能够根据视口宽度动态调整根元素字体大小（`html` 标签），从而实现响应式布局。它支持高分辨率设备（DPR）并优化了性能（如防抖、事件监听管理等）。


### 🧩 功能特性

- ✅ 根据设计稿宽度自动计算缩放比例
- ✅ 支持 DPR（设备像素比），提升高清屏幕显示效果
- ✅ 防抖机制优化 resize 性能
- ✅ 页面恢复可见时自动更新（`visibilitychange`）
- ✅ 页面缓存恢复时触发更新（`pageshow`）
- ✅ 提供响应式的缩放比例供组件使用


### 📦 安装依赖

确保项目中已安装以下依赖：

```bash
pnpm install @mono-pack/composables 
```


### 🚀 快速使用

### 引入 Hook

```ts
import { useResponsiveRem } from '@mono-pack/composables';
```

### 初始化调用

在 Vue 组件或入口文件中初始化：

```ts
// 默认设计稿宽度为 1920
useResponsiveRem();
```

或者自定义设计稿宽度：

```ts
useResponsiveRem(1440);
```

### 在组件中获取缩放比例

```vue
<template>
  <div>当前缩放比例：{{ remScale }}</div>
</template>

<script setup lang="ts">
import { useResponsiveRem } from '@mono-pack/composables';

const { remScale } = useResponsiveRem(1920);
</script>
```


### 📐 技术原理说明

该 Hook 的核心逻辑是通过修改 `<html>` 元素的 `font-size` 来控制 `1rem` 对应的像素值，从而让整个页面基于 `rem` 单位进行响应式布局。

### 计算公式

```ts
const scale = viewportWidth / designWidth;
const dpr = window.devicePixelRatio || 1;
const baseFontSize = 192 * scale * dpr;
```

- `viewportWidth`: 当前视口宽度
- `designWidth`: 设计稿宽度（默认 1920）
- `scale`: 视口与设计稿的比例
- `dpr`: 设备像素比（如 Retina 屏幕为 2）
- `baseFontSize`: 最终设置到 html 元素上的字体大小（px）


### 🧪 响应式示例

在 CSS 中使用 `rem` 单位即可自动适应不同屏幕：

```css
.container {
  width: 10rem; /* 实际宽度 = 10 * 当前 font-size */
  padding: 2rem;
}
```


### 🧹 清理与销毁

由于该 Hook 主要绑定全局事件监听器（resize、visibilitychange 等），建议在应用卸载时手动移除监听器以避免内存泄漏。

如果你在组件中使用，可以结合 `onBeforeUnmount` 进行清理：

```ts
import { onBeforeUnmount } from 'vue';

const { remScale ,destroyResponsiveRem} = useResponsiveRem(1920);

onBeforeUnmount(() => {
  destroyResponsiveRem()
});
```


### ⚠️ 注意事项

- **仅限浏览器环境使用**：不适用于 SSR（服务端渲染），需要添加对 `window` 和 `document` 的存在性判断。
- **避免重复调用**：多次调用 `useResponsiveRem()` 不会引发错误，但建议只在全局初始化一次。
- **兼容性处理**：已处理页面隐藏/恢复、页面缓存等情况，确保在移动端也能正常更新。


### ✅ 总结
useResponsiveRem是一个轻量、高效且功能完善的响应式 REM 解决方案，适合现代 Vue 3 项目快速集成响应式布局能力。通过统一的 API 和良好的性能优化策略，可以帮助开发者更专注于业务开发，而非基础适配工作。