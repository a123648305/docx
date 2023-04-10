import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "时空礼记",
  description: "一个记录平时心得和体会，偶尔使用到的一些技术及好玩有趣的东西。",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      {
        text: "前端",
        items: [
          {
            text: "基础",
            items: [
              { text: "javascript", link: "/web/basic/js" },
              { text: "css", link: "/web/basic/css" },
            ],
          },
          {
            text: "框架",
            items: [
              { text: "vue", link: "/web/vue/vue3" },
              { text: "react", link: "/web/react/index" },
            ],
          },
          {
            text: "浏览器",
            items: [{ text: "Chrome", link: "/web/vue/vue3" }],
          },
        ],
      },
      { text: "算法", link: "/markdown-examples" },
      { text: "后端", link: "/api-examples" },
      { text: "部署", link: "//ccc" },
      { text: "数据库", link: "//ccc" },
      { text: "计算机网络", link: "//ccc" },
      { text: "分享", link: "//ccc" },
      { text: "About", link: "/about" },
    ],

    sidebar: {
      "/": [
        {
          text: "Examples",
          items: [
            { text: "Markdown Examples", link: "/markdown-examples" },
            { text: "Runtime API Examples", link: "/api-examples" },
          ],
        },
      ],
      "/web/": [
        {
          text: "基础",
          items: [
            { text: "javascript", link: "/web/basic/js" },
            { text: "css", link: "/web/basic/css" },
          ],
        },
        {
          text: "框架",
          items: [
            {
              text: "vue",
              link: "/web/vue/vue3",
              items: [{ text: "vue3", link: "/web/vue/vue3" }],
            },
            {
              text: "react",
              link: "/web/react/index",
              items: [
                { text: "guide", link: "/web/react/index" },
                { text: "hooks", link: "/web/react/hooks" },
              ],
            },
          ],
        },
        {
          text: "浏览器",
          items: [{ text: "Chrom", link: "/web/chrom" }],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2023-present wxs",
    },
    lastUpdatedText: "Updated Date",
    // carbonAds: {
    //   code: "your-carbon-code",
    //   placement: "your-carbon-placement",
    // },
    // docFooter: {
    //   prev: "Pagina prior",
    //   next: "Proxima pagina",
    // },
  },
});
