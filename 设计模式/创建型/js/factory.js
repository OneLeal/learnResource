/**
 * 创建型设计模式-工厂模式:
 * 1. 下面定义了两个工厂类;
 * 2. Shop 工厂只负责管理游戏(游戏的选择、新增、删除)，及对游戏列表的维护;
 * 3. Game 工厂只关注游戏的状态及属性(游戏叫什么，有没有下载，有没有运行);
 * 4. 使用工厂模式要注意划分清晰的职责边界，不应使其繁复冗余;
 */

class Shop {
  constructor() {
    this.list = [];
  }

  create(name) {
    const game = new Game(name);
    this.list.push(game);
    return game;
  }

  remove(name) {
    const index = this.list.findIndex((game) => game.name === name);
    if (index > -1) {
      this.list.splice(index, 1);
      return true;
    }
    return false;
  }

  selected(name) {
    return this.list.find((game) => game.name === name) || null;
  }
}

class Game {
  constructor(name) {
    this.name = name;
    this.isDownload = false;
    this.isRun = false;
  }

  download() {
    this.isDownload = true;
  }

  run() {
    this.isRun = true;
  }
}
