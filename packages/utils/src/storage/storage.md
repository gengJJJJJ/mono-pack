### 使用localForage 替代 localStorage
提供改进的离线存储解决方案‌，通过封装IndexedDB、WebSQL和localStorage等底层存储技术，实现跨浏览器兼容并支持异步操作和复杂数据类型存储。‌‌

### 核心特性与优势‌

1. ‌异步操作与多后端支持‌。
- 采用异步API（支持Promise和回调），避免阻塞主线程。‌‌
- 自动选择最佳存储引擎（优先级：IndexedDB > WebSQL > localStorage）。‌‌

2. ‌数据类型兼容性‌。
- 支持存储对象、数组、二进制数据等复杂类型，突破localStorage仅支持字符串的限制。‌‌
- 默认数据序列化为JSON，简化开发流程。‌‌

3. ‌容量与性能优化‌。
- 存储容量动态调整（通常高于localStorage的5MB上限）。‌‌
- 支持数据拆分和智能存储管理，提升大文件处理能力。‌‌

### 与localStorage对比‌。

| 特性         | localForage      | localStorage |
| ------------ | ---------------- | ------------ |
| 操作模式     | 异步             | 同步         |
| 数据类型支持 | 复杂类型         | 仅字符串     |
| 存储容量     | 动态扩展（更高） | 固定5MB      |
| 兼容性策略   | 多引擎自动降级   | 无降级机制   |

###  使用示例
```ts
import { storage } from '@mono-pack/utils';

// 存储数据
const saveData = async () => {
  await storage.set('username', 'john_doe');
  console.log('用户名已保存');
};

// 获取数据
const getData = async () => {
  const username = await storage.get<string>('username');
  console.log('读取用户名:', username ?? '未找到');
};

// 删除数据
const removeData = async () => {
  await storage.remove('username');
  console.log('用户名已删除');
};

// 清空所有数据
const clearAll = async () => {
  await storage.clear();
  console.log('所有数据已清空');
};

// 获取当前存储条目数量
const checkLength = async () => {
  const length = await storage.length();
  console.log(`当前存储条目数量: ${length}`);
};

// 获取所有 key
const getAllKeys = async () => {
  const keys = await storage.keys();
  console.log('所有键名:', keys);
};

// 遍历所有键值对
const iterateAll = async () => {
  await storage.iterate((value, key, iterationNumber) => {
    console.log(`第 ${iterationNumber} 项:`, { key, value });
  });
};
```
