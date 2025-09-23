import React, { useState } from "react";
import LinkedList from "./LinkedList";

const LinkedListPage = () => {
  const list = new LinkedList();
  list.append({ title: "Bohemian Rhapsody", artist: "Queen" });
  list.append({ title: "Imagine", artist: "John Lennon" });
  list.append({ title: "Billie Jean", artist: "Michael Jackson" });
  list.append({ title: "Shape of You", artist: "Ed Sheeran" });

  const [index, setIndex] = useState(0);

  const nextSong = () => {
    if (index < list.size() - 1) {
      setIndex(index + 1);
    }
  };

  const current = list.peek(index);

  return (
    <div>
      <h2>Lista Simple - Reproducción de Canciones</h2>
      <p>
        🎵 Reproduciendo: <b>{current.title}</b> — {current.artist}
      </p>
      <button onClick={nextSong}>Siguiente</button>
    </div>
  );
};

export default LinkedListPage;
