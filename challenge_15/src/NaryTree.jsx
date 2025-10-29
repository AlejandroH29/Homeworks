export class NaryTree {
  constructor(root) {
    this.root = root;
  }

  printDFS(node = this.root) {
    if (!node) return;
    console.log(node.title);
    node.children.forEach((child) => this.printDFS(child));
  }

  printBFS() {
    const queue = [this.root];
    while (queue.length > 0) {
      const current = queue.shift();
      console.log(current.title);
      current.children.forEach((child) => queue.push(child));
    }
  }
}
