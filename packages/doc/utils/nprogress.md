# startProgress / stopProgress

按需动态加载并控制 [NProgress](https://ricostacruz.com/nprogress/) 顶部加载进度条的显示与隐藏，适用于路由切换、API 请求等场景。

## 示例

```ts
import { startProgress, stopProgress } from '@gengjjjjj/utils';

// 开始显示进度条（自动懒加载 nprogress 库）
await startProgress();

// ... 执行异步操作（如导航、请求）

// 停止并隐藏进度条
await stopProgress();
```

### 在 Vue Router 中使用

```ts
// router/index.ts
import { createRouter } from 'vue-router';
import { startProgress, stopProgress } from '@gengjjjjj/utils';

const router = createRouter({ /* ... */ });

router.beforeEach(async () => {
  await startProgress();
});

router.afterEach(async () => {
  await stopProgress();
});
```

### 在 Axios 拦截器中使用

```ts
// api/interceptor.ts
import axios from 'axios';
import { startProgress, stopProgress } from '@gengjjjjj/utils';

axios.interceptors.request.use(async (config) => {
  await startProgress();
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    await stopProgress();
    return response;
  },
  async (error) => {
    await stopProgress();
    return Promise.reject(error);
  }
);
```

## API

### `startProgress(): Promise<void>`

- **功能**：开始显示顶部进度条。
- **行为**：
  - 首次调用时动态导入 `nprogress` 并初始化配置
  - 后续调用直接复用已加载实例
  - 自动应用默认配置（见下文）
- **返回值**：`Promise<void>`

---

### `stopProgress(): Promise<void>`

- **功能**：停止动画并完全隐藏进度条。
- **行为**：
  - 确保 `nprogress` 已加载后调用 `.done()`
  - 安全调用（使用可选链防止异常）
- **返回值**：`Promise<void>`

## 默认配置

模块内部自动应用以下 NProgress 配置：

```ts
{
  showSpinner: true, // 显示右侧旋转图标
  speed: 300         // 进度条动画持续时间（毫秒）
}
```

> 如需自定义样式或行为，请通过覆盖 CSS 或修改源码实现。

## 特性

-  **按需加载**：仅在首次调用时加载 `nprogress`，减少主包体积
-  **单例缓存**：避免重复加载和重复配置
-  **开箱即用**：无需手动初始化，直接调用即可
-  **安全调用**：使用可选链 (`?.`) 防止运行时错误
-  **兼容性强**：支持 Vite、Webpack 等现代构建工具

## 注意事项

- **样式注入**：`nprogress` 会自动向 `<head>` 注入 CSS 样式，请勿 tree-shaking 掉其副作用
- **SSR 兼容**：在服务端渲染环境中，请确保仅在客户端（`if (typeof window !== 'undefined')`）调用
- **多次调用安全**：`start()` 和 `done()` 内部有状态管理，重复调用不会导致异常

>  提示：结合路由守卫或 HTTP 拦截器，可实现全自动的全局加载提示。