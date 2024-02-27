import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./navbar";

const UserPage = () => {
  const { id: userID } = useParams();
  //   console.log(userID, "id");
  const baseURL = import.meta.env.VITE_REACT_APP_BASEURL;
  const userInfo = JSON.parse(localStorage.getItem("trmsUser"));
  const token = userInfo.token;
  const [user, setUser] = useState({});
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

  useEffect(() => {
    GetUserById();
  }, []);
  return (
    <>
      <Navbar />
      <div className="p-20 flex items-center justify-center">
        <div className="w-[616px] h-[562px] bg-white rounded border shadow-md p-4">
          <p className="font-semibold text-3xl font-mono">User Details</p>
          <form
            className=" font-mono"
            // onSubmit={handleSubmit(createUser)}
          >
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
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="details"
                className="block text-[#000D19] text-sm mb-2 font-semibold"
              >
                Role
              </label>
              {/* <Select
                options={roles}
                defaultValue={selectedRoles}
                onChange={handleSelectRolesChange}
                onInputChange={handleRolesInputChange}
                isMulti
              /> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserPage;
