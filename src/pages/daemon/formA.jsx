import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { FaEye } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";

const DaemonFormA = () => {
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_REACT_APP_BASEURL;
  const userInfo = JSON.parse(localStorage.getItem("trmsUser"));
  const token = userInfo.token;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Set the number of items per page
  const [pendingFormA, setPendingFormA] = useState([]);
  const [processedFormA, setProcessedFormA] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState({});

  // Logic to paginate the data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pendingFormA.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const GetPendingFormA = () => {
    const url = `${baseURL}/v1/FormA/PendingFormAList`;
    let data;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data, "Pending Form A");
        data = response.data.responseResult.content;
        setPendingFormA(data);
      })
      .catch((err) => console.log(err));
  };

  const GetProcessedFormA = () => {
    const url = `${baseURL}/v1/FormA/FormAList`;
    let data;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data, "Processed Form A");
        data = response.data.responseResult.content;
        setProcessedFormA(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    GetPendingFormA();
    GetProcessedFormA();
  }, []);
  return (
    <Layout>
      <div className="text-3xl font-semibold text-red-800 font-mono">
        <div className="shadow py-2 px-2">
          <h4 className="text-sm mb-5">Pending Applications</h4>
          <table className="w-full text-sm border-collapse border-t-[1px] rounded-sm text-gray-700">
            <thead className="h-10 border-b">
              <tr className="text-center">
                <td>Application No.</td>
                <td>Form Number</td>
                <td>Applicant Name</td>
                <td>FoB Value($)</td>
                <td>NESS Levy (N)</td>
                <td>Last Modified</td>
                <td className="text-yellow-600">Stage</td>
                <td>Date Created</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {pendingFormA.map((a, index) => (
                <tr
                  key={index}
                  className={`h-10 text-center ${
                    parseInt(a.applicationNumber) % 2 === 1 ? "bg-gray-200" : ""
                  }`}
                >
                  <td>{a.applicationNumber}</td>
                  <td>{a.formNumber}</td>
                  <td>{a.applicantName}</td>
                  <td>$ {a.initialShipmentTotalDollarFoB}</td>
                  <td>N {a.initialShipmentNessLevyPayable}</td>
                  <td>{a.updatedAt}</td>
                  <td className="text-yellow-600">{a.statusCode}</td>
                  <td>{a.createdAt}</td>
                  <td className="flex items-center p-4">
                    <div className="group relative">
                      <span className=" hover:text-black cursor-pointer">
                        <FaEye
                          onClick={() => {
                            setSelectedRowData(a.id);
                            navigate(`/Daemon-formADetails/${a.id}`);
                          }}
                        />
                      </span>
                      <small className="hidden group-hover:block absolute -top-4 -left-1">
                        View
                      </small>
                    </div>
                    {/* <div className="group relative">
                      <span className=" hover:text-black cursor-pointer">
                        <FaDownload />
                      </span>
                      <small className="hidden group-hover:block absolute -top-4 -left-1">
                        Download
                      </small>
                    </div> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {[...Array(Math.ceil(pendingFormA.length / itemsPerPage)).keys()].map(
          (number) => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className="px-3 py-1 bg-gray-200 mx-1 rounded"
            >
              {number + 1}
            </button>
          )
        )}
      </div>
      <div className="shadow py-2 px-2 font-semibold font-mono">
        <h4 className="text-sm mb-5 text-green-500">Processed Applications</h4>
        <table className="w-full text-sm border-collapse border-t-[1px] rounded-sm text-gray-700">
          <thead className="h-10 border-b">
            <tr className="text-center">
              <td>Application No.</td>
              <td>Form Number</td>
              <td>Applicant Name</td>
              <td>FoB Value($)</td>
              <td>NESS Levy(N)</td>
              <td>Last Modified</td>
              <td className="text-yellow-600">Stage</td>
              <td>Date Created</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {processedFormA.map((nxp, index) => (
              <tr
                key={index}
                className={`h-10 text-center ${
                  parseInt(nxp.applicationNumber) % 2 === 1 ? "bg-gray-200" : ""
                }`}
              >
                <td>{nxp.applicationNumber}</td>
                <td>{nxp.formNumber}</td>
                <td>{nxp.applicantName}</td>
                <td>$ {nxp.initialShipmentTotalDollarFoB}</td>
                <td>N {nxp.initialShipmentNessLevyPayable}</td>
                <td>{nxp.updatedAt}</td>
                <td className="text-yellow-600">{nxp.statusCode}</td>
                <td>{nxp.createdAt}</td>
                <td className="flex items-center p-4">
                  <div className="group relative">
                    <span className=" hover:text-black cursor-pointer">
                      <FaEye />
                    </span>
                    <small className="hidden group-hover:block absolute -top-4 -left-1">
                      View
                    </small>
                  </div>
                  {/* <div className="group relative">
                    <span className=" hover:text-black cursor-pointer">
                      <FaDownload />
                    </span>
                    <small className="hidden group-hover:block absolute -top-4 -left-1">
                      Download
                    </small>
                  </div> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
    </Layout>
  );
};

export default DaemonFormA;
