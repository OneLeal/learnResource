// 考察运算符优先级、作用域、函数、对象
function Foo () {
    getName = function () { console.log(1); };
    return this;
}

Foo.getName = function () { console.log(2); };
Foo.prototype.getName = function () { console.log(3); };  
var getName = function () { console.log(4); };
function getName () { console.log(5); };

Foo.getName(); // expected 2
getName(); // expected 4
Foo().getName(); // expected 1
getName(); // expected 1
new Foo.getName(); // expected 2
new Foo().getName(); // expected 3
new new Foo().getName(); // expected 3

// ---------------------------------------------------------

// 考察宏任务与微任务执行顺序
Promise.resolve().then(res => { console.log(1); });
const fn = async () => {
    console.log(2);
    await new Promise((resolve) => {
        resolve();
        // setTimeout(resolve);
    });
    console.log(3);
};
setTimeout(() => { console.log(4); }, 0);
fn();
console.log(5);

// ---------------------------------------------------------

// 考察变量提升
// foo();
// function foo () { console.log('first'); };
// foo();
// var foo = 0;
// foo();
// function foo () { console.log('second'); };
// foo();

// ---------------------------------------------------------

// 实现一个闭包累加器
var addFn = (function () {
    var count = 0;
    return function () {
        return ++count;
    }
})();
console.log('addFn: ', addFn());
console.log('addFn: ', addFn());
console.log('addFn: ', addFn());

// ---------------------------------------------------------

// 设计一段程序使条件 a === 1 && a === 2 && a === 3 成立
var b = 0;
Object.defineProperty(window, 'a', {
    get: function () { return ++b; }
});
console.log(a === 1 && a === 2 && a === 3);

// ---------------------------------------------------------