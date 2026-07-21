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
    // lodash 风格：immediate 时仅 leading 执行，冷却期内不再 trailing
    const callNow = immediate && !timer;

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      timer = null;
      if (!immediate) {
        fn(...args);
      }
    }, delay);

    if (callNow) {
      return fn(...args);
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

  const clearTimer = () => {
    if (timer != null) {
      clearTimeout(timer);
      timer = null;
    }
  };

  const throttled = (...args: Parameters<T>): void => {
    const now = Date.now();
    const elapsed = now - lastExecTime;
    lastArgs = args;
    if (leading && elapsed > delay) {
      clearTimer();
      invoke();
    } else if (trailing) {
      clearTimer();
      timer = setTimeout(() => {
        timer = null;
        if (!leading || Date.now() - lastExecTime >= delay) {
          invoke();
        }
      }, Math.max(delay - elapsed, 0));
    }
  };
  throttled.cancel = () => {
    clearTimer();
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
export function sleep(ms: number = 0) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
