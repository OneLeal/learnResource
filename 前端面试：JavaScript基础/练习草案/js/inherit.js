// 对象声明的三种方式与继承
var legend = { name: '寒冰', position: 'ADC' };
var position = new Object({ x: 10, y: 12, z: 8 });
var college = Object.create({ name: '萌学园', address: '镜像世界' });

function Father(money, house) {
    this.money = money;
    this.house = house;
}

Father.prototype.info = function () {
    console.log('爸爸的钱：' + this.money, '爸爸的房子：' + this.house);
};

function Son(name, age, money, house) {
    this.name = name;
    this.age = age;
    Father.call(this, money, house);  // 构造函数继承
}

Son.prototype = Object.create(Father.prototype);  // 原型继承
Son.prototype.constructor = Son;

Son.prototype.say = function () {
    console.log(this.name, this.age, this.money, this.house);
};

var child = new Son('浅色星河', 24, '120000$', '花园洋房一套');
console.log(child.constructor === Son, child instanceof Son, child instanceof Father);
child.say();
child.info();



