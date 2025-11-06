/**
 * 使用 Haversine 公式计算两点间距离（单位：公里）
 */
function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // 地球半径，单位：公里
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * 根据两点距离（公里）获取推荐的地图缩放级别
 */
function getZoomLevelByDistance(
  distanceKm: number,
  zoomMap: [number, number][] // [[maxDist, zoom], ...] 按距离从大到小排序
): number {
  for (const [maxDist, zoom] of zoomMap) {
    if (distanceKm > maxDist) continue;
    return zoom;
  }
  return zoomMap[zoomMap.length - 1]?.[1] ?? 15; // fallback
}

// 默认缩放映射表（适用于 Leaflet / 高德 / Google Maps 等 Web 地图）
const DEFAULT_ZOOM_MAPS = {
  /**
   * "big": 适合展示较大地理范围（如省级）
   */
  big: [
    [1000, 4],
    [500, 6],
    [200, 7.5],
    [50, 10],
    [10, 10.5],
    [1, 11],
    [0, 15],
  ] as [number, number][],
  /**
   * "small": 适合精细区域（如街道级）
   */
  small: [
    [1000, 3],
    [500, 4],
    [200, 5],
    [50, 6],
    [30, 7],
    [20, 8],
    [10, 9],
    [5, 10],
    [1, 12],
    [0, 15],
  ] as [number, number][],
};

export interface GetMapScaleOptions {
  /**
   * 缩放策略类型
   * - 'big': 较大范围
   * - 'small': 较小范围
   * - 自定义映射表
   */
  type?: "big" | "small" | [number, number][];
}

/**
 * 根据两个经纬度点计算推荐的地图缩放级别
 *
 * @param oneLon 第一点经度
 * @param oneLat 第一点纬度
 * @param twoLon 第二点经度
 * @param twoLat 第二点纬度
 * @param options 缩放策略
 * @returns 推荐的缩放级别（zoom level）
 *
 * @example
 * ```ts
 * // 基础用法
 * const zoom = getMapScale(116.4074, 39.9042, 121.4737, 31.2304, { type: 'big' });
 * // 自定义缩放规则（比如适配百度地图）
 * const customZoom = getMapScale(lon1, lat1, lon2, lat2, {
 *   type: [
 *     [2000, 5],
 *     [500, 8],
 *     [50, 12],
 *     [0, 16],
 *   ],
 * });
 * ```
 */
export function getMapScale(
  oneLon: number | string,
  oneLat: number | string,
  twoLon: number | string,
  twoLat: number | string,
  options: GetMapScaleOptions = {}
): number {
  const { type = "big" } = options;

  // 转换并校验输入
  const coords = [oneLon, oneLat, twoLon, twoLat].map((v) => {
    const num = typeof v === "string" ? parseFloat(v) : v;
    if (typeof num !== "number" || !isFinite(num)) {
      throw new Error(`Invalid coordinate: ${v}`);
    }
    return num;
  });

  const [lon1, lat1, lon2, lat2] = coords;

  // 计算距离（公里）
  const distanceKm = haversineDistance(lat1, lon1, lat2, lon2);

  // 获取缩放映射表
  let zoomMap: [number, number][];
  if (Array.isArray(type)) {
    // 自定义映射：按距离降序排列
    zoomMap = [...type].sort((a, b) => b[0] - a[0]);
  } else {
    zoomMap = DEFAULT_ZOOM_MAPS[type];
    if (!zoomMap) {
      throw new Error(`Unknown type: ${type}`);
    }
  }

  return getZoomLevelByDistance(distanceKm, zoomMap);
}
