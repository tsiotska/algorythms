/*
Observer pattern is a software design pattern in which an object,
named the subject, maintains a list of its dependents, called observers,
and notifies them automatically of any state changes, usually by calling one of their methods
*/

class Subject {
  constructor() {
    this.observers = [];
  }
  addObserver(observer) {
    this.observers.push(observer);
  }
  notify() {
    this.observers.forEach(observer => observer.update());
  }
}

class Observer {
  update() {
    console.log("State updated");
  }
}

const subject = new Subject();
const observer = new Observer();
subject.addObserver(observer);
subject.notify();