// packages/component/src/index.ts
// 将所有组件导出

import type { App, Plugin } from "vue";
import SvgIcon from "./svg-icon/index.vue";
import ECharts from "./echarts/index.vue";
import Pagination from "./pagination/index.vue";
const install = (app: App) => {
  app.component("SvgIcon", SvgIcon);
  app.component("ECharts", ECharts);
  app.component("Pagination", Pagination);
};
const plugin: Plugin = {
  install,
};
// 全局引入
export default plugin;

// 按需引入
export { SvgIcon, ECharts, Pagination };
