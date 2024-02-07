// 이터러블 객체를 만들기 위해 타입 변형
interface IteratorYieldResult<TYield> {
  done: false;
  value: TYield;
}

interface IteratorReturnResult {
  done: true;
}

type IteratorResult<T> = IteratorYieldResult<T> | IteratorReturnResult;

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
    if (this.hashTable[hash] === undefined) return undefined;

    let current = this.dataTable[this.hashTable[hash]];

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

    if (this.hashTable[hash] === undefined) {
      this.hashTable[hash] = this.nextSlot;
      this.dataTable[this.nextSlot] = new MyNode<T>(key, value);
      this.nextSlot++;
      this.length++;
      return;
    }

    let current = this.dataTable[this.hashTable[hash]];
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

    return;
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
  [Symbol.iterator]() {
    let index = 0;
    let node = this.dataTable[index];
    return {
      next: (): IteratorResult<[T | undefined, unknown]> => {
        while (index < this.size - 1 && node.key === undefined) {
          node = this.dataTable[index];
          console.log(node);
          index++;
        }

        if (index < this.size) {
          return {
            value: [node.key, node.value],
            done: false,
          };
        } else {
          return {
            done: true,
          };
        }
      },
    };
  }
  get size() {
    return this.length;
  }

  static hashFn(key: any): number {
    key = key.toString();
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash;
  }
}

export { MyMap };
