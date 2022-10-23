# 对象的继承 & 原型/原型链

**创建一个对象有哪些方式**

1. 字面量创建
2. 使用 new 关键字
3. 使用 api: Object.create

```js
const obj1 = { food: "汉 堡" };
const obj2 = new Object({ food: "薯 条" });
const obj3 = Object.create({ food: "KFC 疯狂星期四" }); // 对象被绑定在 obj3 的原型上

const obj4 = {};
const obj5 = Object.create(Object.prototype); // obj5 与 obj4 层级保持一致
const obj6 = Object.create(null); // 一个空对象，无任何属性
```

**new 关键字做了哪些事**

1. 创建一个新对象;
2. 使该对象的原型指向构造函数;
3. 执行构造函数，并在执行过程中改变当前作用域中 this 的指向(this 指向新对象);
4. 返回一个对象;
   4.1 构造函数无返回值，返回新对象;
   4.2 构造函数有返回值，但不是对象，返回新对象;
   4.3 构造函数有返回值，且是一个对象(typeof 值是 "object" 即可)，返回这个对象;

```js
// 模拟实现 new
function mockNew(fn) {
  if (typeof fn !== "function") {
    throw new Error("the first argument must be a function!");
  }

  const args = Array.prototype.slice.call(arguments, 1);
  const obj = Object.create(fn.prototype);
  const result = fn.apply(obj, args);
  const bool = result && result != null && typeof result === "object";
  return bool ? result : obj;
}
```

**关于 ES6 class 继承的特征**

```js
class SubClass extends SuperClass {
  constructor() {
    super();
    // this.xxx = xxx
    // ...
  }
}

// super 作为函数调用时，要求子类必须执行一次
// 子类自己的 this 对象，必须通过父类的构造函数完成
// class 继承，会继承静态的方法和属性(浅拷贝)
```

_JS 文件_

- index.js 继承的实现
