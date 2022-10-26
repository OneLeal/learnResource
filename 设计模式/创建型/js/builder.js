/**
 * 以下有很多类都是对 Person 类的具体描述:
 * 1. Profession 类描述职业;
 * 2. Character 类描述性格;
 * 3. Hobby 类描述喜好;
 * 4. InitPerson 类的 init 方法不仅仅实例化了一个 Person;
 * 5. 并注重实例化过程，为其刻画了更多的细节;
 */

class Profession {
  constructor(work, company) {
    this.work = work;
    this.company = company;
  }

  info() {}
}

class Character {
  constructor(list) {
    this.list = list || [];
  }

  description(prop) {}
}

class Hobby {
  constructor(list) {
    this.list = list || [];
  }

  doSomething(thing) {}

  addHobby(hobby) {}
}

class Person {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log("Hello~");
  }
}

class InitPerson {
  constructor(opts = {}) {
    this.name = opts.name;
    this.work = opts.work;
    this.company = opts.company;
    this.hobby = opts.hobby;
    this.character = opts.character;
  }

  init() {
    let profession = new Profession(this.work, this.company);
    let character = new Character(this.character);
    let hobby = new Hobby(this.hobby);
    let person = new Person(this.name);

    person.hobby = hobby;
    person.character = character;
    person.profession = profession;

    return person;
  }
}
