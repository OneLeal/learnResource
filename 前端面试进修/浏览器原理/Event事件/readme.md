# 浏览器原理-事件

**完整事件流及两个模式**

```js
// 事件流：window → document → HTML(documentElement) → body → ... → window
// 捕获：自上而下(window → element)
// 冒泡：自下而上(element → window)
```

**事件级别(dom 标准定义的级别)**

```js
// dom 0: dom.onclick = function () {}
// dom 2: 使用 addEventListener
// dom 3: 使用 addEventListener，但新增更多事件
```

**阻止事件传播、默认事件**

```js
// Chrome vs IE
// 事件绑定: addEventListener(先绑定先执行) / attachEvent(后绑定先执行)
// 事件解绑: removeEventListener / detachEvent
// 阻止默认事件: preventDefault() / (event.returnValue = false)
// 阻止冒泡: stopPropgation() / (event.cancelBubble = true)
// 其他: stopImmediatePropagation 阻止事件冒泡并且阻止该元素上同事件类型的监听器触发
```

**自定义事件**

- Event / CustomEvent(可配置 detail 携带数据) 对象均可实现自定义事件
- 自定义事件通过 document.dispatchEvent(selfEvent) 触发
- 参数 1: 事件名称
- 参数 2: 配置项(bubbles cancelBubble cancelable defaultPrevented)

1. bubbles | Boolean 是否支持冒泡
2. cancelBubble | Boolean 是否阻止冒泡
3. cancelable | Boolean 是否可取消事件
4. defaultPrevented | Boolean 是否阻止默认事件
5. detail | Any 自定义数据

**其他**

```js
// Event 对象的两个重要属性：
// 1. currentTarget 事件绑定的元素
// 2. target 事件触发的元素
```

_JS 文件_

- bindEvent.js 通用事件绑定方法(Chrome 标准、兼容事件代理)
- bindEventClass.js 通用事件绑定方法(封装成类，兼容 IE)
- selfEvent.js 自定义事件

_测试文件_

- test.js
- testClass.js
- testSelf.js
