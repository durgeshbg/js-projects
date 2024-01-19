class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.array = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree();
  }
  // Build Tree
  buildTree(l = 0, h = this.array.length - 1) {
    if (l > h) return null;
    const m = Math.floor((l + h) / 2);
    const root = new Node(this.array[m]);
    root.left = this.buildTree(l, m - 1);
    root.right = this.buildTree(m + 1, h);
    return root;
  }
  // Printing tree
  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node === null) return;
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
  // Insert a value
  insert(value, node = this.root) {
    if (node == null) node = new Node(value);
    else {
      if (node.value > value) node.left = this.insert(value, node.left);
      else node.right = this.insert(value, node.right);
    }
    return node;
  }
  // Delete a value
  delete(value, node = this.root) {
    if (!Number.isInteger(value) || node == null) return node;
    if (node.value == value) {
      this.updateArray(value);
      if (node.left == null && node.right == null) {
        node = null;
      } else if (node.left != null && node.right == null) {
        node = node.left;
      } else if (node.right != null && node.left == null) {
        node = node.right;
      } else {
        let newNode = node.right;
        while (newNode.left != null) newNode = newNode.left;
        this.root = this.delete(newNode.value, this.root);
        node.value = newNode.value;
      }
    } else if (node.value > value) {
      node.left = this.delete(value, node.left);
    } else {
      node.right = this.delete(value, node.right);
    }
    return node;
  }
  // updateArray
  updateArray(value) {
    this.array = [...new Set(array)].filter((a) => a != value);
  }
  // Find
  find(value, node = this.root) {
    if (node == null) return node;
    else if (node.value < value) node = this.find(value, node.right);
    else if (node.value > value) node = this.find(value, node.left);
    return node;
  }
  // Level order
  levelOrder(cb, node = this.root) {
    const array = [];
    const queue = [];
    queue.push(node);
    while (queue.length) {
      const front = queue.shift();
      if (cb) cb(front);
      else array.push(front.value);
      if (front.left != null) queue.push(front.left);
      if (front.right != null) queue.push(front.right);
    }
    return !cb ? arr : undefined;
  }
  // inOrder
  inOrder(cb, arr = [], node = this.root) {
    if (node == null) return null;

    this.inOrder(cb, arr, node.left);

    if (cb) cb(node);
    else arr.push(node.value);

    this.inOrder(cb, arr, node.right);

    return !cb ? arr : undefined;
  }
  // preOrder
  preOrder(cb, arr = [], node = this.root) {
    if (node == null) return null;

    if (cb) cb(node);
    else arr.push(node.value);

    this.inOrder(cb, arr, node.left);
    this.inOrder(cb, arr, node.right);

    return !cb ? arr : undefined;
  }
  // postOrder
  postOrder(cb, arr = [], node = this.root) {
    if (node == null) return null;

    this.inOrder(cb, arr, node.left);
    this.inOrder(cb, arr, node.right);

    if (cb) cb(node);
    else arr.push(node.value);

    return !cb ? arr : undefined;
  }
  // Height
  height(node = this.root) {
    if (node == null) return -1;
    let left = this.height(node.left);
    let right = this.height(node.right);
    const max = left > right ? left : right;
    return max + 1;
  }
  // Depth
  depth(node, d = 0) {
    if (!node) return 0;
    let fromRoot = this.root;
    while (fromRoot.value != node.value) {
      d++;
      if (node.value > fromRoot.value) fromRoot = fromRoot.right;
      else fromRoot = fromRoot.left;
    }
    return d;
  }
  // isBalanced
  isBalanced(node = this.root) {
    if (node == null) return true;
    const diff = Math.abs(this.height(node.left) - this.height(node.right));
    return diff <= 1 && this.isBalanced(node.left) && this.isBalanced(node.right);
  }
  // rebalance
  rebalance() {
    this.array = [...new Set(this.array)].sort((a, b) => a - b);
    this.root = this.buildTree();
  }
}

function randomArray() {
  const array = [];
  for (let i = 0; i < 20; i++) array.push(Math.round(Math.random() * 100));
  return array;
}

const array = randomArray();
const tree = new Tree(array);
// tree.prettyPrint();

console.log(tree.isBalanced());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());

tree.insert(203);
tree.insert(231);
tree.insert(543);
tree.insert(678);

// tree.prettyPrint();
console.log(tree.isBalanced());
tree.rebalance();
// tree.prettyPrint();
console.log(tree.isBalanced());

console.log(tree.isBalanced());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.inOrder());
