<script setup lang="ts">
interface HtmlProps {
  /** html的内容 */
  modelValue?: string
  /**
   * 显示html内容的标签
   * @default 'div'
   */
  tag?: string
}

defineProps<HtmlProps>()
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component -->
  <component :is="tag ?? 'div'" v-html="modelValue" />
</template>
