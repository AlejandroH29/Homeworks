import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./sideBar";
import { menuTree } from "./MenuData";

function App() {
  useEffect(() => {
    console.log("📘 DFS:");
    menuTree.printDFS();
    console.log("📗 BFS:");
    menuTree.printBFS();
  }, []);

  const allNodes = [];

  const collectNodes = (node) => {
    if (!node) return;
    allNodes.push(node);
    node.children.forEach(collectNodes);
  };

  collectNodes(menuTree.root);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar persistente */}
      <aside
        style={{
          width: "280px",
          backgroundColor: "#f8f9fa",
          borderRight: "2px solid #ccc",
          padding: "20px",
          fontSize: "18px",
          overflowY: "auto",
        }}
      >
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>📁 Menú</h2>
        <Sidebar node={menuTree.root} />
      </aside>

      {/* Contenido dinámico */}
      <main
        style={{
          flex: 1,
          padding: "40px",
          fontSize: "20px",
          textAlign: "center",
        }}
      >
        <h2>Challenge 15 - Navegación con Árbol N-ario</h2>
        <hr style={{ width: "60%", margin: "20px auto" }} />
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "#eef4ff",
            borderRadius: "12px",
            width: "70%",
            margin: "auto",
            boxShadow: "0 0 8px rgba(0,0,0,0.1)",
          }}
        >
          <Routes>
            {allNodes.map((node, index) => (
              <Route
                key={index}
                path={node.path}
                element={<node.component />}
              />
            ))}
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
