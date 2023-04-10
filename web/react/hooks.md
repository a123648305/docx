# hooks

react 17 之和新增了函数式组件，作于编写复原重复逻辑和无状态组件

## useState

useState 用于替代 class 组件中的 state 变量

```react {2}
  const Compont =()=>{
    const [val,SetVal]=useState

    return <div><button onClick={()=>SetVal(val+1)}>add</button></di>
  }
```
