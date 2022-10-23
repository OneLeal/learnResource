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

// 方法一
function f1() {
    Array.from(arguments).forEach(item => {
        console.log(objZh.str + ' ' + item);
    })
}

f1('foo', 'bar'); // 你好 foo

// 方法二
const f2 = function () {
    obj.say.call(objZh, ...arguments);
};
f2('foo', 'bar');

// 方法三
const o = Object.create(objZh);
o.say = obj.say;
o.say('foo', 'bar');