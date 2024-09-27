/*
Stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle.
This means that the last element added to the stack will be the first one to be removed.
*/

class Stack {
  constructor() {
    this.items = [];  // Array to store stack elements
  }

  push(element) {
    this.items.push(element);
  }

  pop() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.items.pop();
  }

  peek() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  printStack() {
    return this.items.join(' ');
  }
}

// Example Usage:
const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);

console.log(stack.printStack());  // 10 20 30
console.log(stack.peek());        // 30
console.log(stack.pop());         // 30
console.log(stack.printStack());  // 10 20
console.log(stack.size());        // 2