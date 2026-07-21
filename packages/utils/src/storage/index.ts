// 使用localForage 替代 localStorage
import localforage from "localforage";

type StorageValue = any;

const DEFAULT_FORAGE_CONFIG: LocalForageOptions = {
  driver: localforage.INDEXEDDB,
  name: "mono-pack-db",
  version: 1.0,
  storeName: "mono-pack-store",
  description: "mono-pack storage",
};

let forageConfigured = false;

/**
 * 配置 IndexedDB（localforage）。未调用时会在首次读写时使用默认配置。
 * 建议在应用入口按项目自定义 name / storeName，避免多项目库名冲突。
 */
export function configureForage(options: LocalForageOptions = {}): void {
  localforage.config({
    ...DEFAULT_FORAGE_CONFIG,
    ...options,
  });
  forageConfigured = true;
}

function ensureForage() {
  if (!forageConfigured) {
    configureForage();
  }
}

/**
 * @example
 * ```ts
 * await forage.set('username', 'john_doe');
 * const username = await forage.get<string>('username');
 * await forage.remove('username');
 * await forage.clear();
 * ```
 */
export const forage = {
  set<T>(key: string, value: T): Promise<T> {
    ensureForage();
    return localforage.setItem<StorageValue>(key, value) as Promise<T>;
  },

  get<T>(key: string): Promise<T | null> {
    ensureForage();
    return localforage.getItem<T>(key);
  },

  remove(key: string): Promise<void> {
    ensureForage();
    return localforage.removeItem(key);
  },

  clear(): Promise<void> {
    ensureForage();
    return localforage.clear();
  },

  length(): Promise<number> {
    ensureForage();
    return localforage.length();
  },

  keys(): Promise<string[]> {
    ensureForage();
    return localforage.keys();
  },

  iterate<T>(
    callback: (value: T, key: string, iterationNumber: number) => void
  ): Promise<void> {
    ensureForage();
    return localforage.iterate<T, void>(callback);
  },
};

/** 浏览器 localStorage 封装（JSON 序列化） */
export const storage = {
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get<T = any>(key: string): T | null {
    const value = localStorage.getItem(key);
    if (value == null || value === "undefined") return null;
    try {
      return JSON.parse(value) as T;
    } catch {
      // 非 JSON 字符串时原样返回
      return value as T;
    }
  },
  remove(key: string | string[]): void {
    if (Array.isArray(key)) {
      key.forEach((item) => {
        localStorage.removeItem(item);
      });
    } else {
      localStorage.removeItem(key);
    }
  },
  clear() {
    localStorage.clear();
  },
};
