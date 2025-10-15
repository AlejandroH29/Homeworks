import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FeedList from "./components/FeedList";
import NotificationStack from "./components/NotificationStack";
import DirectQueue from "./components/DirectQueue";
import Login from "./components/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";
import { useSelector } from "react-redux";
import {signOut} from "firebase/auth"; 

function SocialApp() {
  const notifications = useSelector(s => s.notifications);

  return (
    <div>
      <header style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <h1>Red Social UAO</h1>
        <span>🔔 Notificaciones: {notifications.length}</span>
        <button onClick={() => signOut(auth)}>Cerrar sesión</button>
      </header>
      <FeedList />
      <NotificationStack />
      <DirectQueue />
    </div>
  );
}

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div>Cargando...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            user ? <SocialApp /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;