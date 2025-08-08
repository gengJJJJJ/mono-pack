import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "esm",
    },
    {
      file: "dist/index.cjs",
      format: "cjs",
    },
    {
      file: "dist/index.umd.js",
      format: "umd",
      name: "MonoPackUtils",
    },
  ],
  plugins: [
    typescript({
      tsconfig: "../../tsconfig.base.json",
      declaration: true,
      outDir: "dist",
    }),
  ],
};
