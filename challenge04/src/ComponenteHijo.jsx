import React, { useState } from "react";

function CategoryInput({ onAddCategory }) {
  const [category, setCategory] = useState("");

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleAdd = () => {
    onAddCategory(category);
    setCategory("");
  };

return (
    <div>
        <input
        type="text"
        placeholder="Escribe una categoría"
        value={category}
        onChange={handleChange}
      />
      <button onClick={handleAdd}>Agregar</button>
    </div>
  );
}

export default CategoryInput;
