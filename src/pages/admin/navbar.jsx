import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { IoMdPerson } from "react-icons/io";

const Navbar = () => {
  const navigate = useNavigate();

  const activeStyle = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      color: isActive ? "#DB1600" : "#475467",
      borderBottom: isActive ? "2px solid #DB1600" : "none",
    };
  };
  const [user, setUser] = useState("");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("Username"));
    if (user !== null || user !== undefined) {
      setUser(user);
    }
  }, []);
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
        <div className="w-10 h-10 rounded-full border border-red-600 bg-slate-300 mx-2 text-white flex items-center justify-center">
          <IoMdPerson size={20} />
        </div>
        <p className="font-bold text-black font-mono">user</p>
      </div>
    </div>
  );
};

export default Navbar;
