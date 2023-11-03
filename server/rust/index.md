# Rust 入门

## 安装Rust

+ 官网下载 [入门 - Rust 程序设计语言 (rust-lang.org)](https://www.rust-lang.org/zh-CN/learn/get-started)
+ 文档手册[[Rust 程序设计语言 - Rust 程序设计语言 简体中文版 (kaisery.github.io)](https://kaisery.github.io/trpl-zh-cn/title-page.html)]

## Rust 命令介绍

您在安装 Rustup 时，也会安装 Rust 构建工具和包管理器的最新稳定版，即 Cargo。Cargo 可以做很多事情：

- `cargo build` 可以构建项目
- `cargo run` 可以运行项目
- `cargo test` 可以测试项目
- `cargo doc` 可以为项目构建文档
- `cargo publish` 可以将库发布到 [crates.io](https://crates.io/)。

## 创建项目

```rust
cargo new hello-rust  // 创建一个新项目 hell-rust 
```

生成的hell-rust 新目录下包含 以下文件

- Cargo.toml  为 Rust 的清单文件。其中包含了项目的元数据和依赖库。
- `src/main.rs` 为编写应用代码的地方。

## 依赖管理

在Cargo.toml  文件中添加需要的依赖

```rust
[dependencies]
ferris-says = "0.2"
```

执行 cargo build 命令将安装依赖，且会生成一个`Cargo.lock`，该文件记录了本地所用依赖库的精确版本

## 开发

+ 使用依赖

  ```rust
  use std::io; // 通过use 引入使用 此处引用io 输入标准库的方法
  use rand::Rng;
  ```

+ 类型

  Rust 是 **静态类型**（*statically typed*）语言，也就是说在编译时就必须知道所有变量的类型。根据值及其使用方式，编译器通常可以推断出我们想要用的类型。

  + 标量类型 

    **标量**（*scalar*）类型代表一个单独的值。Rust 有四种基本的标量类型：整型、浮点型、布尔类型和字符类型。你可能在其他语言中见过它们。让我们深入了解它们在 Rust 中是如何工作的。

    + 整型：是一个没有小数部分的数字，**有符号** 和 **无符号** 代表数字能否为负值

       Rust 中的整型

      | 长度    | 有符号  | 无符号  |
      | ------- | ------- | ------- |
      | 8-bit   | `i8`    | `u8`    |
      | 16-bit  | `i16`   | `u16`   |
      | 32-bit  | `i32`   | `u32`   |
      | 64-bit  | `i64`   | `u64`   |
      | 128-bit | `i128`  | `u128`  |
      | arch    | `isize` | `usize` |

      每一个有符号的变体可以储存包含从 -(2n - 1) 到 2n - 1 - 1 在内的数字，这里 *n* 是变体使用的位数。所以 `i8` 可以储存从 -(27) 到 27 - 1 在内的数字，也就是从 -128 到 127。无符号的变体可以储存从 0 到 2n - 1 的数字，所以 `u8` 可以储存从 0 到 28 - 1 的数字，也就是从 0 到 255。

      另外，`isize` 和 `usize` 类型依赖运行程序的计算机架构：64 位架构上它们是 64 位的，32 位架构上它们是 32 位的。

      可以使用表格 3-2 中的任何一种形式编写数字字面值。请注意可以是多种数字类型的数字字面值允许使用类型后缀，例如 `57u8` 来指定类型，同时也允许使用 `_` 做为分隔符以方便读数，例如`1_000`，它的值与你指定的 `1000` 相同。

      表格 3-2: Rust 中的整型字面值

      | 数字字面值                    | 例子          |
      | ----------------------------- | ------------- |
      | Decimal (十进制)              | `98_222`      |
      | Hex (十六进制)                | `0xff`        |
      | Octal (八进制)                | `0o77`        |
      | Binary (二进制)               | `0b1111_0000` |
      | Byte (单字节字符)(仅限于`u8`) | `b'A'`        |

      那么该使用哪种类型的数字呢？如果拿不定主意，Rust 的默认类型通常是个不错的起点，数字类型默认是 `i32`。`isize` 或 `usize` 主要作为某些集合的索引。

      > ##### [整型溢出](https://kaisery.github.io/trpl-zh-cn/ch03-02-data-types.html#整型溢出)
      >
      > 比方说有一个 `u8` ，它可以存放从零到 `255` 的值。那么当你将其修改为 `256` 时会发生什么呢？这被称为 “整型溢出”（“integer overflow” ），这会导致以下两种行为之一的发生。当在 debug 模式编译时，Rust 检查这类问题并使程序 *panic*，这个术语被 Rust 用来表明程序因错误而退出。第九章 [“`panic!` 与不可恢复的错误”](https://kaisery.github.io/trpl-zh-cn/ch09-01-unrecoverable-errors-with-panic.html) 部分会详细介绍 panic。
      >
      > 使用 `--release` flag 在 release 模式中构建时，Rust **不会**检测会导致 panic 的整型溢出。相反发生整型溢出时，Rust 会进行一种被称为二进制补码 wrapping（*two’s complement wrapping*）的操作。简而言之，比此类型能容纳最大值还大的值会回绕到最小值，值 `256` 变成 `0`，值 `257` 变成 `1`，依此类推。程序不会 panic，不过变量可能也不会是你所期望的值。依赖整型溢出 wrapping 的行为被认为是一种错误。
      >
      > 为了显式地处理溢出的可能性，可以使用这几类标准库提供的原始数字类型方法：
      >
      > - 所有模式下都可以使用 `wrapping_*` 方法进行 wrapping，如 `wrapping_add`
      > - 如果 `checked_*` 方法出现溢出，则返回 `None`值
      > - 用 `overflowing_*` 方法返回值和一个布尔值，表示是否出现溢出
      > - 用 `saturating_*` 方法在值的最小值或最大值处进行饱和处理

      #### [浮点型](https://kaisery.github.io/trpl-zh-cn/ch03-02-data-types.html#浮点型)

      Rust 也有两个原生的 **浮点数**（*floating-point numbers*）类型，它们是带小数点的数字。Rust 的浮点数类型是 `f32` 和 `f64`，分别占 32 位和 64 位。默认类型是 `f64`，因为在现代 CPU 中，它与 `f32` 速度几乎一样，不过精度更高。所有的浮点型都是有符号的。

      这是一个展示浮点数的实例：

      文件名：src/main.rs

      ```rust
      fn main() {
          let x = 2.0; // f64
      
          let y: f32 = 3.0; // f32
      }
      ```

      浮点数采用 IEEE-754 标准表示。`f32` 是单精度浮点数，`f64` 是双精度浮点数。

      #### [数值运算](https://kaisery.github.io/trpl-zh-cn/ch03-02-data-types.html#数值运算)

      Rust 中的所有数字类型都支持基本数学运算：加法、减法、乘法、除法和取余。整数除法会向零舍入到最接近的整数。下面的代码展示了如何在 `let` 语句中使用它们：

      文件名：src/main.rs

      ```rust
      fn main() {
          // addition
          let sum = 5 + 10;
      
          // subtraction
          let difference = 95.5 - 4.3;
      
          // multiplication
          let product = 4 * 30;
      
          // division
          let quotient = 56.7 / 32.2;
          let truncated = -5 / 3; // 结果为 -1
      
          // remainder
          let remainder = 43 % 5;
      }
      ```

      这些语句中的每个表达式使用了一个数学运算符并计算出了一个值，然后绑定给一个变量。[附录 B](https://kaisery.github.io/trpl-zh-cn/appendix-02-operators.html) 包含 Rust 提供的所有运算符的列表。

      #### [布尔型](https://kaisery.github.io/trpl-zh-cn/ch03-02-data-types.html#布尔型)

      正如其他大部分编程语言一样，Rust 中的布尔类型有两个可能的值：`true` 和 `false`。Rust 中的布尔类型使用 `bool` 表示。例如：

      文件名：src/main.rs

      ```rust
      fn main() {
          let t = true;
      
          let f: bool = false; // with explicit type annotation
      }
      ```

      使用布尔值的主要场景是条件表达式，例如 `if` 表达式。在 [“控制流”（“Control Flow”）](https://kaisery.github.io/trpl-zh-cn/ch03-05-control-flow.html#控制流) 部分将介绍 `if` 表达式在 Rust 中如何工作。

      #### [字符类型](https://kaisery.github.io/trpl-zh-cn/ch03-02-data-types.html#字符类型)

      Rust 的 `char` 类型是语言中最原生的字母类型。下面是一些声明 `char` 值的例子：

      文件名：src/main.rs

      ```rust
      fn main() {
          let c = 'z';
          let z: char = 'ℤ'; // with explicit type annotation
          let heart_eyed_cat = '😻';
      }
      ```

      注意，我们用单引号声明 `char` 字面量，而与之相反的是，使用双引号声明字符串字面量。Rust 的 `char` 类型的大小为四个字节 (four bytes)，并代表了一个 Unicode 标量值（Unicode Scalar Value），这意味着它可以比 ASCII 表示更多内容。在 Rust 中，带变音符号的字母（Accented letters），中文、日文、韩文等字符，emoji（绘文字）以及零长度的空白字符都是有效的 `char` 值。Unicode 标量值包含从 `U+0000` 到 `U+D7FF` 和 `U+E000` 到 `U+10FFFF` 在内的值。不过，“字符” 并不是一个 Unicode 中的概念，所以人直觉上的 “字符” 可能与 Rust 中的 `char` 并不符合。

      

     + 复合类型

       **复合类型**（*Compound types*）可以将多个值组合成一个类型。Rust 有两个原生的复合类型：元组（tuple）和数组（array）

       + 元祖类型

         元组是一个将多个其他类型的值组合进一个复合类型的主要方式。元组长度固定：一旦声明，其长度不会增大或缩小， 用括号包含，逗号隔开

         ```rust
         
             let tup = (500, 6.4, 1);
             let (x, y, z) = tup; // 解构
          	let x: (i32, f64, u8) = (500, 6.4, 1);
             println("{x.0}"); // 500 使用.索引访问
         
         ```

       + 数组类型

         数组中的每个元素的类型必须相同。Rust 中的数组与一些其他语言中的数组不同，Rust 中的数组长度是固定的

         ```rust
         let a = [1,2,3] // 长度固定的一个整型数组
         let a: [i32; 5] = [1, 2, 3, 4, 5]; // i32 是每个元素的类型。分号之后，数字 5 表明该数组包含五个元素
         let a = [3; 5];  //变量名为 a 的数组将包含 5 个元素，这些元素的值最初都将被设置为 3。这种写法与 let a = [3, 3, 3, 3, 3];
         
         println("{a[1]}")
         ```

         vector 类型是标准库提供的一个 **允许** 增长和缩小长度的类似数组的集合类型

         

+ 函数

  Rust 代码中的函数和变量名使用 *snake case* 规范风格。在 snake case 中，所有字母都是小写并使用下划线分隔单词

  函数使用 fn 定义

  在函数签名中，**必须** 声明每个参数的类型。

  ```rust
  fn test(value:i32){
      println("hello world! {value}")
  }
  fn five() -> i32 {   // 具有返回值 可使用return 提前返回，默认返回最后的表达式
      5
  }
  
  fn main() {
      let x = five();
      println!("The value of x is: {x}");
  }
  ```

  

+ 控制

  Rust 并不会尝试自动地将非布尔值转换为布尔值。 

  ```rust
  fn main() {
      let number = 6;
  
      if number % 4 == 0 {
          println!("number is divisible by 4");
      } else if number % 3 == 0 {
          println!("number is divisible by 3");
      } else if number % 2 == 0 {
          println!("number is divisible by 2");
      } else {
          println!("number is not divisible by 4, 3, or 2");
      }
  }
  
  ```

  

+ 遍历

  ```rust
  fn main(){
  // loop 关键字告诉 Rust 一遍又一遍地执行一段代码直到你明确要求停止。
     let mut a = 0;
     loop {
        println("123"); 
        a +=1;
        if a>10 {
            break;
         }
      }
   
   // while 循环体
   while a < 10 {
   	  println("123"); 
        a +=1;  
   }
      
   // for 循环体
   let a = [10, 20, 30, 40, 50];
   for element in a {
      println!("the value is: {element}");
   }
  for number in (1..4).rev() {  // rev 反转range
  	println!("{number}!");
  }
  }
  ```

  

+ 变量

  在 Rust 中，变量默认是不可变的，需要显示声明可变

  ```rust
  let foo=5; //不可变 变量
  let mut bananas = 5; // 可变 变量
  let mut guess = String::new(); //创建了一个可变变量，绑定到一个新的 String 空实例上
  ```

  `::` 语法表明 `new` 是 `String` 类型的一个 **关联函数**（*associated function*）。关联函数是针对类型实现的，一些语言中把它称为 **静态方法**（*static method*）。

  + 常量 const 

    不可改变的值，且必须声明值的类型

    ```rust
    const Num: u32 = 60 * 60 * 3;
    ```

  + `mut` 与隐藏的另一个区别是，当再次使用 `let` 时，实际上创建了一个新变量，我们可以改变值的类型，并且复用这个名字。例如，假设程序请求用户输入空格字符来说明希望在文本之间显示多少个空格，接下来我们想将输入存储成数字（多少个空格）：

    ```rust
        let spaces = 1;  //1
        let spaces = 5   //5
        
        let mut space = 10
        space=20  //20
    ```

+ 引用与复制

  ```rust
  let s1 = String::from("hello") //定义了一个字符串 栈中存放了地址 长度 堆中存放内容
  let s2 =s1  // 创建一个新变量 指向s1的内容 ，不会复制一份，相当于浅拷贝
  let s3 = s2.clone(); // 深拷贝可用clone 
  println("{s1}{s2}") // error  s1 将被清除，此为无效引用，
  
  
  fn main() {
      let s = String::from("hello");  // s 进入作用域
  
      takes_ownership(s);             // s 的值移动到函数里 ...
                                      // ... 所以到这里不再有效
  
      let x = 5;                      // x 进入作用域
  
      makes_copy(x);                  // x 应该移动函数里，
                                      // 但 i32 是 Copy 的，
                                      // 所以在后面可继续使用 x
  
  } // 这里，x 先移出了作用域，然后是 s。但因为 s 的值已被移走，
    // 没有特殊之处
  
  fn takes_ownership(some_string: String) { // some_string 进入作用域
      println!("{}", some_string);
  } // 这里，some_string 移出作用域并调用 `drop` 方法。
    // 占用的内存被释放
  
  fn makes_copy(some_integer: i32) { // some_integer 进入作用域
      println!("{}", some_integer);
  } // 这里，some_integer 移出作用域。没有特殊之处
  
  
  // 引用
  fn main() {
      let s1 = String::from("hello");
  
      let len = calculate_length(&s1);  // 这里使用 &  使用值但不获取所有权 因此s1 不受影响,引用（默认）不允许修改引用的值。
  	let len = change(&mut s1); // 可变引用许修改引用的值
      println!("The length of '{}' is {}.", s1, len); // 正常打印 hello
  }
  
  fn calculate_length(s: &String) -> usize {
      s.len()
  }
  fn change(some_string: &mut String) {
      some_string.push_str(", world");
  }
  
  ```
  
  Rust 有一个叫做 `Copy` trait 的特殊注解，可以用在类似整型这样的存储在栈上的类型上（[第十章](https://kaisery.github.io/trpl-zh-cn/ch10-00-generics.html)将会详细讲解 trait）。如果一个类型实现了 `Copy` trait，那么一个旧的变量在将其赋值给其他变量后仍然可用。
  
  - 所有整数类型，比如 `u32`。
  - 布尔类型，`bool`，它的值是 `true` 和 `false`。
  - 所有浮点数类型，比如 `f64`。
  - 字符类型，`char`。
  - 元组，当且仅当其包含的类型也都实现 `Copy` 的时候。比如，`(i32, i32)` 实现了 `Copy`，但 `(i32, String)` 就没有。
  
  变量的所有权总是遵循相同的模式：将值赋给另一个变量时移动它。当持有堆中数据值的变量离开作用域时，其值将通过 `drop` 被清理掉，除非数据被移动为另一个变量所有。
  
  ### [引用的规则](https://kaisery.github.io/trpl-zh-cn/ch04-02-references-and-borrowing.html#引用的规则)
  
  - 在任意给定时间，**要么** 只能有一个可变引用，**要么** 只能有多个不可变引用。
  - 引用必须总是有效的。
  
+ 输出

  变量将会替换字符串大括号中对应的位置

  ```rust
  let guess=10   
  println!("You guessed: {guess}"); // You guessed: 10
  println!("You guessed: {}",guess); // 结果同上面一致
  println!("x = {guess} and guessed + 2 = {}", guessed + 2);//x=10 and guessed+2=12
  ```

  
