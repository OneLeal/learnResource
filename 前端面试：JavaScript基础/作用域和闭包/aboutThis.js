/*
 * this 的使用场景：
 * 1. 作为普通函数；
 * 2. 使用 call apply bind 时；
 * 3. 作为对象方法被调用；
 * 4. 在 class 方法中被调用；
 * 5. 箭头函数;
 *
 * this 取值是在函数执行时确定的，而非函数定义
 */

function fn1() {
    console.log(this);
}

fn1();
fn1.call({ name: '浅色星河' });

const fn2 = fn1.bind({ name: '浅芷初夏' });
fn2();

const girl = {
    name: '宋伊人',
    say() { console.log(this); },
    wait() {
        setTimeout(function () {
            console.log(this);
        });
    },
};
girl.say();
girl.wait();

const miss = {
    name: '陈雪凝',
    sing() {
        setTimeout(() => {
            console.log(this);
        });
    }
};
miss.sing();

class People {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    say() {
        console.log(this);
    }
}

const person = new People('周冬雨', 27);
person.say();

