# 前端设计模式

## 一、设计模式概述

### 1.1 设计模式定义

设计模式是软件开发中针对常见问题的**通用解决方案**，是经过无数开发者实践验证的最佳编码范式。前端设计模式特指在 Web 前端开发中用于解决界面交互、组件复用、状态管理等问题的模式。

### 1.2 设计模式的重要性

- **提升代码可维护性**：规范代码结构，降低维护成本
- **增强代码复用性**：避免重复开发，提高开发效率
- **优化团队协作**：统一开发规范，便于团队成员理解和协作
- **应对复杂场景**：为大型项目提供清晰的架构思路

### 1.3 设计模式分类

前端设计模式主要分为三类：

- **创建型模式**：解决对象创建问题
- **结构型模式**：解决对象组合问题
- **行为型模式**：解决对象交互问题

## 二、创建型设计模式

### 2.1 单例模式（Singleton）

**定义**：确保一个类只有一个实例，并提供全局访问点。

**核心代码示例**：

```javascript
// 单例模式实现
class Modal {
  constructor() {
    if (!Modal.instance) {
      this.element = document.createElement("div");
      this.element.className = "modal";
      document.body.appendChild(this.element);
      Modal.instance = this;
    }
    return Modal.instance;
  }

  show(content) {
    this.element.innerHTML = content;
    this.element.style.display = "block";
  }

  hide() {
    this.element.style.display = "none";
  }
}

// 使用方式
const modal1 = new Modal();
const modal2 = new Modal();
console.log(modal1 === modal2); // true，两个实例指向同一对象

modal1.show("单例模式示例");
```

**前端应用场景**：

- 全局状态管理（如 Vuex、Redux 的 store）
- 弹窗组件（保证页面中只有一个弹窗实例）
- 全局缓存对象（如浏览器本地存储工具类）

### 2.2 工厂模式（Factory）

**定义**：通过工厂函数创建对象，将对象创建逻辑与使用逻辑分离。

**核心代码示例**：

```javascript
// 工厂模式实现
function createButton(type) {
  switch (type) {
    case "primary":
      return {
        type: "primary",
        style: "background-color: blue; color: white",
        click() {
          console.log(" primary button clicked");
        },
      };
    case "secondary":
      return {
        type: "secondary",
        style: "background-color: gray; color: black",
        click() {
          console.log("secondary button clicked");
        },
      };
    default:
      throw new Error("不支持的按钮类型");
  }
}

// 使用方式
const primaryBtn = createButton("primary");
const secondaryBtn = createButton("secondary");

primaryBtn.click(); // 输出: primary button clicked
```

**前端应用场景**：

- 组件工厂（如 Vue 中通过工厂函数创建不同类型的组件）
- 表单元素生成（动态创建输入框、下拉框等）
- 数据模型创建（根据不同数据源生成统一格式的数据对象）

## 三、结构型设计模式

### 3.1 适配器模式（Adapter）

**定义**：将一个接口转换为另一个接口，使不兼容的对象可以协同工作。

**核心代码示例**：

```javascript
// 目标接口（现代浏览器API）
const modernAPI = {
  fetchData(url) {
    return fetch(url).then((res) => res.json());
  },
};

// 遗留接口（旧版本API）
const legacyAPI = {
  loadData(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => callback(JSON.parse(xhr.responseText));
    xhr.send();
  },
};

// 适配器
function adapter(legacyFn) {
  return function (url) {
    return new Promise((resolve, reject) => {
      legacyFn(url, resolve, reject);
    });
  };
}

// 使用适配器
const adaptedLoadData = adapter(legacyAPI.loadData);

// 统一使用Promise风格调用
adaptedLoadData("/api/data").then((data) => {
  console.log("适配后的数据:", data);
});
```

**前端应用场景**：

- 兼容旧浏览器 API（如用 Promise 适配回调函数）
- 第三方库接口统一（整合不同格式的外部数据接口）
- 组件接口适配（让不同格式的组件接收统一参数）

### 3.2 装饰器模式（Decorator）

**定义**：动态地给对象添加新功能，而不改变其原有结构。

**核心代码示例**：

