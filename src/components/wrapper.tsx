// export default function Wrapper() {
//   return (
//     <>
//       <div className="grid grid-cols-1 grid-rows-2 min-h-screen ">
//         <div className="border h-[100px]">Header</div>
//         <div className="grid grid-cols-2 grid-rows-1 w-full">
//           <div className="border w-1/4">Sidebar</div>
//           <div className="border w-3/4">outlet</div>
//         </div>
//       </div>
//     </>
//   );

import { useEffect, useState } from "react";
import Navbar from "./Header";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";

// }
export default function Wrapper() {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded((prev) => !prev);
  };
  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="h-[100px] w-screen fixed">
        <Navbar role="student" />
      </div>
      <div className="w-full mt-[100px] gap-0 flex-1 flex overflow-hidden">
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
                <li className={`${!expanded && "hidden"}`}>Link 1</li>
                <li className={`${!expanded && "hidden"}`}>Link 2</li>
              </ul>
              {/* ) : (
                <ul className="flex flex-col gap-2"></ul>
              )} */}
            </div>
          </div>
        </div>
        <div className="flex-1 h-screen overflow-auto p-2 bg-grayish">
          item two
          <div className="w-full h-auto">test</div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div class="grid grid-cols-3 grid-flow-col">
  <div class="border p-4">Item 1</div>
  <div class="border p-4">Item 2</div>
  <div class="border p-4">Item 3</div>
  <div class="border p-4">Item 4</div>
  <div class="border p-4">Item 5</div>
  <div class="border p-4">Item 6</div>
</div>; */
}
