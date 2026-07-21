### 使用
```html
<script setup lang="ts">
import { ToHtml } from '@gengjjjjj/component'
import { ref } from 'vue'

const input = ref('<div>HTML content</div>')
</script>

<template>
  <div>input: <textarea v-model="input" placeholder="Input HTMLText Here" /></div>
  <div>html: <ToHtml :content="input" /></div>
</template>
```

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| content | HTML 内容 | `string` | — |
| tag | 渲染标签 | `string` | `div` |
| sanitize | 是否用 DOMPurify 消毒 | `boolean` | `true` |
| modelValue | 已废弃，请用 content | `string` | — |
