function deepClone(obj) {
    if (typeof obj === 'object' && obj != null) {
        var temp;

        obj instanceof Array ? (temp = []) : (temp = {});

        for (let key in obj) {
           if (obj.hasOwnProperty(key)) {
               temp[key] = deepClone(obj[key]);
           }
        }

        return temp;
    } else {
        return obj;
    }
}


function isObject(params) {
    return typeof params === 'object' && params != null;
}

function deepCompare(obj1, obj2) {
    if (!isObject(obj1) || !isObject(obj2)) {
        return obj1 === obj2;
    }

    if (obj1 === obj2) {
        return true;
    }

    var type1 = obj1 instanceof Array;
    var type2 = obj2 instanceof Array;

    if (type1 !== type2) {
        return false;
    }

    var len1 = Object.keys(obj1).length;
    var len2 = Object.keys(obj2).length;

    if (len1 !== len2) {
        return false;
    }

    for (let key in obj1) {
        if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
            const result = deepCompare(obj1[key], obj2[key]);
            if (!result) {
                return false;
            }
        }
    }

    return true;
}