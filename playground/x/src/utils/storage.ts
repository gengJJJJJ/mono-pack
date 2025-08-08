/**
 * 判断是否uni-app项目
 * @example
 * ```ts
 * isUniApp() // false
 * ```
 */
export function isUniApp() {
    return typeof uni !== 'undefined'
}

/** 浏览器缓存封装 */
const webStorage = {
    /** 设置数据 */
    set(key: string, value: string) {
        localStorage.setItem(key, value)
    },
    /** 获取数据 */
    get(key: string) {
        return localStorage.getItem(key)
    },
    /** 删除数据 */
    remove(key: string) {
        localStorage.removeItem(key)
    },
    /** 清空数据 */
    clear() {
        localStorage.clear()
    },
}

/** uni缓存封装 */
const uniStorage = {
    /** 设置数据 */
    set(key: string, value: any) {
        uni.setStorageSync(key, value)
    },
    /** 获取数据 */
    get(key: string) {
        return uni.getStorageSync(key)
    },
    /** 删除数据 */
    remove(key: string) {
        uni.removeStorageSync(key)
    },
    /** 清空数据 */
    clear() {
        uni.clearStorageSync()
    },
}

/**
 * 兼容网页端和移动端的本地缓存封装
 * @example
 * ```ts
 * storage.set('key', 'value')
 * storage.get('key')
 * storage.remove('key')
 * storage.clear()
 * ```
 */
export const storage = isUniApp() ? uniStorage : webStorage