```javascript
// 基础组件
class Button {
  constructor() {
    this.clickEvents = [];
  }

  render() {
    return "<button>基础按钮</button>";
  }

  onClick(callback) {
    this.clickEvents.push(callback);
  }

  triggerClick() {
    this.clickEvents.forEach((callback) => callback());
  }
}

// 装饰器函数
function addLoading(button) {
  const originalRender = button.render;
  const originalOnClick = button.onClick;

  button.loading = false;

  button.render = function () {
    if (this.loading) {
      return "<button>加载中...</button>";
    }
    return originalRender.call(this);
  };

  button.onClick = function (callback) {
    originalOnClick.call(this, () => {
      this.loading = true;
      this.render();

      // 模拟异步操作
      setTimeout(() => {
        this.loading = false;
        this.render();
        callback();
      }, 1000);
    });
  };

  return button;
}

// 使用装饰器
const button = new Button();
const decoratedButton = addLoading(button);

decoratedButton.onClick(() => {
  console.log("按钮点击成功");
});

document.body.innerHTML = decoratedButton.render();
```

**前端应用场景**：

- 组件功能增强（如给按钮添加加载状态）
- 日志埋点（不修改原函数，添加日志记录功能）
- 权限控制（给函数添加权限校验逻辑）

## 四、行为型设计模式

### 4.1 观察者模式（Observer）

**定义**：对象间建立一对多的依赖关系，当一个对象状态改变时，所有依赖它的对象都会得到通知并更新。

**核心代码示例**：

```javascript
// 观察者模式实现
class EventEmitter {
  constructor() {
    this.events = {};
  }

  // 订阅事件
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
    return this;
  }

  // 一次性订阅事件
  once(event, callback) {
    const handler = (...args) => {
      callback(...args);
      this.off(event, handler);
    };
    this.on(event, handler);
    return this;
  }

  // 取消订阅
  off(event, callback) {
    if (!this.events[event]) return this;
    if (!callback) {
      delete this.events[event];
      return this;
    }
    this.events[event] = this.events[event].filter((cb) => cb !== callback);
    return this;
  }

  // 发布事件
  emit(event, ...args) {
    if (!this.events[event]) return this;
    this.events[event].forEach((callback) => callback(...args));
    return this;
  }
}

// 使用方式
const emitter = new EventEmitter();

// 订阅事件
emitter.on("dataChange", (data) => {
  console.log("数据变更1:", data);
});

emitter.once("pageLoad", () => {
  console.log("页面首次加载");
});

// 发布事件
emitter.emit("dataChange", { id: 1, value: "new value" });
emitter.emit("pageLoad");
emitter.emit("pageLoad"); // 不会再次触发
```

**前端应用场景**：

- DOM 事件机制（click、scroll 等事件监听）
- 状态管理（如 Vue 的响应式系统、Redux 的 store 订阅）
- 组件通信（兄弟组件通过事件总线通信）

### 4.2 策略模式（Strategy）

**定义**：定义一系列算法，将每个算法封装起来，使它们可以相互替换，客户端根据不同场景选择不同算法。

**核心代码示例**：

```javascript
// 策略模式实现
const validationStrategies = {
  // 邮箱验证策略
  email(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  },
  // 手机号验证策略
  phone(value) {
    return /^1[3-9]\d{9}$/.test(value);
  },
  // 密码强度验证策略
  password(value) {
    return value.length >= 6 && /[A-Za-z0-9]/.test(value);
  },
};

// 验证上下文
function validate(value, strategy) {
  if (!validationStrategies[strategy]) {
    throw new Error(`不支持的验证策略: ${strategy}`);
  }
  return validationStrategies[strategy](value);
}

// 使用方式
console.log(validate("user@example.com", "email")); // true
console.log(validate("13800138000", "phone")); // true
console.log(validate("123abc", "password")); // true
console.log(validate("123", "password")); // false
```

**前端应用场景**：

- 表单验证（不同字段使用不同验证规则）
- 动画效果（根据场景选择不同动画策略）
- 数据格式化（如日期格式化、金额格式化）

## 五、前端特有的设计模式

### 5.1 组件模式（Component Pattern）

**定义**：将界面拆分为独立可复用的组件，每个组件封装自己的状态和行为。

**核心代码示例（React 风格）**：

