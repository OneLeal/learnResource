/**
 * 手写 MyPromise
 * 1. 三个状态: pending | fulfilled | rejected;
 * 2. 状态流转: pending → fulfilled or pending → rejected;
 * 3. 实现链式调用;
 * 4. 实现异步;
 * 5. 实现全局静态方法 resolve() / reject();
 * 5. 实现 all() / race();
 */

class MyPromise {
  state = "pending";
  value = undefined;
  reason = undefined;

  resolveCallbacks = [];
  rejectCallbacks = [];

  constructor(executor) {
    const resolveHandler = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        this.resolveCallbacks.forEach((fn) => fn(this.value));
      }
    };

    const rejectHandler = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
        this.rejectCallbacks.forEach((fn) => fn(this.reason));
      }
    };

    try {
      executor(resolveHandler, rejectHandler);
    } catch (error) {
      rejectHandler(error);
    }
  }

  then(fn1, fn2) {
    fn1 = typeof fn1 === "function" ? fn1 : (value) => value;
    fn2 = typeof fn2 === "function" ? fn2 : (reason) => reason;

    if (this.state === "pending") {
      return new MyPromise((resolve, reject) => {
        this.resolveCallbacks.push((value) => {
          try {
            const newValue = fn1(value);
            resolve(newValue);
          } catch (error) {
            reject(error);
          }
        });

        this.rejectCallbacks.push((reason) => {
          try {
            const newReason = fn2(reason);
            reject(newReason);
          } catch (error) {
            reject(error);
          }
        });
      });
    }

    if (this.state === "fulfilled") {
      return new MyPromise((resolve, reject) => {
        try {
          const newValue = fn1(this.value);
          resolve(newValue);
        } catch (error) {
          reject(error);
        }
      });
    }

    if (this.state === "rejected") {
      return new MyPromise((resolve, reject) => {
        try {
          const newReason = fn2(this.reason);
          reject(newReason);
        } catch (error) {
          reject(error);
        }
      });
    }
  }

  catch(fn) {
    return this.then(null, fn);
  }
}

MyPromise.resolve = function (value) {
  return new MyPromise((resolve, reject) => resolve(value));
};

MyPromise.reject = function (reason) {
  return new MyPromise((resolve, reject) => reject(reason));
};

MyPromise.all = function (list = []) {
  const result = [];
  let count = 0;
  return new MyPromise((resolve, reject) => {
    list.forEach((item) => {
      item
        .then((data) => {
          result.push(data);
          count++;
          list.length === count && resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

MyPromise.race = function (list = []) {
  let flag = false;
  return new MyPromise((resolve, reject) => {
    list.forEach((item) => {
      item
        .then((data) => !flag && ((flag = true), resolve(data)))
        .catch((error) => reject(error));
    });
  });
};
