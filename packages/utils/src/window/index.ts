interface OpenWindowOptions {
  noopener?: boolean;
  noreferrer?: boolean;
  target?: "_blank" | "_parent" | "_self" | "_top" | string;
}

/**
 * 新窗口打开 URL。
 * @example
 * openWindow('https://example.com', { noopener: true, noreferrer: true, target: '_blank' });
 */
function openWindow(url: string, options: OpenWindowOptions = {}): void {
  if (typeof window === "undefined") return;

  const { noopener = true, noreferrer = true, target = "_blank" } = options;

  const features = [noopener && "noopener", noreferrer && "noreferrer"]
    .filter(Boolean)
    .join(",");

  window.open(url, target, features);
}

/**
 * 在新窗口中打开路由（兼容 hash 模式）。
 * @example
 * openRouteInNewWindow('/home');
 */
function openRouteInNewWindow(path: string) {
  if (typeof window === "undefined" || typeof location === "undefined") return;

  const { hash, origin } = location;
  const fullPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${origin}${
    hash && !fullPath.startsWith("/#") ? "/#" : ""
  }${fullPath}`;
  openWindow(url, { target: "_blank" });
}

export { openRouteInNewWindow, openWindow };
