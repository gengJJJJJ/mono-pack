// 使用localForage 替代 localStorage
import localforage from "localforage";

// 初始化 localForage 配置
localforage.config({
  driver: localforage.INDEXEDDB,
  name: "mono-pack-db", // 数据库名称
  version: 1.0,
  storeName: "mono-pack-store", // 存储空间名称
  description: "mono-pack storage",
});

type StorageValue = any;

const webStorage = {
  /**
   * 设置数据
   * @param key 键名
   * @param value 值
   */
  set<T>(key: string, value: T): Promise<void> {
    return localforage.setItem<StorageValue>(key, value);
  },

  /**
   * 获取数据
   * @param key 键名
   */
  get<T>(key: string): Promise<T | null> {
    return localforage.getItem<T>(key);
  },

  /**
   * 删除数据
   * @param key 键名
   */
  remove(key: string): Promise<void> {
    return localforage.removeItem(key);
  },

  /**
   * 清空所有数据
   */
  clear(): Promise<void> {
    return localforage.clear();
  },

  /**
   * 获取当前存储条目数量
   */
  length(): Promise<number> {
    return localforage.length();
  },

  /**
   * 获取所有键名
   */
  keys(): Promise<string[]> {
    return localforage.keys();
  },

  /**
   * 遍历所有键值对
   * @param callback 回调函数
   */
  iterate<T>(
    callback: (value: T, key: string, iterationNumber: number) => void
  ): Promise<void> {
    return localforage.iterate<T, void>(callback);
  },
};
export const storage = webStorage;

/**
 * @example 
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
 */
