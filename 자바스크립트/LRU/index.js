class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  insertHead(node) {
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }
    this.size++;
  }

  swapToHead(node) {
    this.remove(node);
    this.insertHead(node);
  }

  remove(node) {
    const { prev, next } = node;
    if (prev === null && next === null) {
      // 노드가 하나일 때
      this.head = null;
      this.tail = null;
    }

    if (prev === null && next !== null) {
      // head 노드를 삭제할 때
      this.head = next;
      next.prev = null;
    }

    if (prev !== null && next === null) {
      // tail 노드를 삭제할 때
      this.tail = prev;
      prev.next = null;
    }

    if (prev !== null && next !== null) {
      // 중간 노드 삭제할 때
      prev.next = next;
      next.prev = prev;
    }

    this.size--;
  }

  toString() {
    let node = this.head;
    let string = [];
    while (node !== null) {
      string.push(node.value);
      node = node.next;
    }
    return string.join("->");
  }
}

const linkedList = new DoublyLinkedList();
linkedList.insertHead(new Node(1, 1));
linkedList.insertHead(new Node(2, 2));
linkedList.insertHead(new Node(3, 3));
console.log(linkedList.toString());

export { Node, DoublyLinkedList };
