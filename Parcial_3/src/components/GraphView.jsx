import React, { useRef, useEffect, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";

export default function GraphView({ graph }) {
  const fgRef = useRef();
  const modalFgRef = useRef();
  const [zonesOpen, setZonesOpen] = useState(false);
  const [zonesData, setZonesData] = useState({ nodes: [], links: [] });
  const [zonesTitle, setZonesTitle] = useState("");

  useEffect(() => {
    if (!fgRef.current) return;
    fgRef.current.d3Force('charge').strength(-200);
  }, []);

  // centrar al montar/actualizar nodos
  useEffect(() => {
    if (!fgRef.current) return;
    const adjustView = () => {
      try {
        fgRef.current.zoomToFit(500, 40);
        fgRef.current.centerAt(0, 0, 500);
      } catch (e) {}
    };
    const t = setTimeout(adjustView, 300);
    return () => clearTimeout(t);
  }, [graph.nodes.length]);

  const nodes = graph.nodes.map(n => ({ id: n, val: 1, label: n }));
  const links = [];
  graph.nodes.forEach(n => {
    graph.getNeighbors(n).forEach(nb => {
      if (nodes.findIndex(x=>x.id === n) >=0 && nodes.findIndex(x=>x.id === nb) >=0) {
        // to avoid duplicates, only add link if source < target lexicographically
        if (n < nb) links.push({ source: n, target: nb });
      }
    });
  });

  // Construye nodes/links desde roots (árboles de zonas) y añade nodo base (ciudad)
  const buildZonesGraph = (cityName) => {
    const roots = graph.getZonesRoot(cityName) || [];
    const zNodes = [];
    const zLinks = [];
    const added = new Set();

    // nodo base que representa la ciudad
    const baseId = `city_${cityName}`;
    zNodes.push({ id: baseId, name: cityName, type: "city", val: 2 });
    added.add(baseId);

    function visit(node, parent = null) {
      if (!node) return;
      const nodeType = parent === null ? "root" : "sub";
      if (!added.has(node.id)) {
        zNodes.push({ id: node.id, name: node.title, type: nodeType, val: 1 });
        added.add(node.id);
      }
      if (parent) zLinks.push({ source: parent.id, target: node.id });
      (node.children || []).forEach(c => visit(c, node));
    }
    roots.forEach(r => {
      visit(r, null);
      // conectar raíz directamente al nodo base (ciudad)
      if (r && r.id) zLinks.push({ source: baseId, target: r.id });
    });
    return { nodes: zNodes, links: zLinks };
  };

  // Al hacer click en un nodo (ciudad) abrimos modal con grafo de zonas
  const handleNodeClick = (node) => {
    if (!node || !node.id) return;
    const cityName = node.id;
    const data = buildZonesGraph(cityName);
    if (!data.nodes.length) {
      alert("No hay zonas para esta ciudad");
      return;
    }
    setZonesData(data);
    setZonesTitle(cityName);
    setZonesOpen(true);
    // ajustar modal graph un poco después de abrir
    setTimeout(() => {
      try { if (modalFgRef.current) modalFgRef.current.zoomToFit(400, 30); } catch (e) {}
    }, 300);
  };

  // helper: color por tipo
  const colorByType = (type) => {
    if (type === "city") return "#7a6cff";
    if (type === "root") return "#10b981"; // verde para zonas principales
    return "#60a5fa"; // azul claro para subzonas
  };

  return (
    <>
      <div style={{ width: "100%", height: "600px", borderRadius: 8, background: "#fff", padding: 8 }}>
        <ForceGraph2D
          ref={fgRef}
          graphData={{ nodes, links }}
          nodeLabel="id"
          nodeAutoColorBy="id"
          linkWidth={1.2}
          onNodeClick={handleNodeClick}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.id || node.name;
            const fontSize = 12/globalScale;
            ctx.fillStyle = "#1f2937";
            ctx.beginPath();
            ctx.arc(node.x, node.y, 8, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.textAlign = "center";
            ctx.fillStyle = "#000000";
            ctx.fillText(label, node.x, node.y - 12);
          }}
          linkDirectionalParticles={2}
          linkDirectionalParticleSpeed={0.005}
        />
      </div>

      {/* Modal overlay para grafo de zonas */}
      {zonesOpen && (
        <div className="zones-modal" onClick={()=>setZonesOpen(false)}>
          <div className="zones-modal-content" onClick={e=>e.stopPropagation()}>
            <div className="zones-modal-header">
              <div>
                <strong>Zonas — {zonesTitle}</strong>
                <div className="zones-legend" style={{marginTop:6}}>
                  <span className="legend-item"><span className="legend-dot" style={{background: colorByType("city")}}></span> Ciudad</span>
                  <span className="legend-item"><span className="legend-dot" style={{background: colorByType("root")}}></span> Zona principal</span>
                  <span className="legend-item"><span className="legend-dot" style={{background: colorByType("sub")}}></span> Subzona</span>
                </div>
              </div>
              <button onClick={()=>setZonesOpen(false)}>Cerrar</button>
            </div>
            <div className="zones-modal-body">
              <ForceGraph2D
                ref={modalFgRef}
                graphData={zonesData}
                nodeLabel="name"
                nodeAutoColorBy="type"
                linkWidth={1}
                nodeCanvasObject={(node, ctx, globalScale) => {
                  const label = node.name || node.id;
                  const fontSize = 12/globalScale;
                  const color = colorByType(node.type);
                  const radius = node.type === "city" ? 12 : 8;
                  ctx.fillStyle = color;
                  ctx.beginPath();
                  ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
                  ctx.fill();
                  ctx.font = `${fontSize}px Sans-Serif`;
                  ctx.textAlign = "center";
                  ctx.fillStyle = "#000000";
                  ctx.fillText(label, node.x, node.y - (radius + 4));
                }}
                onEngineStop={() => {
                  try { modalFgRef.current.zoomToFit(400, 30); } catch (e) {}
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
