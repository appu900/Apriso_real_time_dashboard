import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Atom, Circle } from "lucide-react";
import { User } from "lucide-react";
import { Computer } from "lucide-react";
import { Waves } from "lucide-react";
import {ChevronRight} from "lucide-react";


const navData = [
  { name: "Apriso", path: "/", icon: <Atom /> },
  { name: "Employee", path: "/emp", icon: <User /> },
  { name: "Station", path: "/station", icon: <Computer /> },
  { name: "Efiiciency", path: "/contact", icon: <Waves /> },
  //   { name: "Contact", path: "/contact" },
];

const SideNavbar = () => {
  const navigate = useNavigate();
  return (
    <div className=" w-[200px] h-screen sticky bottom-0 left-0 top-0 bg-[#3538A1] text-white ">
      <div className="px-2">
        <ul className="flex flex-col gap-5">
          {navData.map((item, index) => {
            return (
              <div
                onClick={() => navigate(`${item.path}`)}
                className={`cursor-pointer hover:bg-[#4448CC] px-5 rounded-lg flex items-center ${
                  index === 0 && "mb-8 text-xl hover:bg-none"
                }`}
              >
                <p key={index}>{item.icon}</p>
                <li key={index} className="p-2 capitalize">
                  {item.name}
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SideNavbar;
