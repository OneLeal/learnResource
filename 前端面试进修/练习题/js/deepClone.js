// 手写深拷贝
function deepClone(data) {
  if (typeof data !== "object") {
    return data;
  }

  let temp;
  Object.prototype.toString.call(data) === "[object Array]" && (temp = []);
  Object.prototype.toString.call(data) === "[object Object]" && (temp = {});

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      if (typeof data[key] === "object" && data[key] != null) {
        temp[key] = deepClone(data[key]);
      } else temp[key] = data[key];
    }
  }

  return temp;
}

let data = {
  x: 10,
  y: 20,
  info: { name: "势不可挡", eng: "unstoppable", list: [1, 2, 3] },
  arr: [4, 5, 6],
};

let list = [1, 2, true, { name: "Momota", age: 25 }, [1, 2, 3]];

let obj = deepClone(data);
let arr = deepClone(list);

obj.info.list = [];
obj.arr.push(7);
obj.info.name = "桃田贤斗";

arr[0] = "昆拉武特";
arr[3].name = "桃田贤斗";
arr[4][0] = "安塞龙";

console.log("clone object before: ", data);
console.log("clone object after: ", obj);

console.log("clone array before: ", list);
console.log("clone array after: ", arr);
