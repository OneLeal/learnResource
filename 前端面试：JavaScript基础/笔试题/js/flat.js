// 数组扁平化输出
function flat1(arr) {
    const result = [];
    const eachItem = function (target) {
        target.forEach(item => {
            if (item instanceof Array) {
                eachItem(item);
            }  else {
                result.push(item);
            }
        });
    };
    eachItem(arr);
    return result;
}

function flat2(arr) {
    const flag = arr.some(item => item instanceof Array);
    if (!flag) {
        return arr;
    } else {
        return flat2([].concat(...arr));
    }
}