/*
The Proxy Pattern in JavaScript is a structural design pattern that provides a surrogate or placeholder
for another object to control access to it. It allows you to intercept and redefine operations for an object,
such as getting or setting properties, calling methods, and more.
this can be useful for logging, access control, lazy initialization, and other purposes.
*/

const person = new Proxy(
  {
    name: "Jack Sparrow",
    age: 48,
    nationality: "Ukrainian"
  },
  {
    get: (obj, prop) => {
      return Reflect.get(obj, prop)
    },
    set: (obj, prop, value) => {
      Reflect.set(obj, prop, value);
    },
  }
);

console.log(person.name);
person.age = 44;