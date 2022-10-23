// 异步面试题原版
var test = async function() {
  var a = 2;
  setTimeout(() => { console.log(1); }, 0);

  console.log(a); // 同步

  for (let i = 1; i < 5; i++) {
      await new Promise((resolve, reject) => {
          setTimeout(() => { resolve(); }, 100);
          a++;
      });
  }

  console.log(a);
  console.log(3);
  setTimeout(() => { console.log(4); }, 0);
};

test();