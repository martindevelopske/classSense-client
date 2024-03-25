import { ReactElement, useState } from "react";
import Navbar from "./Header";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";

// }

interface WrapperProps {
  role: ReactElement; // Specify the type of the role prop
}
export default function Wrapper({ role }: WrapperProps) {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded((prev) => !prev);
  };
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
              {expanded ? (
                <Cross1Icon />
              ) : (
                <div>
                  <HamburgerMenuIcon />{" "}
                </div>
              )}
            </button>
            <div className="flex items-center justify-center">
              {/* {expanded ? ( */}
              <ul className="flex-col gap-2">
                <li className={`${!expanded && "hidden"} hover:text-purple`}>
                  Link 1
                </li>
                <li className={`${!expanded && "hidden"} hover:text-purple`}>
                  Link 2
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex-1 h-screen overflow-auto p-2 bg-grayish">
          <div className="w-full h-auto">{role}</div>
        </div>
      </div>
    </div>
  );
}
