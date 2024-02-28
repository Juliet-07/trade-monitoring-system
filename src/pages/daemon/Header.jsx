import React from "react";
import Logo from "../../assets/logo.png";

const Header = () => {
  const userInfo = JSON.parse(localStorage.getItem("trmsUser"));
  const name = userInfo.userName;

  return (
    <>
      <div className="w-full h-20 bg-white border flex items-center justify-between px-6 shadow-md">
        <div className="w-[200px] ">
          <img src={Logo} className="w-full" />
        </div>
        <div className="font-mono font-bold text-xl text-red-700">{name}</div>
      </div>
    </>
  );
};

export default Header;
