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
    resolveCache = [];
    rejectCache = [];

    constructor (fn) {
        const resolveHandler = (value)  =>{
            if (this.state === 'padding') {
                this.value = value;
                this.state = 'fulfilled';
                this.resolveCache.forEach(fn => fn(this.value));
            }
        }
    
        const rejectHandler = (reason) => {
            if (this.state === 'rejected') {
                this.reason = reason;
                this.state = 'rejected';
                this.rejectCache.forEach(fn => fn(this.reason));
            }
        }

        try {
            fn(resolveHandler, rejectHandler);
        } catch (err) {
            rejectHandler(err);
        }
    }

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
                        resolve(r);
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
                    reject(err);
                }
            });
        }
    }

    catch (fn) {
        return this.then(null ,fn);
    }
};

MyPromise.resolve = function (value) {
    return new MyPromise((resolve, reject) => resolve(value));
}

MyPromise.reject = function (reason) {
    return new MyPromise((resolve, reject) => reject(reason));
}

MyPromise.all = function (list = []) {
    return new MyPromise((resolve, reject) => {
        const len = list.length, result = [];
        let count = 0;
        list.forEach(item => {
            item.then(data => {
                count++;
                result.push(data);
                len === count && resolve(result);
            }).catch(err => {
                reject(err);
            });
        });
    });
}

MyPromise.race = function (list = []) {
    return new MyPromise((resolve, reject) => {
        let flag = false;
        list.forEach(item => {
            item.then(data => {
                !flag && (flag = true, resolve(data));
            }).catch(err => reject(err));
        });
    });
}