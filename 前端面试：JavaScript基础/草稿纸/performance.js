// 模拟数据
var arr = [
    {
        zName: '散装7库',
        zStock: '水泥P.042.5级 散',
        truck: [{ truck: '陕EH5588', status: '2' }, { truck: '陕EH6926', status: '3' }]
    },

    {
        zName: '散装6库',
        zStock: '普通熟料',
        truck: [{ truck: '豫A0123', status: '2' }, { truck: '豫A0111', status: '3' }]
    },

    {
        zName: '散装5库',
        zStock: '普通熟料',
        truck: [{ truck: '京AF2020', status: '2' }, { truck: '京AF2021', status: '3' }]
    },

    {
        zName: '散装4库',
        zStock: '水泥P.042.5级 散',
        truck: [{ truck: '鄂W7897', status: '2' }, { truck: '鄂W7799', status: '3' }]
    },

    {
        zName: '散装3库',
        zStock: '水泥P.042.5级 散',
        truck: [{ truck: '皖F1212', status: '2' }, { truck: '皖F1414', status: '3' }]
    },

    {
        zName: '包装3道',
        zStock: '水泥P.S.A32.5级 袋',
        truck: [{ truck: '川D1234', status: '2' }, { truck: '川D4321', status: '3' }]
    },

    {
        zName: '包装1道',
        zStock: '水泥P.S.A32.5级 袋',
        truck: [{ truck: '沪HG5555', status: '2' }, { truck: '沪HG6666', status: '3' }]
    },

    {
        zName: '二代矿粉库',
        zStock: '二代的水泥',
        truck: [{ truck: '桂C8888', status: '1' }, { truck: '桂C0000', status: '2' }]
    }
];
var list = []; // 颜色数组

// 只循环一次，按 zStock 分类并计算 truck 的总数（只进行了一次计算）
function truckLenByStock(arr) {
    if (!(arr instanceof Array)) {
        return;
    }

    var obj = {};

    arr.forEach(item => {
        if (item.zStock && item.truck && Array.isArray(item.truck)) {
            if (!(obj.hasOwnProperty(item.zStock))) {
                obj[item.zStock] = item.truck.length;
            } else {
                obj[item.zStock] = obj[item.zStock] += item.truck.length;
            }
        }
    });

    return obj;
}

// 按 dictValue 进行分类
function dictValueArr(arr) {
    if (!(arr instanceof Array)) {
        return;
    }

    var result = {};
    arr.forEach(item => {
        var dict = dictValueArrItem(item);

        if (item.dictValue) {
            if (!result.hasOwnProperty(item.dictValue)) {
                result[item.dictValue] = [];
            }
            result[item.dictValue].push(dict);
        }
    });
    return result;
}

function dictValueArrItem(item) {
    if (!(item instanceof Object)) {
        return
    }

    return {
        color: item.parama || null,
        carNum: +item.paramb || null,
        time: +item.paramc || null
    };
}

// 冒泡排序（按 carNum 从小到大），这里只做示范，项目中用 sort 替换
function dictValueArrSort(obj) {
    if (!(obj instanceof Object)) {
        return;
    }

    for (var key in obj) {
        for (var i = 0; i < obj[key].length - 1; i++) {
            for (var j = 0; j < obj[key].length - 1 - i; j++) {
                if (obj[key][j].carNum && obj[key][j + 1].carNum) {
                    if (obj[key][j].carNum > obj[key][j + 1].carNum) {
                        var temp = obj[key][j];
                        obj[key][j] = obj[key][j + 1];
                        obj[key][j + 1] = temp;
                    }
                }
            }
        }
    }

    return obj;
}

// 获取等待时间及颜色（提前比较）
function getTimeAndColor(arr, obj, stockGroup) {
    if (!(arr instanceof Array) || !(obj instanceof Object) || !(stockGroup instanceof Object)) {
        return;
    }

    return arr.map(item => {
        if (item.zStock && obj[item.zStock] && stockGroup[item.zStock] && Array.isArray(obj[item.zStock])) {
            item.num = stockGroup[item.zStock];
            for (let i = 0; i < obj[item.zStock].length; i++) {
                if (obj[item.zStock][i + 1]) {
                    if (obj[item.zStock][i + 1].carNum) {
                        if (obj[item.zStock][i + 1].carNum > stockGroup[item.zStock]) {
                            item.color = obj[item.zStock][i].color;
                            item.time = obj[item.zStock][i].time;
                            break;
                        }
                    }
                } else {
                    item.color = obj[item.zStock][i].color;
                    item.time = obj[item.zStock][i].time;
                }
            }
        }

        return item;
    });
}

var getTruck = truckLenByStock(arr);
var dictValueList = dictValueArr(list);
var sortDictValueList = dictValueArrSort(dictValueList);
var result = getTimeAndColor(arr, sortDictValueList, getTruck);

// 记录上一次的值
function getTimeAndColor2(arr, obj, stockGroup) {
    if (!(arr instanceof Array) || !(obj instanceof Object) || !(stockGroup instanceof Object)) {
        return;
    }

    var recordColor, recordTime;
    return arr.map(item => {
        if (item.zStock && obj[item.zStock] && stockGroup[item.zStock] && Array.isArray(obj[item.zStock])) {
            for (let i = 0; i < obj[item.zStock].length; i++) {
                if (obj[item.zStock][i].carNum > stockGroup[item.zStock]) {
                    item.color = recordColor || obj[item.zStock][i].color;
                    item.time = recordTime || obj[item.zStock][i].time;
                    break;
                } else {
                    item.color = obj[item.zStock][i].color;
                    item.time = obj[item.zStock][i].time;
                }

                recordColor = obj[item.zStock][i].color;
                recordTime = obj[item.zStock][i].time;
            }
        }

        return item;
    });
}

// 思考：
// 1. 两种方法，哪一种更好？
// 2. 通过笔记上的图解，代入满足各区间的值，按照代码逻辑去推演一遍程序执行过程