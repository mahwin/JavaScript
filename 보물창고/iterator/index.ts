type Keys = keyof any;

const indexSymbol = Symbol("index");

class MyObj {
  keys: Keys[];
  [indexSymbol]: number;
  [key: Keys]: unknown;

  constructor() {
    this.keys = [];
    this[indexSymbol] = 0;
  }
  [Symbol.iterator]() {
    this[indexSymbol] = 0;
    return this;
  }

  next() {
    const index = this[indexSymbol];
    if (this.keys.length > index) {
      const key = this.keys[index];
      this[indexSymbol] = index + 1;

      return { value: [key, this[key]], done: false };
    }
    return { done: true };
  }
}

const customObj = new Proxy(new MyObj(), {
  get: (target, key) => {
    return target[key];
  },

  set: (target, key, value) => {
    if (indexSymbol === key) {
      target[key] = value;
      return true;
    }
    if (!target.keys.includes(key)) target.keys.push(key);

    target[key] = value;
    return true;
  },

  deleteProperty: (target, key) => {
    const keyIdx = target.keys.indexOf(key);
    if (keyIdx === -1) {
      return false;
    }

    target.keys.splice(keyIdx, 1);
    return true;
  },
});

export { customObj };
