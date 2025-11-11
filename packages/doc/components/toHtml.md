### 使用
```html
<script setup lang="ts">
import { ToHtml } from '@gengjjjjj/component'
import { ref } from 'vue'

const input = ref('<div>HTML content</div>')
</script>

<template>
  <div>input: <textarea v-model="input" placeholder="Input HTMLText Here" /></div>
  <div>html: <ToHtml v-model="input" /></div>
</template>

```