// Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ role }) => {
  // Define links based on the user's role
  const links =
    role === "student"
      ? [
          { label: "Home", to: "/student/home" },
          { label: "Profile", to: "/student/profile" },
        ]
      : [
          { label: "Home", to: "/instructor/home" },
          { label: "Dashboard", to: "/instructor/dashboard" },
        ];

  return (
    <nav>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
