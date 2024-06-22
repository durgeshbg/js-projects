function HashMap() {
  let capacity = 16;
  let load_factor = 0.75;
  let array = new Array(capacity).fill(null);

  function hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= capacity;
    }
    return hashCode;
  }

  function set(key, value) {
    const index = hash(key);
    if (!array[index]) {
      array[index] = createNode(key, value);
    } else {
      let head = array[index];
      while (head.next) head = head.next;
      head.next = createNode(key, value);
    }
  }

  function get(key) {
    const index = hash(key);
    let head = array[index];
    while (head) {
      if (head.key === key) return head.value;
      head = head.next;
    }
    return null;
  }

  function has(key) {
    const index = hash(key);
    let head = array[index];
    while (head) {
      if (head.key === key) return true;
      head = head.next;
    }
    return false;
  }

  function remove(key) {
    const index = hash(key);
    let head = array[index];
    while (head) {
      if (head.key === key) break;
      head = head.next;
    }
    if (!head) return false;
    const { value } = head;
    Object.assign(head, head.next);
    return [key, value];
  }

  function length() {
    let size = 0;
    for (let i = 0; i < array.length; i++)
      if (array[i]) {
        let head = array[i];
        while (head) {
          size++;
          head = head.next;
        }
      }
    return size;
  }

  function createNode(key, value) {
    return { key, value, next: null };
  }

  function clear() {
    array = new Array(capacity).fill(null);
  }

  function keys() {
    const _keys = [];
    array.forEach((bucket) => {
      if (bucket)
        while (bucket) {
          _keys.push(bucket.key);
          bucket = bucket.next;
        }
    });
    return _keys;
  }

  function values() {
    const _values = [];
    array.forEach((bucket) => {
      if (bucket)
        while (bucket) {
          _values.push(bucket.value);
          bucket = bucket.next;
        }
    });
    return _values;
  }

  function entries() {
    const _entries = [];
    array.forEach((bucket) => {
      if (bucket)
        while (bucket) {
          _entries.push([bucket.key, bucket.value]);
          bucket = bucket.next;
        }
    });
    return _entries;
  }

  return { set, get, has, keys, values, entries, remove, length, clear};
}

// Test data
// const test = HashMap();
// test.set('apple', 'red');
// test.set('banana', 'yellow');
// test.set('carrot', 'orange');
// test.set('dog', 'brown');
// test.set('elephant', 'gray');
// test.set('frog', 'green');
// test.set('grape', 'purple');
// test.set('hat', 'black');
// test.set('ice cream', 'white');
// test.set('jacket', 'blue');
// test.set('kite', 'pink');
// test.set('lion', 'golden');
// console.log(test.entries());
