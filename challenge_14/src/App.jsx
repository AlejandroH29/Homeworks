import React, { useEffect, useState } from "react";
import { BinaryTree } from "./BinaryTree";
import { numbers } from "./Data.js";
import Tree from "react-d3-tree";

function App() {
  const [treeData, setTreeData] = useState(null);
  const [treeInstance, setTreeInstance] = useState(null);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    const tree = new BinaryTree();

    // Insertar los números
    numbers.forEach((num) => tree.insert(num));

    console.log("PreOrder:");
    tree.preOrder();
    console.log("InOrder:");
    tree.inOrder();
    console.log("PostOrder:");
    tree.postOrder();

    setTreeInstance(tree);
    setTreeData([tree.toD3Tree()]);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!treeInstance) return;

    const value = Number(query);
    if (Number.isNaN(value)) {
      setResult("❌ Ingresa un número válido");
      return;
    }

    const exists = treeInstance.contains(value);
    setResult(
      exists
        ? `✅ El valor ${value} SÍ está en el árbol.`
        : `❌ El valor ${value} NO está en el árbol.`
    );
  };

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#f8f9fa" }}>
      <h2 style={{ textAlign: "center", fontSize: "28px", marginTop: "20px" }}>
        Challenge 14 - Binary Tree
      </h2>

      <div
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "18px",
        }}
      >
        <form onSubmit={handleSearch} style={{ display: "inline-block" }}>
          <input
            type="number"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Escribe un número a buscar"
            style={{
              padding: "10px",
              fontSize: "16px",
              marginRight: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              width: "220px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 16px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#007bff",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Buscar
          </button>
        </form>

        {result && (
          <div
            style={{
              marginTop: "12px",
              fontWeight: "bold",
              fontSize: "18px",
              color: result.includes("SÍ") ? "green" : "red",
            }}
          >
            {result}
          </div>
        )}
      </div>

      {treeData && (
        <div style={{ width: "100%", height: "80vh" }}>
          <Tree
            data={treeData}
            orientation="vertical"
            translate={{ x: 600, y: 100 }}
            separation={{ siblings: 1.5, nonSiblings: 2 }}
            nodeSize={{ x: 100, y: 150 }}
            pathFunc="elbow"
            zoomable={true}
            scaleExtent={{ min: 0.5, max: 2 }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
