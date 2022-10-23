// 开发一个简易的模块管理工具
const moduleTools = (function () {
  // 模块容器
  const deep = {};

  // 模块定义函数
  function define(name, dependent, callback) {
    (dependent || []).forEach((name, index) => {
      dependent[index] = deep[name];
    });

    deep[name] = callback.apply(null, dependent);
  }

  // 获取已声明的某一个模块
  function getModule(name) {
    return deep[name] || null;
  }

  return { define, getModule };
})();
