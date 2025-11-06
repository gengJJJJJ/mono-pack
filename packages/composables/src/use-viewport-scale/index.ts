import { ref, shallowReadonly, type Ref, onUnmounted } from "vue";
import { debounce } from "@gengjjjjj/utils";

// 默认配置
const DEFAULT_OPTIONS = {
  designWidth: 1920,
  baseFontSizeAtDesign: 192, // 设计稿宽度下 1rem 对应的 px 值（通常 = designWidth / 10）
  respectDPR: true, // 是否考虑设备像素比（高分屏适配）
  debounceDelay: 150, // 防抖延迟（ms）
  autoDestroy: true, // 是否在组件卸载时自动销毁（仅 Vue 组件内使用时有效）
} as const;
export interface ResponsiveRemOptions {
  designWidth?: number;
  baseFontSizeAtDesign?: number;
  respectDPR?: boolean;
  debounceDelay?: number;
  autoDestroy?: boolean;
}

export interface ResponsiveRemResult {
  remScale: Readonly<Ref<number>>;
  currentFontSize: Readonly<Ref<number>>;
  update: () => void;
  destroy: () => void;
}

/**
 * 支持高分辨率设备（DPR）
 * 初始化响应式 REM 适配
 * 当前视口相对于设计稿的缩放比例
 * 可用于动态计算尺寸等用途
 * @param options - 配置项
 * @param _window - 用于测试或非标准环境（默认 window）
 * @param _document - 用于测试或非标准环境（默认 document）
 *
 * @returns 包含状态和控制方法的对象
 *
 * @example
 * ```ts
 * import { useViewportScale  } from '@gengjjjjj/composables';
 * const { remScale } = useViewportScale ({ designWidth: 1920 });
 * watch(remScale, (scale) => console.log('当前缩放比例:', scale));
 *
 */
export function useViewportScale(
  options: ResponsiveRemOptions = {},
  _window: Window = typeof window !== "undefined" ? window : (null as any),
  _document: Document = typeof document !== "undefined"
    ? document
    : (null as any)
): ResponsiveRemResult {
  // SSR 安全检查
  if (!_window || !_document) {
    return {
      remScale: shallowReadonly(ref(1)),
      currentFontSize: shallowReadonly(ref(16)),
      update: () => {},
      destroy: () => {},
    };
  }

  const {
    designWidth = DEFAULT_OPTIONS.designWidth,
    baseFontSizeAtDesign = DEFAULT_OPTIONS.baseFontSizeAtDesign,
    respectDPR = DEFAULT_OPTIONS.respectDPR,
    debounceDelay = DEFAULT_OPTIONS.debounceDelay,
    autoDestroy = DEFAULT_OPTIONS.autoDestroy,
  } = options;
  const remScale = ref(1);
  const currentFontSize = ref(baseFontSizeAtDesign);
  const docEl = document.documentElement;
  if (!docEl) {
    console.warn("[useViewportScale ] document.documentElement not found");
    return {
      remScale: shallowReadonly(remScale),
      currentFontSize: shallowReadonly(currentFontSize),
      update: () => {},
      destroy: () => {},
    };
  }
  // 设置根元素字体大小
  function setRem() {
    try {
      const viewportWidth = docEl.clientWidth;
      if (!viewportWidth) return;
      const scale = viewportWidth / designWidth;
      const dpr = respectDPR ? _window.devicePixelRatio || 1 : 1;
      // 基准字体大小（考虑 DPR）
      let fontSize = baseFontSizeAtDesign * scale * dpr;
      fontSize = Math.max(fontSize, 12); // 最小不小于 12px
      if (isNaN(fontSize) || fontSize <= 0) return;
      docEl.style.fontSize = `${fontSize}px`;
      remScale.value = scale;
      currentFontSize.value = fontSize;
    } catch (error) {
      console.error("设置 REM 字体大小失败", error);
    }
  }
  // 使用 rAF + 防抖双重优化（防抖兜底，rAF 保证帧同步）
  const debouncedSetRem = debounce(() => {
    requestAnimationFrame(setRem);
  }, debounceDelay);
  /**
   * 页面可见性/缓存恢复处理
   */
  function handlePageShow(e: PageTransitionEvent) {
    if (e.persisted) debouncedSetRem();
  }
  function handleVisibilityChange() {
    if (_document.visibilityState === "visible") {
      debouncedSetRem();
    }
  }
  /**
   * 绑定事件监听器
   */
  function bindEvents() {
    _window.addEventListener("resize", debouncedSetRem, { passive: true });
    _window.addEventListener("pageshow", handlePageShow, { passive: true });
    _document.addEventListener("visibilitychange", handleVisibilityChange);
  }
  /**
   * 解绑事件监听器
   */
  function unbindEvents() {
    _window.removeEventListener("resize", debouncedSetRem);
    _window.removeEventListener("pageshow", handlePageShow);
    _document.removeEventListener("visibilitychange", handleVisibilityChange);
  }
  // 初始化
  bindEvents();
  debouncedSetRem();
  // 自动销毁（仅在 Vue 组件上下文中）
  if (autoDestroy && typeof onUnmounted === "function") {
    onUnmounted(() => {
      unbindEvents();
    });
  }

  return {
    remScale: shallowReadonly(remScale),
    currentFontSize: shallowReadonly(currentFontSize),
    update: debouncedSetRem, // 暴露手动触发接口
    destroy: unbindEvents, // 手动销毁（适用于非组件场景）
  };
}
