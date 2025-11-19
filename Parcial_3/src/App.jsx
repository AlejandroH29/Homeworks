import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import CitiesPage from "./pages/CitiesPages.jsx";
import ZonesPage from "./pages/ZonesPages.jsx";

export default function App() {
  return (
    <div className="app-root">
      <Navbar />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Navigate to="/cities" replace />} />
          <Route path="/cities" element={<CitiesPage />} />
          <Route path="/zones/:cityName" element={<ZonesPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}
