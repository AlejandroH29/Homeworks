import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LinkedListPage from "./LinkedListPage";
import DoublyLinkedListPage from "./DoublyLinkedListPage";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/linked">Lista Simple</Link> |{" "}
        <Link to="/doubly">Lista Doble</Link>
      </nav>

      <Routes>
        <Route path="/linked" element={<LinkedListPage />} />
        <Route path="/doubly" element={<DoublyLinkedListPage />} />
        <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
