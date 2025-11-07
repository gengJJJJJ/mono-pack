# randomString

生成指定长度的随机字符串，支持自定义字符集。

## 示例

```ts
// 生成默认长度 16 的随机字符串
randomString(); // "aB3xK9mQpL2sR8tY"

// 生成指定长度的随机字符串
randomString(8); // "xK9mQpL2"

// 使用自定义字符集
randomString(8, 'abcdef'); // "cdefabac"

// 生成纯数字随机字符串
randomString(6, '0123456789'); // "123456"

// 生成纯字母随机字符串
randomString(10, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'); // "QWERTYUIOP"

// 生成十六进制字符串
randomString(12, '0123456789ABCDEF'); // "A1B2C3D4E5F6"
```

## 参数

| 名称 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| length | 生成字符串的长度 | `number` | - | `16` |
| alphabet | 用于生成随机字符串的字符集 | `string` | - | `"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"` |

## 返回值

`string`: 生成的随机字符串

## 异常

- 当 `length <= 0` 时抛出错误："Length must be greater than 0"
- 当 `alphabet` 为空字符串时抛出错误："Alphabet cannot be empty"

## 特性

- **安全随机性**: 在浏览器环境中使用 `crypto.getRandomValues` 生成加密安全的随机数
- **降级支持**: 在 Node.js 或不支持 crypto 的环境中降级到 `Math.random`
- **性能优化**: 使用字符数组拼接，避免字符串频繁拼接的性能问题
- **类型安全**: 提供完整的 TypeScript 类型定义

> ⚠️ 注意：生成的字符串不是标准 UUID，仅作为随机标识符使用。