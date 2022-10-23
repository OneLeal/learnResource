var dom1 = document.getElementById('first');
var dom2 = document.getElementById('second');
var dom3 = document.getElementById('third');
var flag = true; // 事件于冒泡/捕获阶段触发

dom1.addEventListener('click', function (e) {
    console.log('第 1 层');
}, flag);

dom2.addEventListener('click', function (e) {
    console.log('第 2 层');
    // e.stopPropagation(); // 阻止事件流的传递
    e.stopImmediatePropagation();
    console.log(e.defaultPrevented);
    e.preventDefault(); // 阻止默认事件
    console.log(e.defaultPrevented); // Boolean | 默认事件是否被阻止
    console.log(e.target); // 事件触发的元素
    console.log(e.currentTarget); // 事件绑定的元素
}, flag);

dom2.addEventListener('click', function (e) {
    console.log('第 2 层的另一个事件');
}, flag);

dom3.addEventListener('click', function (e) {
    console.log('第 3 层');
}, flag);

/**
 * 注：
 * 1. 当一个 dom 元素绑定多个事件时，按监听顺序触发;
 * 2. stopPropagation 阻止事件继续传递，但当前元素所绑定的事件依然按顺序触发;
 * 3. stopImmediatePropagation 阻止事件继续传递，且阻止当前元素其他事件的触发;
 * 
 * 事件对象的两个属性：
 * 1. currentTarget 事件绑定的元素
 * 2. target 事件触发的元素
 * 
 * dom 事件级别(dom 标准定义的级别)：
 * dom 0: dom.onclick = function () {}
 * dom 2: 使用 addEventListener
 * dom 3: 使用 addEventListener，但新增更多事件
 * 
 * dom 事件流：
 * window → document → HTML(documentElement) → body → ...
 * 
 * 自定义事件：Event 与 CustomEvent(第二个参数可传递数据)
 * new CustomEvent('eventName', { bubbles: true, cancelable: true, composed: true (detail) });
 */
var detail = { name: 'dog-program', time: 1500 }; // 设置数据
var myEvent = new CustomEvent('run', { detail }); // 初始化事件对象

dom1.addEventListener('run', function (e) {
    console.log(e.detail.name, e.detail.time);
});

document.getElementById('btn').addEventListener('click', function () {
    dom1.dispatchEvent(myEvent); // 分发自定义事件 myevent
}, false);

var timer = setTimeout(function () {
    dom1.dispatchEvent(myEvent); // 分发自定义事件 myevent
    clearTimeout(timer);
    timer = null;
}, 1000);