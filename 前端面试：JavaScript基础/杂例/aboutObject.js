// 函数声明和函数表达式的区别
const author1 = foo1();
const author2 = foo2;
console.log(author1, typeof author1);
console.log(author2, typeof foo2);

// 函数 foo 声明，js 会预加载，也就行成了变量提升
function foo1() {
    return '浅色星河';
}

// 函数表达式的实质是赋值，js 不会预加载 ( 关键字为 const，报错未声明；var 则会变量提升 )
var foo2 = function () {
  return '浅芷初夏';
};

// 关于 new Object() 和 Object.create()
const color = { red: '#f00', yellow: '#ff0', green: '#0f0' };
const colorObj1 = new Object(color);
console.log(color === colorObj1); // 两者指向同一内存地址

const colorObj2 = Object.create(color);
console.log(color === colorObj2.__proto__); // colorObj2 的原型为 color

// 关于 this
const user = {
    name: '浅色星河',
    getName() {
        return this.name;
    }
};
const fn = user.getName;
console.log(user.getName());
console.log(fn());