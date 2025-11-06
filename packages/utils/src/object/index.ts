type FilterOptions = {
  /**
   * 字段匹配模式
   * - 'exact': 精确匹配字段名（默认）
   * - 'contains': 字段名包含任一关键词即过滤
   */
  fieldMatchMode?: "exact" | "contains";
};

/**
 * 过滤对象的值和字段（浅层）
 * @param obj 需要过滤的对象
 * @param values 要过滤的值数组，默认过滤 undefined 和 null
 * @param fields 要过滤的字段名数组，默认不过滤任何字段
 * @param options 过滤选项
 * @example
 * ```ts
 * const obj = { a: 1, b: null, c: 3, d: undefined, e: 5, f: { e: 6} }
 * const filtered = filterObject (obj, [null, undefined], ['e']) // 结果: { a: 1, c: 3 ，f: { e: 6 } }
 * ```
 */
export function filterObject<T extends Record<string, any>>(
  obj: T,
  values: any[] = [undefined, null],
  fields: string[] = [],
  options: FilterOptions = {}
): Partial<T> {
  if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
    return obj as any;
  }

  const { fieldMatchMode = "exact" } = options;
  const result = {} as { [K in keyof T]?: T[K] };

  for (const key of Object.keys(obj)) {
    const value = obj[key];

    // 检查是否要过滤该字段
    const shouldFilterField =
      fieldMatchMode === "exact"
        ? fields.includes(key)
        : fields.some((field) => key.includes(field));

    // 检查是否要过滤该值
    const shouldFilterValue = values.some((v) => v === value);

    if (!shouldFilterField && !shouldFilterValue) {
      result[key as keyof T] = value;
    }
  }

  return result;
}

/**
 * 递归过滤对象（深层）
 * @param obj 需要过滤的对象
 * @param values 要过滤的值数组，默认过滤 undefined 和 null
 * @param fields 要过滤的字段名数组，默认不过滤任何字段
 * @param options 过滤选项
 * @example
 * ```ts
 * const obj = { a: 1, b: null, c: 3, d: undefined, e: 5, f: { e: 6 , g: 7 } }
 * const filtered = filterObjectDeep (obj, [null, undefined], ['e']) // 结果: { a: 1, c: 3 ，f: { g: 7 } }
 * ```
 */
export function filterObjectDeep<T extends Record<string, any>>(
  obj: T,
  values: any[] = [undefined, null],
  fields: string[] = [],
  options: FilterOptions = {}
): Partial<T> {
  // 基本类型直接返回
  if (obj === null || typeof obj !== "object") {
    return obj as any;
  }

  // 数组递归处理
  if (Array.isArray(obj)) {
    return obj.map((item) =>
      filterObjectDeep(item, values, fields, options)
    ) as any;
  }

  // 跳过非 plain object（如 Date, RegExp, Promise 等）
  if (Object.prototype.toString.call(obj) !== "[object Object]") {
    return obj as any;
  }

  const { fieldMatchMode = "exact" } = options;
  const result: any = {};

  for (const key of Object.keys(obj)) {
    const value = obj[key];

    // 判断是否过滤字段
    const shouldFilterField =
      fieldMatchMode === "exact"
        ? fields.includes(key)
        : fields.some((field) => key.includes(field));

    if (shouldFilterField) {
      continue;
    }

    // 判断是否过滤值（仅对叶子节点）
    const isPlainObject =
      value !== null &&
      typeof value === "object" &&
      Object.prototype.toString.call(value) === "[object Object]";
    const isArray = Array.isArray(value);

    if (isPlainObject || isArray) {
      // 递归处理
      result[key] = filterObjectDeep(value, values, fields, options);
    } else {
      // 叶子节点：检查值
      const shouldFilterValue = values.some((v) => v === value);
      if (!shouldFilterValue) {
        result[key] = value;
      }
    }
  }

  return result;
}
