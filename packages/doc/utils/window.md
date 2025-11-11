# openWindow

在新窗口或指定目标中安全地打开 URL，支持配置 `noopener` 和 `noreferrer` 等安全特性。

## 示例

```ts
// 使用默认选项打开链接（_blank + noopener + noreferrer）
openWindow('https://example.com');

// 自定义选项
openWindow('https://example.com', {
  noopener: true,
  noreferrer: true,
  target: '_blank'
});

// 在当前窗口打开
openWindow('/dashboard', { target: '_self' });

// 在父级框架中打开
openWindow('/external', { target: '_parent' });
```

## 参数

| 名称 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| `url` | 要打开的 URL 地址 | `string` | - | - |
| `options` | 窗口打开选项 | `OpenWindowOptions` | - | `{}` |

### `OpenWindowOptions` 接口

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `noopener` | 是否启用 `noopener` 安全策略（防止新页面访问 `window.opener`） | `boolean` | `true` |
| `noreferrer` | 是否启用 `noreferrer` 策略（不发送 referrer 信息） | `boolean` | `true` |
| `target` | 目标窗口名称 | `"_blank" \| "_parent" \| "_self" \| "_top" \| string` | `"_blank"` |

## 返回值

`void`

## 安全特性

-  **默认启用 `noopener`**：防止新页面通过 `window.opener` 访问原页面，避免反向钓鱼攻击
-  **默认启用 `noreferrer`**：提升隐私保护，不泄露来源信息

> 强烈建议保留 `noopener` 和 `noreferrer` 为 `true`，除非有特殊需求。

---

# openRouteInNewWindow

在新窗口中打开当前应用的内部路由路径，自动处理哈希路由（如 Vue Router 的 hash 模式）和基础 URL。

## 示例

```ts
// 打开 /home 路由
openRouteInNewWindow('/home');

// 打开相对路径（自动补全斜杠）
openRouteInNewWindow('about'); // 等效于 '/about'

// 在 hash 模式下正确生成 URL
// 当前地址: https://app.com/#/dashboard
// 调用: openRouteInNewWindow('/settings')
// 结果: https://app.com/#/settings
```

## 参数

| 名称 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| `path` | 应用内部的路由路径 | `string` | - | - |

## 返回值

`void`

## 特性

-  **自动拼接完整 URL**：基于 `location.origin` 构建绝对地址
-  **兼容哈希路由**：智能判断是否需要插入 `/#`
-  **路径标准化**：自动为非 `/` 开头的路径添加前导斜杠
-  **零依赖**：仅使用浏览器原生 API

## 使用场景

- 在管理后台中“在新标签页中打开详情页”
- 多页面协作时跳转内部模块
- 需要保留用户登录状态的新窗口跳转

> 此函数专为 SPA（单页应用）设计，确保新窗口能正确加载同一应用的路由。