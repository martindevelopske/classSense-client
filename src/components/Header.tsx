// Navbar.js
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

import { BellIcon, GearIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import axios from "axios";
import { logout } from "@/endpoints";
import checkCookie from "@/lib/checkCookie";
import { useAppStore } from "@/store";

type navbarProps = {
  role: string | undefined;
  user: User | null;
};
const Navbar = ({ role, user }: navbarProps) => {
  const currentUser: usert | undefined = user?.user;
  const userType: string = user?.userType;
  const setUser = useAppStore((state) => state.setUser);
  //handle logout
  const handleLogout = async () => {
    const response = await axios
      .post(logout, {
        withCredentials: true,
      })
      .then((res) => console.log(res));
    //update state
    setUser(null);
    window.location.reload();
  };
  // Define links based on the user's role
  const links =
    role === "student"
      ? [
          { label: "Home", to: "/" },
          { label: "Profile", to: "/profile" },
        ]
      : role === "instructor"
      ? [
          { label: "Home", to: "/" },
          { label: "Dashboard", to: "/dashboard" },
        ]
      : role === "admin"
      ? [
          { label: "Home", to: "/" },
          { label: "Dashboard", to: "/dashboard" },
        ]
      : []; // default value if role doesn't match any condition

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
        <div className="flex gap-2 items-center justify-center w-1/2 md:w-1/3">
          <Input className="rounded-full" />
          <MagnifyingGlassIcon width={20} height={20} />
        </div>
        <div className="h-full flex gap-2 items-center">
          {currentUser ? (
            <div className="flex items-center justify-center ml-2 text-sm">
              Welcome, {currentUser?.email || "no user"}
            </div>
          ) : (
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          )}
          {currentUser ? (
            <div className="h-full">
              <Avatar className="flex items-center justify-center h-full">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  className="rounded-full h-1/2"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <></>
          )}
          <div className="flex items-center justify-center gap-3 mr-3">
            <BellIcon width={20} height={20} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <GearIcon width={20} height={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-slate-300 mt-3 p-2 rounded-sm">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="mt-2" />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="hover:bg-slate-500 p-2 rounded-sm cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="mt-2" />

                  <DropdownMenuItem className="hover:bg-slate-500 p-2 rounded-sm cursor-pointer">
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="mt-2" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="hover:bg-slate-500 p-2 rounded-sm cursor-pointer"
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
