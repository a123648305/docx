<template>
  <div class="testDiv">
    <h1>{{ title }}</h1>
    <span>count:{{ count }}</span>  
    <button @click="handleClick">点击count ++</button>
    <div>
        <input v-model="count" placeholder="输入count值,视图将同步变化"/>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "标题",
      count: 0,
    };
  },
  methods: {
    handleClick() {
      console.log("点击了按钮");
      this.count++;
    },
  },
};
</script>
<style lang="scss" scoped>
.testDiv {
  height: 150px;
  border: 1px solid #ccc;
  overflow: hidden;
  padding: 10px;
  span {
    margin-right: 10px;
    font-weight: bold;
  }
  button {
    cursor: pointer;
    background: #409eff;
    border: 1px solid #dcdfe6;
    color: #fff;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    padding: 4px 10px;
    border-radius: 4px;
    animation: 4s linear 0s infinite alternate sport;
  }
  input{
    border: 1px solid #ccc;
  }
}

@keyframes sport {
  0% {
    background: #409eff;
    transform: translateX(0);
  }
  50% {
    background: #fff;
    transform: translateX(50px);
    border-color: #fff;
  }
  100% {
    background: #409eff;
    transform: translateX(100px);
  }
}
</style>
