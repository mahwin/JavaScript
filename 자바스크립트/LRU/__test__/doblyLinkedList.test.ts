import { DoublyLinkedList, Node } from "../";

describe("linkedList의 insertHead를 통해 노드를 추가할 수 있다.", () => {
  test("값을 넣을 때 마다 head에 들어가는 지 확인", () => {
    const linkedList = new DoublyLinkedList();
    linkedList.insertHead(new Node(1, 1));
    linkedList.insertHead(new Node(2, 2));
    linkedList.insertHead(new Node(3, 3));
    expect(linkedList.toString()).toBe([3, 2, 1].join("->"));
  });

  test("제대로 사이즈를 측정하는 지 확인", () => {
    const linkedList = new DoublyLinkedList();
    linkedList.insertHead(new Node(1, 1));
    linkedList.insertHead(new Node(2, 2));
    linkedList.insertHead(new Node(3, 3));
    expect(linkedList.size).toBe(3);
  });
});

describe("linkedList이의 remove 통해 노드를 삭제할 수 있다.", () => {
  test("노드가 하나일 때 삭제", () => {
    const linkedList = new DoublyLinkedList();
    let nodeOne = new Node(1, 1);
    linkedList.insertHead(nodeOne);
    linkedList.remove(nodeOne);
    expect(linkedList.toString()).toBe("");
    expect(linkedList.size).toBe(0);
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
  });

  test("head 노드 삭제", () => {
    const linkedList = new DoublyLinkedList();
    let nodeOne = new Node(1, 1);
    let nodeTwo = new Node(2, 2);
    let nodeThree = new Node(3, 3);
    linkedList.insertHead(nodeOne);
    linkedList.insertHead(nodeTwo);
    linkedList.insertHead(nodeThree);
    linkedList.remove(nodeThree);
    expect(linkedList.toString()).toBe([2, 1].join("->"));
  });

  test("중간 노드 삭제", () => {
    const linkedList = new DoublyLinkedList();
    let nodeOne = new Node(1, 1);
    let nodeTwo = new Node(2, 2);
    let nodeThree = new Node(3, 3);
    let nodeFour = new Node(4, 4);
    let nodeFive = new Node(5, 5);

    linkedList.insertHead(nodeOne);
    linkedList.insertHead(nodeTwo);
    linkedList.insertHead(nodeThree);
    linkedList.insertHead(nodeFour);
    linkedList.insertHead(nodeFive);
    linkedList.remove(nodeThree);
    expect(linkedList.toString()).toBe([5, 4, 2, 1].join("->"));
  });

  test("tail 노드 삭제", () => {
    const linkedList = new DoublyLinkedList();
    let nodeOne = new Node(1, 1);
    let nodeTwo = new Node(2, 2);
    let nodeThree = new Node(3, 3);
    linkedList.insertHead(nodeOne);
    linkedList.insertHead(nodeTwo);
    linkedList.insertHead(nodeThree);
    linkedList.remove(nodeOne);
    expect(linkedList.toString()).toBe([3, 2].join("->"));
  });
});

describe("linkedList의 swapToHead 통해 head로 node를 스왑할 수 있다.", () => {
  test("노드가 하나일 때 스왑", () => {
    const linkedList = new DoublyLinkedList();
    let nodeOne = new Node(1, 1);

    linkedList.insertHead(nodeOne);

    linkedList.swapToHead(nodeOne);
    expect(linkedList.toString()).toBe([1].join("->"));
    expect(linkedList.size).toBe(1);
  });

  test("head 노드 스왑", () => {
    const linkedList = new DoublyLinkedList();
    let nodeOne = new Node(1, 1);
    let nodeTwo = new Node(2, 2);
    let nodeThree = new Node(3, 3);
    let nodeFour = new Node(4, 4);
    let nodeFive = new Node(5, 5);

    linkedList.insertHead(nodeOne);
    linkedList.insertHead(nodeTwo);
    linkedList.insertHead(nodeThree);
    linkedList.insertHead(nodeFour);
    linkedList.insertHead(nodeFive);

    linkedList.swapToHead(nodeFive);
    expect(linkedList.toString()).toBe([5, 4, 3, 2, 1].join("->"));
    expect(linkedList.size).toBe(5);
  });

  test("중간 노드 스왑", () => {
    const linkedList = new DoublyLinkedList();
    let nodeOne = new Node(1, 1);
    let nodeTwo = new Node(2, 2);
    let nodeThree = new Node(3, 3);
    let nodeFour = new Node(4, 4);
    let nodeFive = new Node(5, 5);

    linkedList.insertHead(nodeOne);
    linkedList.insertHead(nodeTwo);
    linkedList.insertHead(nodeThree);
    linkedList.insertHead(nodeFour);
    linkedList.insertHead(nodeFive);

    linkedList.swapToHead(nodeThree);
    expect(linkedList.toString()).toBe([3, 5, 4, 2, 1].join("->"));
    expect(linkedList.size).toBe(5);
  });

  test("tail 노드 스왑", () => {
    const linkedList = new DoublyLinkedList();
    let nodeOne = new Node(1, 1);
    let nodeTwo = new Node(2, 2);
    let nodeThree = new Node(3, 3);
    let nodeFour = new Node(4, 4);
    let nodeFive = new Node(5, 5);

    linkedList.insertHead(nodeOne);
    linkedList.insertHead(nodeTwo);
    linkedList.insertHead(nodeThree);
    linkedList.insertHead(nodeFour);
    linkedList.insertHead(nodeFive);

    linkedList.swapToHead(nodeOne);
    expect(linkedList.toString()).toBe([1, 5, 4, 3, 2].join("->"));
    expect(linkedList.size).toBe(5);
  });
});
