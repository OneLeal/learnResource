"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var point_1 = require("../utils/point");
// 基础课: Boolean Number String
var bool = true; // 指定变量类型是 boolean
var number = 12; // 指定变量类型是 number
var str = "hello world"; // 指定变量类型是 string
// ---------------------------------------------------------------
// 基础课: Array Tuple(元祖)
var list1 = [1, 2, 3]; // 声明一个整型数组(泛型)
var list2 = ["Html", "Css", "Javascript"]; // 声明一个字符串数组(泛型)
// 声明一个数组，可存放的值可以是 string | number | boolean
var list3 = [true, "Html5"];
list3.push(1);
console.log("list3: ", list3);
// tuple 固定类型及长度，但使用一些 api 不会报错
var list4 = [10, "Css", 25, true];
list4.push(0);
list4.shift();
console.log("list4: ", list4);
// ---------------------------------------------------------------
// 基础课: Union Literal(字面量类型)
var x1; // 变量类型可以是 number | string (Union)
var x2; // 变量的值只能是 1 、2、true (字面量类型)
function merge(n1, n2, type) {
    if (type) {
        return n1.toString() + n2.toString();
    }
    else {
        if (typeof n1 === "string" && typeof n2 === "string") {
            return n1 + n2;
        }
        else
            return +n1 + +n2;
    }
}
var sum1 = merge(5, 7, false);
var sum2 = merge("wonder", "ful", false);
var sum3 = merge("ES", 6, true);
console.log("sum1: ", sum1);
console.log("sum2: ", sum2);
console.log("sum3: ", sum3);
// ---------------------------------------------------------------
// 基础课: Enum(枚举)
var Signal;
(function (Signal) {
    Signal[Signal["red"] = 0] = "red";
    Signal[Signal["yellow"] = 1] = "yellow";
    Signal[Signal["green"] = 2] = "green";
})(Signal || (Signal = {}));
var Color;
(function (Color) {
    Color["black"] = "#000";
    Color["white"] = "#fff";
    Color["gray"] = "#ccc";
})(Color || (Color = {}));
// 不进行赋值，可以相互取值
console.log("signal: ", Signal.red, Signal[0]);
console.log("signal: ", Signal.yellow, Signal[1]);
console.log("signal: ", Signal.green, Signal[2]);
console.log("Color: ", Color.black, Color["#000"]);
console.log("Color: ", Color.white, Color["#fff"]);
console.log("Color: ", Color.gray, Color["#ccc"]);
// ---------------------------------------------------------------
// 基础课: Any Unkonwn void never undefined
var x3; // 变量 x3 的值可以是任何类型，可以传递给别的变量
var x4; // 变量 unknown 的值可以是任何类型，但禁止传递
x3 = null;
x3 = 50; // any 类型，可以任意赋值
x4 = 60; // unknown 类型，可以任意赋值
var x5 = x3; // any 类型，可以传递
// let x6: number = x4; // unknown 类型，不可传递
function fn1() { } // void 表示函数无返回值
function fn2(msg) {
    throw new Error(msg); // never 表示函数不会执行完
}
function fn3() {
    return; // undefined 表示函数返回值缺省
}
// ---------------------------------------------------------------
// 基础课: 类型断言(type assertion)
var x7;
x7 = "beauty";
// 告知编译器变量当前类型应转为 string
var assertion1 = x7.startsWith("b");
var assertion2 = x7.endsWith("y");
console.log("assertion1: ", assertion1);
console.log("assertion2: ", assertion2);
// ---------------------------------------------------------------
// 基础课: 函数的可选参数设置
function fn4(n1, n2) {
    if (!n2) {
        return 0;
    }
    return n1;
}
console.log("fn4: ", fn4(5, true), fn4(10));
// ---------------------------------------------------------------
// 基础课: 泛型
var foo = function (n1, n2) { return [n1, n2]; };
var result1 = foo(10, "Vue");
var result2 = foo([10, 20], [5, "React"]);
console.log("result1 result2: ", result1, result2);
var arr = [
    { label: "中国大陆", value: "100" },
    { label: "离岸", value: "999", info: "离岸申请" },
];
// ---------------------------------------------------------------
// 进阶课: interface & class
var p1 = new point_1.Point(2, 2);
var p2 = new point_1.Point(3, 4);
p1.drawPoint();
var distance = p1.calcArea(p2);
console.log("distance: ", distance);
