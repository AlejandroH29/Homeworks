export class NaryNode {
  constructor(title, path, component) {
    this.title = title;
    this.path = path;
    this.component = component;
    this.children = [];
  }

  addChild(node) {
    this.children.push(node);
  }
}
