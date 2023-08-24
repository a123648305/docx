## Typescript 快速入门

## 类型声明

在变量后面使用冒号声明类型

```typescript
const foo:string='123'; //定义类型为string 的变量 
function getVal(str:string):void{
    console.log(str.toString())
}
```

## 类型推断

省略类型 或者 未写类型 时TS 将根据场景自动推断类型

```typescript
const foo=123; // 将自动推断类型为number
```

## any 、unknown  、never类型 

+ any 类型

  ```typescript
  //在此类型下，只要语法没有错误，ts就不会报错，相当于js 定义。
  let foo:any;
  foo=123;
  foot='abc';
  ```

+ unknown 类型

  - `unknown`类型的变量，不能直接赋值给其他类型的变量（除了`any`类型和`unknown`类型）

  - 不能直接调用`unknown`类型变量的方法和属性。
  - `unknown`类型变量能够进行的运算是有限的，只能进行比较运算

  ```typescript
  let a:unknown={ foo: 123 };
  a.foo //ts err
  let b:string=a; // ts err
  let c:any=a;
  a + 1 // ts err
  a === 1 
  if (typeof a === 'number') {
    let r = a + 10; // 正确
  }
  ```

  

+ never 类型

  类型是`never`，就不可能赋给它任何值，否则都会报错

  ``` typescript
  function fn(x:string|number) {
    if (typeof x === 'string') {
      // ...
    } else if (typeof x === 'number') {
      // ...
    } else {
      x; // never 类型
    }
  }
  ```

  ## 基础类型

  JavaScript 语言（注意，不是 TypeScript）将值分成8种类型。

  - boolean
  - string
  - number
  - bigint
  - symbol
  - object
  - undefined
  - null

  TypeScript 继承了 JavaScript 的类型设计，以上8种类型可以看作 TypeScript 的基本类型。

  注意，上面所有类型的名称都是小写字母，首字母大写的`Number`、`String`、`Boolean`等在 JavaScript 语言中都是内置对象，而不是类型名称。

  另外，undefined 和 null 既可以作为值，也可以作为类型，取决于在哪里使用它们。

  这8种基本类型是 TypeScript 类型系统的基础，复杂类型由它们组合而成。

  以下是它们的简单介绍。

  ### boolean 类型

  `boolean`类型只包含`true`和`false`两个布尔值。

  ```
  const x:boolean = true;
  const y:boolean = false;
  ```

  上面示例中，变量`x`和`y`就属于 boolean 类型。

  ### string 类型

  `string`类型包含所有字符串。

  ```
  const x:string = 'hello';
  const y:string = `${x} world`;
  ```

  上面示例中，普通字符串和模板字符串都属于 string 类型。

  ### number 类型

  `number`类型包含所有整数和浮点数。

  ```
  const x:number = 123;
  const y:number = 3.14;
  const z:number = 0xffff;
  ```

  上面示例中，整数、浮点数和非十进制数都属于 number 类型。

  ### bigint 类型

  bigint 类型包含所有的大整数。

  ```
  const x:bigint = 123n;
  const y:bigint = 0xffffn;
  ```

  上面示例中，变量`x`和`y`就属于 bigint 类型。

  bigint 与 number 类型不兼容。

  ```
  const x:bigint = 123; // 报错
  const y:bigint = 3.14; // 报错
  ```

  上面示例中，`bigint`类型赋值为整数和小数，都会报错。

  注意，bigint 类型是 ES2020 标准引入的。如果使用这个类型，TypeScript 编译的目标 JavaScript 版本不能低于 ES2020（即编译参数`target`不低于`es2020`）。

  ### symbol 类型

  symbol 类型包含所有的 Symbol 值。

  ```
  const x:symbol = Symbol();
  ```

  上面示例中，`Symbol()`函数的返回值就是 symbol 类型。

  symbol 类型的详细介绍，参见《Symbol》一章。

  ### object 类型

  根据 JavaScript 的设计，object 类型包含了所有对象、数组和函数。

  ```
  const x:object = { foo: 123 };
  const y:object = [1, 2, 3];
  const z:object = (n:number) => n + 1;
  ```

  上面示例中，对象、数组、函数都属于 object 类型。

  ### undefined 类型，null 类型

  undefined 和 null 是两种独立类型，它们各自都只有一个值。

  undefined 类型只包含一个值`undefined`，表示未定义（即还未给出定义，以后可能会有定义）。

  ```
  let x:undefined = undefined;
  ```

  上面示例中，变量`x`就属于 undefined 类型。两个`undefined`里面，第一个是类型，第二个是值。

  null 类型也只包含一个值`null`，表示为空（即此处没有值）。

  ```
  const x:null = null;
  ```

  上面示例中，变量`x`就属于 null 类型。

  注意，如果没有声明类型的变量，被赋值为`undefined`或`null`，它们的类型会被推断为`any`。

  ```
  let a = undefined;   // any
  const b = undefined; // any
  
  let c = null;        // any
  const d = null;      // any
  ```

  如果希望避免这种情况，则需要打开编译选项`strictNullChecks`。

  ```
  // 打开编译设置 strictNullChecks
  let a = undefined;   // undefined
  const b = undefined; // undefined
  
  let c = null;        // null
  const d = null;      // null
  ```

  上面示例中，打开编译设置`strictNullChecks`以后，赋值为`undefined`的变量会被推断为`undefined`类型，赋值为`null`的变量会被推断为`null`类型。

  ## 包装对象类型

  ### 包装对象的概念

  JavaScript 的8种类型之中，`undefined`和`null`其实是两个特殊值，`object`属于复合类型，剩下的五种属于原始类型（primitive value），代表最基本的、不可再分的值。

  - boolean
  - string
  - number
  - bigint
  - symbol

  上面这五种原始类型的值，都有对应的包装对象（wrapper object）。所谓“包装对象”，指的是这些值在需要时，会自动产生的对象。

  ```
  'hello'.charAt(1) // 'e'
  ```

  上面示例中，字符串`hello`执行了`charAt()`方法。但是，在 JavaScript 语言中，只有对象才有方法，原始类型的值本身没有方法。这行代码之所以可以运行，就是因为在调用方法时，字符串会自动转为包装对象，`charAt()`方法其实是定义在包装对象上。

  这样的设计大大方便了字符串处理，省去了将原始类型的值手动转成对象实例的麻烦。

  五种包装对象之中，symbol 类型和 bigint 类型无法直接获取它们的包装对象（即`Symbol()`和`BigInt()`不能作为构造函数使用），但是剩下三种可以。

  - `Boolean()`
  - `String()`
  - `Number()`

  以上三个构造函数，执行后可以直接获取某个原始类型值的包装对象。

  ```
  const s = new String('hello');
  typeof s // 'object'
  s.charAt(1) // 'e'
  ```

  上面示例中，`s`就是字符串`hello`的包装对象，`typeof`运算符返回`object`，不是`string`，但是本质上它还是字符串，可以使用所有的字符串方法。

  注意，`String()`只有当作构造函数使用时（即带有`new`命令调用），才会返回包装对象。如果当作普通函数使用（不带有`new`命令），返回就是一个普通字符串。其他两个构造函数`Number()`和`Boolean()`也是如此。

  ### 包装对象类型与字面量类型

  由于包装对象的存在，导致每一个原始类型的值都有包装对象和字面量两种情况。

  ```
  'hello' // 字面量
  new String('hello') // 包装对象
  ```

  上面示例中，第一行是字面量，第二行是包装对象，它们都是字符串。

  为了区分这两种情况，TypeScript 对五种原始类型分别提供了大写和小写两种类型。

  - Boolean 和 boolean
  - String 和 string
  - Number 和 number
  - BigInt 和 bigint
  - Symbol 和 symbol

  其中，大写类型同时包含包装对象和字面量两种情况，小写类型只包含字面量，不包含包装对象。

  ```
  const s1:String = 'hello'; // 正确
  const s2:String = new String('hello'); // 正确
  
  const s3:string = 'hello'; // 正确
  const s4:string = new String('hello'); // 报错
  ```

  上面示例中，`String`类型可以赋值为字符串的字面量，也可以赋值为包装对象。但是，`string`类型只能赋值为字面量，赋值为包装对象就会报错。

  建议只使用小写类型，不使用大写类型。因为绝大部分使用原始类型的场合，都是使用字面量，不使用包装对象。而且，TypeScript 把很多内置方法的参数，定义成小写类型，使用大写类型会报错。

  ```
  const n1:number = 1;
  const n2:Number = 1;
  
  Math.abs(n1) // 1
  Math.abs(n2) // 报错
  ```

  上面示例中，`Math.abs()`方法的参数类型被定义成小写的`number`，传入大写的`Number`类型就会报错。

  上一小节说过，`Symbol()`和`BigInt()`这两个函数不能当作构造函数使用，所以没有办法直接获得 symbol 类型和 bigint 类型的包装对象，除非使用下面的写法。但是，它们没有使用场景，因此`Symbol`和`BigInt`这两个类型虽然存在，但是完全没有使用的理由。

  ```
  let a = Object(Symbol());
  let b = Object(BigInt());
  ```

  上面示例中，得到的就是 Symbol 和 BigInt 的包装对象，但是没有使用的意义。

  注意，目前在 TypeScript 里面，`symbol`和`Symbol`两种写法没有差异，`bigint`和`BigInt`也是如此，不知道是否属于官方的疏忽。建议始终使用小写的`symbol`和`bigint`，不使用大写的`Symbol`和`BigInt`。

​       