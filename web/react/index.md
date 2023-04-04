# 准备阶段

- ① 快速开发模式

  通过 creat-react-app 命令创建项目模板（不包含 router 和 reduex）

  ```bash
  $ npx create-react-app demo
  $ cd demo
  $ npm run start
  ```

- ② 将 React 添加到现有应用程序

  要使用 Yarn 安装 React，请运行：

  ```bash
  $ yarn init
  $ yarn add react react-dom

  要使用 npm 安装 React，请运行：
  npm init
  npm install --save react react-dom

  ```

# 开始阶段

在 JSX 语法中，你可以在大括号内放置任何有效的  JavaScript 表达式。 （ps:vue 是双括号{{}}）

- CSS 配置 loader

安装 less，less-loader：
npm install less less-loader --save-dev 或者 yarn add less less-loader --save-dev

- webpack 4.0 中，我们只需要配置 webpack.config.js 文件即可。

  首先我们需要运行 npm run eject    来暴露 webpack 的配置文件，你会发现多了 config 为名的文件夹。如果这步报错没关系，其实我们只需要在之前运行  git add . 命令，然后再运行   git commit -m "init" 命令就可以解决。

* 3.最后是我们需要手动在 webpack.config.js 里配置 less：

  在 module 中做了三处修改  
  第一处是找到 `test: /\.css$/` 将其改为 `test: /\.(css|less)$/`
    第二处是增加 `less-loader`的配置  
    第三处是在 exclude 属性中增加 `/\.(css|less)$/`
  建议使用 sass pm install sass sass-loader --save-dev 不用配置

## 组件

- 创建组件：

  ```react
  import React, { Component } from 'react';

  import './index.css'
  import React from "react";
  class Other extends React.Component {
    constructor(props) { // 用于初始化 state
      super(props); // 使用 this 需要调用 react 的父类构造函数绑定 this
      this.state = {
        data: 100,
      };
    }
    componentDidMount() {
      console.log("other didmount");// 组件初次渲染
    }
    componentDidUpdate(){
        console.log('oter didupdate'); //组件已经更新
  this.setState({data:this.state.data+1}) // 更新 state 值 注意 setState 是异步执行的 101
  this.setState({data:this.state.data+1},()=>{
  console.log(this.state.data) //--->101 后输出 setState 是异步执行的
  })
  // 当改变依赖上一次的 state props 时 上面的另一种写法
  this.setState((prevState,prevProps)=>{
  return {
  data:prevState.data+1
  }
  })
  console.log(this.state.data) //--->100 先输出
    }
    shouldComponentUpdate(){
        console.log('souldUpdate'); //组件即将更新 return boolean 返回 false 则组件不更新不触发 componentDidupdate
        return true
    }
    componentWillUnmount() {
      console.log("other willUnmount"); // 组件即将销毁
    }
    changeData = function(val){
        this.setState({data:val}) // 更新 state 值 注意 setState 是异步执行的
    }
    render() {
      const { data } = this.state;
      return (

  <div className="Index">
  <h1>{data}</h1>
  <p onClick={()=>this.changeData(10)}>change</p>
  <p onClick={this.changeData.bind(this,10)}>change</p>
  </div>
  );
    }
  }
  export default Other;
  ```

* 引用组件

React 非常灵活，但它也有一个严格的规则：

所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。
当然，应用程序的 UI 是动态的，并会伴随着时间的推移而变化。 “state”。在不违反上述规则的情况下，state 允许 React 组件随用户操作、网络响应或者其他变化而动态更改输出内容。

构造函数

正确使用 state

## 生命周期

1.constructor
constructor 参数接受两个参数 props,context
可以获取到父组件传下来的的 props,context,如果你想在 constructor 构造函数内部(注意是内部哦，在组件其他地方是可以直接接收的)使用 props 或 context,则需要传入，并传入 super 对象。

```js
constructor(props,context) {
  super(props,context) // 将  props context  传递到父类的构造函数中
  console.log(this.props,this.context) // 在内部可以使用 props 和 context
}
```

