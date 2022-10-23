// vue 响应式原理
const data = {};
let name = '浅色星河';

// 处理数组
const oldPrototype = Array.prototype;
const newPrototype = Object.create(oldPrototype);
['push', 'slice', 'pop', 'splice'].forEach(methodName => {
   newPrototype[methodName] = function () {
       // updateView(); 触发视图更新
       oldPrototype[methodName].call(this, ...arguments);
   }
});

Object.defineProperty(data, 'name', {
   get: function () {
       console.log('defined');
       return name;
   },
    
    set: function (newName) {
       console.log('modify');
        name = newName;
    }
});

// 修改字符串变量
console.log(data.name);
data.name = '浅芷初夏';

/*
* Vue 原理
* 一、模板编译
* 二、虚拟 dom 和 diff算法
* 三、组件的异步渲染
* 四、响应式原理
*
* 模板编译：将 template 转为 js 代码
* 1.将 template 编译为 render 函数
* 2.执行 render 函数生成 vnode
* 3.基于 vnode 执行 patch 和 diff
*
* 组件的渲染过程：
* 1. 模板解析为 render 函数；
* 2. 触发响应式，监听 data 属性（getter setter）；
* 3. 执行 render 函数，生成 vnode，patch(elem, vnode)；
* 4. 修改 data，触发 setter；
* 5. 重复 3 (patch(vnode，newVnode))
*
* 虚拟 dom 和 diff算法：
* 1. 用 js 模拟真实的 dom ，当数据/状态变化时，经 diff 计算出最小更新范围，dom 可避免全部重绘；
* 2. 只比较同一层级，不跨级比较；
* 3. tag 不同，不进行深度比较，直接删除重建；
* 4. tag 和 key 都相同，则认为是相同节点，不再深度比较；
*
* 响应式原理：
* 1. 核心 api 是 Object.definedProperty;
* 2. 深度监听需要递归到底，一次性计算量大；
* 3. 无法监听新增属性和删除属性；
* 4. 无法原生监听数组，需要特殊处理(重写原型)；
* 5. Vue 不能检测以下数组的变动(当你利用索引直接设置一个数组项时, 当你修改数组的长度时);
*
* v-model 的原理：
* 1. input 的 value 对应为 v-model 的绑定值（若 value = this.name, v-model = name）；
* 2. 绑定 input 事件，将 $event.target.value 赋值给 this.name
* 3. data 更新触发 render
*
* 其他：
* 1. 对 MVVM 的理解；
* 2. computed 和 watch 的异同；
* 3. 为何 data 必须是函数？
* 4. 何时使用 beforeDestroy ？
*
* 关于 webpack
* 优化构建速度(可用于生产环境)：
* 1. babel-loader 使用缓存;
* 2. 使用 IgnorePlugin;
* 3. noParse 和 happyPack;
*
* 代码产出的优化：
* 1. 小图片使用 base64 格式；
* 2. bundle 加 hash；
* 3. 懒加载；
* 4. 第三方、公共代码抽取；
* 5. IgnorePlugin；
* 6. cdn 加速
* */