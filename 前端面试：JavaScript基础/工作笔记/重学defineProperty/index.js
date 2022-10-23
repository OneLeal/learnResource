/*
javacript 有三种类型的属性:
1. 命名数据属性：拥有一个确定的值的属性。这也是最常见的属性;
2. 命名访问器属性：通过getter和setter进行读取和赋值的属性;
3. 内部属性：由JavaScript引擎内部使用的属性，不能通过JavaScript代码直接访问到;

属性描述符：
通过Object.defineProperty()为对象定义属性，有两种形式，且不能混合使用，分别为数据描述符，存取描述符

参数：obj（要定义属性的对象）, prop（要定义或修改的属性的名称）, descriptor（要定义或修改的属性描述符）

属性描述符-数据描述符的 key：configurable enumerable value writable

属性描述符-存取描述符的 key：configurable enumerable get set

默认值：
configurable enumerable writable 是 false；
value get set 是 undefined；
 */

var people = {};
Object.defineProperty(people, 'name', {
    value: '浅色星河',
    configurable: false,
    writable: false
}); // 此时，people.name 已完全被锁死，不可删除，不可修改，不可配置，相当于 Object.freeze()

delete people.name;
people.name = '浅芷初夏';
console.log(people);

// 关于属性的赋值操作
var superClass = {
    get bar() {
        return 'vue';
    },

    foo: 'x'
};

// 等价于上一种写法
// var superClass = { foo: 'x' };
// Object.defineProperty(superClass, 'bar', {
//     value: 'vue',
//     writable: false
// });

var subClass = Object.create(superClass); // 原型继承 superClass
subClass.bar = 'react';                   // 属性 bar 赋值失败
subClass.foo = 'y';                       // 属性 foo 赋值成功
console.log(subClass.bar);

Object.defineProperty(subClass, 'bar', {
   value: 'angular'
});  // 属性 bar 定义成功

console.log(subClass.bar, subClass.__proto__.bar, subClass.foo, subClass.__proto__.foo);

var obj = {}, number = 100;

Object.defineProperty(obj, 'num', {
   get() {
       console.log('running getter');
       return number;
   },

   set(value) {
       console.log('running setter');
       number = value;
   },

    enumerable: true,
    configurable: true
});

// 查看初始值
console.log(obj.num);

number = 120; // 修改 number，看看是否对 obj.num 造成影响
console.log(number, obj.num);

obj.num = 150; // 修改 obj.num，看看是否对 number 造成影响
console.log(number, obj.num);

// 为使双方互不影响，重新定义 num
Object.defineProperty(obj, 'num', {
    value: 150,
    writable: true,
    enumerable: true,
    configurable: true
});

// 查看初始值
console.log(obj.num);

number = 120; // 修改 number，看看是否对 obj.num 造成影响
console.log(number, obj.num);

obj.num = 160; // 修改 obj.num，看看是否对 number 造成影响
console.log(number, obj.num);

var count = 0;
Object.defineProperty(window, 'a', {
    get() {
        return ++count
    }
})