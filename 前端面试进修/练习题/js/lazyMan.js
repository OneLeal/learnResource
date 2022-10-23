/**
 * 懒人问题: 编写一个类，实现如下功能
 * const man = new LazyMan("Jonh");
 * man.sleep(3000).eat(1000).play(2000);
 *
 * 按时序打印出:
 * I'am sleeping
 * I'am eating
 * I'am playing
 */

// 解法 1:
class LazyMan {
  constructor(name) {
    this.task = []; // 保存要做的事情
    this.name = name;
    this.myName(name);
    Promise.resolve().then(() => this.run());
  }

  // 不涉及链式调用，无需返回 this
  myName(name) {
    this.task.push(() => {
      console.log(` My name is ${name}`);
      this.next();
    });
  }

  sleep(time = 0) {
    this.task.push(() =>
      setTimeout(() => (console.log("I'am sleeping"), this.next()), time)
    );
    return this;
  }

  eat(time = 0) {
    this.task.push(() =>
      setTimeout(() => (console.log("I'am eating"), this.next()), time)
    );
    return this;
  }

  play(time = 0) {
    this.task.push(() =>
      setTimeout(() => (console.log("I'am playing"), this.next()), time)
    );
    return this;
  }

  next() {
    if (this.task.length) {
      const task = this.task.shift();
      task && task();
    }
  }

  run() {
    this.task.shift()();
  }
}

// 解法2:
class LazyManForPromise {
  constructor(name) {
    this.task = [];
    this.name = name;
    this.myName(name);
    Promise.resolve().then(() => this.run());
  }

  myName(name) {
    this.task.push(
      () =>
        new Promise((resolve, reject) => {
          console.log(` My name is ${name}`);
          resolve();
        })
    );
  }

  sleep(time) {
    this.task.push(
      () =>
        new Promise((resolve, reject) => {
          setTimeout(() => (console.log("I'am sleeping"), resolve()), time);
        })
    );
    return this;
  }

  eat(time) {
    this.task.push(
      () =>
        new Promise((resolve, reject) => {
          setTimeout(() => (console.log("I'am eating"), resolve()), time);
        })
    );
    return this;
  }

  play(time) {
    this.task.push(
      () =>
        new Promise((resolve, reject) => {
          setTimeout(() => (console.log("I'am playing"), resolve()), time);
        })
    );
    return this;
  }

  run() {
    if (this.task.length) {
      this.task.reduce((result, fn) => result.then(fn), Promise.resolve());
    }
  }
}
