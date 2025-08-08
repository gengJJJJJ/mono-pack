import { Ref } from 'vue';

declare function requireAll(modules: any[]): any[];

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
declare function useResponsiveRem(width?: number): {
    remScale: Readonly<Ref<number>>;
    destroyResponsiveRem: () => void;
};

export { requireAll, useResponsiveRem };
