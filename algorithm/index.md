## 滑动窗口

![无重复字符的最长子串](/images/3.png)

```js
var lengthOfLongestSubstring = function (s) {
  let i = 0,
    j = 0,
    maxlen = 0;
  const set = new Set();

  while (i < s.length) {
    if (i > 0) {
      set.delete(s.charAt(i - 1));
    }
    while (j < s.length && !set.has(s.charAt(j))) {
      set.add(s.charAt(j));
      maxlen = Math.max(maxlen, j - i + 1);
      j++;
    }
    i++;
  }
  return maxlen;
};
```

## 跳跃游戏

### 跳跃游戏 ①

![跳跃游戏](/images/5.png)

```js
function jump(nums) {
  let maxStep = 0, //可以到达的最远位置 下标
    i = 0;
  while (i < nus.length) {
    if (maxStep < i) {
      // 最远位置 无法到达当前的位置
      return false;
    }
    maxStep = Math.max(maxStep, nums[i] + i);
    i++;
  }
  return true;
}
```

### 跳跃游戏 ②

![跳跃游戏2](/images/45.png)

```js
//在遍历数组时，我们不访问最后一个元素，这是因为在访问最后一个元素之前，我们的边界一定大于等于最后一个位置，否则就无法跳到最后一个位置了。如果访问最后一个元素，在边界正好为最后一个位置的情况下，我们会增加一次「不必要的跳跃次数」，因此我们不必访问最后一个元素
function jump(nums) {
  let i = 0,
    end = 0,
    maxStep = 0,
    stepCount = 0; // 跳跃次数
  while (i < nums.length - 1) {
    maxStep = Math.max(maxStep, nums[i] + i);
    if (i === end) {
      // 已经到达边界 jump 次数加一
      stepCount++;
      end = maxStep;
    }
    i++;
  }
  return stepCount;
}
```
