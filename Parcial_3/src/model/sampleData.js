import { Graph } from "./GraphClass";
import { ZoneNode } from "./ZoneNode";

const graph = new Graph();

graph.addCity("Cali");
graph.addCity("Bogotá");
graph.addCity("Medellín");

graph.addEdge("Cali", "Bogotá");
graph.addEdge("Cali", "Medellín");

const z1 = new ZoneNode("z1", "Parque Central");
const z1a = new ZoneNode("z1a", "Jardín Norte");
const z1b = new ZoneNode("z1b", "Plazoleta");
z1.addChild(z1a);
z1.addChild(z1b);

graph.setZonesRoot("Cali", { id: z1.id, title: z1.title, children: z1.children.map(c => ({ id: c.id, title: c.title, children: [] })) });

const mz = new ZoneNode("mz1", "Parque de la Barra");
graph.setZonesRoot("Medellín", { id: mz.id, title: mz.title, children: [] });

export { graph };
