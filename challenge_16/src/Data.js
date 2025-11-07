import { Graph } from "./GraphClass";

const graph = new Graph();

// Ciudades
const cities = ["Cali", "Bogotá", "Medellín"];
cities.forEach((city) => graph.addNode(city));

// Personas
const people = [
  { name: "Diego", age: 21, city: "Cali" },
  { name: "Laura", age: 23, city: "Bogotá" },
  { name: "Andrés", age: 22, city: "Medellín" },
  { name: "Sofia", age: 25, city: "Bogotá" },
  { name: "Tomas", age: 25, city: "Medellín" },
  { name: "Gabriela", age: 25, city: "Cali" },
];

people.forEach((p) => {
  graph.addNode(p.name);
  graph.addEdge(p.name, p.city);
});

// Datos para react-d3-graph
const data = {
  nodes: [
    ...people.map((p) => ({ id: p.name, color: "#4a90e2" })),
    ...cities.map((c) => ({ id: c, color: "#50e3c2" })),
  ],
  links: people.map((p) => ({ source: p.name, target: p.city })),
};

export { graph, data, people, cities };
