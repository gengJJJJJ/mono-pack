# Pagination

基于 Element Plus `ElPagination` 的分页封装，统一默认 layout 与事件。

### 使用

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Pagination } from '@gengjjjjj/component'

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

function onPageChange(size: number, page: number) {
  console.log(size, page)
}
</script>

<template>
  <Pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :total="total"
    @page-change="onPageChange"
  />
</template>
```

### Props

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| currentPage | 当前页 | `number` | — |
| pageSize | 每页条数 | `number` | — |
| total | 总条数 | `number` | — |
| background | 按钮背景 | `boolean` | `true` |
| layout | 布局 | `string` | `total, sizes, prev, pager, next, jumper` |
| pageSizes | 每页条数选项 | `number[]` | `[10, 20, 30, 50, 100]` |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| update:currentPage | 当前页变化 | `(page: number)` |
| update:pageSize | 每页条数变化 | `(size: number)` |
| pageChange | 页码或条数变化 | `(pageSize, currentPage)` |
