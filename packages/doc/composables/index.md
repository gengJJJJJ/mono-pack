### 安装
```shell
    pnpm add @gengjjjjj/composables
```
### 使用示例
- vue中使用
```vue
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
  autoDestroy: true // 开启自动销毁
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
- main.ts使用
```ts
import { createApp } from 'vue';
import App from './App.vue';
import { useViewportScale } from '@gengjjjjj/composables';

const app = createApp(App);
const { destroy } = useViewportScale({
  designWidth: 1920,
  autoDestroy: false, // 关闭自动销毁
});
// （可选）在微前端卸载时调用
// window.__cleanup__ = destroy;
app.mount('#app');
```