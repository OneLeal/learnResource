# 浏览器原理-DOM

**window 内可用区域大小**

- window.innerHeight
- window.innerWidth

**window 内文本宽高获取（即网页视图的 size）**

- el.clientWidth / el.clientHeight
- el.offsetWidth / el.offsetHeight
- offsetHeight = clientHeight(节点自身 width) + 滚动条 + 边框

**动态定位**

- el.scrollLeft / el.scrollTop 元素距离常规左/上的滚动距离
- el.offsetLeft / el.offsetTop 元素距离常规左/上距离

**获取一个元素节点的所有位置信息**

- el.getBoundingClientRect()
