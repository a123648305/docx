## 光标

- 获取并设置光标位置
  要获取和设置 ContentEditable div 的光标位置，我们可以使用 Selection 对象。Selection 对象代表了用户选择的文本部分或光标所在的位置。

获取光标位置
使用 Selection 对象的 getRangeAt 方法，我们可以获取当前光标所在的 Range 对象。

```
const range = window.getSelection().getRangeAt(0);
```

设置光标位置
要设置光标位置，我们首先需要创建 Range 对象，然后使用 Selection 对象的 removeAllRanges 方法清除选中的文本或光标，最后使用 Selection 对象的 addRange 方法将 Range 对象添加到 Selection 中。

```js
const range = document.createRange();
range.setStart(container, offset);
range.collapse(true); // 关闭开始位置 和 结束位置是否相同
const sel = window.getSelection();
sel.removeAllRanges();
sel.addRange(range);
```

上述代码中，container 表示要编辑的 DOM 节点，offset 表示偏移量，即在 container 中的位置。

示例：更新内容后设置光标位置
下面是一个示例，演示了如何在更新 ContentEditable div 的内部 HTML 后设置光标位置。

```html
<style>
  #myDiv {
    /* 光标颜色设置 */
    caret-color: red;
  }
</style>

<div id="myDiv" contenteditable="true">这是一个可编辑的区域。</div>

<button onclick="updateHtmlAndSetCursor()">更新内容并设置光标位置</button>

<script>
  function updateHtmlAndSetCursor() {
    var div = document.getElementById("myDiv");

    // 更新内部HTML
    div.innerHTML = "<p>更新后的内容。</p>";

    // 设置光标位置
    var range = document.createRange();
    range.selectNodeContents(div);
    range.collapse(false);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

    // 在光标开始位置插入内容
    // const tag = document.createElement('p');
    // tag.innerText = '插入的内容';
    // sel.insertNode(tag);
  }
</script>
```

在上述示例中，当按钮被点击时，我们会先更新 ContentEditable div 的内部 HTML，然后将光标设置在新插入的内容之后。

##
