import { TreeNode } from "./TreeNode";

export class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new TreeNode(value);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else if (newNode.value > node.value) {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  contains(value) {
    return this.searchNode(this.root, value);
  }

  searchNode(node, value) {
    if (node === null) return false;
    if (value === node.value) return true;
    if (value < node.value) return this.searchNode(node.left, value);
    else return this.searchNode(node.right, value);
  }

  preOrder(node = this.root) {
    if (node) {
      console.log(node.value);
      this.preOrder(node.left);
      this.preOrder(node.right);
    }
  }

  inOrder(node = this.root) {
    if (node) {
      this.inOrder(node.left);
      console.log(node.value);
      this.inOrder(node.right);
    }
  }

  postOrder(node = this.root) {
    if (node) {
      this.postOrder(node.left);
      this.postOrder(node.right);
      console.log(node.value);
    }
  }

  // Convierte el árbol a un formato compatible con react-d3-tree
  toD3Tree(node = this.root) {
    if (!node) return null;
    const tree = {
      name: String(node.value),
      children: [],
    };
    if (node.left) tree.children.push(this.toD3Tree(node.left));
    if (node.right) tree.children.push(this.toD3Tree(node.right));
    return tree;
  }
}
