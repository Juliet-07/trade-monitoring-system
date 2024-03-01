import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Header from "../../components/Header";
import { TbArrowBackUp } from "react-icons/tb";
import { FaFileCode, FaDownload } from "react-icons/fa6";
import Select from "react-select";
import Modal from "../../components/Modal";

const SupervisorFormNCXDetails = () => {
  const { id: ID } = useParams();
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
    const url = `${baseURL}/NCX/NCXFormDeatails?NcxForm_ID=${ID}`;
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

  const GetReasons = () => {
    let details;
    let reasons;
    const url = `${baseURL}/RejectionReasons/NXPRejectionReasonList`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        details = response.data.responseResult.content;
        reasons = details.map((reason) => {
          return {
            value: reason?.id,
            label: reason?.name,
          };
        });
        setReasons(reasons);
        // console.log(roles, "checking");
      })
      .catch((err) => console.log(err));
  };

  const sendApproval = () => {
    const url = `${baseURL}/NCX/PostNCXAdbReviewer?ncx_applicationNo=${formDetails?.applicationNumber}`;
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
    GetReasons();
  }, []);
  return (
    <>
      <Header />
      <div className="p-10">
        <Link
          to="/supervisor/formNcx"
          className="flex items-center p-2 w-[85px] h-10 border border-gray-100 rounded-lg"
        >
          <TbArrowBackUp color="#475467" />
          <span className="text-gray-600 mx-2">Back</span>
        </Link>
        <div className="my-4 font-mono">
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
                  {formDetails?.contact?.firstName}
                </p>
                <p>
                  <span className="text-gray-600">Email:</span>{" "}
                  {formDetails?.contact?.emailAddress}
                </p>
                <p>
                  <span className="text-gray-600">BVN:</span>{" "}
                  {formDetails?.contact?.bvn}
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
            <div className="w-[405px] h-[400px] rounded-lg bg-white border border-[#D1FADF] shadow-lg">
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
            </div>
            {/* 4 */}
            <div className="w-[405px] h-[290px] rounded-lg bg-white border border-[#D1FADF] shadow-lg">
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
                <p>
                  <span className="text-gray-600 text-xs">Exchange Rate:</span>{" "}
                  {formDetails?.exchangeRate}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">
                    Estimated Value of Goods (Naira):
                  </span>{" "}
                  N {formDetails?.estimatedValueOfGoodsNaira}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">
                    Estimated Value of Goods (Dollars):
                  </span>{" "}
                  $ {formDetails?.estimatedValueOfGoodsDollar}
                </p>
              </div>
            </div>
            {/* 5 */}
            <div className="w-[405px] h-[420px] rounded-lg bg-white border border-[#D1FADF] shadow-lg">
              <div className="w-full h-[52px] bg-[#039855] text-white rounded-t-lg p-4 font-semibold">
                Shipment Details
              </div>
              <div className="px-4 py-2 grid gap-4 text-sm">
                <p>
                  <span className="text-gray-600 text-xs">
                    Purpose of Shipment:
                  </span>{" "}
                  {formDetails?.shipmentPurpose?.name}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">
                    Port of Shipment:
                  </span>{" "}
                  {formDetails?.portShipment?.name}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">
                    Destination Country:
                  </span>{" "}
                  {formDetails?.portDischarge?.country?.name}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">
                    Port of Discharge:
                  </span>{" "}
                  {formDetails?.portDischarge?.name}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">
                    Expected Shipment Date:
                  </span>{" "}
                  {formDetails?.expectedShipmentDate}
                </p>

                <p>
                  <span className="text-gray-600 text-xs">By Order Of:</span>{" "}
                  {formDetails?.byOrderOf}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">Shipper Name:</span>{" "}
                  {formDetails?.shipperName}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">Shipper Phone:</span>{" "}
                  {formDetails?.shipperPhone}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">
                    Shipper Address:
                  </span>{" "}
                  {formDetails?.shipperAddress}
                </p>
              </div>
            </div>
            {/* 6 */}
            <div className="w-[405px] h-[400px] rounded-lg bg-white border border-[#D1FADF] shadow-lg">
              <div className="w-full h-[52px] bg-[#039855] text-white rounded-t-lg p-4 font-semibold">
                Consignee Information
              </div>
              <div className="px-4 py-2 grid gap-4 text-sm">
                <p>
                  <span className="text-gray-600 text-xs">Name:</span>{" "}
                  {formDetails?.consigneeName}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">Email:</span>{" "}
                  {formDetails?.consigneeEmail}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">Phone Number:</span>{" "}
                  {formDetails?.consigneePhone}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">Address Line 1:</span>{" "}
                  {formDetails?.consigneeAddressLine1}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">Address Line 2:</span>{" "}
                  {formDetails?.consigneeAddressLine1}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">City:</span>{" "}
                  {formDetails?.consigneeAddressCity}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">State:</span>{" "}
                  {formDetails?.consigneeAddressState}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">Country:</span>{" "}
                  {formDetails?.consigneeCountry?.name}
                </p>
              </div>
            </div>
            {/* 7 */}
            <div className="w-[405px] h-[281px] rounded-lg bg-white border border-[#D1FADF] shadow-lg">
              <div className="w-full h-[52px] bg-[#039855] text-white rounded-t-lg p-4 font-semibold">
                Shipping/Bill of Lading
              </div>
              <div className="px-4 py-2 grid gap-4 text-sm">
                <p>
                  <span className="text-gray-600 text-xs">Shipping Line:</span>{" "}
                  {formDetails?.shippingLine?.name}
                </p>
              </div>
            </div>
            {/* 8 */}
          </div>
          <div className="w-full shadow p-2 font-semibold font-mono border">
            <h4 className="text-sm mb-5 text-green-500">Items</h4>
            <table className="w-full text-sm border-collapse border-t-[1px] rounded-sm text-gray-700">
              <thead className="h-10 border-b">
                <tr>
                  <td>HS Code</td>
                  <td>Packaging Mode</td>
                  {/* <td>Applicant Name</td> */}
                  <td>Unit of Measurement</td>
                  <td>Quantity</td>
                  <td>Net Weight</td>
                  <td>Gross Weight</td>
                </tr>
              </thead>
              <tbody>
                {formDetails?.items?.map((item, index) => (
                  <tr key={index} className="h-10 bg-gray-50">
                    <td>{item?.hsCode?.name}</td>
                    <td>{item?.packagingMode?.name}</td>
                    <td>{item?.unitOfMeasurement?.name}</td>
                    <td>{item?.quantity}</td>
                    <td>{item?.netWeight}</td>
                    <td>{item?.grossWeight}</td>
                  </tr>
                ))}
                <tr className="border-t border-b">
                  <td></td>
                  <td></td>
                  <td className="p-4">Total:</td>
                  <td>{formDetails?.totalQuantity}</td>
                  <td>{formDetails?.totalNetWeight}</td>
                  <td>{formDetails?.totalGrossWeight}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="py-3 font-semibold">Workflow Notes</div>
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

export default SupervisorFormNCXDetails;
