import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { FaEye } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";

const ReviewerFormA = () => {
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_REACT_APP_BASEURL;
  const tableRef = useRef(null);
  const userInfo = JSON.parse(localStorage.getItem("trmsUser"));
  const token = userInfo.token;
  const [currentPage, setCurrentPage] = useState(1);
  const [pendingFormA, setPendingFormA] = useState([]);
  const [dbs_pendingFormA, setDBS_PendingFormA] = useState([]);
  const [processedFormA, setProcessedFormA] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState({});

  let recordsPerPage = 10; // Set the number of items per page
  let lastIndex = currentPage * recordsPerPage;
  let firstIndex = lastIndex - recordsPerPage;

  // for logic to paginate pending table
  const records = pendingFormA.slice(firstIndex, lastIndex);
  const npages = Math.ceil(pendingFormA.length / recordsPerPage);
  const numbers = [...Array(npages + 1).keys()].slice(1);

  // for logic to paginate DBS pending table
  const dbs_records = dbs_pendingFormA.slice(firstIndex, lastIndex);
  const dbs_npages = Math.ceil(dbs_pendingFormA.length / recordsPerPage);
  const dbs_numbers = [...Array(dbs_npages + 1).keys()].slice(1);

  // for logic to paginate processed table
  const processedRecords = processedFormA.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(processedFormA.length / recordsPerPage);
  const numbersForProcessed = [...Array(nPages + 1).keys()].slice(1);

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

  const GetDBSPendingFormA = () => {
    const url = `${baseURL}/DisbursmentReviewer/ADBDisbursmentReviewPendingFormA`;
    let data;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data, "Pending Form A DBS");
        data = response.data.responseResult.content;
        setDBS_PendingFormA(data);
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
    GetPendingFormA();
    GetProcessedFormA();
    GetDBSPendingFormA();
  }, []);
  return (
    <Layout>
      <div className="text-3xl font-semibold text-red-800 font-mono">
        <div className="shadow py-2 px-2">
          <h4 className="text-sm mb-5">Pending Applications</h4>
          <table className="w-full text-sm border-collapse border-t-[1px] rounded-sm text-gray-700">
            <thead className="border-b">
              <tr className="text-center">
                <td className="py-3">S/N</td>
                <td className="py-3">Application No.</td>
                <td className="py-3">Form Number</td>
                <td className="py-3">Applicant Name</td>
                <td className="py-3">Bank Branch</td>
                <td className="py-3">Amount Requested</td>
                <td className="py-3">Last Modified</td>
                <td className="text-yellow-600">Stage</td>
                <td className="py-3">Date Created</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {records.map((a, index) => (
                <tr
                  key={index}
                  className={`text-center ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200`}
                >
                  <td className="py-2">{index + 1}</td>
                  <td className="py-2">{a.applicationNumber}</td>
                  <td className="py-2">{a.formNumber}</td>
                  <td className="py-2">{a.applicantName}</td>
                  <td className="py-2">{a.processingBankBranchName}</td>
                  <td className="py-2">
                    <span className="px-2">{a.currencyCode}</span>
                    {a.totalAmountRequested}
                  </td>
                  <td className="py-2">{a.updatedAt}</td>
                  <td className="py-2 text-yellow-600">{a.statusCode}</td>
                  <td className="py-2">{a.createdAt}</td>
                  <td className="flex items-center p-4">
                    <div className="group relative">
                      <span className=" hover:text-black cursor-pointer">
                        <FaEye
                          onClick={() => {
                            setSelectedRowData(a.id);
                            navigate(`/Reviewer-formADetails/${a.id}`);
                          }}
                        />
                      </span>
                      <small className="hidden group-hover:block absolute -top-4 -left-1">
                        View
                      </small>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

      <div className="text-3xl font-semibold text-red-800 font-mono">
        <div className="shadow py-2 px-2">
          <h4 className="text-sm mb-5">
            Pending Applications For Disbursement
          </h4>
          <table className="w-full text-sm border-collapse border-t-[1px] rounded-sm text-gray-700">
            <thead className="border-b">
              <tr className="text-center">
                <td className="py-3">S/N</td>
                <td className="py-3">Application No.</td>
                <td className="py-3">Form Number</td>
                <td className="py-3">Applicant Name</td>
                <td className="py-3">Bank Branch</td>
                <td className="py-3">Amount Requested</td>
                <td className="py-3">Last Modified</td>
                <td className="text-yellow-600">Stage</td>
                <td className="py-3">Date Created</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {dbs_records.map((a, index) => (
                <tr
                  key={index}
                  className={`text-center ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200`}
                >
                  <td className="py-2">{index + 1}</td>
                  <td className="py-2">{a.applicationNumber}</td>
                  <td className="py-2">{a.formNumber}</td>
                  <td className="py-2">{a.applicantName}</td>
                  <td className="py-2">{a.processingBankBranchName}</td>
                  <td className="py-2">
                    <span className="px-2">{a.currencyCode}</span>
                    {a.totalAmountRequested}
                  </td>
                  <td className="py-2">{a.updatedAt}</td>
                  <td className="py-2 text-yellow-600">{a.statusCode}</td>
                  <td className="py-2">{a.createdAt}</td>
                  <td className="flex items-center p-4">
                    <div className="group relative">
                      <span className=" hover:text-black cursor-pointer">
                        <FaEye
                          onClick={() => {
                            setSelectedRowData(a.id);
                            navigate(`/Reviewer-formADetails/${a.id}`);
                          }}
                        />
                      </span>
                      <small className="hidden group-hover:block absolute -top-4 -left-1">
                        View
                      </small>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
              <a href="#" onClick={() => changeCurrentPage(dbs_npages)}>
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
      <div className="shadow py-2 px-2 font-semibold font-mono">
        <h4 className="text-sm mb-5 text-green-500">Processed Applications</h4>
        <table className="w-full text-sm border-collapse border-t-[1px] rounded-sm text-gray-700">
          <thead className="border-b">
            <tr className="text-center">
              <td className="py-3">S/N</td>
              <td className="py-3">Application No.</td>
              <td className="py-3">Form Number</td>
              <td className="py-3">Applicant Name</td>
              <td className="py-3">Bank Branch</td>
              <td className="py-3">Amount Requested</td>
              <td className="py-3">Last Modified</td>
              <td className="text-yellow-600">Stage</td>
              <td className="py-3">Date Created</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {processedRecords.map((a, index) => (
              <tr
                key={index}
                className={`text-center ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-green-100"
                } hover:bg-green-200`}
              >
                <td className="py-2">{index + 1}</td>
                <td className="py-2">{a.applicationNumber}</td>
                <td className="py-2">{a.formNumber}</td>
                <td className="py-2">{a.applicantName}</td>
                <td className="py-2">{a.processingBankBranchName}</td>
                <td className="py-2">
                  <span className="px-2">{a.currencyCode}</span>
                  {a.totalAmountRequested}
                </td>
                <td className="py-2">{a.updatedAt}</td>
                <td className="py-2 text-yellow-600">{a.statusCode}</td>
                <td className="py-2">{a.createdAt}</td>
                <td className="flex items-center p-4">
                  <div className="group relative">
                    <span className=" hover:text-black cursor-pointer">
                      <FaEye
                        onClick={() => {
                          setSelectedRowData(a.id);
                          navigate(`/Reviewer-formADetails/${a.id}`);
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
                currentPage === n ? "bg-green-900 rounded-full text-white" : ""
              }`}
            >
              <a href="#" onClick={() => changeCurrentPage(nPages)}>
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
    </Layout>
  );
};

export default ReviewerFormA;
