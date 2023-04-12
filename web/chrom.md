# 浏览器相关

## 监控上报

navigator.sendBeacon() 方法可用于通过 HTTP POST 将少量数据 异步 传输到 Web 服务器。它主要用于将统计数据发送到 Web 服务器，同时避免了用传统技术（如：XMLHttpRequest）发送分析数据的一些问题。

### 描述

这个方法主要用于满足统计和诊断代码的需要，这些代码通常尝试在卸载（unload）文档之前向 Web 服务器发送数据。过早的发送数据可能导致错过收集数据的机会。然而，对于开发者来说保证在文档卸载期间发送数据一直是一个困难。因为用户代理通常会忽略在 unload 事件处理器中产生的异步 XMLHttpRequest。

过去，为了解决这个问题，统计和诊断代码通常要在

发起一个同步 XMLHttpRequest 来发送数据。
创建一个 <img> 元素并设置 src，大部分用户代理会延迟卸载（unload）文档以加载图像。
创建一个几秒的 no-op 循环。
上述的所有方法都会迫使用户代理延迟卸载文档，并使得下一个导航出现的更晚。下一个页面对于这种较差的载入表现无能为力。

这就是 sendBeacon() 方法存在的意义。使用 sendBeacon() 方法会使用户代理在有机会时异步地向服务器发送数据，同时不会延迟页面的卸载或影响下一导航的载入性能，这意味着：

数据发送是可靠的。
数据异步传输。
不影响下一导航的载入。
数据是通过 HTTP POST 请求发送的。

```js
// 示例
document.addEventListener("visibilitychange", function logData() {
  if (document.visibilityState === "hidden") {
    navigator.sendBeacon("/log", analyticsData);
  }
});
```
