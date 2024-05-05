type CurriedFunction<A, B, R> = (a: A, ...b: B[]) => R;

type IterItem = Iterable<unknown>;

const curry =
  <A, B, R>(f: CurriedFunction<A, B, R>) =>
  (a: A, ..._: B[]) =>
    _.length ? f(a, ..._) : (..._: B[]) => f(a, ..._);

interface LRecord {
  range?: (l: number) => Iterable<number>;
  map?: (
    a: Function,
    ..._: IterItem[]
  ) =>
    | Generator<any, void, unknown>
    | ((..._: IterItem[]) => Generator<any, void, unknown>);
  filter?: (
    a: Function,
    ..._: IterItem[]
  ) =>
    | Generator<any, void, unknown>
    | ((..._: IterItem[]) => Generator<any, void, unknown>);
}

const L: LRecord = {};

L.range = function* (l: number) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

L.map = curry(function* (f: Function, iter: IterItem) {
  for (const a of iter) {
    yield f(a);
  }
});

L.filter = curry(function* (f: Function, iter: IterItem) {
  for (const a of iter) {
    if (f(a)) yield a;
  }
});

const take = curry(function* (l: number, iter: IterItem) {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length === l) return res;
  }
  return res;
});

type Reducer<T, U> = (acc: U, value: T) => U;

function reduce<T, U>(
  f: Reducer<T, U>,
  acc: U | Iterable<T>,
  iter?: Iterable<T>
): U | T {
  let _iter = iter ? (acc as Iterable<T>) : undefined;
  let _acc = iter
    ? (acc as U)
    : ((_iter = acc as Iterable<T>), _iter[Symbol.iterator]().next().value);

  for (const a of _iter as Iterable<T>) {
    _acc = f(_acc, a);
  }
  return _acc;
}

type Func<T, R> = (arg: T) => R;

const go = <T, R>(...args: [T, ...((arg: any) => any)[]]) => {
  return reduce((a, f: (arg: any) => any) => f(a), args);
};

export { go, reduce, L, curry, take };
