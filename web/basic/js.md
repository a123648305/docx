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

es5 继承的几种方法

```js
// 定义父类构造函数
function Parent(name) {
  this.name = name; // 公有属性
  // let sex = "men"; // 私有属性
}
Parent.prototype.say = function (msg) {
  console.log(msg);
};
//静态成员 对应class 里的static
Parent.walk = function () {
  console.log("static");
};
```

- 借用 call 继承

  ```js
  function Son(name, age) {
    this.age = age;
    Parent.call(this, name);
  }

  const instance = new Son(11, 22);
  ```

  :::warning
  无法继承父类的原型方法
  :::

- 借用原型链 继承

  ```js
  function Son(name, age) {
    this.age = age;
  }
  Son.prototype = new Parent();
  ```

  :::warning
  可以访问父类的方法和原型，但多个实例会共享同一个对象
  :::

- 组合式 继承

  ```js
  function Son(name, age) {
    this.age = age;
    Parent.call(this, name);
  }
  Son.prototype = new Parent();
  ```

  :::warning
  通过组合上面 2 种方式，可以正常继承，但存在调用了 2 次父类的构造函数
  :::

- 寄生组合 继承
  ```js
  function Son(name, age) {
    this.age = age;
    Parent.call(this, name);
  }
  Son.prototype = Object.create(Parent.prototype);
  Son.prototype.constructor = Son;
  ```
  :::warning
  通过对组合式继承进行优化，得到最接近 es6 calss 的继承方式
  :::

## 垃圾回收 GC

对于在 JavaScript 中的字符串，对象，数组是没有固定大小的，只有当对他们进行动态分配存储时，解释器就会分配内存来存储这些数据，当 JavaScript 的解释器消耗完系统中所有可用的内存时，就会造成系统崩溃。
内存泄漏，在某些情况下，不再使用到的变量所占用内存没有及时释放，导致程序运行中，内存越占越大，极端情况下可以导致系统崩溃，服务器宕机。JavaScript 有自己的一套垃圾回收机制，JavaScript 的解释器可以检测到什么时候程序不再使用这个对象了（数据），就会把它所占用的内存释放掉。
针对 JavaScript 的来及回收机制有以下两种方法（常用）：标记清除，引用计数

- 标记清除

  v8 的垃圾回收机制基于分代回收机制，这个机制又基于世代假说，这个假说有两个特点，一是新生的对象容易早死，另一个是不死的对象会活得更久。基于这个假说，v8 引擎将内存分为了新生代和老生代。

新创建的对象或者只经历过一次的垃圾回收的对象被称为新生代。经历过多次垃圾回收的对象被称为老生代。
新生代被分为 From 和 To 两个空间，To 一般是闲置的。当 From 空间满了的时候会执行 Scavenge 算法进行垃圾回收。当我们执行垃圾回收算法的时候应用逻辑将会停止，等垃圾回收结束后再继续执行。
这个算法分为三步：

首先检查 From 空间的存活对象，如果对象存活则判断对象是否满足晋升到老生代的条件，如果满足条件则晋升到老生代。如果不满足条件则移动 To 空间。
如果对象不存活，则释放对象的空间。
最后将 From 空间和 To 空间角色进行交换。
新生代对象晋升到老生代有两个条件：

第一个是判断是对象否已经经过一次 Scavenge 回收。若经历过，则将对象从 From 空间复制到老生代中；若没有经历，则复制到 To 空间。
第二个是 To 空间的内存使用占比是否超过限制。当对象从 From 空间复制到 To 空间时，若 To 空间使用超过 25%，则对象直接晋升到老生代中。设置 25% 的原因主要是因为算法结束后，两个空间结束后会交换位置，如果 To 空间的内存太小，会影响后续的内存分配。
老生代采用了标记清除法和标记压缩法。标记清除法首先会对内存中存活的对象进行标记，标记结束后清除掉那些没有标记的对象。由于标记清除后会造成很多的内存碎片，不便于后面的内存分配。所以了解决内存碎片的问题引入了标记压缩法。

由于在进行垃圾回收的时候会暂停应用的逻辑，对于新生代方法由于内存小，每次停顿的时间不会太长，但对于老生代来说每次垃圾回收的时间长，停顿会造成很大的影响。 为了解决这个问题 V8 引入了增量标记的方法，将一次停顿进行的过程分为了多步，每次执行完一小步就让运行逻辑执行一会，就这样交替运行

## 内存泄漏

内存泄漏是指定义的变量或引用未能正常经过 GC 回收，导致 js 内存增加
主要导致因素：

- 意外的全局变量: 无法被回收

  由于使用未声明的变量，而意外的创建了一个全局变量，而使这个变量一直留在内存中无法被回收。

- 定时器: 未被正确关闭，导致所引用的外部变量无法被释放

  设置了 setInterval 定时器，而忘记取消它，如果循环函数有对外部变量的引用的话，那么这个变量会被一直留在内存中，而无法被回收。

- 事件监听: 没有正确销毁 (低版本浏览器可能出现)

  获取一个 DOM 元素的引用，而后面这个元素被删除，由于我们一直保留了对这个元素的引用，所以它也无法被回收。

- 闭包

  不合理的使用闭包，从而导致某些变量一直被留在内存当中。

- dom 引用:

  dom 元素被删除时，内存中的引用未被正确清空

- 控制台 console.log 打印的东西

  可用 chrome 中的 timeline 进行内存标记，可视化查看内存的变化情况，找出异常点。

[内存泄漏排查方法](https://juejin.cn/post/6947841638118998029?utm_source=gold_browser_extension)

## 深浅拷贝

## 防抖、节流

- 函数防抖 是指在事件被触发 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时。这可以使用在一些点击请求的事件上，避免因为用户的多次点击向后端发送多次请求。
- 函数节流 是指规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。节流可以使用在 scroll 函数的事件监听上，通过事件节流来降低事件调用的频率。

```js
// 防抖
function debounce(fn, delay) {
  let timer = null;
  return function () {
    let context = this,
      args = arguments;
    if (timer) {
      clearTimeou(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

// 节流
function throttle(fn, delay) {
  let lastTime = 0,
    nowTime = +new Date(); //Date.now()
  return function () {
    let context = this;
    args = arguments;

    if (nowTime - lastTime >= delay) {
      lastTime = nowTime;
      return fn.apply(args, arguments);
    }
  };
}
```

```

```

```

```

```

```
