/**
 *  密码特殊字符检测
 */
const SPECIAL_CHAR_RE = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`]/;

/**
 * 获取密码强度（0-100)
 * @param password - 密码字符串
 * @param minLength - 达到此长度后长度项得满分（默认为 8）
 * @returns 强度分数 (0-100)
 *
 * 评分策略：
 * - 长度得分：按比例计算，达到 minLength 得 40 分，不足则线性得分
 * - 字符类型：数字、小写、大写、特殊字符，每类 +15 分（共最多 60 分）
 *
 * @example
 * getPasswordStrength('Abc123!', 8)   // 长度7/8 → 长度分=35，得分=95
 * getPasswordStrength('Abc123!', 6)   // 长度7≥6 → 长度分=40，得分=100
 */
export function getPasswordStrength(password: string, minLength = 8): number {
  if (!password || typeof password !== "string") {
    return 0;
  }
  const len = password.length;
  const lengthScore =
    len >= minLength ? 40 : Math.max(0, Math.round((len / minLength) * 40));
  const hasNumber = /\d/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasSpecial = SPECIAL_CHAR_RE.test(password);
  const typeScore =
    (hasNumber ? 15 : 0) +
    (hasLower ? 15 : 0) +
    (hasUpper ? 15 : 0) +
    (hasSpecial ? 15 : 0);
  return Math.min(100, lengthScore + typeScore);
}
