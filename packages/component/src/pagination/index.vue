<template>
  <div class="pagination">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :background="props.background"
      :layout="props.layout"
      :page-sizes="props.pageSizes"
      :total="props.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup>
import {ElPagination} from "element-plus";

import { useVModel } from '@vueuse/core'
// 数据
const props = withDefaults(defineProps<{
  currentPage: number;
  pageSize: number;
  total: number;
  background?: boolean;
  layout?: string;
  pageSizes?: number[];
}>(), {
  background: true,
  layout: "total, sizes, prev, pager, next, jumper",
  pageSizes: () => [10, 20, 30, 50, 100]
});

const emit = defineEmits<{
  (event: 'update:currentPage', value: number): void;
  (event: 'update:pageSize', value: number): void;
  (event: "pageChange", pageSize: number, currentPage: number): void;
  /**
   * @deprecated 请使用 pageChange
   */
  (event: 'handlePageChange', pageSize: number, currentPage: number): void;
}>();

const pageSize = useVModel(props, 'pageSize', emit)
const currentPage = useVModel(props, 'currentPage', emit)

function emitPageChange(nextPageSize: number, nextCurrentPage: number) {
  emit("pageChange", nextPageSize, nextCurrentPage);
  emit("handlePageChange", nextPageSize, nextCurrentPage);
}

function handleSizeChange(nextPageSize: number) {
  emitPageChange(nextPageSize, currentPage.value);
}

function handleCurrentChange(nextCurrentPage: number) {
  emitPageChange(pageSize.value, nextCurrentPage);
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
