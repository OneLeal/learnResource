/*
* JavaScript 设计模式——第一章
* 表单验证功能：checkName、checkEmail、checkPassword
* */

// 方式一：对象收编变量
// 返回的对象与 checkObject1 无关，不属于基于类的创建方式，实现链式调用可返回当前对象
var checkObject1 = function () {
    return {
        checkName: function () {
            console.log('checkName1');
            return this;
        },

        checkEmail: function () {
            console.log('checkEmail1');
            return this;
        },

        checkPassword: function () {
            console.log('checkPassword1');
            return this;
        },
    }
};
var a = checkObject1();
a.checkName().checkEmail().checkPassword();

// 方式二：对方式一进行改造
// 不要去重写原型，实现链式调用可返回当前对象
function CheckObject2() {}

CheckObject2.prototype.checkName = function () {
    console.log('checkName2');
    return this;
};

CheckObject2.prototype.checkEmail = function () {
    console.log('checkEmail2');
    return this;
};

CheckObject2.prototype.checkPassword = function () {
    console.log('checkPassword2');
    return this;
};

var b = new CheckObject2();
b.checkName().checkEmail().checkPassword();

// 对原生对象进行拓展：基于函数方式调用/类方式调用

//基于函数方式调用
Function.prototype.addMethod = function (name, fn) {
    this[name] = fn;
    return this;
};

var c = function () {};  // 三个方法写在变量 c 上
c.addMethod('checkName', function () {
    console.log('checkName3');
    return this;
}).addMethod('checkEmail',function () {
    console.log('checkEmail3');
    return this;
}).addMethod('checkPassword',function () {
    console.log('checkPassword3');
    return this;
});
c.checkName().checkEmail().checkPassword();

// 基于类方式调用
Function.prototype.addMethod = function (name, fn) {
    this.prototype[name] = fn;
    return this;
};

function Methods() {}

// 三个方法写在了构造函数的原型上（Methods.prototype）
Methods.addMethod('checkName', function () {
    console.log('checkName4');
    return this;
}).addMethod('checkEmail', function () {
    console.log('checkEmail4');
    return this;
}).addMethod('checkPassword', function () {
    console.log('checkPassword4');
    return this;
});

var d = new Methods();
d.checkName().checkEmail().checkPassword();





