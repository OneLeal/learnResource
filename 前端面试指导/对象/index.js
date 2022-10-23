// 组合继承
function SupClass (type, book) {
    this.type = type;
    this.book = book;
};
SupClass.prototype.checkBooks = function () {
    console.log('checkBooks run!');
};

function SubClass (price, num, type, book) {
    this.num = num;
    this.price = price;
    SupClass.call(this, type, book);
};
SubClass.prototype = Object.create(SupClass.prototype);
SubClass.prototype.constructor = SubClass;
SubClass.prototype.buy = function () {
    console.log('buy some books.');
}

var supDemo = new SupClass('科目', ['语文', '数学', '英语']);
var subDemo1 = new SubClass('100$', 2, 'Technology', ['嵌入式系统', 'C51单片机程序设计']);
var subDemo2 = new SubClass('150￥', 6, 'ComputerSystem', ['数据结构', '操作系统', '计算机网络']);
subDemo2.book.push('算法分析');
