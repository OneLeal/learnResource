// 操作对象的简单练习题

// 取深度对象中的某个属性
var deepObj = {
  country: {
    China: {
      province: {
        Guangxi: {
          Guilin: "桂林",
          Nanning: "南宁",
          Liuzhou: "柳州",
        },
        Henan: {
          Zhengzhou: "郑州",
          Luoyang: "洛阳",
        },
      },
      city: {
        Shanghai: "上海",
        Chongqing: "重庆",
      },
    },
    Japan: {
      Honshu: "本州岛",
      Kobe: "神户",
    },
  },
};

function fetchProp(data, prop) {
  let value = null;

  for (let key in data) {
    if (key === prop) {
      value = data[key];
      break;
    } else {
      if (typeof data[key] === "object") {
        value = fetchProp(data[key], prop);

        if (value != null) {
          break;
        }
      }
    }
  }

  return value;
}

console.log("fetchProp: ", fetchProp(deepObj, "Nanning"));
console.log("fetchProp: ", fetchProp(deepObj, "city"));
console.log("fetchProp: ", fetchProp(deepObj, "Guilin"));
console.log("fetchProp: ", fetchProp(deepObj, "Chongqing"));
console.log("fetchProp: ", fetchProp(deepObj, "Kobe"));
