import React, { useState } from "react";
import Navbar from "./navbar";

const FormNXP = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  let viewToRender;
  viewToRender = (
    <div className="w-full flex flex-col items-center border-0">
      <div className="flex space-x-4 bg-gradient-to-b from-gray-400 to-gray-300 border  p-2 py-1  md:p-2 mx-2 rounded-2xl  md:w-2/4 lg:w-2/4 xl:w-2/6 text-sm">
        <button
          onClick={() => handleTabClick(1)}
          className={`${
            activeTab === 1 ? "bg-white " : "bg-transparent text-gray-700"
          } p-2 py-2 rounded-t-lg flex-1 text-center hover:bg-white transition-colors outline-none border-0 focus:outline-none whitespace-nowrap font-mono font-semibold`}
        >
          Pending Applications
        </button>
        <button
          onClick={() => handleTabClick(2)}
          className={`${
            activeTab === 2 ? "bg-white " : "bg-transparent text-gray-700"
          } p-2 py-2 flex-1 text-center hover:bg-white transition-colors outline-none border-0 focus:outline-none whitespace-nowrap font-mono font-semibold`}
        >
          All Applications
        </button>
      </div>
      <div className="p-2 md:p-4 rounded-b-lg w-full    ">
        {activeTab === 1 && <PendingFormNXP />}
        {activeTab === 2 && <AllFormNXP />}
        {/* {activeTab === 3 && <ClosedPage />} */}
      </div>
    </div>
  );
  return (
    <>
      <Navbar />
      <div className="p-10">
        <div className="w-full rounded-xl border shadow-lg bg-white p-4">
          {viewToRender}
        </div>
      </div>
    </>
  );
};

export default FormNXP;

export const PendingFormNXP = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-6">
        <div className="w-full rounded-lg bg-white p-4 max-w-full overflow-x-auto">
          <div className="flex flex-col items-center justify-center">
            <table
              // ref={tableRef}
              className="table bg-white text-sm text-left text-black px-4 w-full font-mono "
            >
              <thead className="bg-[#2B2E35] text-sm text-white font-semibold rounded-lg">
                <th className="p-4">Application Number</th>
                <th className="p-4">Form Number</th>
                <th className="p-4">Applicant Name</th>
                <th className="p-4">FOB Value($)</th>
                <th className="p-4">NESS Levy (N)</th>
                <th className="p-4">Last Modified</th>
                <th className="p-4">Stage</th>
                <th className="p-4">Date Created</th>
              </thead>
              {/* <tbody>
                {records.length > 0 ? (
                  records.map((idea, index) => {
                    return (
                      <tr>
                        <td className="p-4">{idea.campaignCategory}</td>
                        <td className="p-4">{idea.campaignName}</td>
                        <td className="p-4">{idea.createdBy}</td>
                        <td className="p-4">{idea.initiatorBranch}</td>
                        <td className="p-4">{idea.createdDate}</td>
                        <button
                          onClick={() => ViewCampaignDetails(idea)}
                          className="w-full h-10 bg-red-600 rounded-lg text-white font-semibold my-2"
                        >
                          View details
                        </button>
                      </tr>
                    );
                  })
                ) : (
                  <div className="flex items-center justify-center text-xl font-semibold">
                    No Pending Campaign!
                  </div>
                )}
              </tbody> */}
            </table>
            {/* <nav>
              <ul className="flex flex-row items-center">
                <li>
                  <MdSkipPrevious
                    size={20}
                    onClick={prevPage}
                    className="cursor-pointer"
                  />
                </li>
                {numbers.map((n, i) => (
                  <li key={i} className="p-2">
                    <a href="#" onClick={() => changeCurrentPage(n)}>
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
            </nav> */}
          </div>
        </div>
      </div>
    </>
  );
};

export const AllFormNXP = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-6">
        <div className="font-bold text-2xl uppercase mb-2">
          idea campaign for approval
        </div>
        <div className="w-full rounded-lg bg-white p-4 max-w-full overflow-x-auto">
          <div className="flex flex-col items-center justify-center">
            <table
              // ref={tableRef}
              className="table bg-white text-sm text-left text-black px-4 w-full"
            >
              <thead className="bg-[#2B2E35] text-sm text-white font-semibold rounded-lg">
                <th className="p-4">Campaign Category</th>
                <th className="p-4">Campaign Name</th>
                <th className="p-4">Initiated By</th>
                <th className="p-4">Initiator Branch</th>
                <th className="p-4">Date Initiated</th>
                <th className="p-4"></th>
                <th className="p-4"></th>
              </thead>
              {/* <tbody>
                {records.length > 0 ? (
                  records.map((idea, index) => {
                    return (
                      <tr>
                        <td className="p-4">{idea.campaignCategory}</td>
                        <td className="p-4">{idea.campaignName}</td>
                        <td className="p-4">{idea.createdBy}</td>
                        <td className="p-4">{idea.initiatorBranch}</td>
                        <td className="p-4">{idea.createdDate}</td>
                        <button
                          onClick={() => ViewCampaignDetails(idea)}
                          className="w-full h-10 bg-red-600 rounded-lg text-white font-semibold my-2"
                        >
                          View details
                        </button>
                      </tr>
                    );
                  })
                ) : (
                  <div className="flex items-center justify-center text-xl font-semibold">
                    No Pending Campaign!
                  </div>
                )}
              </tbody> */}
            </table>
            {/* <nav>
              <ul className="flex flex-row items-center">
                <li>
                  <MdSkipPrevious
                    size={20}
                    onClick={prevPage}
                    className="cursor-pointer"
                  />
                </li>
                {numbers.map((n, i) => (
                  <li key={i} className="p-2">
                    <a href="#" onClick={() => changeCurrentPage(n)}>
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
            </nav> */}
          </div>
        </div>
      </div>
    </>
  );
};
