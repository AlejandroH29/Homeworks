import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { enqueueMessage, dequeueMessage } from "../store/slice/directQueueSlice";
import { Queue } from "../estructura/Queue";

const DirectQueue = () => {
  const [msg, setMsg] = useState("");
  const queueArray = useSelector((state) => state.directQueue);
  const dispatch = useDispatch();
  const queue = new Queue();
  queueArray.forEach(item => queue.enqueue(item));

  const handleSend = () => {
    if (msg.trim() === "") return;
    queue.enqueue(msg);
    dispatch(enqueueMessage(msg));
    setMsg("");
  };

  const handleDequeue = () => {
    queue.dequeue();
    dispatch(dequeueMessage());
  };

  return (
    <div>
      <h2>Mensajes directos pendientes (Cola)</h2>
      <input value={msg} onChange={e => setMsg(e.target.value)} placeholder="Mensaje directo..." />
      <button onClick={handleSend}>Enviar a cola</button>
      <button onClick={handleDequeue} disabled={queue.isEmpty()}>
        Enviar siguiente mensaje
      </button>
      <ul>
        {queue.toArray().map((m, idx) => (
          <li key={idx}>{m}</li>
        ))}
      </ul>
    </div>
  );
};

export default DirectQueue;