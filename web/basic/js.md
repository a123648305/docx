# js 基础

## 类型

- js 一共有 8 种数据类型

其中有 7 种基本类型:Undefined、Null、Boolean、String、Symbol(es6 新增)、BigInt(es10 新增)
一种引用类型：Object ,主要包含 普通对象 Object 函数 Function 数组 Array 日期 Date 数学函数 Math 正则对象 RegExp

- 原始数据类型：

  基础类型存储在栈内存，使用时会创建一个完全相等的变量，占据空间小，大小固定，属于被频繁使用

- 引用数据类型：

  引用类型存储在堆内存，存储的是地址，多个引用指向同一个地址，浅拷贝时会共享同个实体，占据空间大，大小不固定。引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址，当寻找引用值时，会首先在栈中检索地址，取得地址后从堆中获得实体。

  ```js
  let a = {
    name: "Julia",
    age: 20,
  };
  function change(o) {
    o.age = 24;
    o = {
      name: "Kath",
      age: 30,
    };
    return o;
  }
  let b = change(a); // 注意这里没有 new，后面 new 相关会有专门文章讲解  {name: "Kath", age: 30}
  console.log(b.age); // 第一个 console  30
  console.log(a.age); // 第二个 console  24
  ```

  ::: warning
  原因在于：函数传参进来的 o，传递的是对象在堆中的内存地址值，通过调用 o.age = 24（第 7 行代码）确实改变了 a 对象的 age 属性；但是第 12 行代码的 return 却又把 o 变成了另一个内存地址，将 {name: "Kath", age: 30} 存入其中，最后返回 b 的值就变成了 {name: "Kath", age: 30}。而如果把第 12 行去掉，那么 b 就会返回 undefined
  :::

## 类型检测

- typeof

  typeof 对于原始类型来说，除了 null 都可以正确显示

  ```js
  console.log(typeof 2); // number
  console.log(typeof true); // boolean
  console.log(typeof "str"); // string
  console.log(typeof []); // object     []数组的数据类型在 typeof 中被解释为 object
  console.log(typeof function () {}); // function
  console.log(typeof {}); // object
  console.log(typeof undefined); // undefined
  console.log(typeof null); // object     null 的数据类型被 typeof 解释为 object
  ```

* instanceof

  instanceof 可以正确的判断对象的类型，因为内部机制是通过判断对象的原型链中是不是能找到类型的 prototype,但是不能判断基础类型

  ```js
  console.log(2 instanceof Number); // false
  console.log(true instanceof Boolean); // false
  console.log("str" instanceof String); // false
  console.log([] instanceof Array); // true
  console.log(function () {} instanceof Function); // true
  console.log({} instanceof Object); // true
  // console.log(undefined instanceof Undefined);
  // console.log(null instanceof Null);
  ```

  模拟实现 instanof

  ```js
  function instanceofNew(source, target) {
    //基本数据类型直接返回false
    if (typeof source !== "object" || source === null) return false;
    const proto = target.prototype;
    let curProto = Object.getPrototypeOf(souce); // --->souce.__proto__  获取实例的隐式原型
    while (true) {
      if (curProto === null) {
        return false;
      }
      if (curProto === proto) {
        return true;
      }
      curProto = Object.getPrototypeOf(curProto);
    }
    return false;
  }
  ```

- constructor 通过构造函数来判断

  ```js
  console.log((2).constructor === Number); // true
  console.log(true.constructor === Boolean); // true
  console.log("str".constructor === String); // true
  console.log([].constructor === Array); // true
  console.log(function () {}.constructor === Function); // true
  console.log({}.constructor === Object); // true
  ```

  ::: warning
  构造函数容易被篡改，此方法不可靠
  :::

* Oject.prototype.toString
  ::: tip
  toString() 是 Object 的原型方法，调用该方法，可以统一返回格式为 “[object Xxx]” 的字符串，其中 Xxx 就是对象的类型。对于 Object 对象，直接调用 toString() 就能返回 [object Object]；而对于其他对象，则需要通过 call 来调用，才能返回正确的类型信息。我们来看一下代码。
  :::

  ```js
  Object.prototype.toString({}); // "[object Object]"
  Object.prototype.toString.call({}); // 同上结果，加上call也ok
  Object.prototype.toString.call(1); // "[object Number]"
  Object.prototype.toString.call("1"); // "[object String]"
  Object.prototype.toString.call(true); // "[object Boolean]"
  Object.prototype.toString.call(function () {}); // "[object Function]"
  Object.prototype.toString.call(null); //"[object Null]"
  Object.prototype.toString.call(undefined); //"[object Undefined]"
  Object.prototype.toString.call(/123/g); //"[object RegExp]"
  Object.prototype.toString.call(new Date()); //"[object Date]"
  Object.prototype.toString.call([]); //"[object Array]"
  Object.prototype.toString.call(document); //"[object HTMLDocument]"
  Object.prototype.toString.call(window); //"[object Window]"
  ```

  从上面这段代码可以看出，Object.prototype.toString.call() 可以很好地判断引用类型，甚至可以把 document 和 window 都区分开来。

