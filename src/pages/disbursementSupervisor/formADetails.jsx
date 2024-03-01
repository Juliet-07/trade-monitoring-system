import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Header from "../../components/Header";
import { TbArrowBackUp } from "react-icons/tb";
import { FaFileCode, FaDownload } from "react-icons/fa6";
import Modal from "../../components/Modal";

const DBS_SupervisorFormADetails = () => {
  const { id: ID } = useParams();
  //   console.log(userID, "id");
  const baseURL = import.meta.env.VITE_REACT_APP_BASEURL;
  const userInfo = JSON.parse(localStorage.getItem("trmsUser"));
  const token = userInfo.token;
  const [formDetails, setFormDetails] = useState({});
  const [modal, setModal] = useState(false);
  const [approval, setApproval] = useState(false);
  const [rejection, setRejection] = useState(false);
  const [note, setNote] = useState("");
  const [reasons, setReasons] = useState([]);
  const [rejectionReason, setRejectionReason] = useState("");
  const [inputValue, setValue] = useState("");

  const GetFormDetailsById = () => {
    const url = `${baseURL}/v1/FormA/FormAPendingDetails?formID=${ID}`;
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

  const handleReasonsInputChange = (value) => {
    setValue(value);
  };
  const handleSelectReasonsChange = (value) => {
    setRejectionReason(value);
    console.log(value, "selected reason");
  };

  const sendApproval = () => {
    const url = `${baseURL}/v1/FormA/FormAADBReviewer?applicationNumber=${formDetails?.applicationNumber}`;
    const payload = {
      approved: approval,
      note: note,
      daemonReviewerName: "string",
      daemonSupervisorName: "string",
      rejectionReasonCode: rejection ? rejectionReason.label : "string",
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
        console.log(response, "response from approval");
        alert(response.data.responseMessage);
        if (response.status === 200) {
          // Close the modal upon successful registration
          setModal(false);
        }
      });
  };
  useEffect(() => {
    GetFormDetailsById();
  }, []);

  return (
    <>
      <Header />
      <div className="p-10">
        <Link
          to="/dbs_supervisor/formA"
          className="flex items-center p-2 w-[85px] h-10 border border-gray-100 rounded-lg"
        >
          <TbArrowBackUp color="#475467" />
          <span className="text-gray-600 mx-2">Back</span>
        </Link>
        <div className="my-6 font-mono">
          <div className="w-full flex items-center justify-between h-10 py-10">
            <p className="font-semibold">
              Application:
              <span className="text-gray-600">
                {formDetails?.applicationNumber}
              </span>
            </p>
            <div
              className="w-[150px] h-10 flex items-center justify-center rounded text-white bg-[#DB1600] cursor-pointer my-4"
              onClick={() => setModal(true)}
            >
              Action
            </div>
          </div>
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
                  <span className="text-gray-600">Date Created:</span>{" "}
                  {formDetails.createdAt}
                </p>
              </div>
            </div>
            {/* 2 */}
            <div className="w-[405px] h-[281px] rounded-lg bg-white border border-[#D1FADF] shadow-lg">
              <div className="w-full h-[52px] bg-[#039855] text-white rounded-t-lg p-4 font-semibold">
                Applicant Information
              </div>
              <div className="px-4 py-2 grid gap-4 text-sm">
                <p>
                  <span className="text-gray-600">Name:</span>{" "}
                  {formDetails?.applicantName}
                </p>
                <p>
                  <span className="text-gray-600">Email:</span>{" "}
                  {formDetails?.contact?.emailAddress}
                </p>
                <p>
                  <span className="text-gray-600">BVN:</span>{" "}
                  {formDetails?.applicantTINBVN}
                </p>
                <p>
                  <span className="text-gray-600">Phone Number:</span>{" "}
                  {formDetails?.contact?.phone}
                </p>
                <p>
                  <span className="text-gray-600">Address:</span>{" "}
                  {formDetails?.contact?.address}
                </p>
              </div>
            </div>
            {/* 3 */}
            {/* <div className="w-[405px] h-[281px] rounded-lg bg-white border border-[#D1FADF] shadow-lg">
              <div className="w-full h-[52px] bg-[#039855] text-white rounded-t-lg p-4 font-semibold">
                Documents
              </div>
              <div className="px-4 py-2 grid gap-4 text-sm">
                {formDetails?.attachments?.map((file) => (
                  <>
                    <div className="flex items-center">
                      <FaFileCode />
                      <p className="mx-2 text-red-600">
                        {file?.file?.fileName}
                      </p>
                      <FaDownload color="red" />
                    </div>
                    <p className="text-xs">
                      <span>Lable:</span>
                      {file?.file?.label}
                    </p>
                    <p className="text-xs">
                      <span>Date Created:</span>
                      {file?.file?.createdAt}
                    </p>
                  </>
                ))}
              </div>
            </div> */}
            {/* 4 */}
            <div className="w-[405px] h-[281px] rounded-lg bg-white border border-[#D1FADF] shadow-lg">
              <div className="w-full h-[52px] bg-[#039855] text-white rounded-t-lg p-4 font-semibold">
                Bank Details
              </div>
              <div className="px-4 py-2 grid gap-4 text-sm">
                <p>
                  <span className="text-gray-600 text-xs">
                    Processing Bank:
                  </span>{" "}
                  {formDetails?.processingBank?.name}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">
                    Processing Bank Branch:
                  </span>{" "}
                  {formDetails?.processingBankBranch?.name}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">
                    Naira Account Number:
                  </span>{" "}
                  {formDetails?.accountNumber}
                </p>
              </div>
            </div>
            {/* 5 */}
            <div className="w-[405px] h-[281px] rounded-lg bg-white border border-[#D1FADF] shadow-lg">
              <div className="w-full h-[52px] bg-[#039855] text-white rounded-t-lg p-4 font-semibold">
                Trade Services
              </div>
              <div className="px-4 py-2 grid gap-4 text-sm">
                <p>
                  <span className="text-gray-600 text-xs">
                    Is Valid For FOREX:
                  </span>{" "}
                  {formDetails?.validForForex}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">Trade Category:</span>{" "}
                  {formDetails?.transactionPurpose?.tradeCategory?.name}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">
                    Transaction Purpose:
                  </span>{" "}
                  {formDetails?.transactionPurpose?.name}
                </p>
              </div>
            </div>
            {/* 6 */}
            <div className="w-[405px] h-[320px] rounded-lg bg-white border border-[#D1FADF] shadow-lg">
              <div className="w-full h-[52px] bg-[#039855] text-white rounded-t-lg p-4 font-semibold">
                Beneficiary Information
              </div>
              <div className="px-4 py-2 grid gap-4 text-sm">
                {formDetails?.beneficiaries?.map((user) => (
                  <>
                    <p>
                      <span className="text-gray-600 text-xs">Name:</span>{" "}
                      {user?.name}
                    </p>
                    <p>
                      <span className="text-gray-600 text-xs">Email:</span>{" "}
                      {user?.email}
                    </p>
                    <p>
                      <span className="text-gray-600 text-xs">
                        Passport Number:
                      </span>{" "}
                      {user?.passportNumber}
                    </p>
                    <p>
                      <span className="text-gray-600 text-xs">
                        Phone Number:
                      </span>{" "}
                      {user?.phone}
                    </p>
                    <p>
                      <span className="text-gray-600 text-xs">
                        Address Line 1:
                      </span>{" "}
                      {user?.addressLine1}
                    </p>
                    <p>
                      <span className="text-gray-600 text-xs">City:</span>{" "}
                      {user?.city}
                    </p>
                    <p>
                      <span className="text-gray-600 text-xs">State:</span>{" "}
                      {user?.state}
                    </p>
                  </>
                ))}
              </div>
            </div>
            {/* 7 */}
            <div className="w-[405px] h-[281px] rounded-lg bg-white border border-[#D1FADF] shadow-lg">
              <div className="w-full h-[52px] bg-[#039855] text-white rounded-t-lg p-4 font-semibold">
                Requested Information
              </div>
              <div className="px-4 py-2 grid gap-4 text-sm">
                {formDetails?.beneficiaries?.map((user) => (
                  <p>
                    <span className="text-gray-600 text-xs">
                      Amount Requested:
                    </span>{" "}
                    {user?.amountRequested}
                  </p>
                ))}
              </div>
            </div>
            {/* 8 */}
            <div className="w-[405px] h-[281px] rounded-lg bg-white border border-[#D1FADF] shadow-lg">
              <div className="w-full h-[52px] bg-[#039855] text-white rounded-t-lg p-4 font-semibold">
                Travel Information
              </div>
              <div className="px-4 py-2 grid gap-4 text-sm">
                {formDetails?.beneficiaries?.map((user) => (
                  <>
                    <p>
                      <span className="text-gray-600 text-xs">
                        Destination Country:
                      </span>{" "}
                      {user?.country?.name}
                    </p>
                    <p>
                      <span className="text-gray-600 text-xs">
                        Air Ticket No.:
                      </span>{" "}
                      {user?.airTicketNumber}
                    </p>
                    <p>
                      <span className="text-gray-600 text-xs">
                        Airline Route:
                      </span>{" "}
                      {user?.route}
                    </p>
                  </>
                ))}
              </div>
            </div>
          </div>
          <div className="py-3 font-semibold">Workflow Notes</div>
          <div className="w-full grid grid-cols-3">
            {formDetails?.workflowNotes?.map((note) => (
              <div className="w-[405px] bg-white rounded-lg border shadow-lg p-4 grid gap-4">
                <p>
                  <span className="text-gray-600 text-xs">Actor:</span>{" "}
                  {note?.applicationStatusCode}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">Action:</span>{" "}
                  {note?.name}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">Note:</span>{" "}
                  {note?.noteDescription}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">Date Created:</span>{" "}
                  {note?.createdAt}
                </p>
              </div>
            ))}
          </div>
        </div>
        <Modal isVisible={modal} onClose={() => setModal(false)}>
          <div className="font-mono w-[500px]">
            <form className="w-full flex flex-col items-center justify-center">
              <div className="w-full">
                <p className="font-semibold my-2 text-green-500">
                  Reviewer Action
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <p className="font-semibold">
                    Actor:
                    <span className="text-gray-600">
                      {formDetails?.applicationNumber}
                    </span>
                  </p>
                  <p className="font-semibold">
                    Action:
                    <span className="text-gray-600">
                      {formDetails?.applicationNumber}
                    </span>
                  </p>
                  <p className="font-semibold">
                    Note:
                    <span className="text-gray-600">
                      {formDetails?.applicationNumber}
                    </span>
                  </p>
                  <p className="font-semibold">
                    Date:
                    <span className="text-gray-600">
                      {formDetails?.applicationNumber}
                    </span>
                  </p>
                </div>
              </div>
              <div className="w-full">
                <p className="font-semibold my-2 mt-4 text-red-700"> Action</p>
                <div className="w-full flex items-center mb-4">
                  <input
                    id="approval-radio"
                    type="radio"
                    checked={approval}
                    onChange={() => {
                      setApproval(!approval);
                      if (rejection) {
                        setRejection(false);
                      }
                    }}
                    className="w-4 h-4 text-[#05A3A3] bg-gray-100 border-gray-300"
                  />
                  <label
                    htmlFor="approval-radio"
                    className="ml-2 font-medium text-gray-900 dark:text-gray-300"
                  >
                    Accept Reviewer Action
                  </label>
                </div>
                <div className="w-full flex flex-col mb-4">
                  <div className="flex items-center">
                    <input
                      id="rejection-checkbox"
                      type="radio"
                      checked={rejection}
                      onChange={() => {
                        setRejection(!rejection);
                        if (approval) {
                          setApproval(false);
                        }
                      }}
                      className="w-4 h-4 text-[#05A3A3] bg-gray-100 border-gray-300"
                    />
                    <label
                      htmlFor="rejection-checkbox"
                      className="ml-2 font-medium text-gray-900 dark:text-gray-300"
                    >
                      Request Reviewer Modification
                    </label>
                  </div>

                  {rejection && (
                    <Select
                      options={reasons}
                      defaultValue={rejectionReason}
                      onChange={handleSelectReasonsChange}
                      onInputChange={handleReasonsInputChange}
                      isSearchable
                    />
                    // <select
                    //   className="w-[350px] p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border mt-2"
                    //   value={rejectionReason}
                    //   onChange={(e) => setRejectionReason(e.target.value)}
                    // >
                    //   <option value="">Select rejection reason</option>

                    // </select>
                  )}
                </div>
                <div className="w-full">
                  <textarea
                    id="message"
                    rows="4"
                    className=" p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border"
                    placeholder="Write notes for approval or rejection"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div
                className="bg-yellow-600 w-[170px] h-[48px] rounded text-white flex items-center justify-center cursor-pointer font-semibold m-4"
                onClick={() => sendApproval()}
              >
                Submit
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default DBS_SupervisorFormADetails;
