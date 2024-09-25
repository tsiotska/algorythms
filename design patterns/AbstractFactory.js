/*
The Abstract Factory Method pattern is a creational design pattern that provides an interface
for creating objects in a superclass but allows subclasses to alter the type of objects that will be created.
It encapsulates the object creation logic, decoupling it from the client code that uses the objects.
*/

class AbstractProductFactory {
  createPen() {
    throw new Error("This method should be overridden!");
  }

  createPencil() {
    throw new Error("This method should be overridden!");
  }
}

class StandardProductFactory extends AbstractProductFactory {
  createPen() {
    return new StandardPen();
  }

  createPencil() {
    return new StandardPencil();
  }
}

class LuxuryProductFactory extends AbstractProductFactory {
  createPen() {
    return new LuxuryPen();
  }

  createPencil() {
    return new LuxuryPencil();
  }
}

// Product Classes
class StandardPen {
  draw() {
    console.log("Standard Pen");
  }
}

class StandardPencil {
  draw() {
    console.log("Standard Pencil");
  }
}

class LuxuryPen {
  draw() {
    console.log("Luxury Pen");
  }
}

class LuxuryPencil {
  draw() {
    console.log("Luxury Pencil");
  }
}

// This is the high-level module that should not be aware of concrete implementations
// Instead, it depends on AbstractProductFactory.
function clientCode(factory) {
  const pen = factory.createPen();
  pen.draw();

  const pencil = factory.createPencil();
  pencil.draw();
}

// Using the factories
console.log("Using Standard Product Factory:");
const standardFactory = new StandardProductFactory();
clientCode(standardFactory);

console.log("\nUsing Luxury Product Factory:");
const luxuryFactory = new LuxuryProductFactory();
clientCode(luxuryFactory);