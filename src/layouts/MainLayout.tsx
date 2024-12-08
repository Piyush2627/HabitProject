import { useEffect, useRef } from "react";
import React from "react";
//icons
import { TbMenu } from "react-icons/tb";
//components
import HabitsPage from "../pages/HabitPage";
import SideNavigation from "../components/ui/SideNavigation";

function MainLayout() {
  const [sideNavBar, setSideNavBar] = React.useState(false);
  const sideNavRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setSideNavBar(!sideNavBar);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sideNavRef.current &&
        !sideNavRef.current.contains(event.target as Node)
      ) {
        setSideNavBar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sideNavRef]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-900">
      {sideNavBar && (
        <div className="group absolute left-2 top-2 rounded bg-white p-2">
          <button
            className="flex items-center space-x-2 text-sm"
            onClick={handleClick}
          >
            <TbMenu />
          </button>
          <div className="hidden group-hover:block">
            <div className="absolute left-0 z-20">
              <div className="w-72 rounded-xl bg-white p-4 opacity-100">
                <div className="mb-2 rounded bg-black p-2 text-white">
                  Create a new Page in this section
                </div>
                <SideNavigation />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={` ${sideNavBar ? "hidden" : "flex"}`}>
        <div className="w-60 bg-zinc-700 p-5">
          <button
            onClick={handleClick}
            className="rounded-md hover:bg-gray-200 lg:px-2 lg:py-1"
          >
            hello
          </button>
        </div>
      </div>
      <div className="grow">
        <div className="mx-auto w-2/5 rounded-b-[90px] bg-white p-2 text-center">
          Links{" "}
        </div>
        <HabitsPage />
      </div>
    </div>
  );
}

export default MainLayout;
