import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import { PiSignOutBold } from "react-icons/pi";
import Modal from "../../components/Modal";
import { FaEye } from "react-icons/fa";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";

const AdminPage = () => {
  const navigate = useNavigate();
  const { handleSubmit } = useForm();
  const baseURL = import.meta.env.VITE_REACT_APP_BASEURL;
  const userInfo = JSON.parse(localStorage.getItem("trmsUser"));
  const token = userInfo.token;
  const [users, setUsers] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [inputValue, setValue] = useState("");
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const infoCards = [
    {
      description: "Total no. of users",
      figure: users.length,
    },
    {
      description: "No. of active users",
      figure: users.length,
    },
    {
      description: "No. of inactive users",
      figure: 0,
    },
  ];

  // Logic to paginate the data
  const recordsPerPage = 10; // Set the number of items per page
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = users.slice(firstIndex, lastIndex);
  const npages = Math.ceil(users.length / recordsPerPage);
  const numbers = [...Array(npages + 1).keys()].slice(1);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: [],
  };

  const [addNewUser, setAddNewUser] = useState(initialValues);
  const { firstName, lastName, email, phoneNumber, role } = addNewUser;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddNewUser({ ...addNewUser, [name]: value });
  };

  const handleRolesInputChange = (value) => {
    setValue(value);
  };
  const handleSelectRolesChange = (value) => {
    setSelectedRoles(value);
    console.log(value, "selected roles");
  };

  const GetUser = () => {
    const url = `${baseURL}/RegisterUser/GetUsers`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setUsers(response.data.data);
      })
      .catch((err) => console.log(err));
  };

  const GetRoles = () => {
    let details;
    let role;
    const url = `${baseURL}/RegisterUser/GetRoles`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        details = response.data;
        role = details.map((role) => {
          return {
            value: role.name,
            label: role.name,
          };
        });
        setRoles(role);
        console.log(roles, "checking");
      })
      .catch((err) => console.log(err));
  };

  const createUser = () => {
    setLoading(true);
    const url = `${baseURL}/RegisterUser/register`;
    const rolesArray = selectedRoles.map((role) => role.value);
    const payload = {
      ...addNewUser,
      role: rolesArray,
    };
    console.log(payload);
    axios
      .post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        console.log(response, "response from creating user");
        alert(response.data.message);
        setLoading(false);
        if (response.status === 200) {
          // Close the modal upon successful registration
          setModal(false);
          // Clear the form fields
          setAddNewUser(initialValues);
          setSelectedRoles([]);
        }
      });
  };

  const prevPage = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  };
  const changeCurrentPage = (id) => {
    setCurrentPage(id);
  };
  const nextPage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    GetUser();
    GetRoles();
    console.log(selectedRoles, "Selected Roles");
  }, [selectedRoles]);
  return (
    <>
      <Navbar />
      <div className="py-4 px-20">
        {/* <div className="my-10 grid grid-cols-3">
          {infoCards.map((card) => (
            <div className="bg-white rounded-xl w-[320.4px] h-[149.6px] border shadow-lg flex items-center px-6">
              <div className="w-[75px] h-[75px] border-[3px] border-[#DB1600] rounded-xl mr-4"></div>
              <div className="">
                <p className="font-medium text-[#232323] font-mono text-sm">
                  {card.description}
                </p>
                <p className="font-bold font-sans">{card.figure}</p>
              </div>
            </div>
          ))}
        </div> */}
        {/* Table */}
        <div className="p-4 flex flex-col items-center justify-center bg-white rounded shadow-lg border">
          <div className="w-full flex items-center justify-between mb-4 px-4">
            <div
              className="bg-[#DB1600] w-[170px] h-[48px] rounded text-white flex items-center justify-center cursor-pointer"
              onClick={() => setModal(true)}
            >
              Add New User
            </div>
            <form>
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-0 bottom-0 w-6 h-6 my-auto text-black left-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  className="w-[528px] h-10 py-3 pl-12 pr-4 text-gray-50 border rounded-md outline-none bg-[#FAFAFA] focus:bg-white"
                />
              </div>
            </form>
          </div>
          <table className="w-full table bg-white text-sm text-left text-gray-500 dark:text-gray-400 px-4 divide-y-4">
            <thead className="text-xs font-mono text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="p-4"> S/N</th>
                <th className="p-4"> Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone Number</th>
                <th className="p-4">Branch</th>
                <th className="p-4">Status</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {records.length > 0 &&
                records.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td className="p-4">{index + 1}</td>
                      <td className="px-6 whitespace-nowrap">
                        {`${user?.firstName} ${user?.lastName}`}
                      </td>
                      <td className="p-4 whitespace-nowrap">{user?.email}</td>
                      <td className="p-4 whitespace-nowrap">
                        {user?.phoneNumber}
                      </td>
                      <td className="p-4 whitespace-nowrap">{user?.branch}</td>
                      <td
                        className={`p-4 whitespace-nowrap ${
                          user?.isActive ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {user?.isActive ? "Active" : "Inactive"}
                      </td>
                      <td className="p-4 text-black cursor-pointer">
                        <FaEye
                          onClick={() => {
                            setSelectedRowData(user?.userID);
                            navigate(`/userPage/${user?.userID}`);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <nav className="flex items-center justify-center my-4">
          <ul className="flex flex-row items-center">
            <li>
              <MdSkipPrevious
                size={20}
                onClick={prevPage}
                className="cursor-pointer"
              />
            </li>
            {numbers.map((n, i) => (
              <li
                key={i}
                className={`text-xs p-2 ${
                  currentPage === n ? "bg-red-900 rounded-full text-white" : ""
                }`}
              >
                <a href="#" onClick={() => changeCurrentPage(npages)}>
                  {n}
                </a>
              </li>
            ))}
            <li>
              <MdSkipNext
                size={20}
                onClick={nextPage}
                className="cursor-pointer"
              />
            </li>
          </ul>
        </nav>
      </div>
      <Modal isVisible={modal} onClose={() => setModal(false)}>
        <div className="p-6 flex flex-col users-center justify-center">
          <div className="uppercase text-black font-serif font-bold text-xl">
            Add New User
          </div>
          <form
            className="w-[616px] font-mono"
            onSubmit={handleSubmit(createUser)}
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
                  placeholder="Enter first name"
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
                  required
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
                  placeholder="Enter last name"
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                  required
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
                placeholder="Enter email address"
                value={email}
                onChange={handleChange}
                required
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
                placeholder="Enter phone number"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="details"
                className="block text-[#000D19] text-sm mb-2 font-semibold"
              >
                Role
              </label>
              <Select
                options={roles}
                defaultValue={selectedRoles}
                onChange={handleSelectRolesChange}
                onInputChange={handleRolesInputChange}
                isMulti
              />
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="w-full h-[48px] font-bold tracking-wide text-white bg-[#DB1600] uppercase rounded font-mono"
              >
                add user
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AdminPage;
