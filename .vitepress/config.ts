import { defineConfig } from "vitepress";
import { chineseSearchOptimize, pagefindPlugin } from 'vitepress-plugin-pagefind'

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
            text: "手写代码",
            link: "/web/write",
          },
          {
            text: "Typescript",
            link: "/web/Typescript",
          },
          {
            text: "浏览器",
            items: [{ text: "Chrome", link: "/web/chrom/index" }],
          },
        ],
      },
      { text: "算法", link: "/algorithm/index" },
      {
        text: "后端",
        items: [
          {
            text: "Rust",
            items: [
              { text: "rust 入门", link: "/server/rust/index" },
            ],
          },
          {
            text: "nest",
            items: [
              { text: "nest 入门", link: "/server/nest/index" }
            ],
          },
          { text: "Kafka", link: "/server/kafka" },
        ],
      },
      { text: "部署", link: "/deploy/index" },
      { text: "数据库", link: "//ccc" },
      { text: "计算机网络", link: "/network/curl" },
      { text: "分享", link: "/webintro" },
      { text: "About", link: "/about" },
    ],

    sidebar: {
      "/exaple": [
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
          text: "Typescript",
          link: "/web/Typescript",
        },
        {
          text: "手写代码",
          link: "/web/write",
        },
        {
          text: "浏览器",
          items: [{ text: "Chrom", link: "/web/chrom/index" },{ text: "Chrom 插件", link: "/web/chrom/plug" }],
        },
      ],
      "/algorithm/": [
        {
          text: "首页",
          link: "/algorithm/index",
        },
        {
          text: "链表",
          link: "/algorithm/链表",
        },
        {
          text: "树",
          link: "/algorithm/树",
        },
        {
          text: "双指针",
          link: "/web/双指针",
        },
      ],
      "/deploy/": [
        {
          text: "概览",
          link: "/deploy/index",
        },
        {
          text: "docker",
          link: "/deploy/docker",
        },
        {
          text: "k8s",
          link: "/deploy/k8s",
        },
        {
            text: "nginx",
            link: "/deploy/nginx",
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2023-present wxs",
      // algolia: {
      //   appId: "8J64VVRP8K",
      //   apiKey: "a18e2f4cc5665f6602c5631fd868adfd",
      //   indexName: "vitepress",
      // },
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
  vite: {
    plugins: [
      pagefindPlugin({
        customSearchQuery: chineseSearchOptimize,
        btnPlaceholder: "搜索",
        placeholder: "搜索文档",
        emptyText: "没有匹配搜索结果",
        heading: "共: {{searchResult}} 条结果",
      }),
    ],
  },
});
