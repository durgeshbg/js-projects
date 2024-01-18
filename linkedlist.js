class Node {
  constructor(value, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  // Prepend
  prepend(node) {
    if (this.head == null) {
      this.head = node;
      this.tail = node;
    } else {
      node.nextNode = this.head;
      this.head = node;
    }
  }
  // Append
  append(node) {
    if (this.head == null) {
      this.head = node;
      this.tail = node;
    } else {
      let n = this.head;
      for (; n.nextNode != null; n = n.nextNode);
      n.nextNode = node;
      node.nextNode = null;
      this.tail = node;
    }
  }
  // Size
  size() {
    if (this.head == null) return 0;
    else {
      let size = 0;
      for (let node = this.head; node != null; node = node.nextNode) size++;
      return size;
    }
  }
  // Head
  head() {
    return this.head == null ? 'Empty list' : this.head;
  }
  // Tail
  tail() {
    return this.tail == null ? 'Empty list' : this.tail;
  }
  // At
  at(n) {
    let node = this.head;
    for (let i = 0; i < n; i++) {
      node = node.nextNode;
    }
    return node == null ? 'Invalid node' : node;
  }
  // Pop
  pop() {
    if (this.head == null) return 'Empty list';
    if (this.head.nextNode == null) {
      let node = this.head;
      this.head = null;
      this.tail = null;
      return node;
    }
    const t = this.tail;
    let node = this.head;
    for (; node.nextNode.nextNode != null; node = node.nextNode);
    node.nextNode = null;
    this.tail = node;
    return t;
  }
  // Contains
  contains(value) {
    for (let node = this.head; node != null; node = node.nextNode)
      if (node.value == value) return true;
    return false;
  }
  // Find
  find(value) {
    let node = this.head;
    for (let i = 0; node != null; node = node.nextNode, i++)
      if (node.value == value) return i;
    return null;
  }
  // insertAt
  insertAt(value, index) {
    let newNode = new Node(value);
    if (index > this.size() - 1) console.log('Invalid index');
    else if (index == 0) this.prepend(newNode);
    else {
      let node = this.head;
      for (let i = 0; i < index - 1; i++) node = node.nextNode;
      newNode.nextNode = node.nextNode;
      node.nextNode = newNode;
    }
  }
  // removeAt
  removeAt(index) {
    if (index > this.size() - 1) console.log('Invalid index');
    else if (index == 0) this.head = this.head.nextNode;
    else {
      let node = this.head;
      for (let i = 0; i < index - 1; i++, node = node.nextNode);
      node.nextNode = node.nextNode.nextNode;
    }
  }
  // toString
  toString() {
    let str = '';
    if (this.head == null) return 'Empty list.';
    for (let node = this.head; node != null; node = node.nextNode)
      str += `( ${node.value} ) -> `;
    str += 'null';
    return str;
  }
}

const ll = new LinkedList();

const node2 = new Node(2);
const node3 = new Node(3);
const node4 = new Node(4);
ll.append(node2);
ll.append(node3);
ll.append(node4);
console.log(ll.toString()); // ( 2 ) -> ( 3 ) -> ( 4 ) -> null

const node1 = new Node(1);
ll.prepend(node1);
console.log(ll.toString()); // ( 1 ) -> ( 2 ) -> ( 3 ) -> ( 4 ) -> null

console.log(ll.size()); // 4

console.log(ll.at(2)); // Node { value: 3, nextNode: Node { value: 4, nextNode: null } }

console.log(ll.pop()); // Node { value: 4, nextNode: null }
console.log(ll.toString()); // ( 1 ) -> ( 2 ) -> ( 3 ) -> null

console.log(ll.contains(2)); // true

console.log(ll.find(3)); // 2

ll.insertAt(1.5, 1);
console.log(ll.toString()); // ( 1 ) -> ( 1.5 ) -> ( 2 ) -> ( 3 ) -> null

ll.removeAt(2);
console.log(ll.toString()); // ( 1 ) -> ( 1.5 ) -> ( 3 ) -> null
