import React from "react";
import { useParams, Link } from "react-router-dom";
import { graph as initialGraph } from "../model/sampleData";
import CityZones from "../components/CityZones";

export default function ZonesPage() {
  const { cityName } = useParams();
  const graph = initialGraph;

  return (
    <div className="page two-col">
      <aside className="panel small">
        <h3>Ciudad</h3>
        <div style={{ marginTop: 8 }}>
          <Link to="/cities">← Volver a Ciudades</Link>
        </div>
      </aside>
      <main className="panel large">
        <CityZones cityName={decodeURIComponent(cityName)} graph={graph} />
      </main>
    </div>
  );
}
