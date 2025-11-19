export class ZoneNode {
  constructor(id, title) {
    this.id = id;
    this.title = title;
    this.children = [];
  }

  addChild(node) {
    this.children.push(node);
  }

  editTitle(newTitle) {
    this.title = newTitle;
  }
}
