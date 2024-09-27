/*
Queue is a linear data structure that follows the First-In-First-Out (FIFO) principle.
This means the first element added to the queue will be the first one to be removed.
*/

class Queue {
  constructor() {
    this.items = [];  // Array to store queue elements
  }

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.items.shift(); // Removes the first element
  }

  front() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.items[0]; // Returns the first element
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  printQueue() {
    return this.items.join(' ');
  }
}

// Example Usage:
const queue = new Queue();
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);

console.log(queue.printQueue());  // 10 20 30
console.log(queue.front());       // 10
console.log(queue.dequeue());     // 10
console.log(queue.printQueue());  // 20 30
console.log(queue.size());        // 2