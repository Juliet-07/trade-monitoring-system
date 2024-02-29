import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { FaEye } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";

const DaemonFormNCX = () => {
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_REACT_APP_BASEURL;
  const userInfo = JSON.parse(localStorage.getItem("trmsUser"));
  const token = userInfo.token;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Set the number of items per page
  const [pendingNCX, setPendingNCX] = useState([]);
  const [processedncx, setProcessedncx] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState({});

  // Logic to paginate the data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pendingNCX.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const GetPendingFormNCX = () => {
    const url = `${baseURL}/NCX/GetPendingFormNCX`;
    let data;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data, "Pending NCX");
        data = response.data.responseResult.content;
        setPendingNCX(data);
      })
      .catch((err) => console.log(err));
  };

  const GetProcessedNCX = () => {
    const url = `${baseURL}/NCX/FormNCXLists`;
    let data;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data, "Processed NCX");
        data = response.data.responseResult.content;
        setProcessedncx(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    GetPendingFormNCX();
    GetProcessedNCX();
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
                <td>Branch</td>
                <td>Last Modified</td>
                <td className="text-yellow-600">Stage</td>
                <td>Date Created</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {pendingNCX.map((ncx, index) => (
                <tr
                  key={index}
                  className={`h-10 text-center ${
                    parseInt(ncx.applicationNumber) % 2 === 1
                      ? "bg-gray-200"
                      : ""
                  }`}
                >
                  <td>{ncx.applicationNumber}</td>
                  <td>{ncx.formNumber}</td>
                  <td>{ncx.applicantName}</td>
                  <td>{ncx.processingBankBranchName}</td>
                  <td>{ncx.updatedAt}</td>
                  <td className="text-yellow-600">{ncx.statusCode}</td>
                  <td>{ncx.createdAt}</td>
                  <td className="flex items-center p-4">
                    <div className="group relative">
                      <span className=" hover:text-black cursor-pointer">
                        <FaEye
                          onClick={() => {
                            setSelectedRowData(ncx.id);
                            navigate(`/Daemon-formNcxDetails/${ncx.id}`);
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
        {[...Array(Math.ceil(pendingNCX.length / itemsPerPage)).keys()].map(
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
        <h4 className="text-sm mb-5 text-green-500"> Applications</h4>
        <table className="w-full text-sm border-collapse border-t-[1px] rounded-sm text-gray-700">
          <thead className="h-10 border-b">
            <tr className="text-center">
              <td>Application No.</td>
              <td>Form Number</td>
              <td>Applicant Name</td>
              <td>Branch</td>
              <td>Last Modified</td>
              <td className="text-yellow-600">Stage</td>
              <td>Date Created</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {processedncx.map((ncx, index) => (
              <tr
                key={index}
                className={`h-10 text-center ${
                  parseInt(ncx.applicationNumber) % 2 === 1 ? "bg-gray-200" : ""
                }`}
              >
                <td>{ncx.applicationNumber}</td>
                <td>{ncx.formNumber}</td>
                <td>{ncx.applicantName}</td>
                <td>{ncx.processingBankBranchName}</td>
                <td>{ncx.updatedAt}</td>
                <td className="text-yellow-600">{ncx.statusCode}</td>
                <td>{ncx.createdAt}</td>
                <td className="flex items-center p-4">
                  <div className="group relative">
                    <span className=" hover:text-black cursor-pointer">
                      <FaEye
                        onClick={() => {
                          setSelectedRowData(ncx.id);
                          navigate(`/Daemon-formNcxDetails/${ncx.id}`);
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
      {/* Pagination */}
    </Layout>
  );
};

export default DaemonFormNCX;
