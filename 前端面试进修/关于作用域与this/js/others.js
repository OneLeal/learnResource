// 手写防抖函数
function debounce(fn, delay) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
}

// 手写节流函数
function throttle(fn, delay) {
  let timer = null;
  return function () {
    if (timer) {
      return;
    }

    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
}

// 利用闭包实现一个计数器，调用一次自增 1
function calcCounter() {
  let count = 0;
  return function () {
    return ++count;
  };
}
let count = calcCounter();
console.log("clac count: ", count());
console.log("clac count: ", count());
console.log("clac count: ", count());

// 利用闭包实现一个数据缓存器
function cacheData() {
  const data = {};

  function get(key) {
    return data[key] || null;
  }

  function set(key, value) {
    data[key] = value;
  }

  return { get, set };
}

let initData = cacheData();
initData.set("country", "英 国");
initData.set("city", "谢菲尔德");
initData.set("popular", "1,000,000");

console.log("国 家: ", initData.get("country"));
console.log("城 市: ", initData.get("city"));
console.log("人 口: ", initData.get("popular"));
