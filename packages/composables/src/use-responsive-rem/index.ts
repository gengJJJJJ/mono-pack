import { ref, shallowReadonly, type Ref } from "vue";
import { debounce } from "@mono-pack/utils/src/index";

/**
 * 支持高分辨率设备（DPR）
 * 初始化响应式 REM 适配
 * 当前视口相对于设计稿的缩放比例
 * 可用于动态计算尺寸等用途
 * @param width - 设计稿宽度（默认 1920）
 * @example
 * ```ts
 * import { useResponsiveRem } from '@mono-pack/utils';
 * useResponsiveRem(1920);
 *
 */
export function useResponsiveRem(width?: number): {
  remScale: Readonly<Ref<number>>;
  destroyResponsiveRem: () => void;
} {
  const designWidth = width ?? 1920;
  const remScale = ref(1);

  // 设置根元素字体大小
  function setRem() {
    const docEl = document.documentElement;
    if (!docEl) return;
    const viewportWidth = docEl.clientWidth;
    if (!viewportWidth) return;
    const scale = viewportWidth / designWidth;
    const dpr = window.devicePixelRatio || 1;
    // 基准字体大小（考虑 DPR）
    const baseFontSize = 192 * scale * dpr;
    try {
      docEl.style.fontSize = `${baseFontSize}px`;
      remScale.value = scale;
    } catch (error) {
      console.error("设置 REM 字体大小失败", error);
    }
  }
  // 使用局部防抖函数，确保闭包引用最新值
  const debouncedSetRem = debounce(setRem, 200);
  // 清理已有监听器并重新绑定
  function bindEvents() {
    window.removeEventListener("resize", debouncedSetRem);
    window.addEventListener("resize", debouncedSetRem);

    window.removeEventListener("pageshow", handlePageShow);
    window.addEventListener("pageshow", handlePageShow);

    window.addEventListener("visibilitychange", handleVisibilityChange);
  }

  function handlePageShow(e: PageTransitionEvent) {
    if (e.persisted) {
      debouncedSetRem();
    }
  }
  function handleVisibilityChange() {
    if (document.visibilityState === "visible") {
      debouncedSetRem();
    }
  }
  function destroyResponsiveRem() {
    if (debouncedSetRem) {
      window.removeEventListener("resize", debouncedSetRem);
    }
    if (handlePageShow) {
      window.removeEventListener("pageshow", handlePageShow);
    }
    if (handleVisibilityChange) {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
    }
  }
  // 初始化
  bindEvents();
  debouncedSetRem();

  return {
    remScale: shallowReadonly(remScale),
    destroyResponsiveRem,
  };
}
