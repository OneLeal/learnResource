/*
 1. 执行 async 函数返回的是 Promise 对象；
 2. await 相当于 Promise 的 then；
 3. 使用 try...catch 捕获异常；

 宏任务：Dom 事件，ajax，定时任务
 微任务：Promise async/await
 微任务比宏任务先执行
 */

// 面试题 1：
async function test() {
    let a = 2;
    setTimeout(() => { console.log(1); }, 0);
    console.log(a);

    for (let i = 0; i < 5; i++) {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(i+1);
            }, 100);
            console.log('loop: ' + (i + 1));
            a++;
        }).then((index) => {
            console.log('promise resolve');
            setTimeout(() => {
                console.log('promise resolve setTimeout mission: ' + index);
            }, 100);
        });
    }

    console.log(a);
    console.log(3);
    setTimeout(() => { console.log(4); }, 0);
}

test();

// 面试题 2：
!(async function () {
    console.log('start');

    const a = await 100;
    console.log('a', a);

    const b = await Promise.resolve(200);
    console.log('b', b);

    const c = await Promise.reject(300);
    console.log('c', c);

    console.log('end');
})();

// 面试题 3：
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}

async function async2() {
    console.log('async2');
}

setTimeout(() => { console.log('timer'); }, 0);

console.log('javascript start');

async1();

new Promise ((resolve) => {
    console.log('promise1');
    resolve();
}).then(() => {
    console.log('promise2');
});

console.log('javascript end');