当然如果你只需要在构造函数内使用 props 或者 context，那么只传入一个参数即可，如果都不可以，就都不传。
constructor 中应当做些初始化的动作，如：初始化 state，将事件处理函数绑定到类实例上，但也不要使用 setState()。如果没有必要初始化 state 或绑定方法，则不需要构造 constructor，或者把这个组件换成纯函数写法。
关于 ES6 的 class constructor 和 super
只要组件存在 constructor,就必要要写 super,否则 this 指向会错误

```js
constructor() {
  console.log(this) // 报错，this 指向错误
}
```

2.生 命 周 期
（1）初始化
<1>、getDefaultProps()
设置默认的 props，也可以用 dufaultProps 设置组件的默认属性.

<2>、getInitialState()
在使用 es6 的 class 语法时是没有这个钩子函数的，可以直接在 constructor 中定义 this.state。此时可以访问 this.props

<3>、componentWillMount()（react v17.0 中将移除）
组件初始化时调用，以后组件更新不调用，整个生命周期只调用一次，此时可以修改 state。在这个方法中调用 setState()不会起作用，是由于他在 render()前被调用。为了避免副作用和其他的订阅，官方都建议使用 componentDidMount()代替。这个方法是用于在服务器渲染上的唯一方法。
首屏无数据导致白屏
避免第一次渲染时页面因为没有获取到异步数据导致的白屏，而将数据请求部分的代码放在了 componentWillMount 中，希望可以避免白屏并提早异步请求的发送时间。但事实上在 componentWillMount 执行后，第一次渲染就已经开始了，所以如果在 componentWillMount 执行时还没有获取到异步数据的话，页面首次渲染时也仍然会处于没有异步数据的状态。换句话说，组件在首次渲染时总是会处于没有异步数据的状态，所以不论在哪里发送数据请求，都无法直接解决这一问题。而关于提早发送数据请求，官方也鼓励将数据请求部分的代码放在组件的 constructor 中，而不是 componentWillMount。
事件订阅
另一个常见的用例是在 componentWillMount 中订阅事件，并在 componentWillUnmount 中取消掉相应的事件订阅。但事实上 React 并不能够保证在 componentWillMount 被调用后，同一组件的 componentWillUnmount 也一定会被调用。一个当前版本的例子如服务端渲染时，componentWillUnmount 是不会在服务端被调用的，所以在 componentWillMount 中订阅事件就会直接导致服务端的内存泄漏。另一方面，在未来 React 开启异步渲染模式后，在 componentWillMount 被调用之后，组件的渲染也很有可能会被其他的事务所打断，导致 componentWillUnmount 不会被调用。而 componentDidMount 就不存在这个问题，在 componentDidMount 被调用后，componentWillUnmount 一定会随后被调用到，并根据具体代码清除掉组件中存在的事件订阅。

<4>、 render()
react 最重要的步骤，创建虚拟 dom，进行 diff 算法，更新 dom 树都在此进行。此时就不能更改 state 了。
返回的类型有以下几种：
原生的 DOM，如 div
React 组件
Fragment（片段）
Portals（插槽）
字符串和数字，被渲染成 text 节点
Boolean 和 null，不会渲染任何东西

<5>、componentDidMount()
组件渲染之后调用，只调用一次。组件第一次渲染完成，此时 dom 节点已经生成，可以在这里调用 ajax 请求，返回数据 setState 后组件会重新渲染。
DOM 元素（React Native 的原生元素）可以在这个方法里取到。这时可以在这个方法里执行数据获取等操作。如果需要的话，任何的 DOM 操作都可以在这里执行，绝对不可以在 render 方法里执行。
（2）更新

<6>、componentWillReceiveProps(nextProps)（react v17.0 中将移除）
组件初始化时不调用，组件接受新的 props 时调用。在接受父组件改变后的 props 需要重新渲染组件时用到的比较多。它接受一个参数 nextProps，通过对比 nextProps 和 this.props，将 nextProps setState 为当前组件的 state，从而重新渲染组件。

