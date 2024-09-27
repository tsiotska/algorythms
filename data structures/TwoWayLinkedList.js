/*
Doubly Linked List (DLL) is a type of linked list where each node contains a reference to both the next and the previous node.
This allows traversal of the list in both directions, unlike a singly linked list which can only be traversed forward.
*/

class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(data) {
    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.size++;
  }

  prepend(data) {
    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.size++;
  }

  remove(data) {
    if (!this.head) return null;

    let current = this.head;
    while (current) {
      if (current.data === data) {
        if (current === this.head) {
          this.head = current.next;
          if (this.head) {
            this.head.prev = null;
          }
        } else if (current === this.tail) {
          this.tail = current.prev;
          this.tail.next = null;
        } else {
          // Remove the references to prev and next from both nodes if head is in between
          current.prev.next = current.next;
          current.next.prev = current.prev;
        }
        this.size--;
        return current.data;
      }
      current = current.next;
    }
    return null;
  }

  printForward() {
    let current = this.head;
    let result = '';
    while (current) {
      result += current.data + ' ';
      current = current.next;
    }
    return result.trim();
  }

  printBackward() {
    let current = this.tail;
    let result = '';
    while (current) {
      result += current.data + ' ';
      current = current.prev;
    }
    return result.trim();
  }
}

const dll = new DoublyLinkedList();
dll.append(10);
dll.append(20);
dll.append(30);

console.log(dll.printForward());  // 10 20 30
console.log(dll.printBackward()); // 30 20 10

dll.prepend(5);
console.log(dll.printForward());  // 5 10 20 30

dll.remove(20);
console.log(dll.printForward());  // 5 10 30
console.log(dll.printBackward()); // 30 10 5
