import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import { FaEye } from "react-icons/fa";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";

const SupervisorFormNXP = () => {
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_REACT_APP_BASEURL;
  const userInfo = JSON.parse(localStorage.getItem("trmsUser"));
  const token = userInfo.token;
  const [currentPage, setCurrentPage] = useState(1);
  const [pendingNXP, setPendingNXP] = useState([]);
  const [processedNXP, setProcessedNXP] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState({});

  // Logic to paginate the data
  const recordsPerPage = 10; // Set the number of items per page
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = pendingNXP.slice(firstIndex, lastIndex);
  const npages = Math.ceil(pendingNXP.length / recordsPerPage);
  const numbers = [...Array(npages + 1).keys()].slice(1);

  // for logic to paginate processed table
  const recordsPerProcessedPage = 10; // Set the number of items per page
  const lastProcessedIndex = currentPage * recordsPerPage;
  const firstProcessedIndex = lastIndex - recordsPerPage;
  const processedRecords = processedNXP.slice(
    firstProcessedIndex,
    lastProcessedIndex
  );
  const nPages = Math.ceil(processedNXP.length / recordsPerProcessedPage);
  const numbersForProcessed = [...Array(npages + 1).keys()].slice(1);

  
  const GetPendingNXP = () => {
    const url = `${baseURL}/Supervisor/ADBSupervisorPendingFormNXP`;
    let data;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data, "Pending NXP");
        setPendingNXP(response.data);
      })
      .catch((err) => console.log(err));
  };

  const GetProcessedNXP = () => {
    const url = `${baseURL}/NXP/Processednxps`;
    let data;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data, "Processed NXP");
        data = response.data.responseResult.content;
        setProcessedNXP(data);
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
    GetPendingNXP();
    GetProcessedNXP();
  }, []);
  return (
    <Layout>
      <div className="text-3xl font-semibold text-red-800 font-mono">
        {/* <h3 className="mb-5 text-md">Form NXP</h3> */}
        <div className="shadow py-2 px-2">
          <h4 className="text-sm mb-5">Pending Applications</h4>
          <table className="w-full text-sm border-collapse border-t-[1px] rounded-sm text-gray-700">
            <thead className="border-b">
              <tr className="text-center">
                <td className="py-3">S/N</td>
                <td className="py-3">Application No.</td>
                <td className="py-3">Form Number</td>
                <td className="py-3">Applicant Name</td>
                {/* <td className="py-3">FoB Value($)</td> */}
                {/* <td className="py-3">NESS Levy (N)</td> */}
                {/* <td className="py-3">Last Modified</td> */}
                {/* <td className="py-3 text-yellow-600">Stage</td> */}
                <td className="py-3">Date Created</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {records.map((nxp, index) => (
                <tr
                  key={index}
                  className={`text-center ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200`}
                >
                  <td className="py-2">{index + 1}</td>
                  <td className="py-2">{nxp.applicationNumber}</td>
                  <td className="py-2">{nxp.formNumber}</td>
                  <td className="py-2">{nxp.applicantName}</td>
                  {/* <td className="py-2">
                    $ {nxp.initialShipmentTotalDollarFoB}
                  </td> */}
                  {/* <td className="py-2">
                    N {nxp.initialShipmentNessLevyPayable}
                  </td> */}
                  {/* <td className="py-2">{nxp.updatedAt}</td> */}
                  {/* <td className="py-2 text-yellow-600">{nxp.statusCode}</td> */}
                  <td className="py-2">{nxp.createdAt}</td>
                  <td className="flex items-center p-4">
                    <div className="group relative">
                      <span className=" hover:text-black cursor-pointer">
                        <FaEye
                          onClick={() => {
                            setSelectedRowData(nxp.id);
                            navigate(`/supervisor/formNxpDetails/${nxp.formId}`);
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
      <div className="shadow py-2 px-2 font-semibold font-mono">
        <h4 className="text-sm mb-5 text-green-500">Processed Applications</h4>
        <table className="w-full text-sm border-collapse border-t-[1px] rounded-sm text-gray-700">
          <thead className="border-b">
            <tr className="text-center">
              <td className="py-3">S/N</td>
              <td className="py-3">Application No.</td>
              <td className="py-3">Form Number</td>
              <td className="py-3">Applicant Name</td>
              <td className="py-3">FoB Value($)</td>
              <td className="py-3">NESS Levy(N)</td>
              <td className="py-3">Last Modified</td>
              <td className="py-3 text-yellow-600">Stage</td>
              <td className="py-3">Date Created</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {processedRecords.map((nxp, index) => (
              <tr
                key={index}
                className={`text-center ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-green-100"
                } hover:bg-green-200`}
              >
                <td className="py-2">{index + 1}</td>
                <td className="py-2">{nxp.applicationNumber}</td>
                <td className="py-2">{nxp.formNumber}</td>
                <td className="py-2">{nxp.applicantName}</td>
                <td className="py-2">$ {nxp.initialShipmentTotalDollarFoB}</td>
                <td className="py-2">N {nxp.initialShipmentNessLevyPayable}</td>
                <td className="py-2">{nxp.updatedAt}</td>
                <td className="py-2 text-yellow-600">{nxp.statusCode}</td>
                <td className="py-2">{nxp.createdAt}</td>
                <td className="flex items-center p-4">
                  <div className="group relative">
                    <span className=" hover:text-black cursor-pointer">
                      <FaEye
                        onClick={() => {
                          setSelectedRowData(nxp.id);
                          navigate(`/supervisor/formNxpDetails/${nxp.id}`);
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

export default SupervisorFormNXP;
