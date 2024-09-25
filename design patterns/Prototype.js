/*
The Prototype Pattern in JavaScript allows objects to inherit properties and methods from other objects.
*/

function Car(model, color) {
  this.model = model;
  this.color = color;
}

Car.prototype.getDetails = function() {
  return `Model: ${this.model}, Color: ${this.color}`;
};

const car1 = new Car('Tesla Model 3', 'Red');
const car2 = new Car('BMW X5', 'Black');

console.log(car1.getDetails());
console.log(car2.getDetails());