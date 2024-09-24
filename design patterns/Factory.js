/*
The Factory Method pattern is a creational design pattern that provides an interface
for creating objects in a superclass but allows subclasses to alter the type of objects that will be created.
It encapsulates the object creation logic, decoupling it from the client code that uses the objects.
*/

class ProductFactory {
  static createProduct(type) {
    switch (type) {
      case 'pen':
        return new Pen();
      case 'pencil':
        return new Pencil();
      default:
        throw new Error("Unknown product type!");
    }
  }
}

class Pen {
  draw() {
    console.log("Pen");
  }
}

class Pencil {
  draw() {
    console.log("Pencil");
  }
}

try {
  const pen = ProductFactory.createProduct('pen');
  console.log(pen.draw());

  const cat = ProductFactory.createProduct('pencil');
  console.log(pencil.draw());

  const unknown = ProductFactory.createProduct('circulus');
} catch (error) {
  console.error(error.message);
}