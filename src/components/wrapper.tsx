import { useEffect, useState } from "react";
import Navbar from "./Header";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { Outlet } from "react-router-dom";
import { checkLogin } from "@/lib/checkLogin";
import Sidebar from "./sidebar";
import Breadcrumbs from "./BreadCrumps";

export default function Wrapper() {
  const [expanded, setExpanded] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>();

  const handleExpand = () => {
    setExpanded((prev) => !prev);
  };

  // Function to toggle expanded state based on screen size
  const toggleExpanded = () => {
    setIsMediumScreen(window.innerWidth >= 768 && window.innerWidth < 1024);
    setExpanded(isMediumScreen ? true : false);
  };

  // Effect to update expanded state when window size changes
  useEffect(() => {
    toggleExpanded();
    window.addEventListener("resize", toggleExpanded);
    return () => window.removeEventListener("resize", toggleExpanded);
  }, []);
  useEffect(() => {
    const isLoggedIn = checkLogin();
    console.log(isLoggedIn);
    !isLoggedIn && console.log("hakuna mtu!!!");
    setCurrentUser(isLoggedIn);
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="h-[70px] w-screen fixed">
        <Navbar role="student" user={currentUser} />
      </div>
      <div className="w-full mt-[70px] gap-0 flex-1 flex overflow-hidden">
        <div
          className={`${
            expanded ? "w-[150px]" : "w-[50px]" // Adjust the width here
          } md:w-[200px]  bg-grayish`}
        >
          <div
            className={`w-full h-full bg-purple p-2 text-white flex flex-col items-center`}
          >
            <button
              className="py-3 text-lg mr-3 md:hidden"
              onClick={handleExpand}
            >
              {expanded || isMediumScreen ? (
                <Cross1Icon />
              ) : (
                <HamburgerMenuIcon />
              )}
            </button>
            <div className="flex items-center justify-center text-white w-full">
              {
                (expanded || isMediumScreen) && (
                  <div className="mt-6 w-full h-auto">
                    <Sidebar role={currentUser.userType} />
                  </div>
                )
                // <ul className="flex-col gap-3">
                //   <li className="mt-3">Home</li>
                //   <li>Scan QR</li>
                // </ul>
              }
              {/* <Sidebar role="instructor" /> */}
            </div>
          </div>
        </div>
        <div className="flex-1 h-auto overflow-auto p-2 bg-grayish">
          <div className="w-full h-auto">
            <Breadcrumbs />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
