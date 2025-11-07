import React, { useState } from "react";
import { Graph as GraphView } from "react-d3-graph";
import { graph, data, people, cities } from "./Data";
function App() {
  const [selectedCity, setSelectedCity] = useState("");
  const [peopleInCity, setPeopleInCity] = useState([]);

  const handleSearch = () => {
    const result = graph.findPeopleByCity(selectedCity, people);
    setPeopleInCity(result);
  };

  const config = {
    nodeHighlightBehavior: true,
    height: 500,
    width: 800,
    node: {
      size: 400,
      color: "lightblue",
      fontSize: 14,
    },
    link: {
      color: "#888",
    },
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>Challenge 16 - Graph of Friends and Cities</h2>
      <div style={{ margin: "20px 0" }}>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          style={{
            padding: "8px",
            marginRight: "10px",
            fontSize: "16px",
          }}
        >
          <option value="">Seleccione una ciudad</option>
          {cities.map((city, i) => (
            <option key={i} value={city}>
              {city}
            </option>
          ))}
        </select>
        <button
          onClick={handleSearch}
          style={{
            padding: "8px 14px",
            fontSize: "16px",
            backgroundColor: "#4a90e2",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Buscar
        </button>
      </div>

      <GraphView id="graph" data={data} config={config} />

      <div style={{ marginTop: "30px" }}>
        <h3>Personas en {selectedCity || "..."}</h3>
        {peopleInCity.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {peopleInCity.map((p, i) => (
              <li key={i}>
                {p.name} - {p.age} años
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay personas registradas en esta ciudad.</p>
        )}
      </div>
    </div>
  );
}

export default App;
