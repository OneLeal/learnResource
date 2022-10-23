// 面试题 1
const obj = {
    say(){
        Array.from(arguments).forEach((item) => {
            console.log(`${this.str} ${item}`);
        });
    }
};

Object.defineProperties(obj, {
    'str': { value: 'hello', writable: false }
});

const objZh = {};
Object.defineProperties(objZh, {
    'str': { value: '你好', writable: false }
});

// 面试题 2
function Foo() {
    getName = function () { console.log(1); };
    return this;
}

Foo.getName = function () { console.log(2); };
Foo.prototype.getName = function () { console.log(3); };

var getName = function () { console.log(4); };
function getName () { console.log(5); }

// Foo.getName();
// getName();
// Foo().getName();
// getName();
// new Foo.getName();
// new Foo().getName();
// new new Foo().getName();