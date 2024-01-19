interface INode<T> {
  key: T | undefined;
  value: unknown;
  next: number;
}

class MyNode<T> implements INode<T> {
  key: T | undefined;
  value: unknown;
  next: number;
  constructor(key: T, value: unknown, next = -1) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class MyMap<T> {
  hashTable: number[];
  dataTable: INode<T>[];
  nextSlot: number;
  length: number;
  constructor() {
    this.hashTable = [];
    this.dataTable = [];
    this.nextSlot = 0;
    this.length = 0;
  }

  find(key: T): INode<T> | undefined {
    const hash = MyMap.hashFn(key);
    if (!this.hashTable.includes(hash)) {
      return undefined;
    }

    let current = this.dataTable[hash];
    while (current !== undefined) {
      if (current.key === key) {
        return current;
      }
      if (current.next === -1) {
        break;
      }
      current = this.dataTable[current.next];
    }

    return undefined;
  }

  set(key: T, value: unknown) {
    const hash = MyMap.hashFn(key);

    if (!this.hashTable.includes(hash)) {
      this.hashTable.push(hash);
    }

    let current = this.dataTable[hash];
    if (current === undefined) {
      this.dataTable[hash] = new MyNode<T>(key, value);
      this.nextSlot++;
      this.length++;
      return;
    }
    while (current !== undefined) {
      if (current.key === key) {
        current.value = value;
        return;
      }
      if (current.next === -1) {
        break;
      }
      current = this.dataTable[current.next];
    }

    current.next = this.nextSlot;
    this.dataTable[this.nextSlot] = new MyNode<T>(key, value);
    this.nextSlot++;
    this.length++;
  }

  get(key: T): unknown {
    const current = this.find(key);
    if (current === undefined) return undefined;
    return current.value;
  }

  delete(key: T) {
    const current = this.find(key);
    if (current === undefined) return;

    current.value = undefined;
    current.key = undefined;
    this.length--;
  }

  get size() {
    return this.length;
  }

  static hashFn(key: any): number {
    return Number(key) % 2;
  }
}

const myMap = new MyMap();
myMap.set(0, 2);
myMap.set(2, 2);
myMap.set(1, 2);
myMap.set(2, 4);
console.log(myMap);
export { MyMap };
