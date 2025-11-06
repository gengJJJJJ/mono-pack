import { Ref } from 'vue';

interface ResponsiveRemOptions {
    designWidth?: number;
    baseFontSizeAtDesign?: number;
    respectDPR?: boolean;
    debounceDelay?: number;
    autoDestroy?: boolean;
}
interface ResponsiveRemResult {
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
declare function useViewportScale(options?: ResponsiveRemOptions, _window?: Window, _document?: Document): ResponsiveRemResult;

export { type ResponsiveRemOptions, type ResponsiveRemResult, useViewportScale };
