# 进程 & 线程 https://www.zhihu.com/question/25532384/answer/411179772

- 进程: CPU 资源分配的最小单位
- 线程: CPU 调度的最小单位

# 关于 NaN

```js
NaN === NaN; // false
Object.is(NaN, NaN); // true
[NaN].indexOf(NaN); // false
[NaN].includes(NaN); // true

// Object.is() & includes() 的比较原理均采用了 JS 引擎内置的 SameValue() 方法
```

# 关于 BFC、IFC、GFC、FFC https://zhuanlan.zhihu.com/p/183050328

# 函数装饰器 https://zhuanlan.zhihu.com/p/30487077

# 关于使用 for...in & for...of 处理对象与数组

```js
// 打印出了对象的 key 与 value
for (const key in obj) {
  console.log("for in: ", key, obj, obj[key]);
}

// 打印出了数组的 index 与 value
for (const key in list) {
  console.log("for in: ", key, list, list[key]);
}

// 报错，Object 不可迭代(可迭代数据类型有：Array / Set / Map / String / NodeList / arguments)
for (const key of obj) {
  console.log("for of: ", key, obj, obj[key]);
}

// key 是数组中的值而非 index
for (const key of list) {
  console.log("for of: ", key, list, list[key]);
}
```

# 关于 Object.defineProperty 做数据劫持

```js
// 如何实现表达式 (a === 1 && a === 2 && a === 3) 为真
var b = 0;
Object.defineProperty(window, "a", {
  get: function () {
    return ++b;
  },
});
const result = a === 1 && a === 2 && a === 3;
console.log("result: ", result);
```
