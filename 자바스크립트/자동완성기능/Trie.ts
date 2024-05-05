import type { wordInfo } from "./type.js";

class TrieNode {
  children: Record<string, TrieNode>;
  items: Array<wordInfo>;
  constructor() {
    this.children = {};
    this.items = [];
  }
}

export class Trie {
  root: TrieNode;
  maxSavedItems: number;
  constructor(maxSavedItems = Infinity) {
    this.root = new TrieNode();
    this.maxSavedItems = maxSavedItems;
  }
  insert(info: wordInfo) {
    let node = this.root;
    for (const char of info.word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
      if (node.items.length < this.maxSavedItems) {
        node.items.push(info);
      }
    }
  }
  search(subString: string) {
    let node = this.root;
    for (const char of subString) {
      if (!node.children[char]) {
        console.log(`trieSearch : ${0}개를 찾았습니다.`);
        return [];
      }
      node = node.children[char];
    }
    console.log(`trieSearch : ${node.items.length}개를 찾았습니다.`);
    return node.items;
  }
}
