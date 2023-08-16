# 认识前端

## 前端三剑客

### 1. HTML

HTML 指的是超文本标记语言 (Hyper Text Markup Language)
HTML 不是一种编程语言，而是一种标记语言 (markup language)
HTML 使用标记标签来描述网页
HTML 文档包含了 HTML 标签及文本内容
HTML 文档也叫做 web 页面



::: details 查看代码
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <header>这里展示的是头部</header>
    <div class="div">这里展示的是内容</div>
    <footer>这里展示的是底部</footer>
  </body>
</html>
```
:::

### 2. CSS

CSS 指层叠样式表 (Cascading Style Sheets),样式布局展示,动画交互效果

```css
.div {
  position: absoulte;
  width: 100px;
  height: 100px;
  background-color: red;
}
```

### 3. JavaScript

JavaScript 指脚本语言 (scripting language),交互逻辑,数据处理,动画交互效果

```javascript
var a = 1;
function test() {
  console.log(a);
}
window.onload = () => {
  console.log("页面加载完成");
};
```

## 了解前端工程化

### 1. 什么是前端工程化

前端工程化是指利用工具，对前端项目进行规范化，标准化，自动化，可模块化，可维护，可测试，可部署

### 2. 前端工程化

工具名称|工具作用

- Node | 前端工程化工具
- npm | 包管理工具
- 编译打包工具
  - webpack、vite、gulp、rollup | 打包工具
  - babel | 转码器 
  - eslint | 代码检查工具
  - postcss | css 预处理器
  - less | css 预处理器
  - sass | css 预处理器
  - typescript | ts 预处理器
- vue | 前端框架
- react | 前端框架
- qiankun | 微前端框架

## vue  框架

- 特点
  - MVVM 框架
  - 渐进式
  - 数据驱动
  - 组件化

示例
<example-component />



::: details 查看代码
```vue
<template>
  <div class="div">
    <h1>{{ title }}</h1>
    <h2>{{ content }}</h2>
    <button @click="handleClick">按钮</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "标题",
      content: "内容",
    };
  },
  methods: {
    handleClick() {
      console.log("点击了按钮");
    },
  },
};
</script>
<style>
.div {
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: red;
}
</style>
```
::: 
<script setup>
  import exampleComponent from './components/exampleCom.vue'
</script>

## 组件化

+ [element-ui](https://element-plus.org/zh-CN/#/zh-CN)
+ [内部组件](https://kwokronny.gitee.io/element-ui-saas-extend/components/FormAuto.html#%E5%9F%BA%E7%A1%80%E8%A1%A8%E5%8D%95)


## 调试开发

- 浏览器调试
  - 控制台
  - 元素
  - 样式
  - 网络
  - 性能
  - 源码
  - 应用

## Web 安全

- 内容安全 CSP 策略
  内容安全策略（CSP）通过探测和减轻包括跨站脚本攻击 XSS 和数据注入攻击的攻击手段，更进一步提升安全性。上述攻击手段可以使用在数据窃取、网站污损、亦或是恶意软件的分发等场景中。
  CSRF 跨站请求伪造
- 连接安全
  https 协议
  同源策略 CORS 跨域限制
- 用户信息安全
  密码加密

## 开发方向

- 移动端 H5
- PC
- 小程序 如微信、支付宝、百度小程序等
- 桌面端 Electron 如 vscode QQ
- Node 服务端开发
- APP 开发 如：flutter uni-app React Native
- 其他 如数据可视化 3D 技术 WebAssembly