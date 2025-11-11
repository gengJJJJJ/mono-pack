/**
 * 验证字符串是否为有效的邮箱格式
 * @param email - 待验证的邮箱字符串
 * @returns 如果是有效的邮箱格式返回 true，否则返回 false
 * @example
 *  isEmail("user@example.com"); // true
 *  isEmail("invalid-email"); // false
 */
export function isEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
/**
 * 验证字符串是否为有效的手机号码格式
 * @param phone - 待验证的手机号码字符串
 * @returns 如果是有效的手机号码格式返回 true，否则返回 false
 * @example
 * isPhoneNumber("13812345678"); // true
 * isPhoneNumber("+12345678901"); // true
 * isPhoneNumber("123"); // false
 */
export function isPhoneNumber(phone: string): boolean {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone);
}
/**
 * 验证字符串是否为有效的强密码格式
 * 强密码要求：至少8位，包含大小写字母、数字和特殊字符
 * @param password - 待验证的密码字符串
 * @returns 如果是有效的强密码格式返回 true，否则返回 false
 * @example
 * isStrongPassword("Abc@123456"); // true
 * isStrongPassword("abc123"); // false
 */
export function isStrongPassword(password: string): boolean {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}
/**
 * 验证字符串是否为有效的URL格式
 * @param url - 待验证的URL字符串
 * @returns 如果是有效的URL格式返回 true，否则返回 false
 * @example
 * isURL("https://example.com"); // true
 * isURL("http://example.com"); // true
 * isURL("ftp://example.com"); // true
 * isURL("example.com"); // false
 */
export function isURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
/**
 * 验证字符串是否为有效的日期格式
 * @param dateString - 待验证的日期字符串
 * @returns 如果是有效的日期格式返回 true，否则返回 false
 * @example
 * isDateString("2023-10-15"); // true
 * isDateString("15/10/2023"); // false
 */
export function isDateString(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}
/**
 * 验证字符串是否为有效的十六进制颜色格式
 * @param color - 待验证的十六进制颜色字符串
 * @returns 如果是有效的十六进制颜色格式返回 true，否则返回 false
 * @example
 * isHexColor("#FF0000"); // true
 * isHexColor("FF0000"); // true
 * isHexColor("abcdef"); // false
 */
export function isHexColor(color: string): boolean {
  const hexColorRegex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
  return hexColorRegex.test(color);
}
/**
 * 验证字符串是否为有效的UUID格式
 * @param uuid - 待验证的UUID字符串
 * @returns 如果是有效的UUID格式返回 true，否则返回 false
 * @example
 * isUUID("123e4567-e89b-12d3-a456-426655440000"); // true
 * isUUID("invalid-uuid"); // false
 */
export function isUUID(uuid: string): boolean {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}
/**
 * 验证字符串是否为有效的IP地址格式
 * @param ip - 待验证的IP地址字符串
 * @returns 如果是有效的IP地址格式返回 true，否则返回 false
 * @example
 * isIP("192.168.0.1"); // true
 * isIP("2001:0db8:85a3:0000:0000:8a2e:0370:7334"); // true
 * isIP("invalid-ip"); // false
 */
export function isIP(ip: string): boolean {
  const ipRegex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipRegex.test(ip);
}
/**
 * 验证字符串是否为有效的数字格式
 * @param value - 待验证的字符串
 * @returns 如果是有效的数字格式返回 true，否则返回 false
 * @example
 * isNumeric("123"); // true
 * isNumeric("123.45"); // true
 * isNumeric("abc"); // false
 */
export function isNumeric(value: string): boolean {
  return !isNaN(Number(value));
}
/**
 * 验证字符串是否为有效的字母格式
 * @param value - 待验证的字符串
 * @returns 如果是有效的字母格式返回 true，否则返回 false
 * @example
 * isAlphabetic("abc"); // true
 * isAlphabetic("123"); // false
 */
export function isAlphabetic(value: string): boolean {
  const alphabeticRegex = /^[A-Za-z]+$/;
  return alphabeticRegex.test(value);
}
/**
 * 验证字符串是否为有效的字母数字格式
 * @param value - 待验证的字符串
 * @returns 如果是有效的字母数字格式返回 true，否则返回 false
 * @example
 * isAlphanumeric("abc123"); // true
 * isAlphanumeric("abc!@#"); // false
 */
export function isAlphanumeric(value: string): boolean {
  const alphanumericRegex = /^[A-Za-z0-9]+$/;
  return alphanumericRegex.test(value);
}
/**
 * 验证字符串是否为有效的JSON格式
 * @param jsonString - 待验证的JSON字符串
 * @returns 如果是有效的JSON格式返回 true，否则返回 false
 * @example
 * isJSON('{"name": "John", "age": 30}'); // true
 * isJSON('[1, 2, 3]'); // true
 * isJSON('{name: "John"}'); // false
 */
export function isJSON(jsonString: string): boolean {
  try {
    JSON.parse(jsonString);
    return true;
  } catch {
    return false;
  }
}
/**
 * 验证字符串是否为有效的Base64格式
 * @param base64String - 待验证的Base64字符串
 * @returns 如果是有效的Base64格式返回 true，否则返回 false
 * @example
 * isBase64String("SGVsbG8gV29ybGQ="); // true
 * isBase64String("invalid-base64"); // false
 */