- 总结：

  - typeof

    直接在计算机底层基于数据类型的值（二进制）进行检测
    typeof null 为 object 原因是对象存在在计算机中，都是以 000 开始的二进制存储，所以检测出来的结果是对象
    typeof 普通对象/数组对象/正则对象/日期对象 都是 object
    typeof NaN === 'number'

  * instanceof

    检测当前实例是否属于这个类的
    底层机制：只要当前类出现在实例的原型上，结果都是 true
    不能检测基本数据类型

  - constructor

    支持基本类型
    constructor 可以随便改，也不准

  * Object.prototype.toString.call([val])

    返回当前实例所属类信息
    判断 Target 的类型，单单用 typeof 并无法完全满足，这其实并不是 bug，本质原因是 JS 的万物皆对象的理论。因此要真正完美判断时，我们需要区分对待:

  基本类型(null): 使用 String(null)
  基本类型(string / number / boolean / undefined) + function: - 直接使用 typeof 即可
  其余引用类型(Array / Date / RegExp Error): 调用 toString 后根据[object XXX]进行判断

* 实现一个通用方法

  ```js
  function getType(data) {
    const basicType = typeof data;
    if (basicType !== "object") {
      return basicType;
    }
    return Object.prototype.toString
      .call(data)
      .replace(/^\[object \S+\]$/, "$1"); //注意正则中间有个空格

    //type.toLowerCase();
  }
  ```

## 数据类型转换

在 js 类型转换中只有 3 种情况

- 转换为布尔值
- 转换为数字
- 转换为字符串

![转换规则](/images/tranfore.png)

![转换规则1](/images/tranfore1.png)

![转换规则2](/images/tranfore2.png)

```js
[] == []; //false
null == 0; // false
null == ""; //false
// 如果其中一个null 或者 undefined，那么另一个操作符必须为 null 或者
// undefined，才会返回 true，否则都返回 false；

// 如果其中一个是 Symbol 类型，那么返回 false；
void 0 == undefined; //true
void 0 == null; //false
```

## this

:::warning
首先，new 的方式优先级最高，接下来是 bind 这些函数，然后是 obj.foo() 这种调用方式，最后是 foo 这种调用方式，同时，箭头函数的 this 一旦被绑定，就不会再被任何方式所改变。
:::
![this](/images/this.png)

## apply/call/bind

![this](/images/apply.png)

```js
func.call(thisArg, param1, param2, ...)
func.apply(thisArg, [param1,param2,...])
func.bind(thisArg, param1, param2, ...)
```

- 实现 bind

  ```js
  Function.prototype.myBind = function (context = window, ...args) {
    // context 是 bind 传入的 this
    // args 是 bind 传入的各个参数
    // this表示调用bind的函数
    let self = this; // fn.bind(obj) self就是fn

    //返回了一个函数，...innerArgs为实际调用时传入的参数
    let fBound = function (...innerArgs) {
      //this instanceof fBound为true表示构造函数的情况。如new func.bind(obj)
      // 当作为构造函数时，this 指向实例，此时 this instanceof fBound 结果为 true，可以让实例获得来自绑定函数的值
      // 当作为普通函数时，this 默认指向 window，此时结果为 false，将绑定函数的 this 指向 context
      return self.apply(
        // 函数执行
        this instanceof fBound ? this : context,
        args.concat(innerArgs) // 拼接参数
      );
    };

    // 如果绑定的是构造函数，那么需要继承构造函数原型属性和方法：保证原函数的原型对象上的属性不丢失
    // 实现继承的方式: 使用Object.create
    fBound.prototype = Object.create(this.prototype);
    return fBound;
  };
  ```

* 实现 call

  ```js
  function myCall(context=window, ...reset) {
    if (typeof context !== 'object') context = new Object(context) // 值类型，变为对象
    context.fn = this;
    let resut = context.fn(...reset);
    // 删除fn
    delect context.fn
    return result
  }
  ```

- 实现 apply

  ```js
  function myApply(context=window, ...reset) {
    if (typeof context !== 'object') context = new Object(context) // 值类型，变为对象
    let key = Symbo();
     // 在context上加一个唯一值，不会出现属性名称的覆盖
    context[key] = this;
    let result = context[key](...reset);
    delect context[key] //不删除会导致context属性越来越多
    return result
  }
  ```

## 执行上下文

当执行 js 代码时会产生 3 种执行上下文

- 全局执行上下文

* 函数执行上下文

- eval 执行上下文

每个执行上下文中都有三个重要的属性

- 变量对象（VO），包含变量、函数声明和函数的形参，该属性只能在全局上下文中访问
- 作用域链（JS 采用词法作用域，也就是说变量的作用域是在定义时就决定了）
- this

代码执行过程:

- 创建 全局上下文 (global EC)
- 全局执行上下文 (caller) 逐行 自上而下 执行。遇到函数时，函数执行上下文 (callee) 被 push 到执行栈顶层
- 函数执行上下文被激活，成为 active EC, 开始执行函数中的代码，caller 被挂起
- 函数执行完后，callee 被 pop 移除出执行栈，控制权交还全局上下文 (caller)，继续执行

