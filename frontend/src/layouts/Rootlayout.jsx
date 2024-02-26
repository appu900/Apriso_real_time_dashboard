import React from "react";
import SideNavbar from "./SideNavbar";

const Rootlayout = ({ children }) => {
  return (
    <div className="flex gap-4 h-screen w-full">
      <div className=" z-[999]">
        <SideNavbar />
      </div>
      <main className="flex-1 max-w-8xl z-[999] overflow-y-auto">{children}</main>
    </div>
  );
};

export default Rootlayout;
