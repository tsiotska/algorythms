// General N-ary tree with auto-incremented node keys and is traversed in pre-order fashion.
class Tree {
  nodeCounter = 1; // uuid of node
  root = { nodeKey: this.nodeCounter++, children: [] };

  *preOrderTraversal(node) {
    yield node;
    for (const child of node.children) {
      yield* this.preOrderTraversal(child); // Visit each child
    }
  }

  insert(parentKey) {
    const newNode = { nodeKey: this.nodeCounter++, children: [] };
    for (const node of this.preOrderTraversal(this.root)) {
      if (node.nodeKey === parentKey) {
        node.children.push(newNode);
        return true;
      }
    }
    return false;
  }

  display(node = this.root, level = 0) {
    console.log(' '.repeat(level * 2) + node.nodeKey);
    for (const child of node.children) {
      this.display(child, level + 1);
    }
  }
}

const tree = new Tree();

tree.insert(1);
tree.insert(1);
tree.insert(2);
tree.insert(2);
tree.insert(3);
tree.insert(4);

console.log("Tree structure:");
tree.display();