export function isBase64String(base64String: string): boolean {
  const base64Regex =
    /^(?:[A-Za-z0-9+\/]{4})*?(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;
  return base64Regex.test(base64String);
}
/**
 * 验证字符串是否为有效的信用卡号码格式
 * @param cardNumber - 待验证的信用卡号码字符串
 * @returns 如果是有效的信用卡号码格式返回 true，否则返回 false
 * @example
 * isCreditCardNumber("4111111111111111"); // true
 * isCreditCardNumber("invalid-card-number"); // false
 */
export function isCreditCardNumber(cardNumber: string): boolean {
  const cardRegex =
    /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/;
  return cardRegex.test(cardNumber);
}
/**
 * 验证字符串是否为有效的邮政编码格式
 * @param postalCode - 待验证的邮政编码字符串
 * @returns 如果是有效的邮政编码格式返回 true，否则返回 false
 * @example
 * isPostalCode("12345"); // true
 * isPostalCode("A1B 2C3");
 */
export function isPostalCode(postalCode: string): boolean {
  const postalCodeRegex = /^[A-Za-z0-9\s\-]{3,10}$/;
  return postalCodeRegex.test(postalCode);
}
/**
 * 验证字符串是否为有效的数字格式
 * @param value - 待验证的数字
 * @returns 如果是有效的数字格式返回 true，否则返回 false
 * @example
 * isNumber(123); // true
 * isNumber("123"); // false
 */
export function isNumber(value: any): boolean {
  return typeof value === "number" && !isNaN(value);
}
/**
 * 验证字符串是否为有效的字符串格式
 * @param value - 待验证的字符串
 * @returns 如果是有效的字符串格式返回 true，否则返回 false
 * @example
 * isString("hello world"); // true
 * isString(123); // false
 */
export function isString(value: any): boolean {
  return typeof value === "string" || value instanceof String;
}
/**
 * 验证字符串是否为有效的布尔值格式
 * @param value - 待验证的布尔值
 * @returns 如果是有效的布尔值格式返回 true，否则返回 false
 * @example
 * isBoolean(true); // true
 * isBoolean(false); // true
 * isBoolean("true"); // false
 */
export function isBoolean(value: any): boolean {
  return typeof value === "boolean";
}
/**
 * 验证字符串是否为有效的数组格式
 * @param value - 待验证的数组
 * @returns 如果是有效的数组格式返回 true，否则返回 false
 * @example
 * isArray([1, 2, 3]); // true
 * isArray({}); // false
 */
export function isArray(value: any): boolean {
  return Array.isArray(value);
}
/**
 * 验证字符串是否为有效的对象格式
 * @param value - 待验证的对象
 * @returns 如果是有效的对象格式返回 true，否则返回 false
 * @example
 * isObject({}); // true
 * isObject([]); // false
 */
export function isObject(value: any): boolean {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
/** 验证字符串是否为有效的函数格式
 * @param value - 待验证的函数
 * @returns 如果是有效的函数格式返回 true，否则返回 false
 * @example
 * isFunction(function() {}); // true
 * isFunction(() => {}); // true
 * isFunction({}); // false
 */
export function isFunction(value: any): boolean {
  return typeof value === "function";
}
/**
 * 验证字符串是否为有效的空值
 * @param value - 待验证的值
 * @returns 如果是有效的空值返回 true，否则返回 false
 * @example
 * isEmpty(null); // true
 * isEmpty(undefined); // true
 * isEmpty(""); // true
 * isEmpty([]); // true
 * isEmpty({}); // true
 * isEmpty(0); // false
 * isEmpty("0"); // false
 * isEmpty(false); // false
 */
export function isEmpty(value: any): boolean {
  if (value == null) return true;
  if (typeof value === "string" || Array.isArray(value))
    return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
}
/**
 * 验证数字是否为偶数
 * @param value - 待验证的数字
 * @returns 如果是偶数返回 true，否则返回 false
 * @example
 * isEvenNumber(4); // true
 * isEvenNumber(3); // false
 */
export function isEvenNumber(value: number): boolean {
  return typeof value === "number" && value % 2 === 0;
}
/**
 * 验证数字是否为奇数
 * @param value - 待验证的数字
 * @returns 如果是奇数返回 true，否则返回 false
 * @example
 * isOddNumber(3); // true
 * isOddNumber(4); // false
 */
export function isOddNumber(value: number): boolean {
  return typeof value === "number" && value % 2 !== 0;
}
/**
 * 验证数字是否为正数
 * @param value - 待验证的数字
 * @returns 如果是正数返回 true，否则返回 false
 * @example
 * isPositiveNumber(5); // true
 * isPositiveNumber(-5); // false
 * isPositiveNumber(0); // false
 */
export function isPositiveNumber(value: number): boolean {
  return typeof value === "number" && value > 0;
}
/**
 * 验证数字是否为负数
 * @param value - 待验证的数字
 * @returns 如果是负数返回 true，否则返回 false
 * @example
 * isNegativeNumber(-5); // true
 * isNegativeNumber(5); // false
 * isNegativeNumber(0); // false
 */
export function isNegativeNumber(value: number): boolean {
  return typeof value === "number" && value < 0;
}
/**
 * 验证数字是否为非负整数
 * @param value - 待验证的数字
 * @returns 如果是非负整数返回 true，否则返回 false
 * @example
 * isWholeNumber(5); // true
 * isWholeNumber(-5); // false
 * isWholeNumber(5.5); // false
 */
export function isWholeNumber(value: number): boolean {
  return typeof value === "number" && Number.isInteger(value) && value >= 0;
}
/**
 * 验证数字是否为小数
 * @param value - 待验证的数字
 * @returns 如果是小数返回 true，否则返回 false
 * @example
 * isDecimalNumber(5.5); // true
 * isDecimalNumber(5); // false
 */
export function isDecimalNumber(value: number): boolean {
  return typeof value === "number" && !Number.isInteger(value);
}
