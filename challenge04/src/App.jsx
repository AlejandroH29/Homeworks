import React, { useState } from "react";
import CategoryInput from "./ComponenteHijo.jsx";

function App() {
  const [categories, setCategories] = useState([]);

  const addCategory = (newCategory) => {
    if (newCategory.trim() === "") return;
    setCategories([...categories, newCategory]);
  };

  return (
    <div>
      <h1>Challenge 04</h1>
      <CategoryInput onAddCategory={addCategory} />
      <h2>Categorías:</h2>
      <ul>
        {categories.map((cat, index) => (
          <li key={index}>{cat}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
