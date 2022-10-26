# Vue 笔记

- 关于 Vue 生命周期

  1. vue 的 init 方法中做初始化操作;
  2. 先初始化生命周期及相关事件等 initLifecycle / initEvents / initRender;
  3. 触发 hook: beforeCreate;
  4. 调用 initState 方法初始化 props methods data computed watch;
  5. 触发 hook: created;
  6. 开始编译模板，把 template 编译成 render function 并执行，生成一个个 virtual dom;
  7. 触发 hook: beforeMount;
  8. 把 virtual tree 挂载到 el 上;
  9. 触发 hook: mounted;
  10. 组件更新前/更新后: beforeUpdate / updated;
  11. 离开页面时，组件会销毁: beforeDestory / destoryed;
  12. 当使用的缓存组件被激活时: activated;

- data 初始化及其响应式原理:

  1. initState 时调用 initData;
  2. 通过 getData() 获取用户传入的数据;
  3. 遍历每个数据并调用 proxy 将 data 挂载到 vm 上;
  4. observe(data);
  5. observe 方法会拦截基本类型的数据或已经实例化过 Observer 类的数据;
  6. new Observer(data)，并返回其实例;
  7. new Dep()，使用 def 方法给数组或对象添加 ob 属性，值是 Observer 实例本身;
  8. 数组走 observeArray 方法，对象走 walk 方法;
  9. walk 遍历对象每个属性并调用 defineReactive 方法;
  10. defineReactive 调用 observe 方法形成递归，以处理深层对象;
  11. new Dep()，为当前数据进行响应式设置 get / set;
  12. get 中 dep.depend() 去收集依赖，若当前数据是数组则 dependArray();
  13. set 中 dep.notify() 去通知观察者做 update，并重新 observe(newVal) 给新值添加响应式;
  14. observeArray 方法遍历其每个值并调用 observe 形成递归;
  15. dependArray 方法遍历其每个值，通过 ob 属性调用 depend，若值还是数组则递归;
  16. push 等方法被重写了，在调用这些 api 时也是用 ob 属性去 dep.notify();

  - Observer 类中 new Dep() 以及新增 ob 属性都是为了给数组做响应式;
  - 除此之外，set / delete 方法也是通过 ob 属性去通知观察者进行 update 的;
  - 但若数组元素是基本类型数据，仍无响应式(arr[0] = 1 或 arr.length = 0 都无效);

- props 原理:

  1. initState 时调用 initProps;
  2. 遍历每个 props 直接设置响应式 defineReactive(vm.\_props, key, value);
  3. 调用 proxy 将 props 挂载到 vm 上;

  - 访问 vm.props 时，实际上访问的是 vm.\_props;
  - 所以 vm.\_props 有响应式即可;

- computed 原理:

  1. initState 时调用 initComputed;
  2. 遍历每个计算属性并 new Watcher(vm, getter, { lazy: true })，将其保存在 vm 上;
  3. 调用 defineComputed(vm, key, getter);
  4. defineComputed 中使用 createComputedGetter 包装 userDef，并把计算属性挂到 vm 上;
  5. createComputedGetter 返回 computedGetter 方法，形成闭包缓存 key;
  6. computedGetter 方法中通过 key 取到该计算属性的 watcher;
  7. watcher.evaluate() / watcher.depend() / return watcher.value;
  8. Watcher 实例化时，保存 getter，lazy = true，value 是 undefined;
  9. 当计算属性被访问时，computedGetter 会执行;
  10. evaluate 方法中调用 get 方法，并设置 lazy = false;
  11. get 方法执行时，pushTarget() / getter.call(vm, vm) / popTarget();
  12. 所以数据能收集到计算属性的 watcher，而后 watcher.depend() 让数据收集页面的 watcher;
  13. return watcher.value 页面取到值，完成渲染;
  14. 数据变化时，按顺序先触发计算属性的 watcher，走 update 时只把 lazy = true;
  15. 而后触发页面的 render-watcher 页面渲染重新访问计算属性，回到步骤 9;

  - 计算属性同步的意义在于它的 function | get 中不能写入异步代码，否则页面可能读不到值;
  - 计算属性的依赖只是简单让其 dirty = true，只有页面重写访问计算属性，才会去计算新值;
  - new Watcher 时，其构造函数不会执行 get，因此依赖不会立刻被收集;

- watch 原理:

  1. initState 时调用 initWatch，遍历每个 watch 并调用 createWatcher(vm, key, handler);
  2. 取出 opts 和 handler，vm.$watch(expOrFn, handler, options);
  3. new Watcher()，如果设置了 immediate 则 cb.call(vm, watcher.value);
  4. Watcher 的构造函数执行，如果是字符串则用 parsePath 方法包装 getter;
  5. get 方法执行时，pushTarget() / getter.call(vm, vm) / popTarget();
  6. 使用 deep 时，会调用 traverse 方法递归访问引用类型数据中的每个属性;
  7. watch 的数据收集到监听器的 watcher 依赖;
  8. 数据变化时执行 update，而后执行 queueWatcher(this)，最后执行 run();
  9. run 方法调用 get 方法，此时数据已经变化了，能访问到变化后的数据;
  10. cb.call(this.vm, value, oldValue);

  - new Watcher 时，watch 的依赖马上被收集;
  - 如果 getter 是一个字符串(data.address.city)，会被 parsePath 包装成一个函数;
  - parsePath 利用了闭包缓存字符串数组 ["data", "address", "city"];
  - getter.call(vm, vm) 时，能够通过字符串数组访问到对象中的深层属性;
  - watch 的观察者实例会被维护在一个 queue 队列中;
  - queueWatcher 执行时会把当前的观察者实例放入这个队列，而后 nextTick(flushSchedulerQueue);
  - flushSchedulerQueue 会先按 watcher.id 排序，而后遍历队列 watcher.run();
  - 最后 callHook(vm, 'updated')，触发生命周期 updated;

