# debounce / throttle / sleep

函数防抖、节流和休眠工具函数。

## 示例

### debounce（防抖）

```ts
// 基础用法 - 延迟执行
const search = debounce((query: string) => {
  console.log('搜索:', query);
}, 300);

search('a');
search('ab');
search('abc'); // 只会执行最后一次 "abc"

// 立即执行模式
const immediateClick = debounce(() => {
  console.log('立即执行，后续防抖');
}, 500, true);

// 取消防抖
const debouncedFunc = debounce(() => console.log('防抖函数'), 1000);
debouncedFunc.cancel();
```

### throttle（节流）

```ts
// 基础用法 - 固定间隔执行
const handleScroll = throttle(() => {
  console.log('滚动中...');
}, 100);

window.addEventListener('scroll', handleScroll);

// 自定义配置
const throttledWithConfig = throttle(
  (data: string) => console.log('节流执行:', data),
  1000,
  { leading: true, trailing: false } // 只在开始时执行，不尾部执行
);

// 取消节流
handleScroll.cancel();
```

### sleep（休眠）

```ts
// 等待 1 秒
await sleep(1000);

// 在循环中使用
for (let i = 0; i < 5; i++) {
  console.log('执行第', i + 1, '次');
  await sleep(1000); // 每次间隔 1 秒
}

// 模拟异步操作
const asyncOperation = async () => {
  console.log('开始操作');
  await sleep(2000); // 模拟 2 秒耗时
  console.log('操作完成');
};
```

## debounce

防抖函数：在指定延迟时间内，如果函数被再次调用，则重新计时，只有最后一次调用会执行。

### 参数

| 名称 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| fn | 要防抖的函数 | `T extends (...args: any[]) => any` | - | - |
| delay | 延迟时间（毫秒） | `number` | - | - |
| immediate | 是否立即执行（默认 false） | `boolean` | - | `false` |

### 返回值

`(...args: Parameters<T>) => ReturnType<T> | undefined & { cancel: () => void }`

- 返回包装后的函数，具有 `.cancel()` 方法
- 如果函数被取消执行，返回值为 `undefined`

### 方法

| 方法 | 说明 |
|------|------|
| `cancel()` | 取消防抖，清除定时器 |

## throttle

节流函数：在指定时间窗口内，最多执行一次函数。

### 参数

| 名称 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| fn | 要节流的函数 | `T extends (...args: any[]) => any` | - | - |
| delay | 时间窗口（毫秒） | `number` | - | - |
| options | 配置项 | `ThrottleOptions` | - | `{ leading: true, trailing: true }` |

### ThrottleOptions

| 名称 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| leading | 是否在开始时立即执行 | `boolean` | - | `true` |
| trailing | 是否在结束后再执行一次 | `boolean` | - | `true` |

### 返回值

`(...args: Parameters<T>) => void & { cancel: () => void }`

- 返回包装后的函数，具有 `.cancel()` 方法

### 方法

| 方法 | 说明 |
|------|------|
| `cancel()` | 取消节流，清除定时器 |

## sleep

休眠函数：返回一个 Promise，在指定时间后 resolve。

### 参数

| 名称 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| ms | 休眠时间（毫秒） | `number` | - | `undefined` |

### 返回值

`Promise<void>`: 在指定时间后 resolve 的 Promise

## 使用场景

| 函数 | 适用场景 | 说明 |
|------|----------|------|
| debounce | 搜索输入、窗口调整、按钮点击 | 避免频繁触发，只响应最后一次操作 |
| throttle | 滚动事件、鼠标移动、上传进度 | 固定频率执行，控制执行频率 |
| sleep | 异步流程控制、模拟延迟、重试机制 | 暂停执行，实现延迟效果 |

> ⚠️ 注意：使用防抖和节流函数时，记得在组件销毁时调用 `.cancel()` 方法，避免内存泄漏。