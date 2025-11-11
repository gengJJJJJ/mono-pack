/**
 * 生成指定长度的随机字符串（非标准 UUID）
 *
 * @param length - 字符串长度，默认 16
 * @param alphabet - 字符集，默认为 0-9a-zA-Z
 * @returns 随机字符串
 *
 * @example
 * randomString() // "aB3xK9mQpL2sR8tY"
 * randomString(8, 'abcdef') // "cdefabac"
 */
export function randomString(
  length: number = 16,
  alphabet: string = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
): string {
  if (length <= 0) throw new Error("Length must be greater than 0");
  if (alphabet.length === 0) throw new Error("Alphabet cannot be empty");

  const result: string[] = [];
  const alphabetLength = alphabet.length;

  // 使用 crypto.getRandomValues 提升随机性（浏览器环境）
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const uintArray = new Uint8Array(length);
    crypto.getRandomValues(uintArray);
    for (let i = 0; i < length; i++) {
      result.push(alphabet[uintArray[i] % alphabetLength]);
    }
  } else {
    // 降级到 Math.random（Node.js 或旧浏览器）
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * alphabetLength);
      result.push(alphabet[randomIndex]);
    }
  }

  return result.join("");
}
/**
 * 将字符串的首字母大写
 * @param string
 * @returns 首字母大写的字符串
 * @example
 * capitalizeFirstLetter('hello world'); // 'Hello world'
 */
export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * 将字符串的首字母转换为小写。
 *
 * @param str 要转换的字符串
 * @returns 首字母小写的字符串
 * @example
 * toLowerCaseFirstLetter('Hello World'); // 'hello World'
 */
export function toLowerCaseFirstLetter(str: string): string {
  if (!str) return str; // 如果字符串为空，直接返回
  return str.charAt(0).toLowerCase() + str.slice(1);
}