- $nextTick 原理:
  1.  多个 $nextTick 的参数会被 push 到一个 callbacks 数组中;
  2.  $nextTick 调用了 nextTick 方法做 push 操作，最后执行 timerFunc;
  3.  timerFunc 的本质是一个宏/微，传入 flushCallbacks 方法作为其回调;
  4.  flushCallbacks 方法遍历 callbacks 执行其中的方法并置空;

### computed 和 watch 在原理上的区别

1. watch 的依赖优先被收集;
2. watch 没有被挂载在 vm 上;
3. 因为 watch 的依赖优先被收集，所以数据变化时其 handler 会更早执行;
4. 而对于 computed 来说只是改变其观察者的 lazy，要等到页面重新渲染才会去计算并读取新值;
5. watch 的观察者会被一个队列维护，computed 则不会;
6. 数据更新时: watch handle → beforeUpdate → computed() | computed.get() → updated;
7. 在依赖关系上，二者的依赖可能会被多个数据收集，但 watch 的回调只会被触发一次;
8. 首次加载时，computed-get 会走一次，而 watch 的回调要设置 immediate = true 才能触发;

### 为什么 watch 的观察者需要一个队列去维护，而 computed 却不用

1. 当一个 computed 中使用了多个数据时，这些数据都会去收集 computed 的依赖;
2. 当多个数据变化时，update 方法多次调用但仅仅只是对 lazy 变量做赋值操作;
3. 当页面重新渲染时，数据已更新，此时访问 computed 只进行了一次计算就读取到了新值;
4. 当页面上有多个 watch 变化时，queueWatcher 会被多次调用，依赖都会存入一个队列维护;
5. flushSchedulerQueue 最终会被当做一个宏/微任务的回调执行，按序一次行执行 run 方法;
6. 若使用 deep = true，同一个 watch 的观察者实例会多次调用 queueWatcher，所以需要队列维护;

### 为什么 data 必须是一个函数

1. 如果是一个对象，组件复用时，则共用一份数据(因为都是同一个实例);
2. 由函数返回的对象都是独立的，组件复用时不会互相影响;

### 关于组件之间的传值问题

1. Bus 总线传值: 它的实质是一个 vue 的实例，无法被销毁，不建议使用;
2. $parent / $children 都能访问组件实例，但太依赖层级关系且无法溯源，不建议使用;
3. provide / inject 原理还是根据 $parent 一层层找，不好溯源，不建议使用;
4. props 简单易用;
5. $emit 事件发射;
6. Vuex，虽然其本质也是一个 Vue 实例，但是比 Bus 好，代码高内聚;
7. 作用域插槽，公共组件封装得好不好就看它用得妙不妙;

```js
// 子组件 BaseInfo
data() {
  return {
    head: { title: "离 思", info: "曾经沧海难为水，除却巫山不是云" },
    content: { list: [], info: "沧海月明珠有泪，蓝田日暖玉生烟" }
  };
}

// 模板
<div>
  <slot name="head" :head="head"></slot>
  <slot name="content" :content="content"></slot>
</div>

// 父组件
<BaseInfo>
  <tempale #head="{ title, info }">
    <User :title="title" :info="info"></User>
  </tempale>

  <tempale #content="{ info, list }">
    <BaseInfo :list="list" :info="info"></BaseInfo>
  </tempale>
</BaseInfo>
```

### 为什么 v-for 要写 key

1. diff 算法采用就近复用原则，key 就是为了复用而存在;
2. dom tree 上的节点都进行同层级比较，如果 selector 和 key 都一样则直接复用;
3. selector 或 key 只要有一个不同则或创建、或删除;
4. key 不推荐设置为 index 是因为数组一旦变化，则 key 会变化，会增加不必要的渲染次数;

### 关于 diff 算法复用后的移动策略

1. https://zhuanlan.zhihu.com/p/225105999
2. https://zhuanlan.zhihu.com/p/534903909

### 关于 mixins 和 extends

1. 若一个变量同时在组件、混入文件、继承组件中声明，优先级: vm > mixins > extends;
2. 生命周期执行: extends > mixins > vm;

### 关于 filters 和 computed

1. 两者都有返回值，但 filters 中无 this;
2. filters 实质是一个 JS 函数，用于做数据的轻量化处理;

### 关于指令

```js
  // 重置 model
  model: {
    prop: 'radio',
    event: 'change'
  }

  // 自定义指令
  directives: {
    action: {
      update: function() {
        // ……
      }
    }
  }
  <div v-action></div>
```

### 函数式组件的使用案例

```js
<template functional>
</template>

<script>
import ACom from "./ACom";
import BCom from "./BCom";
import DefCom from "./baseTemplate";

const scheduleMap = [
  {
    template: ACom,
    list: ["001", "002"],
    data: { name:"私募理财" }
  }

  {
    template: BCom,
    list: ["003", "004"],
    data: { name:"稳健固收" }
  }
];

export default {
  render(h, context) {
    const { data, props } = context;
    const key = props.productCode;
    const target = scheduleMap.find(item => item.list,includes(key));
    const components = target.template || DefCom;
    Object.assign(data, target.data || {});
    return h(components, { ...data, ...props });
  }
}
</script>
```