<7>、shouldComponentUpdate(nextProps, nextState)
react 性能优化非常重要的一环。唯一用于控制组件重新渲染的生命周期。组件接受新的 state 或者 props 时调用，我们可以设置在此对比前后两个 props 和 state 是否相同，如果相同则返回 false 阻止更新，因为相同的属性状态一定会生成相同的 dom 树，这样就不需要创造新的 dom 树和旧的 dom 树进行 diff 算法对比，节省大量性能，尤其是在 dom 结构复杂的时候。
因为 react 父组件的重新渲染会导致其所有子组件的重新渲染，这个时候其实我们是不需要所有子组件都跟着重新渲染的，因此需要在子组件的该生命周期中做判断。
返回 false 不会阻止子组件在 state 更改时重新渲染。官方并不建议在 shouldComponentUpdate()中进行深度查询或使用 JSON.stringify()，他效率非常低，并且损伤性能。
<8>、componentWillUpdate(nextProps, nextState)（react v17.0 中将移除）
组件初始化时不调用，只有在组件将要更新时才调用，此时可以修改 state。比如 nextProps.name = '新名字'， render 的时候就会用到更改后的值。不能直接调用 this.setState(), 这样会触发 shouldComponentUpdate(), 从而进入死循环。shouldComponentUpdate 返回 true 以后，组件进入重新渲染的流程。
与 componentWillReceiveProps 类似，许多开发者也会在 componentWillUpdate 中根据 props 的变化去触发一些回调。但不论是 componentWillReceiveProps 还是 componentWillUpdate，都有可能在一次更新中被调用多次，也就是说写在这里的回调函数也有可能会被调用多次，这显然是不可取的。与 componentDidMount 类似，一次更新中 componentDidUpdate 只会被调用一次，所以将原先写在 componentWillUpdate 中的回调迁移至 componentDidUpdate 就可以解决这个问题。

<9>、render()
组件渲染。render 函数会插入 jsx 生成的 dom 结构，react 会生成一份虚拟 dom 树，在每一次组件更新时，在此 react 会通过其 diff 算法比较更新前后的新旧 DOM 树，比较以后，找到最小的有差异的 DOM 节点，并重新渲染。react16 中 render 函数允许返回一个数组，单个字符串等，不在只限制为一个顶级 DOM 节点，可以减少很多不必要的 div。
如：(不要忘记给每个数组元素添加 key，防止出现警告)

换一种写法，可以不写 key（v16++）

<10>、componentDidUpdate(prevProps, prevState, snapshot)
组件初始化时不调用，组件更新完成后调用，此时可以获取 dom 节点，可以执行 DOM 操作，这也是一个适合发送请求的地方。组件更新完毕后，react 只会在第一次初始化成功会进入 componentDidmount,之后每次重新渲染后都会进入这个生命周期，这里可以拿到 prevProps 和 prevState，即更新前的 props 和 state。
（3）卸载

<11>、componentWillUnmount()
组件将要卸载时调用，一些事件监听和定时器需要在此时清除。
1.clear 你在组建中所有的 setTimeout,setInterval 2.移除所有组建中的监听 removeEventListener 3.也许你会经常遇到这个 warning
（4） react v16 新增生命周期

<12>、 getDerivedStateFromProps(nextProps, prevState)
如果是由于父组件的 props 更改，所带来的重新渲染，也会触发此方法。需要注意，这个方法是个 static 的方法，因此使用 this 在这个方法中并不指代本组件，如果打印出来会发现这个 this 在这个方法中是 null。而且这个方法会返回值。 当需要更新状态时，需要返回一个 object ，如果不需要任何更新，则返回 null 即可。如果只想要处理更新的话，最好加上判断条件 if (nextProp !== prevProp)。
调用 setState()不会触发 getDerivedStateFromProps()。
通常来讲，在 componentWillReceiveProps 中，我们一般会做以下两件事，一是根据 props 来更新 state，二是触发一些回调，如动画或页面跳转等。在老版本的 React 中，这两件事我们都需要在 componentWillReceiveProps 中去做。而在新版本中，官方将更新 state 与触发回调重新分配到了 getDerivedStateFromProps 与 componentDidUpdate 中，使得组件整体的更新逻辑更为清晰。而且在 getDerivedStateFromProps 中还禁止了组件去访问 this.props，强制让开发者去比较 nextProps 与 prevState 中的值，以确保当开发者用到 getDerivedStateFromProps 这个生命周期函数时，就是在根据当前的 props 来更新组件的 state，而不是去做其他一些让组件自身状态变得更加不可预测的事情。

