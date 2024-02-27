import React, { useState } from "react";
import Layout from "./Layout";
import { FaEye } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";

const SupervisorFormA = () => {
  const url =
    "/v1/FormA/FormAList?orderBy=orderBy%3DupdatedAt&sort=sort%3Ddesc&size=size%3D50&page=page%3D0&gSearch=gSearch%3D&option=option%3D";
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Set the number of items per page
  const data = [
    {
      id: 1,
      applicationNumber: "001",
      formNumber: "F001",
      Applicant_Name: "Omokefe Ovie",
      fobValue: 230000,
      Nessv: 1230000,
      lastModified: "23/01/24",
      stage: "approved",
      dateCreated: "01/02/23",
    },
    {
      id: 2,
      applicationNumber: "002",
      formNumber: "F002",
      Applicant_Name: "Omokefe Ovie",
      fobValue: 230000,
      Nessv: 1230000,
      lastModified: "23/01/24",
      stage: "approved",
      dateCreated: "01/02/23",
    },
    {
      id: 3,
      applicationNumber: "003",
      formNumber: "F003",
      Applicant_Name: "Omokefe Ovie",
      fobValue: 230000,
      Nessv: 1230000,
      lastModified: "23/01/24",
      stage: "approved",
      dateCreated: "01/02/23",
    },
    {
      id: 4,
      applicationNumber: "004",
      formNumber: "F003",
      Applicant_Name: "Omokefe Ovie",
      fobValue: 230000,
      Nessv: 1230000,
      lastModified: "23/01/24",
      stage: "approved",
      dateCreated: "01/02/23",
    },
    {
      id: 5,
      applicationNumber: "005",
      formNumber: "F003",
      Applicant_Name: "Omokefe Ovie",
      fobValue: 230000,
      Nessv: 1230000,
      lastModified: "23/01/24",
      stage: "approved",
      dateCreated: "01/02/23",
    },
    {
      id: 6,
      applicationNumber: "006",
      formNumber: "F003",
      Applicant_Name: "Omokefe Ovie",
      fobValue: 230000,
      Nessv: 1230000,
      lastModified: "23/01/24",
      stage: "approved",
      dateCreated: "01/02/23",
    },
    {
      id: 7,
      applicationNumber: "007",
      formNumber: "F003",
      Applicant_Name: "Omokefe Ovie",
      fobValue: 230000,
      Nessv: 1230000,
      lastModified: "23/01/24",
      stage: "approved",
      dateCreated: "01/02/23",
    },
    {
      id: 8,
      applicationNumber: "008",
      formNumber: "F003",
      Applicant_Name: "Omokefe Ovie",
      fobValue: 230000,
      Nessv: 1230000,
      lastModified: "23/01/24",
      stage: "approved",
      dateCreated: "01/02/23",
    },
    {
      id: 9,
      applicationNumber: "009",
      formNumber: "F003",
      Applicant_Name: "Omokefe Ovie",
      fobValue: 230000,
      Nessv: 1230000,
      lastModified: "23/01/24",
      stage: "approved",
      dateCreated: "01/02/23",
    },
    {
      id: 10,
      applicationNumber: "010",
      formNumber: "F003",
      Applicant_Name: "Omokefe Ovie",
      fobValue: 230000,
      Nessv: 1230000,
      lastModified: "23/01/24",
      stage: "approved",
      dateCreated: "01/02/23",
    },
    {
      id: 11,
      applicationNumber: "011",
      formNumber: "F003",
      Applicant_Name: "Omokefe Ovie",
      fobValue: 230000,
      Nessv: 1230000,
      lastModified: "23/01/24",
      stage: "approved",
      dateCreated: "01/02/23",
    },
    {
      id: 12,
      applicationNumber: "012",
      formNumber: "F003",
      Applicant_Name: "Omokefe Ovie",
      fobValue: 230000,
      Nessv: 1230000,
      lastModified: "23/01/24",
      stage: "approved",
      dateCreated: "01/02/23",
    },
    {
      id: 13,
      applicationNumber: "003",
      formNumber: "F003",
      Applicant_Name: "Omokefe Ovie",
      fobValue: 230000,
      Nessv: 1230000,
      lastModified: "23/01/24",
      stage: "approved",
      dateCreated: "01/02/23",
    },
    // Add more data items as needed
  ];

  // Logic to paginate the data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <div className="text-3xl font-semibold text-red-800">
        <h3 className="mb-5 text-md">Form A</h3>
        <div className="shadow py-2 px-2">
          <h4 className="text-sm mb-5">Pending Applications</h4>
          <table className="w-full text-sm border-collapse border-t-[1px] rounded-sm text-gray-700">
            <thead className="h-10 border-b">
              <tr className="text-center">
                <td>Application No</td>
                <td>Form Number</td>
                <td>Applicant Name</td>
                <td>FoB Value ($)</td>
                <td>NESS Levy (N)</td>
                <td>Last Modified</td>
                <td className="text-yellow-600">Stage</td>
                <td>Date Created</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((n, index) => (
                <tr
                  key={index}
                  className={`h-10 text-center ${
                    parseInt(n.applicationNumber) % 2 === 1 ? "bg-gray-200" : ""
                  }`}
                >
                  <td>{n.applicationNumber}</td>
                  <td>{n.formNumber}</td>
                  <td>{n.Applicant_Name}</td>
                  <td>$ {n.fobValue}</td>
                  <td>N {n.Nessv}</td>
                  <td>{n.lastModified}</td>
                  <td className="text-yellow-600">{n.stage}</td>
                  <td>{n.dateCreated}</td>
                  <td className="flex items-center gap-3 mt-2 w-[50px]">
                    <div className="group relative">
                      <a
                        href={`/supervisor/formADetails/${n.applicationNumber}`}
                        className=" hover:text-black cursor-pointer"
                      >
                        <FaEye />
                      </a>
                      <small className="hidden group-hover:block absolute -top-4 -left-1">
                        View
                      </small>
                    </div>
                    <div className="group relative">
                      <span className=" hover:text-black cursor-pointer">
                        <FaDownload />
                      </span>
                      <small className="hidden group-hover:block absolute -top-4 -left-1">
                        Download
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
      <div className="flex justify-center mt-4">
        {[...Array(Math.ceil(data.length / itemsPerPage)).keys()].map(
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
      <div className="shadow py-2 px-2">
        <h4 className="text-sm mb-5">Processed Applications</h4>
        <table className="w-full text-sm border-collapse border-t-[1px] rounded-sm text-gray-700">
          <thead className="h-10 border-b">
            <tr className="text-center">
              <td>Application No</td>
              <td>Form Number</td>
              <td>Applicant Name</td>
              <td>FoB Value ($)</td>
              <td>NESS Levy (N)</td>
              <td>Last Modified</td>
              <td className="text-yellow-600">Stage</td>
              <td>Date Created</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((n, index) => (
              <tr
                key={index}
                className={`h-10 text-center ${
                  parseInt(n.applicationNumber) % 2 === 1 ? "bg-gray-200" : ""
                }`}
              >
                <td>{n.applicationNumber}</td>
                <td>{n.formNumber}</td>
                <td>{n.Applicant_Name}</td>
                <td>$ {n.fobValue}</td>
                <td>N {n.Nessv}</td>
                <td>{n.lastModified}</td>
                <td className="text-yellow-600">{n.stage}</td>
                <td>{n.dateCreated}</td>
                <td className="flex items-center gap-3 mt-2 w-[50px]">
                  <div className="group relative">
                    <a
                      href={`formA/${n.applicationNumber}`}
                      className=" hover:text-black cursor-pointer"
                    >
                      <FaEye />
                    </a>
                    <small className="hidden group-hover:block absolute -top-4 -left-1">
                      View
                    </small>
                  </div>
                  <div className="group relative">
                    <span className=" hover:text-black cursor-pointer">
                      <FaDownload />
                    </span>
                    <small className="hidden group-hover:block absolute -top-4 -left-1">
                      Download
                    </small>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {[...Array(Math.ceil(data.length / itemsPerPage)).keys()].map(
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
    </Layout>
  );
};

export default SupervisorFormA;
