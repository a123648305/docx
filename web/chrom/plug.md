## chrom   插件开发

## 基本概念

### ChromeAPI

ChromeAPI是Chrome浏览器提供的JavaScriptAPI，在插件开发中使用这些API可以调用Chrome浏览器的提供的诸多功能，完成我们定制化的需求。



### mainifest.json 文件 指定插件相关信息

manifest文件一定要放在根目录下，不可或缺，主要记录了插件的重要元数据、资源定义、权限声明，以及指定要在后台运行和页面运行的文件等。其中`manifest_version`、`name`、`version`是必须的键。

```json
{
    "name":"试试插件", // 插件名称
    "version":"1.0.0", // 版本
    "description":"这是一个插件,试试效果",
    "permissions": ["activeTab","scripting"], // 调用chrom api 的所需的一些权限
    "host_permissions":["https://baidu.com/*"], //  授权获取指定网站的敏感信息
    "background":{   
        "service_worker":"scripts/background.js" // 
    },
    "content_scripts":[              // 可操作网页DOM 的脚本
        {
            "js":["scripts/content.js"],
            "matches":["http://192.168.11.131:30480/*"] // 指定网站下允许加载运行，必填
        }
    ],
    "action":{
        "default_popup":"popup.html", // 默认打popup 弹窗视图文件
        "default_icon":{             // popup 图标
            "16":"images/fav/favicon.ico",
            "32":"images/fav/favicon-32x32.png"
        }
    },
    "icons": {
        "16": "images/fav/favicon-16x16.png",
        "32": "images/fav/favicon-32x32.png"
      },
    "manifest_version":3  // 指定chrom manifest版本
}
```

### Service worker

也就是后台服务，主要是负责处理和监听浏览器的各类事件。后台服务可以使用所有ChromeAPI，但是不能直接与网页内容交互。

要使用后台服务，需要先在manifest文件中注册background，后台服务在浏览器运行起来后，就会一直在后台运行back.js脚本。

```js
// scripts/background.js
// onInstalled 监听
chrome.runtime.onInstalled.addListener(function () {
  console.log("测试插件已加载");
  chrome.action.setBadgeText({ "text": "OFF" })
  chrome.storage.sync.set({ color: "#3aa757" }, function () {
    console.log("The color is green.");
  });
});

// 监听点击事件
chrome.action.onClicked.addListener(async (tab) => {
    console.log(tab,'bbbb')
  // 如果当前页是baidu网站的页面，就弹出popup弹窗
  if (tab.url.includes("www.runoob.com/")) {
    chrome.action.setPopup({ popup: "popup.html" });
  }
});
```

### Content Script

也叫内容脚本。上面提到后台服务无法直接与网页内容进行交互，而内容脚本便来接替了这部分工作。内容脚本可以读取、修改或注入页面DOM，也可以使用一部分的ChromeAPI，但是不可使用的那部分ChromeAPI可以通过与后台服务的通讯来完成数据或消息的传递交互。

要使用内容脚本，需要先在manifest文件中注册content_scripts

### pages 视图

页面包含了popup的弹窗页面、option页面以及其他页面，这些页面为HTML文件，都可以访问ChromeAPI。不支持内联js，需要引入外部脚本

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
    <h2>这是一个测试插件</h2>
    <input placeholder="请输入" id="input" /><button id="sumbit">
      查询
    </button>
    <script src="./scripts/content.js" ></script>
  </body>
</html>
```

```js
// scripts/content.js
const btn = document.querySelector("#sumbit");

btn.addEventListener("click", () => {
  search();
});

function search() {
  console.log("loading...");

  const val = document.querySelector("#input").value;
  document.title = val;
  alert("你输入的内容是" + val);
}

(function () {
  console.log("loading...");
})();

```

