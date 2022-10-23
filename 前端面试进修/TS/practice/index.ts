// 基础课: Boolean Number String
let bool: boolean = true; // 指定变量类型是 boolean
let number: number = 12; // 指定变量类型是 number
let str: string = "hello world"; // 指定变量类型是 string

// ---------------------------------------------------------------

// 基础课: Array Tuple(元祖)
let list1: number[] = [1, 2, 3]; // 声明一个整型数组(泛型)
let list2: Array<string> = ["Html", "Css", "Javascript"]; // 声明一个字符串数组(泛型)

// 声明一个数组，可存放的值可以是 string | number | boolean
let list3: (string | number | boolean)[] = [true, "Html5"];
list3.push(1);
console.log("list3: ", list3);

// tuple 固定类型及长度，但使用一些 api 不会报错
let list4: [number, string, number, boolean] = [10, "Css", 25, true];
list4.push(0);
list4.shift();
console.log("list4: ", list4);

// ---------------------------------------------------------------

// 基础课: Union Literal(字面量类型)
let x1: number | string; // 变量类型可以是 number | string (Union)
let x2: 1 | 2 | true; // 变量的值只能是 1 、2、true (字面量类型)

function merge(
  n1: number | string,
  n2: number | string,
  type: true | false
): number | string {
  if (type) {
    return n1.toString() + n2.toString();
  } else {
    if (typeof n1 === "string" && typeof n2 === "string") {
      return n1 + n2;
    } else return +n1 + +n2;
  }
}
const sum1 = merge(5, 7, false);
const sum2 = merge("wonder", "ful", false);
const sum3 = merge("ES", 6, true);
console.log("sum1: ", sum1);
console.log("sum2: ", sum2);
console.log("sum3: ", sum3);

// ---------------------------------------------------------------

// 基础课: Enum(枚举)
enum Signal {
  red,
  yellow,
  green,
}

enum Color {
  black = "#000",
  white = "#fff",
  gray = "#ccc",
}

// 不进行赋值，可以相互取值
console.log("signal: ", Signal.red, Signal[0]);
console.log("signal: ", Signal.yellow, Signal[1]);
console.log("signal: ", Signal.green, Signal[2]);

console.log("Color: ", Color.black, Color["#000"]);
console.log("Color: ", Color.white, Color["#fff"]);
console.log("Color: ", Color.gray, Color["#ccc"]);

// ---------------------------------------------------------------

// 基础课: Any Unkonwn void never undefined
let x3: any; // 变量 x3 的值可以是任何类型，可以传递给别的变量
let x4: unknown; // 变量 unknown 的值可以是任何类型，但禁止传递
x3 = null;
x3 = 50; // any 类型，可以任意赋值
x4 = 60; // unknown 类型，可以任意赋值
let x5: number = x3; // any 类型，可以传递
// let x6: number = x4; // unknown 类型，不可传递

function fn1(): void {} // void 表示函数无返回值
function fn2(msg: string): never {
  throw new Error(msg); // never 表示函数不会执行完
}
function fn3(): undefined {
  return; // undefined 表示函数返回值缺省
}

// ---------------------------------------------------------------

// 基础课: 类型断言(type assertion)
let x7: any;
x7 = "beauty";

// 告知编译器变量当前类型应转为 string
let assertion1 = (<string>x7).startsWith("b");
let assertion2 = (x7 as string).endsWith("y");
console.log("assertion1: ", assertion1);
console.log("assertion2: ", assertion2);

// ---------------------------------------------------------------

// 基础课: 函数的可选参数设置
function fn4(n1: number, n2?: true | false) {
  if (!n2) {
    return 0;
  }
  return n1;
}
console.log("fn4: ", fn4(5, true), fn4(10));

// ---------------------------------------------------------------

// 基础课: 泛型
const foo = <T, Y>(n1: T, n2: Y) => [n1, n2];
const result1 = foo<number, string>(10, "Vue");
const result2 = foo<number[], (string | number)[]>([10, 20], [5, "React"]);
console.log("result1 result2: ", result1, result2);

// 泛型搭配接口
interface IOpts {
  label: string;
  value: string;
  info?: string;
}
const arr: IOpts[] = [
  { label: "中国大陆", value: "100" },
  { label: "离岸", value: "999", info: "离岸申请" },
];

// ---------------------------------------------------------------
