<template>
  <div class="testDiv">
    <h1>{{ title }}</h1>
    <span>count:{{ count }}</span>
    <button @click="handleClick">点击count ++</button>
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
  height: 100px;
  border: 1px solid #ccc;
  overflow: hidden;
  padding: 10px;
  span {
    margin-right: 10px;
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
