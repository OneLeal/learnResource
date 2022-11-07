function isObject(data) {
  return data && typeof data === "object";
}

function reactive(data) {
  if (isObject(data)) {
    return new Proxy(data, {
      get: function (target, prop, receiver) {
        const result = Reflect.get(target, prop, receiver);
        track(target, prop);
        return isObject(result) ? reactive(result) : result;
      },

      set: function (target, prop, value, receiver) {
        Reflect.set(target, prop, value, receiver);
        trigger(target, prop);
        return true;
      },
    });
  }
}

// 依赖容器
let targetMap = new WeakMap();
let activeEffect;

// 依赖收集
function track(target, prop) {
  let deps = targetMap.get(target);
  !deps && targetMap.set(target, (deps = new Map()));

  let dep = targetMap.get(prop);
  !dep && deps.set(prop, (dep = new Set()));

  trackEffect(dep);
}

// 向数据的 dep 容器中注入依赖
function trackEffect(dep) {
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect);
  }
}

// 依赖触发
function trigger(target, prop) {
  const dep = targetMap.get(target);
  if (dep) {
    const arr = dep.get(prop) || [];

    for (let i = 0, len = arr.length; i < len; ++i) {
      let item = arr[i];
      item && item.run();
    }
  }
}
