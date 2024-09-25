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

  draw() {
    console.log("Should be overridden");
  }
}

class Pen extends ProductFactory {
  draw() {
    console.log("Pen");
  }
}

class Pencil extends ProductFactory {
  draw() {
    console.log("Pencil");
  }
}