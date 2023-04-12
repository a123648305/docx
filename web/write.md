# 常用手写代码

## es5 实现类的继承

::: details 查看代码

```js
// 通过寄生组合方式
function Parent(age) {
  this.age = age;
}
Parent.prototype.say = () => {};

function Son(age, name) {
  this.name = name;
  Parent.call(this, age); //借用call 构造函数
}

Son.prototype = Object.create(Parent.prototype); // 原型链方式
Son.constructor = Son; // 修正子类的构造函数
```

:::

## 实现一个订阅发布者模式

::: details 查看代码

```js
class EventEmit {
  constructor() {
    this.subs = {};
  }
  $on(type, fn) {
    if (this.subs[type]) {
      this.subs[type].push(fn);
    } else {
      this.subs[type] = [fn];
    }
  }
  $emit(type, data) {
    if (this.subs[type]) {
      this.subs[type].forEach((cb) => cb(data));
    }
  }
}
```

:::

## 观察者模式

```js
// 目标(发布者)
// Dependency
class Dep {
  constructor() {
    // 存储所有的观察者
    this.subs = [];
  }
  // 添加观察者
  addSub(sub) {
    if (sub && sub.update) {
      this.subs.push(sub);
    }
  }
  // 通知所有观察者
  notify() {
    this.subs.forEach((sub) => sub.update());
  }
}
// 观察者(订阅者)
class Watcher {
  update() {
    console.log("update");
  }
}

// 测试
let dep = new Dep();
let watcher = new Watcher();
dep.addSub(watcher);
dep.notify();
```

观察者模式是由具体目标调度，比如当事件触发，Dep 就会去调用观察者的方法，所以观察者模 式的订阅者与发布者之间是存在依赖的
发布/订阅模式由统一调度中心调用，因此发布者和订阅者不需要知道对方的存在

## 防抖

```js
function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```

## 节流

```js
function thorrle(fn, delay) {
  let preTime = 0;
  return function (...args) {
    let now = +new Date();
    if (now - preTime >= dayle) {
      preTime = now;
      fn.apply(this, args);
    }
  };
}
```

## 实现 instanceof

```js
function instanceof(source,target){
  // 基本数据类型直接返回false
  if(typeof instance !== 'object' || instance == null) return false;

  const proto = target.prototype
  let   curProto =  Object.getPrototypeOf(source) //--->source.__proto__
  while(true){
    if(curProto===null) return false
    if(curProto === proto) return true
    curProto= Object.getPrototypeOf(curProto)
  }
}
```

## 实现 bind

## 实现 apply

## 实现 call

```js

```

## 实现 new

```js
function news(fn, ...args) {
  // 基于原型链 创建一个新对象，继承构造函数constructor的原型对象（Person.prototype）上的属性
  const obj = Object.create(fn.prototype);
  // 将newObj作为this，执行 constructor ，传入参数
  let res = fn.apply(obj, args);
  //如果函数的执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象地址
  return typeof res === "object" ? res : obj;
}
```

## 实现 Promise

## 实现 Promise.all

## 实现 Promise.race

## 实现深拷贝

##
