import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ node }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  if (!node) return null;

  return (
    <ul style={{ listStyle: "none", paddingLeft: "15px" }}>
      <li>
        <Link
          to={node.path}
          style={{
            color: isActive(node.path) ? "#0056b3" : "#007bff",
            textDecoration: isActive(node.path) ? "underline" : "none",
            fontWeight: isActive(node.path) ? "bold" : "normal",
          }}
        >
          {node.title}
        </Link>
      </li>
      {node.children.length > 0 && (
        <ul style={{ paddingLeft: "20px" }}>
          {node.children.map((child, index) => (
            <Sidebar key={index} node={child} />
          ))}
        </ul>
      )}
    </ul>
  );
};

export default Sidebar;
