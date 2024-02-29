import React from "react";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("trmsUser"));
  const name = userInfo.userName;

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <div className="w-full h-20 bg-white border flex items-center justify-between px-6 shadow-md">
        <div className="w-[200px]">
          <img src={Logo} className="w-full" />
        </div>
        <div className="flex items-center cursor-pointer">
          <div className="font-mono font-bold text-xl text-green-700 mx-4">{name}</div>
          <div onClick={() => logout()} className="font-mono font-bold text-red-700">Logout</div>
        </div>
      </div>
    </>
  );
};

export default Header;
