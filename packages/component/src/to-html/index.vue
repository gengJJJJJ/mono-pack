<script setup lang="ts">
import { computed } from "vue";
import DOMPurify from "dompurify";

interface HtmlProps {
  /** HTML 内容（推荐） */
  content?: string;
  /**
   * @deprecated 请使用 content；仅作兼容，不会双向同步
   */
  modelValue?: string;
  /**
   * 显示 HTML 内容的标签
   * @default 'div'
   */
  tag?: string;
  /**
   * 是否使用 DOMPurify 消毒（默认 true）
   * @default true
   */
  sanitize?: boolean;
}

const props = withDefaults(defineProps<HtmlProps>(), {
  tag: "div",
  sanitize: true,
});

const html = computed(() => {
  const raw = props.content ?? props.modelValue ?? "";
  if (!raw) return "";
  if (!props.sanitize) return raw;
  // SSR / 非浏览器环境跳过消毒，避免 DOMPurify 依赖 window
  if (typeof window === "undefined") return "";
  return DOMPurify.sanitize(raw);
});
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component -->
  <component :is="tag ?? 'div'" v-html="html" />
</template>
