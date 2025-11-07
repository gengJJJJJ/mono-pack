# storage / forage

浏览器存储封装工具，提供基于 `localStorage` 的同步存储和基于 `localForage` 的异步存储两种方案。

## 示例

### 同步存储（storage）- 基于 localStorage

```ts
// 存储数据
storage.set('username', 'john_doe');
storage.set('userInfo', { id: 1, name: 'John' });

// 获取数据
const username = storage.get<string>('username'); // 'john_doe'
const userInfo = storage.get<{ id: number; name: string }>('userInfo'); // { id: 1, name: 'John' }

// 删除数据
storage.remove('username');
storage.remove(['token', 'user']); // 批量删除

// 清空所有数据
storage.clear();
```

### 异步存储（forage）- 基于 IndexedDB

```ts
// 存储数据
await forage.set('username', 'john_doe');
await forage.set('userInfo', { id: 1, name: 'John' });

// 获取数据
const username = await forage.get<string>('username'); // 'john_doe'
const userInfo = await forage.get<{ id: number; name: string }>('userInfo'); // { id: 1, name: 'John' }

// 删除数据
await forage.remove('username');

// 清空所有数据
await forage.clear();

// 获取存储条目数量
const count = await forage.length(); // number

// 获取所有键名
const keys = await forage.keys(); // string[]

// 遍历所有键值对
await forage.iterate((value, key, index) => {
  console.log(`第 ${index} 项:`, { key, value });
});
```

## forage API

基于 `localForage` 的异步存储方案，使用 IndexedDB 作为主要存储驱动，提供更好的性能和更大的存储容量。

### 配置

- **数据库名称**: `mono-pack-db`
- **存储空间**: `mono-pack-store`
- **版本**: `1.0`
- **驱动**: `IndexedDB`（降级到 `localStorage`）

### 方法

| 方法 | 说明 | 参数 | 返回值 |
|------|------|------|--------|
| `set(key, value)` | 设置数据 | `key: string`<br>`value: T` | `Promise<void>` |
| `get(key)` | 获取数据 | `key: string` | `Promise<T \| null>` |
| `remove(key)` | 删除数据 | `key: string` | `Promise<void>` |
| `clear()` | 清空所有数据 | - | `Promise<void>` |
| `length()` | 获取存储条目数量 | - | `Promise<number>` |
| `keys()` | 获取所有键名 | - | `Promise<string[]>` |
| `iterate(callback)` | 遍历所有键值对 | `callback: (value: T, key: string, iterationNumber: number) => void` | `Promise<void>` |

## storage API

基于 `localStorage` 的同步存储方案，简单易用，适合小量数据存储。

### 方法

| 方法 | 说明 | 参数 | 返回值 |
|------|------|------|--------|
| `set(key, value)` | 设置数据 | `key: string`<br>`value: any` | `void` |
| `get(key)` | 获取数据 | `key: string` | `T \| null` |
| `remove(key)` | 删除数据 | `key: string \| string[]` | `void` |
| `clear()` | 清空所有数据 | - | `void` |

### 特性

- 自动序列化/反序列化数据（使用 `JSON.stringify`/`JSON.parse`）
- 支持批量删除（传入数组）
- 自动处理 `undefined` 值（返回 `null`）

## 选择建议

| 场景 | 推荐方案 | 原因 |
|------|----------|------|
| 小量数据（<5MB），同步操作 | `storage` | 简单直接，无需 await |
| 大量数据，异步操作 | `forage` | 支持 IndexedDB，容量更大，性能更好 |
| 离线应用 | `forage` | 更好的持久化和同步支持 |
| 简单缓存 | `storage` | 轻量级，满足基本需求 |

> ⚠️ 注意：`localStorage` 有大小限制（通常为 5-10MB），且在主线程中操作可能阻塞 UI。`forage` 采用异步操作，不会阻塞主线程，适合大量数据存储。