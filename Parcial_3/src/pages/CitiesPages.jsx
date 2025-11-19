import React, { useState } from "react";
import { graph as initialGraph } from "../model/sampleData";
import GraphView from "../components/GraphView";
import { Link } from "react-router-dom";

export default function CitiesPage() {
  const [graph] = useState(initialGraph);
  const [, force] = useState(0); // dummy state to trigger re-renders

  const [newCity, setNewCity] = useState("");
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const addCity = () => {
    const name = newCity.trim();
    if (!name) return alert("Nombre inválido");
    if (!graph.addCity(name)) return alert("La ciudad ya existe o nombre inválido");
    setNewCity("");
    force(n => n + 1);
  };

  const deleteCity = (name) => {
    if (!confirm(`Eliminar ciudad ${name}?`)) return;
    if (graph.deleteCity(name)) {
      force(n => n + 1);
    }
  };

  const connect = () => {
    if (!a || !b) return;
    if (a === b) return alert("Selecciona ciudades distintas");
    if (!graph.addEdge(a, b)) return alert("No se pudo conectar");
    setA(""); setB("");
    force(n => n + 1);
  };

  return (
    <div className="page two-col">
      <aside className="panel">
        <h2>Red de Ciudades</h2>

        <div className="card">
          <input value={newCity} onChange={e=>setNewCity(e.target.value)} placeholder="Nueva ciudad" />
          <button onClick={addCity}>Agregar</button>
        </div>

        <div className="card">
          <h3>Ciudades</h3>
          <ul className="list">
            {graph.nodes.map(n => (
              <li key={n} className="list-item">
                <div>
                  <Link to={`/zones/${encodeURIComponent(n)}`} className="link-city">{n}</Link>
                </div>
                <div className="list-actions">
                  <button onClick={()=>deleteCity(n)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h3>Conectar</h3>
          <select value={a} onChange={e=>setA(e.target.value)}>
            <option value="">-- Origen --</option>
            {graph.nodes.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <select value={b} onChange={e=>setB(e.target.value)}>
            <option value="">-- Destino --</option>
            {graph.nodes.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <div style={{ marginTop: 8 }}>
            <button onClick={connect}>Conectar</button>
          </div>
        </div>

      </aside>

      <main className="panel large">
        <h2>Grafo Interactivo</h2>
        <GraphView graph={graph} />
      </main>
    </div>
  );
}
