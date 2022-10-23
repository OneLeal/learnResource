/**
 * vue 原理：
 * 1. vue 响应式原理:
 * 1.1 Object.defineProperty 的使用;
 * 1.2 对简单数据类型及引用数据类型的监听方式;
 * 
 * 注: vue 源码中与响应式相关的方法和类
 * 类：Observer
 * 方法：defineReactive
 * 
 * 虚拟 DOM 及 diff 算法:
 * {
 *     tag: 'div',
 *     props: { className: 'containor' },
 *     children: [
 *         { tag: 'p', props: { className: 'title' }, children: 'xxx' },
 *         { tag: 'ul', children: [...] }
 *     ]
 * }
 * 
 * diff 算法：
 * 1. 同级比较；
 * 2. tag 不同则删除重建，不进行深度比较；
 * 3. tag 与 key 相同则认为是相同节点，不进行深度比较；
 */

// 响应式原理代码简写用例
const data = {
    name: '浅色星河',
    message: { sex: '1', age: 25 },
    skills: ['JavaScript', 'Vue', 'React']
};

const oldArrayProperty = Array.prototype; // 暂存数组原型
const arrayPrototype = Object.create(oldArrayProperty); // 既扩展新的方法，又不污染原型
const methodsGroup = ['push', 'pop', 'shift', 'unshift']; // 需要重写/扩展的方法
methodsGroup.forEach(method => {
    arrayPrototype[method] = function () {
        updateView(); // 更新视图
        oldArrayProperty[method].call(this, ...arguments);
    }
});

function updateView () { console.log('视图更新!'); };

function defineReactive (target, key, value) {
    observer(value); // 深度监听

    Object.defineProperty(target, key, {
        get: function () { return value; },
        set: function (newValue) {
            if (newValue !== value) {
                observer(newValue);
                value = newValue;
                updateView();
            }
        }
    });
}

function observer(target) {
    // 非对象或数组
    if (typeof target !== 'object' || target === null) {
        return target;
    }

    Array.isArray(target) && (target.__proto__ = arrayPrototype);

    for (var key in target) {
        defineReactive(target, key, target[key]);
    }
}

observer(data);