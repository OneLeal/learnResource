// 数组降维练习
var arr = [
  ["apple", "pear"],
  "watermelon",
  "lemon",
  ["purple", ["moonlight", "fealty"], "abandon"],
  "fundamental",
  [
    "desperate",
    ["excellent", "natural", "national", ["social", "cooperation"], "beauty"],
  ],
  "turtle",
];

// 从里向外递归
function arrayFlat1(arr) {
  let list = [];

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      list = list.concat(arrayFlat1(arr[i]));
    } else {
      list.push(arr[i]);
    }
  }

  return list;
}

// 从外向里递归
function arrayFlat2(arr) {
  let temp = [];
  let list = arr.filter((item) => Array.isArray(item));

  if (list.length) {
    for (let i = 0; i < arr.length; i++) {
      !Array.isArray(arr[i]) && temp.push(arr[i]);
    }

    for (let j = 0; j < list.length; j++) {
      temp = temp.concat(list[j]);
    }

    return arrayFlat2(temp);
  }

  return arr;
}

// 使用 API
function arrayFlat3(arr) {
  return arr.flat(Infinity);
}

console.log("arrayFlat1: ", arrayFlat1(arr));
console.log("arrayFlat2: ", arrayFlat2(arr));
console.log("arrayFlat3: ", arrayFlat3(arr));
