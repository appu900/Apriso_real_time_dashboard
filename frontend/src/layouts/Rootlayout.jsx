import React from "react";
import SideNavbar from "./SideNavbar";

const Rootlayout = ({ children }) => {
  return (
    <div className="flex gap-4 max-h-screen">
      <div className="sticky z-[999] left-0 top-0">
        <SideNavbar />
      </div>
      <main className="flex-1 max-w-8xl z-[999] max-h-screen">{children}</main>
    </div>
  );
};

export default Rootlayout;
