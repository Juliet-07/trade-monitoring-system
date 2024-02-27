// https://preline.co/docs/sidebar.html
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { SlHome } from "react-icons/sl";
import { TfiAgenda } from "react-icons/tfi";
import { MdDashboard, MdLiveTv } from "react-icons/md";
import { LuNetwork } from "react-icons/lu";
import { IoIosPeople } from "react-icons/io";
import Icon from "../../assets/logo.png";
import Header from "./Header";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const Menus = [
    {
      title: "Form NXP",
      icon: <TfiAgenda />,
      path: "/supervisor/formNxp",
    },
    {
      title: "Form A",
      icon: <MdLiveTv />,
      path: "/live",
    },
    {
      title: "Form NCX",
      icon: <LuNetwork />,
      path: "/network",
    },
  ];
  const activeLink =
    "mx-4 flex justify-start items-center text-black text-2xl space-x-1 font-bold bg-white rounded-xl";
  const normalLink =
    "hover:bg-white mt-3 mx-4 flex justify-start items-center text-white text-base space-x-1 font-semibold";

  const SidebarLinks = ({ menu }) => {
    return (
      <NavLink
        to={menu.path}
        className={({ isActive }) => (isActive ? activeLink : normalLink)}
      >
        <li
          className={`flex items-center gap-x-2 cursor-pointer p-2.5 hover:text-black hover:font-semibold rounded-md mt-2`}
        >
          <span className="text-xl block float-left">
            {menu.icon ? menu.icon : <MdDashboard />}
          </span>
          <span
            className={`text-base font-medium duration-200 ${
              !open && "hidden"
            }`}
          >
            {menu.title}
          </span>
        </li>
      </NavLink>
    );
  };

  return (
    <div className="w-full h-full">
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`h-screen pt-8 ${
            open ? "w-[272px]" : "w-[100px]"
          } duration-300 relative bg-[#DB1600]`}
        >
          {/* <BsArrowLeftShort
            className={`bg-red-600 text-white text-3xl rounded-full absolute -right-3 top-9 border border-red-600 cursor-pointer ${
              !open && "rotate-180"
            }`}
            onClick={() => setOpen(!open)}
          /> */}
          <div className="inline-flex  mx-2">
            <img
              src={Icon}
              alt="PremiumIcon"
              className={`w-[192.95px] duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
          </div>
          <ul className="my-4">
            {Menus.map((menu, index) => (
              <SidebarLinks key={index} menu={menu} />
            ))}
          </ul>
          {/* <Footer /> */}
        </div>
        {/* Content */}
        <div className="w-full">
          <Header />
          <main className="bg-gray-50 p-6">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
