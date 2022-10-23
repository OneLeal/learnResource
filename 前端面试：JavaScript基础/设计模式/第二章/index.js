/*
* JavaScript 设计模式——第二章
* */

// 一个普通类的私有属性和私有方法
function Car(name, price) {
    var num = 1;  // 私有属性
    function info() { console.log('泡水车'); }  // 私有方法

    this.name = name;   // 公有属性
    this.price = price;  // 公有属性

    // 特权方法
    this.print = function () {
        info();
        console.log(num);
    }
}

// 通过闭包来实现
var Book = (function () {
    var bookNum = 0;   // 静态私有属性
    function checkBook(name) {}  // 静态私有方法

    function _book(newId, newName, newPrice) {
        var name, price;   // 私有变量

        function checkId(id) {}  // 私有方法

        this.getName = function () {};
        this.getPrice = function () {};
        this.setName = function () {};
        this.setPrice = function () {};

        this.id = newId;  // 公有属性
        this.copy = function() {};  // 公有方法

        if (bookNum > 3) {
            throw new Error('我们仅售3本书');
        } else {
            bookNum++;
        }

        // 构造器
        this.setName(name);
        this.setPrice(price);
    }

    _book.prototype.isJsBook = true;  // 静态公有属性
    _book.prototype.display = function () { console.log(bookNum) };  // 静态公有方法
    return _book;
})();

var js = new Book('00112');

// 检测关键字 new
function Cat(name, color) {
    if (this instanceof Cat) {
        this.name = name;
        this.color = color;
    } else {
        console.info('you miss the key word, the system is adding up ！');
        return new Cat(name, color);
    }
}

var cat1 = new Cat('英短', 'blue');
var cat2 = Cat('暹罗', 'black');