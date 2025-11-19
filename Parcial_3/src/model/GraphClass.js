export class Graph {
  constructor() {
    this.nodes = [];
    this.adj = {};
    this.cityZones = {};
  }

  addCity(name) {
    if (!name || this.nodes.includes(name)) return false;
    this.nodes.push(name);
    this.adj[name] = [];
    this.cityZones[name] = []; // ahora lista de raíces
    return true;
  }

  deleteCity(name) {
    if (!this.nodes.includes(name)) return false;

    // vecinos actuales de la ciudad a eliminar
    const neighbors = this.adj[name] ? [...this.adj[name]] : [];

    // conectar entre sí todos los vecinos (crear enlaces mutuos)
    for (let i = 0; i < neighbors.length; i++) {
      for (let j = i + 1; j < neighbors.length; j++) {
        const a = neighbors[i];
        const b = neighbors[j];
        if (a === b) continue;
        if (!this.adj[a]) this.adj[a] = [];
        if (!this.adj[b]) this.adj[b] = [];
        if (!this.adj[a].includes(b)) this.adj[a].push(b);
        if (!this.adj[b].includes(a)) this.adj[b].push(a);
      }
    }

    // eliminar la ciudad del listado y sus referencias
    this.nodes = this.nodes.filter(n => n !== name);
    delete this.adj[name];
    for (const k in this.adj) {
      this.adj[k] = this.adj[k].filter(x => x !== name);
    }
    delete this.cityZones[name];
    return true;
  }

  addEdge(a, b) {
    if (!this.nodes.includes(a) || !this.nodes.includes(b)) return false;
    if (a === b) return false;
    if (!this.adj[a].includes(b)) this.adj[a].push(b);
    if (!this.adj[b].includes(a)) this.adj[b].push(a);
    return true;
  }

  removeEdge(a, b) {
    if (!this.nodes.includes(a) || !this.nodes.includes(b)) return false;
    this.adj[a] = this.adj[a].filter(x => x !== b);
    this.adj[b] = this.adj[b].filter(x => x !== a);
    return true;
  }

  getNeighbors(name) {
    return this.adj[name] || [];
  }

  // agrega una raíz de zonas a la ciudad (ahora multiple raíces permitidas)
  setZonesRoot(city, rootNode) {
    if (!this.nodes.includes(city)) return false;
    if (!this.cityZones[city]) this.cityZones[city] = [];
    this.cityZones[city].push(rootNode);
    return true;
  }

  // devuelve arreglo de raíces (posible vacío)
  getZonesRoot(city) {
    return this.cityZones[city] || [];
  }
}
