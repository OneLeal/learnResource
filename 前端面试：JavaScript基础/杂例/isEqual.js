// 判断两个数组或对象是否相等（深度比较）
function isObject(params) {
    return typeof params === 'object' && params !== null;
}

function isEqual(obj1, obj2) {
    if (!isObject(obj1) || !isObject(obj2)) {
        return obj1 === obj2;
    }

    if (obj1 === obj2) {
        return true;
    }

    const isArray1 = obj1 instanceof Array;
    const isArray2 = obj2 instanceof Array;

    if (isArray1 !== isArray2) {
        return false;
    }

    const length1 = Object.keys(obj1).length;
    const length2 = Object.keys(obj2).length;

    if (length1 === length2) {
        for (let key in obj1) {
            const result = isEqual(obj1[key], obj2[key]);
            if (!result) {
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
}