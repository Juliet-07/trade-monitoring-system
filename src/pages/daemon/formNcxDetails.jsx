import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Header from "./Header";
import { TbArrowBackUp } from "react-icons/tb";
import { FaFileCode, FaDownload } from "react-icons/fa6";

const DaemonFormNCXDetails = () => {
  const { id: ID } = useParams();
  //   console.log(userID, "id");
  const baseURL = import.meta.env.VITE_REACT_APP_BASEURL;
  const userInfo = JSON.parse(localStorage.getItem("trmsUser"));
  const token = userInfo.token;
  const [formDetails, setFormDetails] = useState({});
  const [modal, setModal] = useState(false);

  const GetFormDetailsById = () => {
    const url = `${baseURL}/NXP/FormnxpDetails?formID=${ID}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.responseResult);
        setFormDetails(response.data.responseResult);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    GetFormDetailsById();
  }, []);

  return (
    <>
      <Header />
      <div className="p-10">
        <Link
          to="/daemon/formNxp"
          className="flex items-center p-2 w-[85px] h-10 border border-gray-100 rounded-lg"
        >
          <TbArrowBackUp color="#475467" />
          <span className="text-gray-600 mx-2">Back</span>
        </Link>
        <div className="my-10 font-mono">
          <p className="font-semibold">
            Application:
            <span className="text-gray-600">
              {formDetails.applicationNumber}
            </span>
          </p>
          <div className="my-4 grid grid-cols-3 gap-y-4">
            {/* 1 */}
            <div className="w-[405px] h-[281px] rounded-lg bg-white border border-[#D1FADF] shadow-lg">
              <div className="w-full h-[52px] bg-[#039855] text-white rounded-t-lg p-4 font-semibold">
                Application
              </div>
              <div className="px-4 py-2 grid gap-4 text-sm">
                <p>
                  <span className="text-gray-600">Status:</span>{" "}
                  {formDetails.status}
                </p>
                <p>
                  <span className="text-gray-600">Stage:</span>{" "}
                  {formDetails.statusCode}
                </p>
                <p>
                  <span className="text-gray-600">Application Number:</span>{" "}
                  {formDetails.applicationNumber}
                </p>
                <p>
                  <span className="text-gray-600">Form Number:</span>{" "}
                  {formDetails.formNumber}
                </p>
                <p>
                  <span className="text-gray-600">Sector:</span>{" "}
                  {formDetails.sector}
                </p>
                <p>
                  <span className="text-gray-600">Date Created:</span>{" "}
                  {formDetails.createdAt}
                </p>
              </div>
            </div>
            {/* 2 */}
            <div className="w-[405px] h-[281px] rounded-lg bg-white border border-[#D1FADF] shadow-lg">
              <div className="w-full h-[52px] bg-[#039855] text-white rounded-t-lg p-4 font-semibold">
                Exporter Information
              </div>
              <div className="px-4 py-2 grid gap-4 text-sm">
                <p>
                  <span className="text-gray-600">Name:</span>{" "}
                  {formDetails.contact.name}
                </p>
                <p>
                  <span className="text-gray-600">Email:</span>{" "}
                  {formDetails.contact.emailAddress}
                </p>
                <p>
                  <span className="text-gray-600">TIN:</span> {formDetails.tin}
                </p>
                <p>
                  <span className="text-gray-600">RC Number:</span>{" "}
                  {formDetails.contact.rcNumber}
                </p>
                <p>
                  <span className="text-gray-600">Phone Number:</span>{" "}
                  {formDetails.contact.phone}
                </p>
                <p>
                  <span className="text-gray-600">Address:</span>{" "}
                  {formDetails.contact.address}
                </p>
              </div>
            </div>
            {/* 3 */}
            <div className="w-[405px] h-[281px] rounded-lg bg-white border border-[#D1FADF] shadow-lg">
              <div className="w-full h-[52px] bg-[#039855] text-white rounded-t-lg p-4 font-semibold">
                Documents
              </div>
              <div className="px-4 py-2 grid gap-4 text-sm">
                {formDetails.attachments.map((file) => (
                  <>
                    <div className="flex items-center">
                      <FaFileCode />
                      <p className="mx-2 text-red-600">{file.file.fileName}</p>
                      <FaDownload color="red" />
                    </div>
                    <p className="text-xs">
                      <span>Lable:</span>
                      {file.file.label}
                    </p>
                    <p className="text-xs">
                      <span>Date Created:</span>
                      {file.file.createdAt}
                    </p>
                  </>
                ))}
              </div>
            </div>
            {/* 4 */}
            <div className="w-[405px] h-[281px] rounded-lg bg-white border border-[#D1FADF] shadow-lg">
              <div className="w-full h-[52px] bg-[#039855] text-white rounded-t-lg p-4 font-semibold">
                Financial Details
              </div>
              <div className="px-4 py-2 grid gap-4 text-sm">
                <p>
                  <span className="text-gray-600 text-xs">
                    Processing Bank:
                  </span>{" "}
                  {formDetails.processingBank.name}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">
                    Processing Bank Branch:
                  </span>{" "}
                  {formDetails.processingBankBranch.name}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">
                    Designated Bank:
                  </span>{" "}
                  {formDetails.designatedBank.name}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">Account Number:</span>{" "}
                  {formDetails.accountNumber}
                </p>
                <p>
                  <span className="text-gray-600">Phone Number:</span>{" "}
                  {formDetails.contact.phone}
                </p>
                <p>
                  <span className="text-gray-600">Address:</span>{" "}
                  {formDetails.contact.address}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="w-[616px] h-[562px] bg-white rounded border shadow-md p-4">
          <p className="font-semibold text-3xl font-mono">Form Details</p>
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
             
            </div>
          </form>
        </div> */}
      </div>
    </>
  );
};

export default DaemonFormNCXDetails;
