/*
Min-Heap is a binary tree-based data structure where each parent node is smaller than its child nodes.
This ensures that the smallest element is always at the root of the tree.
*/
  class MinHeap {
  constructor() {
    this.heap = [];
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  getLeftChildIndex(index) {
    return 2 * index + 1;
  }

  getRightChildIndex(index) {
    return 2 * index + 2;
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = this.getParentIndex(index);
      if (this.heap[index] < this.heap[parentIndex]) {
        this.swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  extractMin() {
    if (this.heap.length === 0) {
      return null;
    }
    if (this.heap.length === 1) {
      return this.heap.pop();
    }
    const min = this.heap[0];
    this.heap[0] = this.heap.pop(); // Replace the root with the last element
    this.heapifyDown();
    return min;
  }

  heapifyDown() {
    let index = 0;
    const length = this.heap.length;
    while (this.getLeftChildIndex(index) < length) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);
      // Move actually smaller child to left. Then compare parent with this child
      if (rightChildIndex < length && this.heap[rightChildIndex] < this.heap[smallerChildIndex]) {
        smallerChildIndex = rightChildIndex;
      }
      if (this.heap[index] <= this.heap[smallerChildIndex]) {
        break;
      }
      this.swap(index, smallerChildIndex);
      index = smallerChildIndex;
    }
  }

  getMin() {
    return this.heap.length === 0 ? null : this.heap[0];
  }
}

const heap = new MinHeap();
heap.insert(3);
heap.insert(1);
heap.insert(6);
heap.insert(5);
heap.insert(2);
heap.insert(4);

console.log(heap.getMin()); // 1
console.log(heap.extractMin()); // 1
console.log(heap.extractMin()); // 2