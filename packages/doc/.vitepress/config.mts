import { defineConfig } from "vitepress";

export default defineConfig({
  title: "MONO-PACK",
  description: "This is an npm package managed in pnpm + monorepo style",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      {
        text: "Packages",
        items: [
          { text: "components", link: "/components/" },
          { text: "composables", link: "composables/" },
          { text: "utils", link: "/utils/" },
        ],
      },
    ],
    sidebar: {
      "/components/": [
        {
          text: "Components",
          collapsed: false,
          items: [
            { text: "index", link: "/components/index" },
            { text: "EChart", link: "/components/echart" },
            { text: "SvgIcon", link: "/components/svgIcon" },
          ],
        },
      ],
      "/composables/": [
        {
          text: "Composables",
          collapsed: false,
          items: [
            { text: "index", link: "/composables/index" },
            {
              text: "useViewportScale",
              link: "/composables/useViewportScale",
            },
          ],
        },
      ],
      "/utils/": [
        {
          text: "Utils",
          collapsed: false,
          items: [
            { text: "index", link: "/utils/index" },
            { text: "filterObject", link: "/utils/filterObject" },
            { text: "password", link: "/utils/password" },
            { text: "storage", link: "/utils/storage" },
            { text: "string", link: "/utils/string" },
            { text: "tool", link: "/utils/tool" },
            { text: "chart", link: "/utils/chart" },
            { text: "map", link: "/utils/map" },
          ],
        },
      ],
      "/": [{ text: "Home", link: "/" }],
    },
    socialLinks: [
      { icon: "github", link: "https://gitee.com/gengJJJJJ/mono-pack" },
    ],
  },
});
