// Navbar.js
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { Link } from "react-router-dom";
import { BellIcon, GearIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";

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
    <div className="h-[70px] bg-grayish flex flex-row border justify-between px-3 items-center space-between w-full">
      <div>
        {/* <ul className="flex gap-2">
          {links.map((link, index) => (
            <li key={index}>
              <Link to={link.to}>{link.label}</Link>
            </li>
          ))}
        </ul> */}
      </div>

      <div className="h-full flex gap-3 items-center justify-between w-full">
        <div className="flex gap-2 items-center justify-center">
          <Input className="rounded-full" />
          <MagnifyingGlassIcon width={20} height={20} />
        </div>
        <div className="h-full flex gap-2">
          <div className="flex items-center justify-center">Welcome, User</div>
          <div className="h-full">
            <Avatar className="flex items-center justify-center h-full">
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="rounded-full h-1/2"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex items-center justify-center gap-3 mr-3">
            <BellIcon width={20} height={20} />
            <GearIcon width={20} height={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
