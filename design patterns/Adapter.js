/*
Adapter is a structural design pattern used to allow incompatible interfaces to work together.
It acts as a bridge between two interfaces, enabling classes or objects with incompatible interfaces to interact.
*/

class LegacySystem {
  oldMethod() {
    console.log("Legacy method");
  }
}

class Adapter {
  constructor(legacySystem) {
    this.legacySystem = legacySystem;
  }
  newMethod() {
    this.legacySystem.oldMethod();
  }
}

const legacy = new LegacySystem();
const adapted = new Adapter(legacy);
adapted.newMethod(); // Legacy method