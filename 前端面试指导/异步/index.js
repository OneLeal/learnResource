/**
 * 手写 Promise：
 * 原则：参考 Promise A+ 规范
 * 大纲：
 * 1. 所需变量 → 记录状态/记录值/缓存回调函数;
 * 2. 构造函数只做 2 件事，执行用户传递的方法及定义 resolve/reject 函数;
 * 3. resolve/reject 函数做 3 件事：记录值，改状态，执行回调函数;
 * 4. then 方法返回一个新的 Promise 对象;
 * 5. then 方法需要对当前状态进行判断，padding 时缓存回调函数;
 * 6. catch 方法为 then 方法的语法糖;
 */
class MyPromise {
    state = 'padding'; // padding fulfilled rejected
    reason = undefined;
    value = undefined;
    resolveCache = []; // resolve 回调函数缓存器
    rejectCache = []; // reject 回调函数缓存器

    // fn: 用户传入的函数
    constructor (fn) {
        // fn 参数 resolve
        const resolvehandler = (value) => {
            // 先改变状态，而后执行回调函数
            if (this.state === 'padding') {
                this.state = 'fulfilled';
                this.value = value;
                this.resolveCache.forEach(fn => fn(this.value));
            }
        };

        // fn 参数 reject
        const rejecthandler = (reason) => {
            // 先改变状态，而后执行回调函数
            if (this.state === 'padding') {
                this.state = 'rejected';
                this.reason =reason;
                this.rejectCache.forEach(fn => fn(this.reason));
            }
        };
        
        try {
            fn(resolvehandler, rejecthandler); // 执行用户传入的函数
        } catch (err) {
            rejecthandler(err); // 捕获用户函数的错误
        }
    }

    // padding 状态下需缓存回调函数
    then (fn1, fn2) {
        fn1 = typeof fn1 === 'function' ? fn1 : (v) => v;
        fn2 = typeof fn2 === 'function' ? fn2 : (e) => e;

        if (this.state === 'padding') {
            return new MyPromise((resolve, reject) => {
                this.resolveCache.push(() => {
                    try {
                        const v = fn1(this.value);
                        resolve(v);
                    } catch (err) {
                        reject(err);
                    }
                });

                this.rejectCache.push(() => {
                    try {
                        const r = fn2(this.reason);
                        reject(r);
                    } catch (err) {
                        reject(err);
                    }
                });
            });
        }

        if (this.state === 'fulfilled') {
            return new MyPromise((resolve, reject) => {
                try {
                    const v = fn1(this.value);
                    resolve(v);
                } catch (err) {
                    reject(err);
                }
            });
        }

        if (this.state === 'rejected') {
            return new MyPromise((resolve, reject) => {
                try {
                    const r = fn2(this.reason);
                    reject(r);
                } catch (err) {
                    reject(err)
                }
            });
        }
    }

    catch (fn) {
        return this.then(null, fn);
    }
}

// 只返回一个 fulfilled 状态的 Promise
MyPromise.resolve = function (value) {
    return new MyPromise((resolve, reject) => resolve(value));
}

// 只返回一个 rejected 状态的 Promise
MyPromise.reject = function (reason) {
    return new MyPromise((resolve, reject) => reject(reason));
}

// 返回一个数组，内容是一系列 Promise 对象 resolve 的执行结果，其中一个出错则抛出错误
MyPromise.all = function (list = []) {
    return new MyPromise((resolve, reject) => {
        const len = list.length, result = [];
        let count = 0;
        list.forEach(item => {
            item.then(data => {
                result.push(data);
                count++;
                count === len && resolve(result);
            }).catch(err => reject(err));
        });
    });
}

// 一系列的 Promise 对象的 resolve 同时执行，返回执行最快的 resolve 结果
MyPromise.race = function (list = []) {
    let flag = false;
    return new MyPromise((resolve, reject) => {
        list.forEach(item => {
            item.then(data => {
                !flag && (flag = true, resolve(data));
            }).catch(err => reject(err));
        });
    });
}

// ----------------------------------------------------------
var t1 = new MyPromise((resolve, reject) => {
    // resolve(100);
    // reject('something is wrong!');
    setTimeout(() => {
        resolve(120);
    }, 1000);
});

var t2 = t1.then(data => {
    console.log('data: ', data);
    return ++data;
});

var t3 = t2.then(data => {
    console.log('data: ', data);
    // throw new Error('unkown error!');
    return data + 2;
});

var t4 = t3.catch(err => console.warn(err));
var t5 = MyPromise.resolve('浅色星河');
var t6 = MyPromise.reject('error!');
var t7 = MyPromise.all([t1, t2, t3, t5, t4]).then(data => console.log(data)).catch(e => console.warn(e));
