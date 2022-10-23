// 数组拍平
function flat1(arr) {
    const isIncludeArray = arr.some(item => item instanceof Array);

    if (isIncludeArray) {
        return flat1([].concat.apply([], arr));
    } else {
        return arr;
    }
}

function flat2(arr) {
    let result = [];
    releaseArr(arr);
    function releaseArr(target) {
        target.forEach(item => {
           if (item instanceof Array) {
               releaseArr(item);
           } else {
               result.push(item);
           }
        });
    }
    return result;
}

function flat3(arr) {
    let result = [];
    arr.forEach(item => {
        if (item instanceof Array) {
            result.push(...item);
        } else {
            result.push(item);
        }
    });
    if (result.some(item => item instanceof Array)) {
        result = flat3(result);
    }
    return result;
}


// 解析 url 参数
function getUrlParams(url) {
    const result = {};
    const paramsGroup = url.split('?')[1];
    const paramsKeyVal = paramsGroup.split('&');
    paramsKeyVal.forEach(item => {
        const arr = item.split('=');
        result[arr[0]] = arr[1];
    });
    return result;
}

// 判断数组中的最大值
function getMaxValue() {
    const arr = [].slice.call(arguments);
    let temp = 0;
    arr.forEach(item => {
        item > temp ? (temp = item) : null;
    });
    return temp;
}

// 数组去重
function unique1(arr) {
    const result = [];
    arr.forEach(item => {
        if (result.indexOf(item) === -1) {
            result.push(item);
        }
    });
    return result;
}

function unique2(arr) {
    const result = [arr[0]];
    for (let i = 1; i < arr.length; i++) {
        let isSame = false;
        for (let j = 0; j < result.length; j++) {
            if (result[j] === arr[i]) {
                isSame = true;
                break;
            }
        }
        !isSame && result.push(arr[i]);
    }
    return result;
}

function unique3(arr) {
    const obj = {};
    const result = [];
    arr.forEach(item => {
        if (!obj.hasOwnProperty(item)) {
            obj[item] = 1;
            result.push(item);
        }
    });
    return result;
}

function unique4(arr) {
    const result = [];
    arr.forEach(item => {
        if (!result.includes(item)) {
            result.push(item);
        }
    });
    return result;
}

function unique5(arr) {
    let temp = arr.sort();
    let result = [temp[0]];
    for (let i = 1; i < temp.length; i++) {
        if (temp[i - 1] !== temp[i]) {
            result.push(temp[i]);
        }
    }
    return result;
}

/*
* 关于 Array.prototype.reduce():
* 1. 数组去重；
* 2. 对象数组去重；
* 3. 数组分类；
* 4. 统计数组元素的重复次数；
* 5. 合并对象数组中的各个子数组；
* 6. 对象数组中，各对象子数组求和；
* 7. 数组拍平；
* */

function reduceUnique1(arr) {
    return arr.reduce((result, item) => {
        if (result.indexOf(item) === -1) {
            result.push(item);
        }
        return result;
    }, []);
}

function reduceUnique2(arr, type) {
    const obj = {};
    return arr.reduce((result, item) => {
        if (!obj[item[type]]) {
            obj[item[type]] = 1;
            result.push(item);
        }
        return result;
    }, []);
}

function sortByType(arr, type) {
    return arr.reduce((result, item) => {
        if (!result[item[type]]) {
            result[item[type]] = [];
        }
        result[item[type]].push(item);
        return result;
    }, {});
}

function calcRepeatNum(arr) {
    return arr.reduce((result, item) => {
        if (!result[item]) {
             result[item] = 1;
        } else {
            result[item]++;
        }
        return result;
    }, {});
}

function getAllByType(arr, type) {
    return arr.reduce((result, item) => {
        if (item[type]) {
            result = result.concat(item[type]);
        }
        return result;
    }, []);
}

function getTotal(arr, type) {
    return arr.reduce((total, item) => {
        if (item[type]) {
            total += item[type].reduce((sum, i) => {
                return sum + i;
            }, 0);
        }
        return total;
    }, 0);
}

function flatByReduce(arr) {
    return arr.reduce((result, item) => {
        return result.concat(item instanceof Array ? flatByReduce(item) : item);
    }, []);
}


