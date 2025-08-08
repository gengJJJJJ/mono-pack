import type { StoreGeneric } from 'pinia'

import { storeToRefs } from 'pinia'

/**
 * 用于在定义store时导出一个用storeToRefs包装过的store
 * @example
 * ```ts
 * export const useAppStore = defineStore('app', () => {
 *   const appName = ref('Pinia')
 *
 *   function setAppName(name: string) {
 *     appName.value = name
 *   }
 *
 *   return {
 *     appName,
 *     setAppName
 *   }
 * })
 *
 * export function useAppStoreRefs() {
 *   return useStoreRefs(useAppStore())
 * }
 * ```
 */
export function useStoreRefs<SS extends StoreGeneric>(store: SS) {
  return {
    ...(store as Omit<SS, keyof SS['$state']>),
    ...storeToRefs(store),
  }
}
