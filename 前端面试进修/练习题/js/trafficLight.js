/**
 * 红绿灯问题：
 * 红灯 3s 亮一次，黄灯 2s 亮一次，绿灯 1s 亮一次；
 * 如何让三个灯不断交替重复亮灯？
 * 三个亮灯函数已经存在;
 */

function red() {
  console.log("red");
}

function green() {
  console.log("green");
}

function yellow() {
  console.log("yellow");
}

// ------------------------------------------------

// 解法 1:
const task = (timer, light, callback) => {
  setTimeout(() => {
    if (light === "red") {
      red();
    } else if (light === "green") {
      green();
    } else if (light === "yellow") {
      yellow();
    }
    callback && callback();
  }, timer);
};

const step = () => {
  task(3000, "red", () => {
    task(2000, "yellow", () => {
      task(1000, "green", step);
    });
  });
};

// ------------------------------------------------

// 解法 2:
function start(light, delay) {
  const lightCache = { red, green, yellow };
  let type = light;
  let time = delay;
  let timer = setTimeout(() => {
    lightCache[type]();

    if (type === "red") {
      (type = "yellow"), (time = 2000);
    } else if (type === "yellow") {
      (type = "green"), (time = 1000);
    } else if (type === "green") {
      (type = "red"), (time = 3000);
    }

    clearTimeout(timer);
    timer = null;
    start(type, time);
  }, time);
}

// ------------------------------------------------
