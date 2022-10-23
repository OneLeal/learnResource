function Father1(money, hasHouse) {
  this.money = money;
  this.hasHouse = hasHouse;
  this.arr = [1, 2, 3];
}
Father1.prototype.say = function () {
  console.log("Father1: ", this.money, this.hasHouse);
};

function Father2(money, hasHouse) {
  this.money = money;
  this.hasHouse = hasHouse;
  this.arr = [1, 2, 3];
}
Father2.prototype.say = function () {
  console.log("Father2: ", this.money, this.hasHouse);
};

function Father3(money, hasHouse) {
  this.money = money;
  this.hasHouse = hasHouse;
  this.arr = [1, 2, 3];
}
Father3.prototype.say = function () {
  console.log("Father3: ", this.money, this.hasHouse);
};

// ---------------------------------------------------------------------

// 原型链继承
function Son1(name, age) {
  this.name = name;
  this.age = age;
}
Son1.prototype = new Father1(1250, true);
Son1.prototype.constructor = Son1;

const _son1 = new Son1("张三", 25);
const _son2 = new Son1("李四", 24);
_son1.say();
_son1.arr.push(4); // 由于有引用类型数据，这个修改的动作会影响其他实例

// ---------------------------------------------------------------------

// 构造函数继承
function Son2(name, age) {
  this.name = name;
  this.age = age;
  Father2.apply(this, Array.prototype.slice.call(arguments, 2));
}

const _son3 = new Son2("王五", 20, "￥1,250", true);
const _son4 = new Son2("赵六", 21, "￥150,000", false);
_son3.arr.push(4); // 克服了原型继承的缺点
// _son3.say(); 不能访问父类原型上的方法，如果将方法写在构造函数内，那么每次创建实例都会创建一遍方法

// ---------------------------------------------------------------------

// 组合寄生式继承-完善的继承方式
function Son3(name, age) {
  this.name = name;
  this.age = age;
  Father3.apply(this, Array.prototype.slice.call(arguments, 2));
}
Son3.prototype = Object.create(Father3.prototype);
Son3.prototype.constructor = Son3;

const _son5 = new Son3("钱七", 26, "￥500,000", true);
const _son6 = new Son3("周八", 27, "￥800,000", false);
_son5.arr.push(4);
_son5.say();
_son6.say();
// ---------------------------------------------------------------------