```javascript
// 组件模式示例（React函数组件）
import React, { useState } from "react";

// 按钮组件
function Button({ type, children, onClick }) {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (loading) return;
    setLoading(true);
    onClick?.();
    // 模拟异步操作
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <button
      type={type}
      disabled={loading}
      onClick={handleClick}
      className={`button ${type}`}
    >
      {loading ? "加载中..." : children}
    </button>
  );
}

// 表单组件（组合按钮组件）
function Form() {
  const handleSubmit = () => {
    console.log("表单提交成功");
  };

  return (
    <form>
      <input type="text" placeholder="输入内容" />
      <Button type="primary" onClick={handleSubmit}>
        提交
      </Button>
    </form>
  );
}
```

**前端应用场景**：

- 主流框架核心模式（React、Vue、Angular 的组件系统）
- UI 组件库（Element UI、Ant Design 等）
- 页面模块拆分（头部、导航、内容区等独立组件）

### 5.2 高阶组件模式（Higher-Order Component, HOC）

**定义**：接收一个组件作为参数，返回一个增强后的新组件，本质是函数式编程的柯里化应用。

**核心代码示例（React 风格）**：

```javascript
// 高阶组件模式示例
import React, { Component } from "react";

// 权限校验HOC
function withAuth(WrappedComponent, requiredRole) {
  return class AuthComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isAuthenticated: false,
        error: null,
      };
    }

    componentDidMount() {
      this.checkAuth();
    }

    checkAuth() {
      const userRole = this.props.getUserRole(); // 假设从props获取用户角色
      if (userRole === requiredRole) {
        this.setState({ isAuthenticated: true });
      } else {
        this.setState({ error: "无访问权限" });
      }
    }

    render() {
      if (!this.state.isAuthenticated) {
        return <div>{this.state.error || "加载中..."}</div>;
      }
      return <WrappedComponent {...this.props} />;
    }
  };
}

// 被包装的组件
function ProtectedComponent({ data }) {
  return (
    <div>
      <h3>受保护的内容</h3>
      <p>{data}</p>
    </div>
  );
}

// 使用HOC增强组件
const AdminComponent = withAuth(ProtectedComponent, "admin");

// 渲染组件
<AdminComponent getUserRole={() => "admin"} data="管理员专属数据" />;
```

**前端应用场景**：

- React 组件复用（如 Redux 的 connect 函数）
- 组件功能增强（权限校验、数据加载、日志记录）
- 状态逻辑抽离（避免组件逻辑过于复杂）

## 六、设计模式的最佳实践

### 6.1 何时使用设计模式

- 当代码出现重复逻辑时（考虑工厂模式、模板方法模式）
- 当组件间耦合度过高时（考虑观察者模式、中介者模式）
- 当需要增强对象功能时（考虑装饰器模式、Mixin 模式）
- 当系统复杂度上升时（通过架构模式如 MVVM、MVC 梳理结构）

### 6.2 避免过度设计

- 优先使用简单方案，只有当问题确认为常见场景时再应用模式
- 避免为了使用模式而使用模式（如小型项目中过度使用单例模式）
- 关注代码可读性，复杂模式需配合清晰的注释或文档
- 结合具体框架特性（如 Vue 的 Composition API 已内置部分模式逻辑）

### 6.3 现代前端框架中的设计模式

| 框架/库 | 常用设计模式                         | 实际应用场景               |
| ------- | ------------------------------------ | -------------------------- |
| React   | 组件模式、HOC、Context 模式          | 组件复用、状态管理         |
| Vue     | 组件模式、Mixin、观察者模式          | 组件扩展、响应式系统       |
| Redux   | 单例模式、观察者模式、中间件模式     | 全局状态管理、异步操作处理 |
| Angular | 依赖注入、组件模式、服务模式         | 依赖管理、业务逻辑抽离     |
| RxJS    | 观察者模式、迭代器模式、异步操作模式 | 数据流处理、事件序列管理   |

## 七、总结

前端设计模式是提升代码质量的重要工具，其核心价值在于：

1. **规范代码结构**：通过成熟模式避免"aghetti code"
2. **提升开发效率**：复用解决方案，减少重复开发
3. **增强系统可维护性**：清晰的模式结构便于后续迭代
4. **促进团队协作**：统一的设计思想降低沟通成本

学习设计模式时，建议结合具体项目场景理解其应用场景，避免死记硬背。随着前端框架的发展，部分模式已被框架内置（如 React 的 Context 替代了传统的提供者模式），但理解底层设计思想仍是进阶开发的关键。
