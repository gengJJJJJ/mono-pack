// vite.config.ts
import { defineConfig } from "vite";
import tsPlugin from "@rollup/plugin-typescript";

export default defineConfig({
  plugins: [
    tsPlugin({
      tsconfig: "../../tsconfig.base.json",
      include: ["./src/**/*"],
      outDir: "dist",
    }),
  ],
  build: {
    target: "esnext",
    lib: {
      entry: "./src/index.ts",
      name: "MonoPackComposables", // 全局变量名（用于 UMD）
      fileName: (format) => `index.${format}.js`, // 输出 index.es.js / index.umd.js
      formats: ["es", "cjs", "umd"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  // 自动生成 .d.ts 类型声明文件
  esbuild: false,
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
  },
});
