Promise.resolve().then(res => { console.log(1); });
const fn = async () => {
    console.log(2);
    await new Promise((resolve) => {
        // resolve();
        setTimeout(resolve);
    });
    console.log(3);
};
setTimeout(() => { console.log(4); }, 0);
fn();
console.log(5);

// 变量提升面试题：
// foo();
// function foo () { console.log('first'); };
// foo();
// var foo = 0;
// foo();
// function foo () { console.log('second'); };
// foo();

// 什么是BFC，如何避免 margin 重叠；
// flex 布局的几个属性
// 防抖节流
// addListener
// 算法题