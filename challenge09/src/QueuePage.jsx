import React, { useState, useRef } from "react";
import Queue from "./Queue";

const QueuePage = () => {
  const queueRef = useRef(null);

  if (!queueRef.current) {
    queueRef.current = new Queue();
    // Mock data inicial
    queueRef.current.enqueue({ name: "Ana", amount: 200, date: "2025-09-24", time: "08:30" });
    queueRef.current.enqueue({ name: "Luis", amount: 500, date: "2025-09-24", time: "08:45" });
    queueRef.current.enqueue({ name: "Marta", amount: 100, date: "2025-09-24", time: "09:00" });
  }

  const [queue, setQueue] = useState(() =>
    sortQueue(queueRef.current.print())
  );

  const [form, setForm] = useState({ name: "", amount: "", date: "", time: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    queueRef.current.enqueue({
      ...form,
      amount: Number(form.amount),
    });
    setQueue(sortQueue(queueRef.current.print()));
    setForm({ name: "", amount: "", date: "", time: "" });
  };

  // 🔑 Función para ordenar por fecha + hora
  function sortQueue(list) {
    return [...list].sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA - dateB; // más antiguo primero
    });
  }

  return (
    <div>
      <h2>Cola del Cajero Automático</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Monto a retirar"
          value={form.amount}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          required
        />
        <button type="submit">Agregar Persona</button>
      </form>

      <h3>Personas en la cola (orden de llegada):</h3>
      <ul>
        {queue.map((person, index) => (
          <li key={index}>
            {person.name} — Retiro: ${person.amount} — Fecha: {person.date} — Hora: {person.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QueuePage;
