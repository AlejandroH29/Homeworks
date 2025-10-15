import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { popNotification } from "../store/slice/notificacionSlice";
import { Stack } from "../estructura/Stack";

const NotificationStack = () => {
  const notificationsArray = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  // Usa la clase Stack para manipular la pila
  const stack = new Stack();
  notificationsArray.forEach(item => stack.push(item));

  const handlePop = () => {
    stack.pop();
    dispatch(popNotification());
  };

  return (
    <div>
      <h2>Notificaciones recientes (Pila)</h2>
      <button onClick={handlePop} disabled={stack.isEmpty()}>
        Quitar notificación superior
      </button>
      <ul>
        {[...stack.toArray()].reverse().map((notif, idx) => (
          <li key={idx}>{notif}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationStack;