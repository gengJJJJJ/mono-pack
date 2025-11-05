import scss from "rollup-plugin-scss";
import { defineBuildConfig } from "unbuild";
import vue from "unplugin-vue/rollup";
export default defineBuildConfig({
  entries: ["./src/index"],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
  hooks: {
    "rollup:options": function (_, options) {
      if (Array.isArray(options.plugins)) {
        options.plugins.push(vue(), scss({ fileName: "index.css" }));
      }
    },
  },
  externals: ["vue", "echarts"],
});
