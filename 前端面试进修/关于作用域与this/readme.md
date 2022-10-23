# 词法作用域、函数作用域、块级作用域与 this

**暂时性死区**

```js
var b = 10;
function foo() {
  console.log(b);
  let b = 1;
}
foo();

// 报错：变量 b 在声明前不可访问
// 原因：let 声明的变量 b 也有提升效果，但不允许被使用
// 暂时性死区：从该函数作用域的起始位置到 let 声明位置之间

function foo(x1 = x2, x2) {
  console.log(`${x1}${x2}`);
}
foo(void 0, 2);

// 报错：变量 x2 在声明前不可访问
// 原因：此时第一个参数是缺省的(undefined)
```

**let 不能声明已声明的变量，let 声明的变量不能被再次声明**

```js
if (1) {
  let a = 10;
  var a = 1;
  // let a = 10;
  console.log(a);
}
```

**this 的使用规则**

- this 的指向根据执行上下文动态决定;
- 默认指向 window / global / undefined (浏览器 / node / 严格模式);
- 使用 call / apply / bind 时指向传入的参数;
- 使用 new 关键字时，通过构造函数指向新创建的对象;
- 使用箭头函数时，根据外层的调用规则决定;
- 优先级: new > call / apply / bind > 对象调用;

```js
var num = 5;
var obj = {
  num: 3,
  fn1: (function () {
    var num;
    this.num *= 2;
    num = num * 2;
    num = 3;
    return function () {
      var n = this.num;
      this.num *= 2;
      console.log(n);
      num *= 3;
      console.log(num);
    };
  })(),
};

var fn1 = obj.fn1;
fn1.call(null);
obj.fn1();
console.log(window.num);
```

_JS 文件_

- bindSelf.js 手写 bind
- callSelf.js 手写 call
