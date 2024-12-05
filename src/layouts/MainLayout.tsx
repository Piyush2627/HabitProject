import { useEffect, useRef, useState } from "react";
import HabitsPage from "../pages/HabitPage";
import React from "react";

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
      <div className={` ${sideNavBar ? "hidden" : "flex"}`}>
        <div className="my-5 w-60 rounded-r-3xl bg-white p-5 opacity-10">
          <button
            onClick={handleClick}
            className="rounded-md hover:bg-gray-200 lg:px-2 lg:py-1"
          >
            hello
          </button>
        </div>
        <button className="border bg-yellow-50 p-3">hi</button>
        hello
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
