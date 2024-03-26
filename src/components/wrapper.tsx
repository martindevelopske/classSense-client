import { Children, ReactElement, ReactNode, useEffect, useState } from "react";
import Navbar from "./Header";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { Outlet } from "react-router-dom";

interface WrapperProps {
  children: ReactNode; // Define children prop of type ReactNode
}
export default function Wrapper() {
  const [expanded, setExpanded] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);

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
        <Navbar role="student" />
      </div>
      <div className="w-full mt-[70px] gap-0 flex-1 flex overflow-hidden">
        <div
          className={`${
            expanded ? "w-[150px]" : "w-[50px]" // Adjust the width here
          } md:w-[200px]  bg-grayish`}
        >
          <div
            className={`${
              expanded && "rounded-tr-[42px]"
            } w-full h-full bg-purple md:rounded-tr-[42px] p-2 text-white flex flex-col items-center`}
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
            <div className="flex items-center justify-center">
              {(expanded || isMediumScreen) && (
                <ul className="flex-col gap-2">
                  <li>Link 1</li>
                  <li>Link 2</li>
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 h-screen overflow-auto p-2 bg-grayish">
          <div className="w-full h-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
