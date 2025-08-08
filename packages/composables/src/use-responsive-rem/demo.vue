<template>
  <div class="responsive-demo">
    <h2>当前 REM 缩放比例：{{ remScale }}</h2>
    <p>调整浏览器窗口大小以查看动态变化</p>
  </div>
</template>

<script setup lang="ts">
import { useResponsiveRem } from './index.ts';

// 初始化响应式 REM，设计稿宽度为 1920
const { remScale } = useResponsiveRem(1920);
</script>

<style scoped>
.responsive-demo {
  font-size: 1rem; /* 实际像素会根据视口动态变化 */
  padding: 2rem;
}
</style>