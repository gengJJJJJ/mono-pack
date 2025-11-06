/**
 * 防抖函数
 * @param fn - 要防抖的函数
 * @param delay - 延迟时间（毫秒）
 * @param immediate - 是否立即执行（默认 false）
 * @returns 包装后的函数，带有 .cancel() 方法
 * @example
 * const search = debounce((query: string) => {
 *   console.log('搜索:', query);
 * }, 300);
 * search('a');
 * search('ab');
 * search('abc'); // 只会执行最后一次
 * // 取消防抖
 * search.cancel();
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  immediate = false
) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<T>): ReturnType<T> | undefined => {
    if (timer) {
      clearTimeout(timer);
    }

    if (immediate && !timer) {
      // 立即执行
      const result = fn(...args);
      timer = setTimeout(() => {
        timer = null;
      }, delay);
      return result;
    } else {
      // 延迟执行
      timer = setTimeout(() => {
        timer = null;
        fn(...args);
      }, delay);
    }
  };
  // 添加取消方法
  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };
  return debounced;
}

interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}
/**
 * 节流函数
 * @param fn - 要节流的函数
 * @param delay - 时间窗口（毫秒）
 * @param options - 配置项
 *   - leading: 是否在开始时立即执行（默认 true）
 *   - trailing: 是否在结束后再执行一次（默认 true）
 * @returns 包装后的函数，带有 .cancel() 方法
 * @example
 * const handleScroll = throttle(() => {
 *   console.log('滚动中...');
 * }, 100, { leading: true, trailing: false });
 *
 * window.addEventListener('scroll', handleScroll);
 * // 取消节流
 * handleScroll.cancel();
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  { leading = true, trailing = true }: ThrottleOptions = {}
) {
  let lastExecTime = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  const invoke = () => {
    lastExecTime = Date.now();
    if (lastArgs) {
      fn(...lastArgs);
      lastArgs = null;
    }
  };
  const throttled = (...args: Parameters<T>): void => {
    const now = Date.now();
    const elapsed = now - lastExecTime;
    lastArgs = args;
    if (leading && elapsed > delay) {
      // 立即执行
      clearTimeout(timer!);
      timer = null;
      invoke();
    } else if (trailing) {
      // 延迟到窗口结束执行
      clearTimeout(timer!);
      timer = setTimeout(() => {
        timer = null;
        if (!leading || elapsed <= delay) {
          invoke();
        }
      }, delay - elapsed);
    }
  };
  throttled.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    lastArgs = null;
  };
  return throttled;
}
/**
 * 休眠
 * @param {number} ms 毫秒
 * @example
 * ```ts
 * await sleep(1000)
 * ```
 */
export function sleep(ms?: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
