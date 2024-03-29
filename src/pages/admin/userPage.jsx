import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Navbar from "./navbar";
import { TbArrowBackUp } from "react-icons/tb";

const UserPage = () => {
  const { id: userID } = useParams();
  const baseURL = import.meta.env.VITE_REACT_APP_BASEURL;
  const userInfo = JSON.parse(localStorage.getItem("trmsUser"));
  const token = userInfo.token;
  const [user, setUser] = useState({});
  const [roles, setRoles] = useState([]);
  const [modal, setModal] = useState(false);

  const GetUserById = () => {
    const url = `${baseURL}/RegisterUser/GetUserProfile?userID=${userID}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setUser(response.data.data);
      })
      .catch((err) => console.log(err));
  };

  const GetRoles = () => {
    const url = `${baseURL}/RegisterUser/GetRoles`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        setRoles(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    GetUserById();
    GetRoles();
  }, []);

  const handleCheckboxChange = (roleName) => {
    // Logic to update the user's roles
    // For example, toggle the roleName in user's roles array
    setUser((prevUser) => ({
      ...prevUser,
      role: prevUser.role.includes(roleName)
        ? prevUser.role.filter((role) => role !== roleName)
        : [...prevUser.role, roleName],
    }));
  };

  const updateUser = () => {
    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      userID: user.userID,
      branch: user.branch,
      isActive: user.isActive,
      role: user.role,
    };
    const url = `${baseURL}/RegisterUser/UpdateUser`;
    axios
      .post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        alert(response.data.message);
      })
      .catch((err) => console.log(err));
  };

  const toggleUserStatus = () => {
    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      userID: user.userID,
      branch: user.branch,
      isActive: !user.isActive, // Toggle the status
      role: user.role,
    };
    const url = `${baseURL}/RegisterUser/UpdateUser`;
    axios
      .post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        alert(response.data.message);
        // Update the user state after successful update
        setUser((prevUser) => ({
          ...prevUser,
          isActive: !prevUser.isActive,
        }));
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Navbar />
      <Link
        to="/admin"
        className="flex items-center p-2 w-[85px] h-10 border border-gray-100 rounded-lg m-6"
      >
        <TbArrowBackUp color="#475467" />
        <span className="text-gray-600 mx-2">Back</span>
      </Link>
      <div className="p-10 flex items-center justify-center">
        <div className="w-[616px] h-[630px] bg-white rounded border border-red-400 shadow-md shadow-red-200 p-4">
          <p className="font-semibold text-3xl font-mono">User Details</p>
          <form className=" font-mono">
            <div className="grid grid-cols-2 gap-4">
              <div className="mt-4">
                <label
                  htmlFor="details"
                  className="block text-[#000D19] text-sm mb-2 font-semibold"
                >
                  First Name
                </label>
                <input
                  className="block w-full h-[50px] px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  name="firstName"
                  value={user.firstName}
                  readOnly
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="details"
                  className="block text-[#000D19] text-sm mb-2 font-semibold"
                >
                  Last Name
                </label>
                <input
                  className="block w-full h-[50px] px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  name="lastName"
                  value={user.lastName}
                  readOnly
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="details"
                className="block text-[#000D19] text-sm mb-2 font-semibold"
              >
                Email
              </label>
              <input
                type="email"
                className="block w-full h-[50px] px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                name="email"
                value={user.email}
                readOnly
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="details"
                className="block text-[#000D19] text-sm mb-2 font-semibold"
              >
                Phone number
              </label>
              <input
                className="block w-full h-[50px] px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"
                name="phoneNumber"
                value={user.phoneNumber}
                readOnly
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="details"
                className="block text-[#000D19] text-sm mb-2 font-semibold"
              >
                Roles
              </label>
              {roles.map((role) => (
                <div key={role.id} className="flex items-center mr-4">
                  <input
                    type="checkbox"
                    id={role.name}
                    name={role.name}
                    checked={(user.role || []).includes(role.name)}
                    onChange={() => handleCheckboxChange(role.name)}
                  />
                  <label htmlFor={role.name} className="ml-2">
                    {role.name}
                  </label>
                </div>
              ))}
            </div>
            <div className="w-full flex items-center justify-between my-6">
              <div
                className={`w-[172px] h-[48px] flex items-center justify-center rounded text-white ${
                  user.isActive ? 'bg-[#9B9CA0]' : 'bg-[#00A45A]'
                } cursor-pointer`}
                onClick={() => toggleUserStatus()}
              >
                {user.isActive ? 'Deactivate' : 'Activate'}
              </div>
              {/* <div
                className="w-[172px] h-[48px] flex items-center justify-center rounded text-white bg-[#DB1600] cursor-pointer"
                onClick={() => updateUser()}
              >
                Update
              </div> */}
              <div
                className={`w-[172px] h-[48px] flex items-center justify-center rounded text-white ${
                user.isActive ? 'bg-[#DB1600]' : 'bg-gray-400 cursor-not-allowed'
                }`}
                onClick={() => updateUser()}
                  disabled={!user.isActive}
                >
                  Update
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserPage;
