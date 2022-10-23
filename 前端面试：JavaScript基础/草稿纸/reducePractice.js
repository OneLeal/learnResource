var reduce_objArr = [
    { id: 1, name: '张杰', age: 34, sex: '1', city: '广东', star: '白羊' },
    { id: 2, name: '周杰伦', age: 42, sex: '1', city: '香港', star: '水瓶' },
    { id: 3, name: '李荣浩', age: 30, sex: '1', city: '安徽', star: '射手' },
    { id: 4, name: '陈雪凝', age: 25, sex: '0', city: '福建', star: '摩羯' },
    { id: 5, name: '庄心妍', age: 27, sex: '0', city: '广东', star: '狮子' },
    { id: 6, name: '王梓萌', age: 25, sex: '0', city: '广东', star: '天蝎' },
    { id: 7, name: '赵方婧', age: 26, sex: '0', city: '广西', star: '处女' },
    { id: 9, name: '金歧玟', age: 29, sex: '0', city: '湖北', star: '双鱼' },
    { id: 9, name: '毛不易', age: 27, sex: '1', city: '江苏', star: '白羊' },
    { id: 10, name: '浅色星河', age: 24, sex: '1', city: '广西', star: '摩羯' },
    { id: 10, name: '浅芷初夏', age: 24, sex: '1', city: '广西', star: '摩羯' },
    { id: 12, name: '周冬雨', age: 27, sex: '0', city: '湖北', star: '处女' },
];

// 去掉 id 重复的元素
function uniqueId(arr) {
    return arr.reduce((calc, item) => {
        var flag = calc.some(i => i.id === item.id);
        !flag && calc.push(item);
        return calc;
    }, []);
}
console.log(uniqueId(reduce_objArr));

// 根据地区分类排布
// 根据星座分类排布
function sortByType(arr, type) {
    return arr.reduce((calc, item) => {
        if (!(calc.hasOwnProperty(item[type]))) {
            calc[item[type]] = [];
        }
        calc[item[type]].push(item);
        return calc;
    }, {});
}
console.log(sortByType(reduce_objArr, 'city'));
console.log(sortByType(reduce_objArr, 'star'));

var music = [
    { name: '陈雪凝', songs: ['绿色', '你的酒馆对我打了烊', '回忆见'], listenerThreeDays: [1, 2, 3] },
    { name: '音阙诗听', songs: ['有美人兮', '空山新雨后', '红昭愿'], listenerThreeDays: [4, 5, 6] },
    { name: '庄心妍', songs: ['以后的以后', '走着走着就散了'], listenerThreeDays: [70, 8, 9] },
    { name: '赵方婧', songs: ['谷雨', '芒种'], listenerThreeDays: [10, 11, 12] },
];

// 获取所有人的歌曲
// 统计近三天以上四个人歌曲的日活收听人数总和
// 给各子项添加近三天日活收听人数的总计
// 找出近三天热度最高的歌手（判断条件：listenerThreeDays 的和值）

function getAllMusic(arr) {
    return arr.reduce((calc, item) => {
        calc = [...calc, ...item.songs];
        return calc;
    }, []);
}
console.log(getAllMusic(music));

function getAllListener(arr) {
    return arr.reduce((calc, item) => {
        if (item.listenerThreeDays) {
            var num = item.listenerThreeDays.reduce((sum, listener) => {
                return sum + listener;
            }, 0);
        }
        return calc + num;
    }, 0);
}
console.log(getAllListener(music));

function addTotal(arr) {
    return arr.map(item => {
        if (item.listenerThreeDays) {
            var total = item.listenerThreeDays.reduce((calc, item) => {
                return calc + item;
            }, 0);
            item.total = total;
        }
        return item;
    });
}
console.log(addTotal(music));

function findHot(arr) {
    var sum = arr.reduce((calc, item) => {
        if (item.listenerThreeDays) {
            var total = item.listenerThreeDays.reduce((num, listener) => {
                return num + listener;
            }, 0);
        }
        calc.push(total);
        return calc;
    }, []);
    return Math.max(...sum);
}
console.log(findHot(music));

var calcRepeatArr = [1, 1, 1, 2, 3, 4, 4, 5, 100, 5, 6, 7, 8, 8, 9, 9, 9, 9, 9, 9, 10, 100];

// 统计数组元素的重复次数
function calcCopyCount(arr) {
    return arr.reduce((calc, item) => {
        if (!(calc.hasOwnProperty(item))) {
            calc[item] = 0;
        }
        calc[item]++;
        return calc;
    }, {});
}
console.log(calcCopyCount(calcRepeatArr));

var deepArr = [1, 2, 3, [4, 5, [6, 7, 8, [100, 200], 202], 9, 10], 11, 12, [13, [14, 15]], 16];

// 深度数组求和
function deepCalc(arr) {
    return arr.reduce((calc, item) => {
        if (item instanceof Array) {
            return calc + deepCalc(item);
        }
        return calc + item;
    }, 0);
}
console.log(deepCalc(deepArr));