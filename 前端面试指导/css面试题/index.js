/**
 * 关于盒模型：
 * 1. 基本概念：标准模型 + IE 模型
 * 2. 如何设置两种模型
 * 3. JS 如何获取盒模型的宽高
 * 4. 什么是 BFC
 * 
 * 答：
 * 1.1 盒模型四要素：content + padding + border + margin
 * 1.2 标准盒模型 width：content
 * 1.3 IE 盒模型 width：content + padding + border
 * 
 * 2.1 设置 IE 盒模型：box-sizing: border-box;
 * 2.2 设置标准盒模型(浏览器默认)：box-sizing: content-box;
 * 
 * 3.1 可以通过节点的 style 属性取值宽高(利用了标签的内联样式)
 * 3.2 利用 api：
 * currentStyle(IE 支持)
 * getComputedStyle(Firefox、Chrome 支持)
 * getBoundingClientRect(获取元素的位置信息)
 * 
 * 4.1 BFC 渲染规则：独立容器，浮动元素参与计算，垂直边距重叠，不与浮动元素重叠
 * 4.2 BFC 的触发：
 * float 不是 none;
 * overflow: 不是 visible;
 * position: absolute/fixed;
 * display: flow-root/table/table-cell/inline-block;
 */

// 使用 api 获取元素宽高
var dom = document.getElementById('target');
var styleData = dom.getBoundingClientRect();
var { width, height } = window.getComputedStyle(dom);
console.log(width, height, styleData.width, styleData.height);