import React, { useState, useCallback } from "react";
import NumeroButton from "./ComponenteHijo.jsx";

function App() {
  const [numero, setNumero] = useState(0);
  const [suma, setSuma] = useState(0);

  const handleClick = useCallback((n) => {
    setNumero(n);
    setSuma((prev)=>prev+n);
  }, []);

  return (
    <div>
      <h1>Challenge 05</h1>
      <h2>Número seleccionado: {numero}</h2>
      <h2>suma: {suma}</h2>
      <NumeroButton value={1} onClick={handleClick} />
      <NumeroButton value={2} onClick={handleClick} />
      <NumeroButton value={3} onClick={handleClick} />
      <NumeroButton value={4} onClick={handleClick} />
      <NumeroButton value={5} onClick={handleClick} />
      <NumeroButton value={5} onClick={handleClick} />
      <NumeroButton value={6} onClick={handleClick} />
      <NumeroButton value={7} onClick={handleClick} />
      <NumeroButton value={8} onClick={handleClick} />
      <NumeroButton value={9} onClick={handleClick} />

    </div>
  );
}

export default App;
