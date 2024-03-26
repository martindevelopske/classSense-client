// Navbar.js
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

import { BellIcon, GearIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

const Navbar = ({ role }) => {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setCurrentUser(userData);
      // if (userData.userType !== "student") {
      //   console.error("User is not a student.");
      // }
      console.log(currentUser, "current");
    } else {
      console.log("no user data string");
    }
  }, []);

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
        <div className="flex gap-2 items-center justify-center w-1/2 md:w-1/3">
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
