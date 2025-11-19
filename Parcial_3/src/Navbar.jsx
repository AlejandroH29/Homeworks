import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <div className="brand">Parcial 3 - Ciudades & Zonas</div>
        <div className="links">
          <NavLink to="/cities" className={({isActive})=> isActive ? "active": ""}>Ciudades</NavLink>
        </div>
      </div>
    </nav>
  );
}
