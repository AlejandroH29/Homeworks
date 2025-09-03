import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./PrivateRute.jsx";
import Login from "./Login";
import Dashboard from "./Dashboard";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <nav>
          <Link to="/login">Login</Link> |{" "}
          <Link to="/dashboard">Dashboard</Link>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<h2>Hola challenge06</h2>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
