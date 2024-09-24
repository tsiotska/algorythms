/* Singleton is a class which can be instantiated once, and can be accessed globally. */


class Singleton {
  constructor() {
    if (Singleton.instance) {
      throw new Error("You can only create one instance!");
    }
    Singleton.instance = this;
    this.state = {};
  }

  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  setState(key, value) {
    this.state[key] = value;
  }

  getState(key) {
    return this.state[key];
  }
}

const singleton1 = new Singleton();
singleton1.setState('name', 'Vitalii');
const singleton2 = new Singleton(); // You can only create one instance!