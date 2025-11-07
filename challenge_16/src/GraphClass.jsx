export class Graph {
  constructor() {
    this.nodes = [];
    this.adjacency = {};
  }

  addNode(node) {
    if (!this.nodes.includes(node)) {
      this.nodes.push(node);
      this.adjacency[node] = [];
    }
  }

  addEdge(node1, node2) {
    if (this.adjacency[node1] && this.adjacency[node2]) {
      this.adjacency[node1].push(node2);
      this.adjacency[node2].push(node1);
    }
  }

  getNodes() {
    return this.nodes;
  }

  getAdjacency(node) {
    return this.adjacency[node];
  }

  findPeopleByCity(cityName, peopleList) {
    return peopleList.filter((person) => person.city === cityName);
  }
}
