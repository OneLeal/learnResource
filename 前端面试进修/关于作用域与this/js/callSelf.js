// 手写 call
Function.prototype.myCall = function (ctx) {
  const args = Array.prototype.slice.call(arguments, 1);
  ctx.fn = this;

  if (ctx) {
    const result = ctx.fn(...args);
    delete ctx.fn;
    return result;
  } else return this(...args);
};
