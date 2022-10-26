// 数组去重练习
var repeatArr = [2, 10, 12, 5, 7, 0, 9, 5, 12, 11, 9, 4, 3, 6, 9, 8, 14];

// 使用 indexOf includes api
function uniqueArray1(arr) {
  const list = [];
  for (let i = 0; i < arr.length; i++) {
    !list.includes(arr[i]) && list.push(arr[i]);
  }
  return list;
}

// 利用对象 key 的唯一性
function uniqueArray2(arr) {
  const obj = {};
  for (let i = 0; i < arr.length; i++) {
    !obj[arr[i]] && (obj[arr[i]] = true);
  }
  return Object.keys(obj);
}

// 双指针
function uniqueArray3(arr) {
  let list = [];
  let bool = true;

  for (let i = 0; i < arr.length; i++) {
    bool = true;
    for (let j = 0; j < list.length; j++) {
      if (list[j] === arr[i]) {
        bool = false;
        break;
      }
    }
    bool && list.push(arr[i]);
  }

  return list;
}

// 利用 Set
function uniqueArray4(arr) {
  return [...new Set(arr)];
}

// 使用 filter + lastIndexOf
function uniqueArray5(arr) {
  return arr.filter((num, index) => index === arr.lastIndexOf(num));
}

// 使用 sort
function uniqueArray6(arr) {
  const handleArr = arr.sort();
  const list = [];

  for (let i = 1; i < handleArr.length; i++) {
    handleArr[i] !== handleArr[i - 1] && i === 1 && list.push(handleArr[i - 1]);
    handleArr[i] !== handleArr[i - 1] && list.push(handleArr[i]);
  }
  return list;
}

console.log("uniqueArray1: ", uniqueArray1(repeatArr));
console.log("uniqueArray2: ", uniqueArray2(repeatArr));
console.log("uniqueArray3: ", uniqueArray3(repeatArr));
console.log("uniqueArray4: ", uniqueArray4(repeatArr));
console.log("uniqueArray5: ", uniqueArray5(repeatArr));
console.log("uniqueArray6: ", uniqueArray6(repeatArr));
