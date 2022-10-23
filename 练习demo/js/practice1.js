/*
* LeetCode：
* 题号：914
* 标题：卡牌分组
* 题目：给定一副牌，每张牌上都写着一个整数。
* 此时，你需要选定一个数字 X，使我们可以将整副牌按下述规则分成 1 组或更多组：
*     1. 每组都有 X 张牌。
*     2. 组内所有的牌上都写着相同的整数。
*
* 仅当你可选的 X >= 2 时返回 true。
*
* 示例：
* 输入：[1, 2, 3, 4, 4, 3, 2, 1]
* 输出：true
* 说明：可行的分组是 [1,1]，[2,2]，[3,3]，[4,4]
*
* 输入：[1, 1, 2, 2, 2, 2]
* 输出：true
* 说明：可行的分组是 [1,1]，[2,2]，[2,2]
*
* */
var hasGroupsSizeX = function (arr) {
    if (!Array.isArray(arr)) return null;
    if (Array.isArray(arr) && arr.length === 1 && arr[0] === 1) return false;
    var obj = {}, temp;
    var gdc = function (x, y) {
        return x ? gdc(y % x, x) : y;
    };
    arr.forEach(num => {
        if (obj[num]) {
            obj[num]++;
        } else obj[num] = 1;
    });
    temp = Object.values(obj);
    while (temp.length > 1) {
        var x = temp.shift();
        var y = temp.shift();
        var num = gdc(x , y);
        if (num === 1) {
            return false;
        };
        temp.unshift(num);
    };
    return true;
};

/*
* LeetCode：
* 题号：605
* 标题：种花问题
* 题目：假设你有一个很长的花坛，一部分地块种植了花，另一部分却没有。
* 可是，花卉不能种植在相邻的地块上，它们会争夺水源，两者都会死去。
* 给定一个花坛和一个数 n，能否在不打破种植规则的情况下种入 n 朵花？能则返回 True，不能则返回 False。
*
* 示例：
* 输入：flowerbed = [1,0,0,0,1], n = 1
* 输出：true
*
* 输入：flowerbed = [1,0,0,0,1], n = 2
* 输出：false
*
* */
var canPlaceFlowers = function (arr, n) {
    if ((arr.length === 1 && arr[0] === 0 && n === 1) || n === 0) return true;

    for (var i = 0; i < arr.length; i++) {
        if (i === 0) {
            if (arr[i + 1] === 0 && arr[i] === 0) {
                arr[i] = 1;
                n--;
            }
        } else if (i === arr.length - 1) {
            if (arr[i - 1] === 0 && arr[i] === 0) {
                arr[i] = 1;
                n--;
            }
        } else {
            if (arr[i + 1] === 0 && arr[i - 1] === 0 && arr[i] === 0) {
                arr[i] = 1;
                n--;
            }
        }

        if (n === 0) break;
    }
    return n === 0;
};