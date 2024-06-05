import { useEffect, useState } from "react";
import Navbar from "./Header";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import Sidebar from "./sidebar";
import { useAppStore } from "@/store";
import { Outlet, useNavigate } from "react-router-dom";
import Breadcrumbs from "./BreadCrumps";

export default function Wrapper() {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [isMediumScreen, setIsMediumScreen] = useState<boolean>(false);
  const navigate = useNavigate();
  const user: User | null = useAppStore((state) => state.user);

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
        <div className={` ${expanded ? "w-[200px]" : "w-[55px]"} bg-grayish`}>
          <div
            className={`w-full h-full bg-purple p-2 text-white flex flex-col items-center`}
          >
            <div className=" w-full h-auto p-2 flex justify-end items-center ">
              <button className="py-1 text-lg" onClick={handleExpand}>
                {expanded ? <Cross1Icon /> : <HamburgerMenuIcon />}
              </button>
            </div>
            <div className="flex items-center justify-center text-white w-full">
              <div className="mt-6 w-full h-auto">
                <Sidebar role={user?.userType} expanded={expanded} />
              </div>
              {/* )} */}
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
