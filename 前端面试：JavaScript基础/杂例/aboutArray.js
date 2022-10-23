const arr1 = [10, 20, 30, 40];
const arr2 = [50, 60, 70, 80];
const arr3 = [1, 2, 3, 4, 5];
const arr4 = [6, 7, 8, 9, 10];

// pop shift unshift push 是否会改变原数组，返回时是什么 ？
const result1 = arr1.shift();  // 返回抛出元素
console.log('shift:');
console.log(result1, arr1);

const result2 = arr2.pop();  // 返回抛出元素
console.log('pop:');
console.log(result2, arr2);

const result3 = arr3.push(100);   // 返回数组长度
console.log('push:');
console.log(result3, arr3);

const result4 = arr4.unshift(200);   // 返回数组长度
console.log('unshift:');
console.log(result4, arr4);

// 关于数组的 Api 有哪些是纯函数？
// 纯函数：不改变原数组，返回一个数组
// 纯函数：concat map filter slice
// 非纯函数：pop shift unshift push reduce some foreach every splice

// 网红题：[10, 20, 30].map(parseInt) 的结果？
const r = [10, 20, 30].map(parseInt);
console.log(r);

console.log('max = ' + getMax(10, 20, 30, 100));
// 判读多个数字中的最大值
function getMax() {
    let max = 0;
    const arr = Array.prototype.slice.call(arguments);
    arr.forEach(item => {
        if (item > max) {
            max = item;
        }
    });
    return max;
}

// 数组拍平
const flatArr = [0, 1, 2, 3, [100, 200, 300, [10, 11, 12, 13, [20, 21, 22]]], 4, 5, [9, 8, 7, 6]];
function flat(arr) {
    const isDeepArr = arr.some(item => item instanceof Array);
    if (!isDeepArr) {
        return arr;
    } else {
        const handleArr = [].concat.apply([], arr);
        return flat(handleArr);
    }
}
console.log(flat(flatArr));

// 数组去重
function unique(arr) {
    let temp = [];
    arr.forEach(item => {
        if (temp.indexOf(item) === -1) {
            temp.push(item);
        }
    });
    return temp;
}

function uniqueSet(arr) {
    const temp = new Set(arr);
    return [...temp];
}

const unique1 = [1, 2, 3, 2, 5, 3, 6];
const unique2 = [0, 2, 3, 1, 5, 3, 6];
console.log(unique(unique1));
console.log(uniqueSet(unique2));

