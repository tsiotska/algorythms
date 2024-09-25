/*
Decorator Pattern is a structural design pattern that allows behavior to be added to individual objects,
dynamically, without affecting the behavior of other objects from the same class.
It’s particularly useful when you want to extend or modify the functionality of objects without altering their structure or using inheritance.
*/

class Coffee {
  cost() {
    return 5;
  }

  description() {
    return 'Basic Coffee';
  }
}

class CoffeeDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  cost() {
    return this.coffee.cost();
  }

  description() {
    return this.coffee.description();
  }
}

class MilkDecorator extends CoffeeDecorator {
  constructor(coffee) {
    super(coffee);
  }

  cost() {
    return super.cost() + 2;
  }

  description() {
    return super.description() + ', Milk';
  }
}

class SugarDecorator extends CoffeeDecorator {
  constructor(coffee) {
    super(coffee);
  }

  cost() {
    return super.cost() + 1;
  }

  description() {
    return super.description() + ', Sugar';
  }
}

// Client code
let myCoffee = new Coffee();
console.log(myCoffee.description() + ' costs $' + myCoffee.cost()); // Basic Coffee costs $5

myCoffee = new MilkDecorator(myCoffee);
console.log(myCoffee.description() + ' costs $' + myCoffee.cost()); // Basic Coffee, Milk costs $7

myCoffee = new SugarDecorator(myCoffee);
console.log(myCoffee.description() + ' costs $' + myCoffee.cost()); // Basic Coffee, Milk, Sugar costs $8