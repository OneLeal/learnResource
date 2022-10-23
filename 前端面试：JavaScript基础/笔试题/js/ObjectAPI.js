/*
* 学习关于 Object 的常用 API：
* 1. Object.is() 方法判断两个值是否是相同的值。
* 2. Object.assign() 将所有可枚举属性的值从一个或多个源对象复制到目标对象。
* 3. Object.freeze() 冻结一个对象。
* 4. Object.values() 返回一个给定对象自身的所有可枚举属性值的数组。
* 5. Object.keys() 返回一个由一个给定对象的自身可枚举属性组成的数组。
* 6. Object.getOwnPropertyNames() 同上，并包括不可枚举的属性。
* 7. Object.defineProperties() 在一个对象上定义新的属性或修改现有属性，并返回该对象。
* 8. Object.defineProperty() 在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
* 9. Object.seal() 封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。
* */

// Object.is()
Object.is([], []);       // false
Object.is({}, {});       // false
Object.is(null ,null);  // true
Object.is(undefined, undefined); // true

// 特例
Object.is(0, -0);       // false
Object.is(0, +0);       // true
Object.is(-0, -0);      // true
Object.is(NaN, 0/0);            // true

// Object.assign(目标对象，...源对象)
const person = {};
const basic = { name: '浅色星河', age: 24, sex: '男' };
const education = { education: '学士', major: '物联网工程' };
const tags = { prefer: ['吹牛', '瞎比比', '口嗨'], hobby: ['奶子', '腿子', '大美女'] };

const returnedTarget = Object.assign(person, basic, education, tags);
console.log(person);
console.log(returnedTarget);   // 返回目标对象

// Object.freeze()
const freeze_obj = {};
Object.defineProperties(freeze_obj, {
    'color': {
        configurable: true,
        enumerable: true,
        writable: true,
        value: 'pink'
    },

    'number': {
        configurable: true,
        enumerable: false,
        writable: true,
        value: 25
    },

    'msg': {
        configurable: false,
        enumerable: false,
        writable: false,
        value: { book: '老夫子', author: '王泽' }
    },

    'arr': {
        configurable: false,
        enumerable: true,
        writable: false,
        value: [1, 2, 3]
    }
});
console.log(freeze_obj);
Object.freeze(freeze_obj);
freeze_obj.color = 'red';   // 属性不可修改
freeze_obj.number = 10;    // 同上
freeze_obj.arr.push(4);
freeze_obj.msg.time = '2000-10-21';
freeze_obj.addAttr = '增加一个属性';  // 属性不可添加
// 强行使用 Api 会报错
// Object.defineProperty(freeze_obj, 'number', {
//     writable: false,
//     value: 10
// });
console.log(freeze_obj);

// Object.keys() & Object.values() & Object.getOwnPropertyNames()
console.log(Object.keys(freeze_obj));   // 可枚举
console.log(Object.values(freeze_obj));  // 同上
console.log(Object.getOwnPropertyNames(freeze_obj));  // 所有

// Object.seal()
const seal_obj = { name: '浅芷初夏', age: 24 };
Object.seal(seal_obj);
seal_obj.age = 25;    // writable 配置为可写
seal_obj.sex = '男';  // 不可添加
delete seal_obj.name; // 不可删除
console.log('seal_obj: ', seal_obj); // Object.defineProperty() 强行使用 Api 会报错

console.log('freeze: ', Object.isFrozen(freeze_obj));
console.log('seal: ', Object.isSealed(seal_obj));