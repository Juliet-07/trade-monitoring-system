import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { IoMdPerson } from "react-icons/io";

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("trmsUser"));
  const user = userInfo.userName;

  const activeStyle = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      color: isActive ? "#DB1600" : "#475467",
      borderBottom: isActive ? "2px solid #DB1600" : "none",
    };
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    // Perform logout action here
    // For example, clear localStorage and navigate to the login page
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="w-full h-20 bg-white flex items-center justify-between px-20 border">
      <NavLink to="/admin" className="w-[250px]">
        <img src={Logo} />
      </NavLink>
      {/* <div className="flex gap-4 font-mono">
        <NavLink to="/admin/formNxp" style={activeStyle} className="p-2">
          Form NXP
        </NavLink>
        <NavLink to="/admin/formA" style={activeStyle} className="p-2">
          Form A
        </NavLink>
        <NavLink to="/admin/formNcp" style={activeStyle} className="p-2">
          Form NCP
        </NavLink>
      </div> */}
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
                to="/profile"
                className="block py-2 px-4 text-sm text-gray-800 hover:bg-gray-200"
              >
                Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="block w-full py-2 px-4 text-left text-sm text-gray-800 hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
        <p className="font-bold text-black font-mono">{user}</p>
      </div>
    </div>
  );
};

export default Navbar;
