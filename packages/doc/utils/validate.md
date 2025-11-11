
# 数据验证工具函数库

提供一系列用于验证各种数据类型的工具函数。

## 数据类型验证函数

| 函数名 | 说明 |
|--------|------|
| `isNumber(value: any)` | 验证值是否为数值类型 |
| `isString(value: any)` | 验证值是否为字符串类型 |
| `isBoolean(value: any)` | 验证值是否为布尔类型 |
| `isArray(value: any)` | 验证值是否为数组类型 |
| `isObject(value: any)` | 验证值是否为对象类型（非 null，非数组） |
| `isFunction(value: any)` | 验证值是否为函数类型 |
| `isEmpty(value: any)` | 验证值是否为空（null、undefined、空字符串、空数组、空对象） |

## 字符串格式验证函数

| 函数名 | 说明 |
|--------|------|
| `isEmail(email: string)` | 验证字符串是否为有效的邮箱格式 |
| `isPhoneNumber(phone: string)` | 验证字符串是否为有效的手机号码格式 |
| `isStrongPassword(password: string)` | 验证密码是否为强密码 |
| `isURL(url: string)` | 验证字符串是否为有效的 URL |
| `isDateString(dateString: string)` | 验证字符串是否为有效的日期格式 |
| `isHexColor(color: string)` | 验证字符串是否为有效的十六进制颜色值 |
| `isUUID(uuid: string)` | 验证字符串是否为有效的 UUID 格式 |
| `isIP(ip: string)` | 验证字符串是否为有效的 IP 地址格式 |
| `isNumeric(value: string)` | 验证字符串是否为数值格式 |
| `isAlphabetic(value: string)` | 验证字符串是否只包含字母 |
| `isAlphanumeric(value: string)` | 验证字符串是否只包含字母和数字 |
| `isJSON(jsonString: string)` | 验证字符串是否为有效的 JSON 格式 |
| `isBase64String(base64String: string)` | 验证字符串是否为有效的 Base64 编码格式 |
| `isCreditCardNumber(cardNumber: string)` | 验证字符串是否为有效的信用卡号码格式 |
| `isPostalCode(postalCode: string)` | 验证字符串是否为有效的邮政编码格式 |

## 数字类型验证函数

| 函数名 | 说明 |
|--------|------|
| `isEvenNumber(value: number)` | 验证数字是否为偶数 |
| `isOddNumber(value: number)` | 验证数字是否为奇数 |
| `isPositiveNumber(value: number)` | 验证数字是否为正数 |
| `isNegativeNumber(value: number)` | 验证数字是否为负数 |
| `isWholeNumber(value: number)` | 验证数字是否为非负整数 |
| `isDecimalNumber(value: number)` | 验证数字是否为小数 |

## 使用示例

```ts
// 验证邮箱
isEmail("user@example.com"); // true

// 验证手机号
isPhoneNumber("13812345678"); // true

// 验证强密码
isStrongPassword("MyP@ssw0rd!"); // true

// 验证 URL
isURL("https://example.com"); // true

// 验证日期
isDateString("2023-01-01"); // true

// 验证十六进制颜色
isHexColor("#ff0000"); // true

// 验证 UUID
isUUID("550e8400-e29b-41d4-a716-446655440000"); // true

// 验证 IP 地址
isIP("192.168.1.1"); // true

// 验证是否为数值
isNumeric("123"); // true

// 验证是否只包含字母
isAlphabetic("abc"); // true

// 验证是否只包含字母和数字
isAlphanumeric("abc123"); // true

// 验证是否为 JSON
isJSON('{"name": "John"}'); // true

// 验证是否为 Base64
isBase64String("SGVsbG8gV29ybGQ="); // true

// 验证是否为信用卡号码
isCreditCardNumber("4532015112830366"); // true

// 验证是否为邮政编码
isPostalCode("100000"); // true

// 验证数据类型
isString("hello"); // true
isBoolean(true); // true
isArray([1, 2, 3]); // true
isObject({}); // true
isFunction(() => {}); // true
isEmpty([]); // true

// 验证数字类型
isEvenNumber(4); // true
isOddNumber(3); // true
isPositiveNumber(5); // true
isNegativeNumber(-5); // true
isWholeNumber(5); // true
isDecimalNumber(5.5); // true


