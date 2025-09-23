import React, { useState } from "react";
import DoublyLinkedList from "./DoublyLinkedList";

const DoublyLinkedListPage = () => {
  const list = new DoublyLinkedList();
  list.append({ title: "Google", url: "https://www.google.com" });
  list.append({ title: "YouTube", url: "https://www.youtube.com" });
  list.append({ title: "Wikipedia", url: "https://www.wikipedia.org" });
  list.append({ title: "GitHub", url: "https://www.github.com" });

  const [index, setIndex] = useState(0);

  const goBack = () => {
    if (index > 0) setIndex(index - 1);
  };

  const goForward = () => {
    if (index < list.size() - 1) setIndex(index + 1);
  };

  const current = list.peek(index);

  return (
    <div>
      <h2>Lista Doble - Historial de Navegador</h2>
      <p>
        🌐 Página actual: <b>{current.title}</b> <br />
        🔗 URL: <a href={current.url} target="_blank">{current.url}</a>
      </p>
      <button onClick={goBack}>⬅ Atrás</button>
      <button onClick={goForward}>➡ Adelante</button>
    </div>
  );
};

export default DoublyLinkedListPage;