<13>.getSnapshotBeforeUpdate(prevProps, prevState)
与 componentWillUpdate 不同，getSnapshotBeforeUpdate 会在最终的 render 之前被调用，也就是说在 getSnapshotBeforeUpdate 中读取到的 DOM 元素状态是可以保证与 componentDidUpdate 中一致的。虽然 getSnapshotBeforeUpdate 不是一个静态方法，但我们也应该尽量使用它去返回一个值。这个值会随后被传入到 componentDidUpdate 中，然后我们就可以在 componentDidUpdate 中去更新组件的状态，而不是在 getSnapshotBeforeUpdate 中直接更新组件状态。

（5）component.forceUpdate(callback)      react forceUpdate
默认情况下，当组件的 state 或 props 改变时，组件将重新渲染。 如果你的 render() 方法依赖于一些其他数据，你可以告诉 React 组件需要通过调用 forceUpdate() 重新渲染。
调用 forceUpdate() 会导致组件跳过 shouldComponentUpdate() ，直接调用 render()。 这将触发子组件的正常生命周期方法，包括每个子组件的 shouldComponentUpdate() 方法。
forceUpdate 就是重新 render。有些变量不在 state 上，但是你又想达到这个变量更新的时候，刷新 render；或者 state 里的某个变量层次太深，更新的时候没有自动触发 render。这些时候都可以手动调用 forceUpdate 自动触发 render。

(6)componentDidCatch 错误处理
错误在渲染阶段中被捕获，但在事件处理程序中不会被捕获。

然后在顶部或任何地方，你可以这样使用它：

另一个令人敬畏的特性 componentDidCatch 是包含错误堆栈的 info 对象！

### react 生命周期父子组件渲染顺序

在 react 的组件挂载及 render 过程中，最底层的子组件是最先完成挂载及更新的。
constructor()构造函数、componentWillMount 执行顺序：
顶层父组件--子组件--子组件--...--底层子组件
render、componentDidMount 顺序：
底层子组件--子组件--子组件--...--顶层父组件
update phases 同理

链接：https://www.jianshu.com/p/c5f5984e42c3

### 其他知识点

- React 组件通讯方式

  父组件向子组件通信：使用 props
  子组件向父组件通信：使用 props 回调
  跨级组件间通信：使用 context 对象
  非嵌套组件间通信：使用事件订阅

* React.memo 和 pureComponent

React.Component 是没有做任何渲染优化的，但凡调用 this.setState 就会执行 render 的刷新操作。
React.PureComponent 是继承自 Component，并且对重写了 shouldComponentUpdate 周期函数，对 state 和 props 做了浅层比较，当 state 和 props 均没有改变时候，不会 render，仅可以用在 ClassComponent 中
React.memo 功能同 React.PureComponent，但 React.memo 为高阶组件，既可以用在 ClassComponent 中 也可以用在 functionComponent 中

```react
const Title = (props){ return (
<div>{props.title}</div>
) } const Containt = (props){ return (
<div>Containt</div>
) } const APP = (){ return(

<Title title="222" />
<Containt />
) } const Title = React.memo(props){ return (
<div>{props.title}</div>
) } class Title extends React.pureComponent(){ render(){ return (
<div>{props.title}</div>
) } }
```

- react 数组变化之后，视图没有更新

数组保存在 state 中，修改数组之后视图没有更新

```js
function updateData(data) {
  this.setState({
    data: data, // data 数组变化不会更新视图
    data: [...data], //上面代码是修改状态值的，这样设置会导致视图没有更新，修改为如下代码即可：
  });
}
```

- react 更新 state 中某个对象值

  ```js
  this.state = {
    obj: {
      name: 0,
      val: 100,
    },
    msg: "strg",
  };

  function updateObj(data) {
    let newObj = Object.assign(this.state.obj, { name: 1 });
    this.setState({ obj: newObj });
  }
  ```
