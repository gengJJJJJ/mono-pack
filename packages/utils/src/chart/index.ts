/**
 * 根据视口宽度适配图表尺寸
 * @param size - 原始尺寸
 * @param defaultWidth - 默认设计宽度1920（用于计算缩放比例）
 * @returns 适配后的尺寸（保留三位小数）
 */
export const fitChartSize = (
  size: number,
  defaultWidth: number = 1920
): number => {
  const viewportWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  if (!viewportWidth) return size;

  const scale = viewportWidth / defaultWidth;
  const scaledSize = size * scale;

  // 四舍五入保留三位小数，避免浮点运算误差
  return Math.round(scaledSize * 1000) / 1000;
};
