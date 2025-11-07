### 简介
一个用于实现高精度响应式 REM 适配的 Vue 3 自定义组合式函数（Composable），可根据设计稿宽度动态计算当前视口缩放比例，并自动设置 <html> 根元素字体大小，完美支持高分辨率屏幕（DPR）与复杂页面生命周期。
同时搭配 `postcss-pxtorem` 插件，将px转换为rem，开启“设计稿像素级还原 + 全屏自适应”。

### 功能特性

- 精准对齐设计稿：基于指定设计稿宽度（如 1920px）计算缩放比例 scale = viewportWidth / designWidth
- 高分屏友好：可选启用 DPR（设备像素比）补偿，避免 Retina 屏文字模糊
- 高性能更新：resize 事件防抖 + requestAnimationFrame 帧同步
- 全生命周期覆盖：
  resize：窗口尺寸变化
  pageshow：浏览器前进/后退缓存恢复
  visibilitychange：页面从隐藏状态恢复可见
- 响应式状态暴露：提供 remScale 和 currentFontSize，供 JS 动态计算使用（如 ECharts、Canvas）
- 内存安全：支持自动销毁（组件卸载时）或手动清理
- SSR 安全：在服务端渲染环境自动降级，无报错
- 类型完备：完整 TypeScript 支持，IDE 智能提示友好


### 安装依赖

```bash
pnpm install @gengjjjjj/composables 
pnpm install postcss-pxtorem
```

### 配置 
```js
// 根目录下创建 postcss.config.js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 192, // 设计稿宽度
      propList: ['*'], // 默认转换所有属性
      selectorBlackList: ['.hairline'], // 或使用正则 /^body$/
      minPixelValue: 2, // 小于 2px 的不转换
    },
  },
};
```
```ts
// vite.config.ts
import postCssPxToRem from 'postcss-pxtorem'
export default defineConfig({
	css: {
		postcss: {
			plugins: [
				postCssPxToRem({
					rootValue: 192, // 设计稿宽度
					propList: ['*'], // 默认转换所有属性
					selectorBlackList: ['.hairline'], // 或使用正则 /^body$/
					minPixelValue: 2 // 小于 2px 的不转换
				})
			]
		}
	}
})
```
### 快速使用

```ts
import { useViewportScale  } from '@gengjjjjj/composables';
```

### 初始化调用

在 Vue 组件或入口文件中初始化：
```ts
// 默认设计稿宽度为 1920
useViewportScale();
```

自定义配置：
```ts
useViewportScale(designWidth: 1440,
  baseFontSizeAtDesign: 144, // 可选，默认为 designWidth / 10
  respectDPR: true,          // 是否考虑设备像素比（默认 true）
  debounceDelay: 150,        // 防抖延迟（ms，默认 150）);
)
```
- `designWidth`: 设计稿宽度（默认 1920）
- `baseFontSizeAtDesign`: 设计稿宽度下 1rem 对应的像素值（通常为 designWidth / 10）
- `respectDPR`: 是否乘以 devicePixelRatio（高分屏适配）
- `debounceDelay`: resize 事件防抖延迟（毫秒）
- `autoDestroy`: 是否在 Vue 组件卸载时自动清理监听器

### 在组件中获取缩放比例

```vue
<template>
<template>
  <div class="responsive-demo">
    <p>调整浏览器窗口大小以查看动态变化</p>
    <h2>当前 REM 缩放比例：{{ remScale }}</h2>
    <h2>根字体大小：{{ currentFontSize }}px</h2>
  </div>
</template>

<script setup lang="ts">
import { useViewportScale } from '@gengjjjjj/composables';

// 初始化响应式 REM，设计稿宽度为 1920
const { remScale ,currentFontSize} = useViewportScale({
  designWidth: 1920,
  respectDPR: true,
});
</script>

<style scoped>
/* 安装 postcss-pxtorem 插件 构建后会自动将px 转为rem */
.responsive-demo {
  width: 200px; 
  height: 300px;
  padding: 20px;
}
</style>
```

### 技术原理说明

通过动态设置 <html> 元素的 font-size，使 1rem 始终代表“设计稿中的固定物理长度”，从而实现真正的等比缩放。

**核心公式**

```ts
const scale = viewportWidth / designWidth;
const dpr = respectDPR ? (window.devicePixelRatio || 1) : 1;
const fontSize = baseFontSizeAtDesign * scale * dpr;

document.documentElement.style.fontSize = `${fontSize}px`;
```


### 清理与销毁

在 Vue 组件内使用时，默认开启 autoDestroy: true，会在组件卸载时自动移除事件监听器，无需手动处理。

```ts
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import { useViewportScale } from '@mono-pack/composables';

const app = createApp(App);

const { destroy } = useViewportScale({
  designWidth: 1920,
  autoDestroy: false, // 关闭自动销毁
});

// （可选）在微前端卸载时调用
// window.__cleanup__ = destroy;

app.mount('#app');
```

### 注意事项

- **仅限浏览器环境使用**：已在内部做 SSR 安全判断，但不建议在服务端调用。
- **避免重复调用**：多次调用不会报错，但会重复绑定事件。建议全局只初始化一次（如在根组件或 main.ts）。
- **设计稿一致性**：所有 UI 尺寸必须基于同一设计稿宽度开发，否则缩放失真。
- **DPR 开关**：若项目为纯矢量图形（如 SVG 大屏），可设 respectDPR: false 避免过度放大。

### 总结
useViewportScale 是一个生产就绪、开箱即用、极致健壮的响应式缩放解决方案，专为现代 Vue 3 应用打造。它不仅解决了传统 REM 方案的痛点（如 DPR 适配、事件泄漏、设计稿脱节），还提供了精确的缩放状态供业务层消费，是构建大屏可视化、管理后台、跨端 PC 应用的理想选择。