### 安装
```shell
    pnpm add @gengjjjjj/utils
```
### 使用示例
```ts
<script setup lang="ts">
import { randomString } from '@gengjjjjj/utils'

const str = randomString(8)
</script>
<template>
    <div>{{str}}</div>
</template>
```