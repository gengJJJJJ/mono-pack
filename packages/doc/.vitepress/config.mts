import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "MONO-PACK",
  description: "This is an npm package managed in pnpm + monorepo style",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      {
        text: "Packages",
        items: [
          { text: "@mono-pack/components", link: "/components/index" },
          {
            text: "@mono-pack/composables",
            link: "/composables/useResponsiveRem",
          },
          { text: "@mono-pack/utils", link: "/utils/storage" },
        ],
      },
    ],

    sidebar: [
      {
        text: "@mono-pack/components",
        items: [{ text: "Runtime API Examples", link: "/components/index" }],
      },
      {
        text: "@mono-pack/composables",
        items: [
          { text: "useResponsiveRem", link: "/composables/useResponsiveRem" },
        ],
      },
      {
        text: "@mono-pack/utils",
        items: [{ text: "Storage", link: "/utils/storage" }],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
