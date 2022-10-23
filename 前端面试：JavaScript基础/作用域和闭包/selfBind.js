// 手写 bind
Function.prototype.selfBind = function () {
  const args = Array.prototype.slice.call(arguments);
  const t = args.shift();
  const _this = this;
  return function () {
    return _this.apply(t, args);
  };
};

function test1() {
    console.log(this);
}

let test2 = test1.selfBind({ name: '自定义 bind' });
console.log(test2());

// 使用闭包避免变量污染
function createCache() {
    const data = {};
    return {
        set: function(key, value) {
            data[key] = value;
        },

        get: function (key) {
            return data[key];
        }
    }
}

const initData = createCache();
initData.set('music', '我的音乐');
initData.set('songs', ['绿色', '你的酒馆对我打了烊', '愚昧', '假装']);
initData.set('style', '温柔女声');

const me = createCache();
me.set('music', '我的音乐');
me.set('songs', ['再见只是陌生人', '以后的以后']);
me.set('style', '庄心妍');

console.log(initData.get('songs'), initData.get('style'));
console.log(me.get('songs'), me.get('style'));