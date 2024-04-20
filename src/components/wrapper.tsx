import { useEffect, useState } from "react";
import Navbar from "./Header";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import Sidebar from "./sidebar";
import Breadcrumbs from "./BreadCrumps";
import { useStore } from "zustand";
import { useAppStore } from "@/store";
import { Navigate, useNavigate } from "react-router-dom";
import { homeLoginUrl } from "@/lib/urls";

export default function Wrapper({ children }) {
  const [expanded, setExpanded] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const navigate = useNavigate();
  const user: User | null = useAppStore((state) => state.user);
  console.log(user);

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

  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="h-[70px] w-screen fixed">
        {/* //remember to change role to user.userType */}
        <Navbar role={user?.userType} user={user} />
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
              {(expanded || isMediumScreen) && (
                <div className="mt-6 w-full h-auto">
                  <Sidebar role={user?.userType} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 h-auto overflow-auto p-2 bg-grayish">
          <div className="w-full h-auto">
            {/* <Breadcrumbs /> */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
