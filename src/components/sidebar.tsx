import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ role }) => {
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
    <div className="min-h-[500px] w-full text-white">
      <ul className="flex flex-col gap-4 w-full items-center h-full">
        {links.map((link, index) => (
          <Link
            className="p-2 rounded-sm w-full bg-violet-800"
            to={link.to}
            key={index}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
