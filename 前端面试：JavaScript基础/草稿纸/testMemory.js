// 不同类型的变量做实参和形参
var number = 10;
var musicName = 'Swagger';
var person = { music: '看母鸡干撒呀', from: '抖音', type: 2 };
var list = [0, 1, 2, 3, 4, 5];

function foo(target) {
    if (target instanceof Number) {
        target = 20;
    } else if (target instanceof String) {
        target = '大田后生仔';
    } else if (target instanceof Array) {
        target.push(100);
    } else if (target instanceof Object) {
        target.type ? (target.type = 5) : null;
    }
}
// 非引用类型传递值本身，引用类型传递内存地址
console.log(person);
foo(person);
console.log(person);

// 关于原型继承的缺陷测试
function SuperClass() {
    this.obj = { music: '大田后生仔', from: '抖音' };
    this.arr = [1, 2, 3, 4];
    this.name = '麻雀';
    this.count = 15;
}

function SubClass() {}
SubClass.prototype = new SuperClass();

var instance1 = new SubClass();
var instance2 = new SubClass();

instance1.name = '年少有为';
instance1.count = 100;
instance1.arr.push(5);
instance1.obj.music = '17岁';

// 因子类原型上生成了一个父类的实例，因此父类中引用类型的数据被子类实例共用
console.log(instance1.name, instance1.count, instance1.arr, instance1.obj);
console.log(instance2.name, instance2.count, instance2.arr, instance2.obj);

