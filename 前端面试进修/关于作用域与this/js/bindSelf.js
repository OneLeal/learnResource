// 手写 bind
Function.prototype.bindSelfEasy = function (ctx) {
  const fn = this; // 获取调用 bind 的函数
  const args = Array.prototype.slice.call(arguments, 1);

  if (typeof fn !== "function") {
    throw new Error("No function to bind!");
  }

  return function () {
    const innerArgs = Array.prototype.slice.call(arguments);
    return fn.apply(ctx, args.concat(innerArgs));
  };
};

// 手写 bind，支持 new (保证 new 的优先级)
Function.prototype.bindSelf = function (ctx) {
  const slice = Array.prototype.slice;
  const fn = this;
  const args = slice.call(arguments, 1);

  if (typeof fn !== "function") {
    throw new Error("No function to bind!");
  }

  function resultFn() {
    const innerArgs = slice.call(arguments);
    const first = resultFn.prototype.isPrototypeOf(this) ? this : ctx || this;
    return fn.apply(first, args.concat(innerArgs));
  }

  resultFn.prototype = fn.prototype;
  return resultFn;
};

// 测试
const obj = { name: "深 圳" };
function foo(city) {
  this.city = city;
  console.log("this: ", this);
}
const test = foo.bindSelf(obj);
const a = new test("桂 林");
