import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { useNavigate, NavLink } from "react-router-dom";
import { IoMdPerson } from "react-icons/io";

const Header = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("trmsUser"));
  const name = userInfo.userName;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <>
      <div className="w-full h-20 bg-white border flex items-center justify-between px-6 shadow-md">
        <div className="w-[200px]">
          <img src={Logo} className="w-full" />
        </div>
        <div className="flex items-center">
          <div className="relative">
            <div
              className="w-10 h-10 rounded-full border border-red-600 bg-slate-300 mx-2 text-white flex items-center justify-center cursor-pointer"
              onClick={toggleDropdown}
            >
              <IoMdPerson size={20} />
            </div>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-10">
                <NavLink
                  // to="/profile"
                  className="block py-2 px-4 text-sm text-gray-800 hover:bg-gray-200"
                >
                  Profile
                </NavLink>
                <button
                  onClick={logout}
                  className="block w-full py-2 px-4 text-left text-sm text-gray-800 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          <p className="font-bold text-black font-mono">{name}</p>
        </div>
      </div>
    </>
  );
};

export default Header;
