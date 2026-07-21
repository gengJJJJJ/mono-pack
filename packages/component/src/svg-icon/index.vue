<template>
  <svg
    class="svg-icon"
    aria-hidden="true"
    :style="{ width: normalizedSize, height: normalizedSize }"
  >
    <use :href="symbolId" :fill="color || undefined" />
  </svg>
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    iconName: string;
    color?: string;
    size?: number | string;
  }>(),
  {
    color: "",
    size: 20,
  }
);

const symbolId = computed(() => `#icon-${props.iconName}`);

/** 数字或纯数字字符串补 px，已带单位的原样返回 */
const normalizedSize = computed(() => {
  const { size } = props;
  if (typeof size === "number") return `${size}px`;
  if (/^\d+(\.\d+)?$/.test(size)) return `${size}px`;
  return size;
});
</script>
<style lang="scss" scoped>
.svg-icon {
  fill: currentColor;
  vertical-align: middle;
  overflow: hidden;
}
</style>