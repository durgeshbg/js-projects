class HashMap {
  #capacity = 16;
  #loadfactor = 0.75;
  #size = 0;
  #hashMap = [];

  constructor() {
    this.#fillStore();
  }

  #fillStore() {
    for (let i = 0; i < this.#capacity; i++) this.#hashMap[i] = null;
  }

  #hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++)
      hashCode = hashCode * primeNumber + key.charCodeAt(i);
    return hashCode % this.#capacity;
  }

  set(key, value) {
    const hashCode = this.#hash(key);
    if (!this.#hashMap[hashCode]) {
      this.#size++;
      this.#hashMap[hashCode] = [key, value];
    } else if (this.#hashMap[hashCode][0] == key) this.#hashMap[hashCode][1] = value;

    // Regrow
    if (this.#size / this.#capacity > this.#loadfactor) {
      this.#regrow();
    }
  }

  #regrow() {
    const prevHashMap = [...this.#hashMap];
    this.#capacity *= 2;
    this.#fillStore();
    for (let i = 0; i < prevHashMap.length; i++)
      if (prevHashMap[i]) this.set(prevHashMap[i][0], prevHashMap[i][1]);
  }
  get(key) {
    const hashCode = this.#hash(key);
    const bucket = this.#hashMap[hashCode];
    if (bucket && bucket[0] == key) return bucket[1];
    return null;
  }
  has(key) {
    const hashCode = this.#hash(key);
    const bucket = this.#hashMap[hashCode];
    return bucket && bucket[0] == key;
  }
  remove(key) {
    const hashCode = this.#hash(key);
    const bucket = this.#hashMap[hashCode];
    if (bucket && bucket[0] == key) {
      delete this.#hashMap[hashCode];
      this.#size--;
      return true;
    }
    return false;
  }
  lenght() {
    return this.#size;
  }
  clear() {
    this.#capacity = 16;
    this.#fillStore();
    this.size = 0;
  }
  keys() {
    const keysArr = [];
    for (let i = 0; i < this.#capacity; i++) {
      if (this.#hashMap[i]) keysArr.push(this.#hashMap[i][0]);
    }
    return keysArr;
  }
  values() {
    const valuesArr = [];
    for (let i = 0; i < this.#capacity; i++)
      if (this.#hashMap[i]) valuesArr.push(this.#hashMap[i][1]);
    return valuesArr;
  }
  entries() {
    return [...this.#hashMap];
  }
}
