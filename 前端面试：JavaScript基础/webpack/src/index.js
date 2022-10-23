console.log('webpack');

const sum = (a, b) => {
    return a + b;
};

const result = sum(10, 20);
console.log('result = ' + result);

class Student {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

const person = new Student('浅色星河', 24);
console.log(person);
