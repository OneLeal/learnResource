/**
 * Map:
 * 1. Map 可以以任意值为 key;
 * 2. Map 是有序的;
 * 3. Map 操作速度较快;
 */

// 创建一个 Map 实例并设置参数
const m = new Map([
    [10, 'number 10'],
    ['hello', 'hello world!'],
    [null, 'object null'],
    [undefined, 'undefined'],
    [NaN, 'NaN']
]);

const person = { name: 'Sam' };
const arr = [1, 2, 3];

m.set(person, { type: 'human', name: 'Sam' }); // 新增或修改一个值，返回修改后的 Map 对象
m.set(arr, person);
m.has(person); // 查询一个 key 是否存在，返回布尔值
m.get(person); // 查找一个 key 对应的 value，返回 value
m.delete(person); // 删除一个 key，返回布尔值
m.forEach((value, key) => console.log(value, key)); // 遍历 Map 对象
console.log(m.size); // 当前 Map 对象的长度

/**
 * Set:
 * 1. Set 是无序的;
 * 2. Set 元素不能重复;
 * 3. Set 操作速度较快;
 */
const s = new Set([1, 2, 3, null, undefined, NaN]);
const temp = { name: 'temp' };
s.add(temp); // 新增一个元素，返回修改后的 Set 对象
s.has(temp); // 判断元素是否存在，返回布尔值
s.delete(temp); // 删除一个元素，返回布尔值
s.forEach(value => console.log(value)); // 遍历 Set 对象
console.log(s.size); // 当前 Set 对象的长度

// 可迭代对象转数组
console.log(Array.from(m));
console.log(Array.from(s));

// 查看数据类型
console.log(m.toString());
console.log(s.toString());

/**
 * WeakMap 和 WeakSet:
 * 1. 其 value 只能是对象;
 * 2. 弱引用，无法 forEach，无 size;
 * 3. 有利于 JS 引擎进行垃圾回收;
 */