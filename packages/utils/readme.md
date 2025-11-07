### 安装
```shell
    pnpm add @gengjjjjj/utils
```
### 文档
[文档](https://gengjjjjj.github.io/mono-pack/utils/)
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