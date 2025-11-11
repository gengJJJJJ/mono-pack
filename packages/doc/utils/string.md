# randomString

生成指定长度的随机字符串（非标准 UUID），支持自定义字符集。

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
| `length` | 生成字符串的长度 | `number` | - | `16` |
| `alphabet` | 用于生成随机字符串的字符集 | `string` | - | `"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"` |

## 返回值

`string`: 生成的随机字符串

## 异常

- 当 `length <= 0` 时抛出错误：`"Length must be greater than 0"`
- 当 `alphabet` 为空字符串时抛出错误：`"Alphabet cannot be empty"`

## 特性

- **安全随机性**: 在浏览器环境中使用 `crypto.getRandomValues` 生成加密安全的随机数
- **降级支持**: 在 Node.js 或不支持 crypto 的环境中降级到 `Math.random`
- **性能优化**: 使用字符数组拼接，避免字符串频繁拼接的性能问题
- **类型安全**: 提供完整的 TypeScript 类型定义

> ⚠️ 注意：生成的字符串不是标准 UUID，仅作为随机标识符使用。

---

# capitalizeFirstLetter

将字符串的首字母大写，其余部分保持不变。

## 示例

```ts
capitalizeFirstLetter('hello world'); // 'Hello world'
capitalizeFirstLetter('foo');         // 'Foo'
capitalizeFirstLetter('');            // ''
capitalizeFirstLetter('123abc');      // '123abc'
```

## 参数

| 名称 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| `string` | 要处理的输入字符串 | `string` | - | - |

## 返回值

`string`: 首字母大写的字符串。如果输入为空字符串，则返回空字符串。

## 特性

- **安全处理空字符串**
- **保留原始字符串其余部分不变**

---

# toLowerCaseFirstLetter

将字符串的首字母转换为小写，其余部分保持不变。

## 示例

```ts
toLowerCaseFirstLetter('Hello World'); // 'hello World'
toLowerCaseFirstLetter('FOO');         // 'fOO'
toLowerCaseFirstLetter('');            // ''
toLowerCaseFirstLetter('123ABC');      // '123ABC'
```

## 参数

| 名称 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|--------|--------|
| `str` | 要处理的输入字符串 | `string` | - | - |

## 返回值

`string`: 首字母小写的字符串。如果输入为空或首字符非字母，则原样返回。

## 特性

- **空值安全**: 输入为空字符串时直接返回
- **非破坏性**: 仅修改首字母大小写，其余内容不变
