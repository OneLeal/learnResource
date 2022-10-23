export default function Vue(opts = {}) {
  this.__init(opts);
}

// 初始化参数
Vue.prototype.__init = function (opts) {
  this.$opts = opts;
  this.$el = opts.el; // TODO: 暂不考虑 el 是一个字符串
  this.$data = opts.data;
  this.$methods = opts.methods;

  /**
   * 此处省略以下流程:
   * 1. beforeCreate
   * 2. initState
   * 3. initData
   * 4. created
   */

  proxy(this, this.$data);
  observe(this.$data);
  new Compiler(this);
};

// 给数据做代理: this.$data.xxx => this.xxx
function proxy(target, data) {
  Object.keys(data).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: true,
      get() {
        return data[key];
      },
      set(newVal) {
        if (!isSameValue(data[key], newVal)) {
          data[key] = newVal;
        }
      },
    });
  });
}

// 判断两个变量是否相等
function isSameValue(a, b) {
  return a === b || (Number.isNaN(a) && Number.isNaN(b));
}

function observe(data) {
  new Observer(data);
}

class Observer {
  constructor(data) {
    this.walk(data);
  }

  walk(data) {
    // TODO: 暂时不考虑对 Array 数据类型的值做响应式
    if (data && typeof data === "object") {
      Object.keys(data).forEach((key) =>
        this.defineReactive(data, key, data[key])
      );
    }
  }

  defineReactive(data, key, value) {
    let _this = this;
    this.walk(value); // 若 value 是对象，则一次性递归到底，处理其每个属性
    let dep = new Deep(); // 创建一个容器收集依赖

    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get() {
        Deep.Target && dep.add(Deep.Target); // 如果有依赖则收集
        return value;
      },
      set(newVal) {
        if (!isSameValue(value, newVal)) {
          value = newVal;
          _this.walk(newVal); // 若赋值为一个对象，则递归其每个属性添加响应式
          dep.notify();
        }
      },
    });
  }
}

class Wather {
  constructor(vm, key, callback) {
    this.vm = vm;
    this.key = key;
    this.callback = callback;

    Deep.Target = this;
    this.__old = vm[key];
    Deep.Target = null;
  }

  // 视图更新
  update() {
    let newVal = this.vm[this.key];
    !isSameValue(newVal, this.__old) && this.callback(newVal);
  }
}

class Deep {
  constructor() {
    this.wathers = new Set();
  }

  add(wather) {
    wather && wather.update && this.wathers.add(wather);
  }

  notify() {
    this.wathers.forEach((w) => w.update());
  }
}

class Compiler {
  constructor(vm) {
    this.el = vm.$el;
    this.vm = vm;
    this.methods = vm.$methods;

    this.compile(vm.$el);
  }

  compile(el) {
    let childNodes = el.childNodes; // 类数组

    Array.from(childNodes).forEach((node) => {
      if (node.nodeType === 3) {
        this.compileText(node);
      } else if (node.nodeType === 1) {
        this.compileElement(node);
      }

      // 递归编译所有的 dom 节点
      node.childNodes && node.childNodes.length && this.compile(node);
    });
  }

  // 处理文本节点
  compileText(node) {
    let reg = /\{\{(.+?)\}\}/;
    let value = node.textContent;

    if (reg.test(value)) {
      let key = RegExp.$1.trim();
      node.textContent = value.replace(reg, this.vm[key]);
      new Wather(this.vm, key, (v) => (node.textContent = v));
    }
  }

  // 处理常规节点
  compileElement(node) {
    if (node.attributes.length) {
      Array.from(node.attributes).forEach((attr) => {
        let attrName = attr.name;

        // 匹配指令
        if (attrName.startsWith("v-")) {
          // 只匹配 v-model & v-on:click
          attrName =
            attrName.indexOf(":") > -1 ? attrName.slice(5) : attrName.slice(2);

          let key = attr.value;
          this.update(node, key, attrName, this.vm[key]);
        }
      });
    }
  }

  update(node, key, attrName, value) {
    if (attrName === "model") {
      node.value = value;
      new Wather(this.vm, key, (v) => (node.value = v));
      node.addEventListener("input", () => (this.vm[key] = node.value));
    } else if (attrName === "click") {
      node.addEventListener(attrName, this.methods[key].bind(this.vm));
    }
  }
}
