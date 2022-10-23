/*
 * 深拷贝
 * @param { Object } obj 拷贝对象
 */

function deepClone(obj = {}) {
    // 判断参数为值类型
    if (typeof obj !== 'object' || obj == null) {
        return obj;
    }

    // 判断是数组还是对象
    let result;
    if (obj instanceof Array) {
        result = [];
    } else {
        result = {};
    }

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key] = deepClone(obj[key]);
        }
    }

    return result;
}

const obj = {
    name: '浅色星河',
    age: 24,
    message: {
        city: '深圳',
        job: '前端工程师',
        admire: '周冬雨',
    },
    arr: [1, 2, 3, 4],
};

let clone = deepClone(obj);
clone.age = 20;
clone.name = '浅芷初夏';
clone.arr[2] = 300;
clone.message.city = '桂林';

console.log(obj, clone);