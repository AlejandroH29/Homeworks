import React, { useState } from "react";
import { genId, treeHeight, treeCount, findById } from "../utils/treeUtils";

const ZoneItem = ({ node, onAdd, onEdit }) => {
  const [open, setOpen] = useState(true);
  return (
    <li className="zone-item">
      <div className="zone-row">
        <button className="btn-small" onClick={()=>setOpen(o=>!o)}>{open ? "-" : "+"}</button>
        <span className="zone-title">{node.title}</span>
        <div style={{ marginLeft: 8 }}>
          <button onClick={()=>onAdd(node.id)}>Agregar subzona</button>
          <button onClick={()=>{
            const newTitle = prompt("Nuevo nombre de la zona:", node.title);
            if (newTitle !== null && newTitle.trim() !== "") onEdit(node.id, newTitle);
          }} style={{ marginLeft: 6 }}>Editar</button>
        </div>
      </div>
      {open && node.children && node.children.length > 0 && (
        <ul className="zone-list">
          {node.children.map(c => <ZoneItem key={c.id} node={c} onAdd={onAdd} onEdit={onEdit} />)}
        </ul>
      )}
    </li>
  );
};

export default function CityZones({ cityName, graph }) {
  const roots = graph.getZonesRoot(cityName); // ahora arreglo de raíces
  const [, force] = useState(0);

  if (!cityName) return <div>Ciudad no seleccionada</div>;

  const handleAddRoot = () => {
    const title = prompt("Nombre de la zona raíz:");
    if (!title || title.trim() === "") return;
    const id = genId("z");
    const newRoot = { id, title: title.trim(), children: [] };
    graph.setZonesRoot(cityName, newRoot); // ahora agrega una raíz más
    force(n => n+1);
  };

  const handleAddSub = (parentId) => {
    if (!roots || roots.length === 0) return alert("No hay raíces. Agrega una raíz primero.");
    const title = prompt("Nombre de la subzona:");
    if (!title || title.trim() === "") return;
    const id = genId("z");
    const parent = findById(roots, parentId); // findById soporta arreglo ahora
    if (!parent) return alert("Nodo no encontrado");
    parent.children.push({ id, title: title.trim(), children: [] });
    force(n => n+1);
  };

  const handleEdit = (id, newTitle) => {
    if (!roots || roots.length === 0) return;
    const node = findById(roots, id);
    if (!node) return;
    node.title = newTitle;
    force(n => n+1);
  };

  const height = treeHeight(roots);
  const count = treeCount(roots);

  return (
    <div>
      <h2>Zonas verdes — {cityName}</h2>
      <div className="card">
        <div style={{ marginBottom: 8 }}>
          <button onClick={handleAddRoot}>{(roots && roots.length>0) ? "Agregar otra raíz" : "Agregar raíz"}</button>
        </div>

        {roots && roots.length > 0 ? (
          <>
            <div style={{ marginBottom: 12 }}>
              <strong>Altura máxima:</strong> {height} &nbsp; | &nbsp;
              <strong>Total zonas:</strong> {count}
            </div>
            <ul className="zone-list">
              {roots.map(r => <ZoneItem key={r.id} node={r} onAdd={handleAddSub} onEdit={handleEdit} />)}
            </ul>
          </>
        ) : (
          <div>No hay zonas verdes para esta ciudad.</div>
        )}
      </div>
    </div>
  );
}
