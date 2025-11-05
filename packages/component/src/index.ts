// packages/component/src/index.ts
// 将所有组件导出

import type { App, Plugin } from "vue";
import SvgIcon from "./svg-icon/index.vue";
import ECharts from "./echarts/index.vue";

const install = (app: App) => {
  app.component("SvgIcon", SvgIcon);
  app.component("ECharts", ECharts);
};
const plugin: Plugin = {
  install,
};
// 全局引入
export default plugin;

// 按需引入
export { SvgIcon, ECharts };
