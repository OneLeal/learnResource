/**
 * CSRF 跨站请求伪造：
 * 原理：核心是利用用户的 cookie 去骗取服务端的信任(已登陆过某网站)，而后成功请求接口；
 * 预防：
 * 1. 请求头中的 Referer 字段记录了请求来源，验证它是否合法；
 * 2. 使用 token；
 * 3. 隐藏令牌；
 * 
 * xss 跨站脚本攻击：
 * 原理：注入了原本网页中不存在的代码并执行；
 * 预防：
 * 1. 输入长度限制；
 * 2. 对 script 标签进行过滤；
 * 3. 替换特殊字符（转码），例："<" → &lt; ">" → &gt;
 * 
 * 什么是 DOCTYPE ？
 * DOCTYPE 是用来声明文档类型和规范(DTD)，主要用于文件合法性验证;
 * 常见的 DOCTYPE：<!DOCTYPE html>、H4 的严格模式和传统模式
 * 
 * 浏览器渲染机制：
 * 1. DNS 解析：域名 → IP 地址；
 * 2. 浏览器根据 IP 地址向服务器发起 http 请求；
 * 3. 服务器处理 http 请求，并将请求结果返回给浏览器；
 * 4. 根据 html 生成 DOM 树；
 * 5. 根据 css 生成 css 对象模型(cssOM)；
 * 6. cssOM 和 DOM 树整合成 Render Tree；
 * 7. 浏览器根据 Render Tree 渲染页面；
 * 8. 渲染过程中遇到 script 标签，优先加载 js 代码，完成后再继续渲染；
 * 
 * reflow 重排/回流
 * 定义：浏览器根据样式的计算结果将元素放置于它该出现的位置上(布局)；
 * 触发条件：
 * 1. 修改样式；
 * 2. DOM 数量增加/减少，DOM 位置发送改变；
 * 3. 浏览器窗口 resize 时；
 * 
 * repaint 重绘
 * 定义：所有 dom 元素的位置和样式确定下来后将它们绘制于页面上(上色)；
 * 触发条件：DOM/CSS 的改动，无法回避(尽量使用文档片段做增删操作)
 * 
 * dom 文档的加载步骤：
 * 1. 解析 HTML 结构；
 * 2. 加载外部脚本与样式文件并执行；
 * 3. 构建 dom 模型(构建结束后触发 document.DOMContentLoaded 事件)；
 * 4. 加载外部资源(图片、音视频文件);
 * 5. 页面渲染完成(触发 window.onload 事件)；
 */

// 防抖
function debounce (fn, delay = 300) {
    var timer = null;
    return function () {
        if (timer) {
            clearTimeout(timer); // 清除上一次设置的 timeout
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments);
            timer = null;
        }, delay);
    };
};

// 节流
function throttle (fn, delay = 300) {
    var timer = null;
    return function () {
        if (timer) {
            return; // 保留上一次的 timeout
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments);
            timer = null;
        }, delay);
    };
};

// 闭包缓存器
function createCache() {
    const data = {};
    return {
        set: function(key, value) {
            data[key] = value;
        },

        get: function (key) {
            return data[key];
        }
    }
}