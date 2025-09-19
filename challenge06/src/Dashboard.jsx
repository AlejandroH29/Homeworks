import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Bienvenido, {user.name}</p>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}

export default Dashboard;
