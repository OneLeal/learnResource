// 操作字符串的简单练习题

// 解析 url 上的参数，返回一个对象
var url = "www.imooc.com?name=QinYanFei&age=22&sex=0&phone=13083771680";
function fetchParamsOfURL(url) {
  let params = {};

  if (url.indexOf("?") > -1) {
    let group = url.split("?")[1];
    let paramsGroup = group.split("&");

    paramsGroup.forEach((item) => {
      let data = item.split("=");
      params[data[0]] = data[1];
    });
  }

  return params;
}

// 字符串反转
var str = "You don't touch mother fucker think twice.";
function reverseStr(str) {
  return str.split(" ").reverse().join(" ");
}

// 返回下列字符串所包含的子串的起始位置
var supStr = "苹果-香蕉-橘子-西瓜-苹果-柠檬-榴莲-木瓜-苹果-苹果-菠萝-苹果";
var subStr = "苹果";

function fetchPosition(supStr, subStr) {
  let position = [];
  let index = supStr.indexOf(subStr);

  while (index > -1) {
    position.push(index);
    index = supStr.indexOf(subStr, index + 1);
  }

  return position;
}

console.log("fetchParamsOfURL: ", fetchParamsOfURL(url));
console.log("reverseStr: ", reverseStr(str));
console.log("fetchPosition: ", fetchPosition(supStr, subStr));
