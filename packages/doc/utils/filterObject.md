# filterObject / filterObjectDeep

过滤对象中的指定字段和值，支持浅层过滤（`filterObject`）和深层递归过滤（`filterObjectDeep`）。

## 示例

### 浅层过滤（`filterObject`）

```ts
const obj = { a: 1, b: null, c: 3, d: undefined, e: 5, f: { e: 6 } }
const filtered = filterObject(obj, [null, undefined], ['e']) // 结果: { a: 1, c: 3, f: { e: 6 } }

// 默认过滤 null 和 undefined
filterObject({ a: 1, b: "b", c: undefined, d: null }) // { a: 1, b: "b" }

// 不过滤值，只过滤字段
filterObject({ a: 1, b: "b", c: undefined, d: null }, []) // { a: 1, b: "b", c: undefined, d: null }

// 过滤指定字段，保留值
filterObject({ a: 1, b: "b", c: undefined, d: null }, undefined, ['a', 'b']) // { c: undefined, d: null }

// 使用包含匹配模式
filterObject({ userId: 1, userName: "test", email: "a@b.com" }, [], ['id', 'name'], { fieldMatchMode: 'contains' }) // { email: "a@b.com" }
```

### 深层递归过滤（`filterObjectDeep`）

```ts
const obj = { a: 1, b: null, c: 3, d: undefined, e: 5, f: { e: 6, g: 7, h: null } }
const filtered = filterObjectDeep(obj, [null, undefined], ['e']) // 结果: { a: 1, c: 3, f: { g: 7 } }

// 递归处理数组
const arrObj = { list: [{ a: 1, b: null }, { c: 2, d: undefined }] }
const filteredArr = filterObjectDeep(arrObj) // { list: [{ a: 1 }, { c: 2 }] }

// 深层对象过滤
const nestedObj = { 
  user: { id: 1, name: "test", token: "abc" }, 
  config: { theme: "dark", debug: null } 
}
const filteredNested = filterObjectDeep(nestedObj, [null], ['token']) // { user: { id: 1, name: "test" }, config: { theme: "dark" } }
```

## 参数

| 名称 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| obj | 要过滤的源对象 | `Record<string, any>` | - | - |
| values | 要过滤的值数组，使用全等匹配 | `any[]` | - | `[undefined, null]` |
| fields | 要过滤的字段名数组 | `string[]` | - | `[]` |
| options | 过滤选项 | `FilterOptions` | - | `{}` |

### FilterOptions

| 名称 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| fieldMatchMode | 字段匹配模式 | `"exact" \| "contains"` | `"exact"`: 精确匹配字段名<br>`"contains"`: 字段名包含任一关键词即过滤 | `"exact"` |

## 返回值

`Partial<T>`: 返回过滤后的新对象，不修改原对象。对于 `filterObjectDeep`，会递归处理所有嵌套的普通对象和数组。