## 作用域

- 作用域： 作用域是定义变量的区域，它有一套访问变量的规则，这套规则来管理浏览器引擎如何在当前作用域以及嵌套的作用域中根据变量（标识符）进行变量查找
- 作用域链： 作用域链的作用是保证对执行环境有权访问的所有变量和函数的有序访问，通过作用域链，我们可以访问到外层环境的变量和 函数。

作用域分为 3 种类型

- 全局作用域

  全局变量是挂载在 window 对象下的变量，所以在网页中的任何位置你都可以使用并且访问到这个全局变量

- 函数作用域

  函数中定义的变量叫作函数变量，这个时候只能在函数内部才能访问到它，所以它的作用域也就是函数的内部，称为函数作用域

- 块级作用域 ES6 中的 let、const 就可以产生该作用域

  ES6 中新增了块级作用域，最直接的表现就是新增的 let 关键词，使用 let 关键词定义的变量只能在块级作用域中被访问，有“暂时性死区”的特点，也就是说这个变量在定义之前是不能被使用的。
  在 JS 编码过程中 if 语句及 for 语句后面 {...} 这里面所包括的，就是块级作用域

首先作用域链是在定义时就被确定下来的，和箭头函数里的 this 一样，后续不会改变，JS 会一层层往上寻找需要的内容。
其实作用域链这个东西我们在闭包小结中已经看到过它的实体了：[[Scopes]]

## 闭包

闭包的本质：当前环境中存在指向父级作用域的引用
因为通常情况下，函数内部变量是无法在外部访问的（即全局变量和局部变量的区别），因此使用闭包的作用，就具备实现了能在外部访问某个函数内部变量的功能，让这些内部变量的值始终可以保存在内存中。
闭包其实就是一个可以访问其他函数内部变量的函数。创建闭包的最常见的方式就是在一个函数内创建另一个函数，创建的函数可以 访问到当前函数的局部变量。

- 闭包的用途

  闭包的第一个用途是使我们在函数外部能够访问到函数内部的变量。通过使用闭包，我们可以通过在外部调用闭包函数，从而在外部访问到函数内部的变量，可以使用这种方法来创建私有变量。
  函数的另一个用途是使已经运行结束的函数上下文中的变量对象继续留在内存中，因为闭包函数保留了这个变量对象的引用，所以这个变量对象不会被回收。

## new

使用 new 进行了以下 4 步工作

- 创建一个新对象
- 对象连接到构造函数原型上，并绑定 this（this 指向新对象）
- 执行构造函数代码（为这个新对象添加属性）
- 返回新对象

```js
function create(fn, ...args) {
  if (typeof fn !== "function") {
    throw "fn must be a function";
  }
  // 1、用new Object() 的方式新建了一个对象obj
  // var obj = new Object()
  // 2、给该对象的__proto__赋值为fn.prototype，即设置原型链
  // obj.__proto__ = fn.prototype

  // 1、2步骤合并
  // 创建一个空对象，且这个空对象继承构造函数的 prototype 属性
  // 即实现 obj.__proto__ === constructor.prototype
  var obj = Object.create(fn.prototype);

  // 3、执行fn，并将obj作为内部this。使用 apply，改变构造函数 this 的指向到新建的对象，这样 obj 就可以访问到构造函数中的属性
  var res = fn.apply(obj, args);
  // 4、如果fn有返回值，则将其作为new操作返回内容，否则返回obj
  return res instanceof Object ? res : obj;
}
```

## 原型和原型链

- 原型(prototype):

  一个简单的对象，用于实现对象的 属性继承。可以简单的理解成对象的爹。在 Firefox 和 Chrome 中，每个 JavaScript 对象中都包含一个\_\_proto\_\_ (非标准)的属性指向它爹(该对象的原型)，可 obj.\_\_proto\_\_ 进行访问。

- 构造函数:

  可以通过 new 来 新建一个对象 的函数。

- 实例:

  通过构造函数和 new 创建出来的对象，便是实例。 实例通过\_\_proto\_\_ 指向原型，通过 constructor 指向构造函数。

- 三者关系:

  实例.\_\_proto\_\_ === 原型
  原型.constructor === 构造函数
  构造函数.prototype === 原型

![原型链](/images/prototype.png)

- 每个函数都有 prototype 属性，除了 Function.prototype.bind()，该属性指向原型。
- 每个对象都有 \_\_proto\_\_ 属性，指向了创建该对象的构造函数的原型。其实这个属性指向了 [[prototype]]，但是 [[prototype]]是内部属性，我们并不能访问到，所以使用 *proto*来访问。
- 对象可以通过 \_\_proto\_\_ 来寻找不属于该对象的属性，\_\_proto\_\_ 将对象连接起来组成了原型链。

```js
// 注意
Function.__proto__ === Function.prototype;
Object.__proto__ === Function.prototyp;
```

## 继承

```

```

```

```

```

```
