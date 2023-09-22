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

+ 变量

  在 Rust 中，变量默认是不可变的，需要显示声明可变

  ```rust
  let foo=5; //不可变 变量
  let mut bananas = 5; // 可变 变量
  let mut guess = String::new(); //创建了一个可变变量，绑定到一个新的 String 空实例上
  ```

  `::` 语法表明 `new` 是 `String` 类型的一个 **关联函数**（*associated function*）。关联函数是针对类型实现的，一些语言中把它称为 **静态方法**（*static method*）。

+ 输出

  变量将会替换字符串大括号中对应的位置

  ```rust
  let guess=10   
  println!("You guessed: {guess}"); // You guessed: 10
  println!("You guessed: {}",guess); // 结果同上面一致
  println!("x = {guess} and guessed + 2 = {}", guessed + 2);//x=10 and guessed+2=12
  ```

  