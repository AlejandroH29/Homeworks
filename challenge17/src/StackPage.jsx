import React, { useState, useRef } from "react";
import Stack from "./Stack";
import styles from "./StackPage.module.scss";

const StackPage = () => {
  const stackRef = useRef(null);

  if (!stackRef.current) {
    stackRef.current = new Stack();
    stackRef.current.push({
      name: "Clean Code",
      isbn: "9780132350884",
      author: "Robert C. Martin",
      editorial: "Prentice Hall",
    });
    stackRef.current.push({
      name: "The Pragmatic Programmer",
      isbn: "9780201616224",
      author: "Andrew Hunt",
      editorial: "Addison-Wesley",
    });
  }

  const [bookStack, setBookStack] = useState(() =>
    stackRef.current.print()
  );

  const [form, setForm] = useState({
    name: "",
    isbn: "",
    author: "",
    editorial: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    stackRef.current.push({ ...form });
    setBookStack(stackRef.current.print());
    setForm({ name: "", isbn: "", author: "", editorial: "" });
  };

  // Mostrar LIFO: último agregado aparece primero
  const reversed = [...bookStack].reverse();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Pila de Libros</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input className={styles.input}
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input className={styles.input}
          type="text"
          name="isbn"
          placeholder="ISBN"
          value={form.isbn}
          onChange={handleChange}
          required
        />
        <input className={styles.input}
          type="text"
          name="author"
          placeholder="Autor"
          value={form.author}
          onChange={handleChange}
          required
        />
        <input className={styles.input}
          type="text"
          name="editorial"
          placeholder="Editorial"
          value={form.editorial}
          onChange={handleChange}
          required
        />
        <button className={styles.submit} type="submit">Agregar Libro</button>
      </form>

      <h3 className={styles.subtitle}>Libros en la Pila (top → bottom):</h3>
      <ul className={styles.bookList}>
        {reversed.map((book, index) => (
          <li className={styles.bookItem} key={index}>
            <b>{book.name}</b>
            <span className={styles.meta}> — {book.author} (ISBN: {book.isbn}, {book.editorial})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StackPage;
