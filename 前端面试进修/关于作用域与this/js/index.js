// 作用域面试题
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
