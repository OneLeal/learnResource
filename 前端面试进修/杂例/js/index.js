class Deep {
  constructor() {
    this.state = null;
    this.list = [];
  }

  collect(watcher) {
    this.list.push(watcher);
  }

  setState(state) {
    this.state = state;
    this.notify();
  }

  notify() {
    this.list.forEach((w) => w.update(this.state));
  }
}

class Wather {
  constructor(name, deep) {
    this.name = name;
    this.deep = deep;
    this.deep.collect(this);
  }

  update(state) {
    console.log("当前观察者: ", this.name);
    console.log("数据更新: ", state);
  }
}

const deep = new Deep();
const wather1 = new Wather("wather1", deep);
const wather2 = new Wather("wather2", deep);
const wather3 = new Wather("wather3", deep);
