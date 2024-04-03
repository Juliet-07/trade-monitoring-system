// https://preline.co/docs/sidebar.html
import React from "react";
import { NavLink } from "react-router-dom";
import { TfiAgenda } from "react-icons/tfi";
import { LuNetwork } from "react-icons/lu";
import { SiFormstack } from "react-icons/si";
import Header from "../../components/Header";

const Layout = ({ children }) => {
  const Menus = [
    {
      title: "Form A",
      icon: <SiFormstack />,
      path: "/dbs_reviewer/formA",
    },
  ];
  const activeLink =
    "mx-4 flex justify-start items-center text-white text-2xl space-x-1 font-bold bg-black rounded-xl";
  const normalLink =
    "hover:bg-white mt-3 mx-4 flex justify-start items-center text-black text-base space-x-1 font-semibold";

  const SidebarLinks = ({ menu }) => {
    return (
      <NavLink
        to={menu.path}
        className={({ isActive }) => (isActive ? activeLink : normalLink)}
      >
        <li
          className="flex items-center gap-x-2 cursor-pointer p-2.5 hover:text-black hover:font-semibold rounded-md mt-2
          "
        >
          <span className="text-xl block float-left">{menu.icon}</span>
          <span className="text-base font-medium">{menu.title}</span>
        </li>
      </NavLink>
    );
  };

  return (
    <div className="w-full h-full">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-[200px] mt-20 relative">
          <ul className="my-4">
            {Menus.map((menu, index) => (
              <SidebarLinks key={index} menu={menu} />
            ))}
          </ul>
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
