import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Header from "../../components/Header";
import { TbArrowBackUp } from "react-icons/tb";
import { FaFileCode, FaDownload } from "react-icons/fa6";
import Modal from "../../components/Modal";

const SupervisorFormNxpDetails = () => {
  const { id: ID } = useParams();
  const baseURL = import.meta.env.VITE_REACT_APP_BASEURL;
  const userInfo = JSON.parse(localStorage.getItem("trmsUser"));
  const token = userInfo.token;
  const userName = userInfo.userName;
  const [formDetails, setFormDetails] = useState({});
  const [modal, setModal] = useState(false);
  const [approval, setApproval] = useState(false);
  const [rejection, setRejection] = useState(false);
  const [note, setNote] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [inputValue, setValue] = useState("");

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
 
  const debitUser = () => {
    const url = "http://192.168.207.18:4248/api/Funds/ChargesCollection";
    const payload = {
      formID: ID,
      applicationNumber: formDetails?.applicationNumber,
      formType: "Form NXP",
      createdBy: userName
    };
  
    console.log(payload);
    
    // Return a promise
    return new Promise((resolve, reject) => {
      axios.post(url, payload, {
        headers: {
          ApiKey: "E1A7F6B0EE30FDE1E0530FC9A8C05DA3E1A7F6B0EE31FDE1E0530FC9A8C05DA3A2F5BCE0531ECFA8C0532DF5EA644B5DA3F5BCE0531ECXzaMiYitfbK2oDjUJSU38RcXhExB7oycks/0/FnAzbB4u6SRMOPiaMM3on2wPor35agI7RRt0U4rckdzdiYDhXDL2LigoWkx97cGaOsqPN",
          "Content-type": "application/json",
        },
      })
      .then(resolve)  // Resolve with the response
      .catch(reject); // Reject with the error
    });
  };
  
  // const sendApproval = () => {
  //   const url = `${baseURL}/Supervisor/ADBSupervisorFormNXPApproval?applicationNumber=${formDetails?.applicationNumber}&formID=${ID}&formTypeName=Form NXP`;
  //   const payload = {
  //     approved: approval,
  //     note: note,
  //     daemonSupervisorName: userName,
  //     rejectionReasonCode: rejection ? rejectionReason.label : null,
  //   };

  //   console.log(payload);
  //   axios
  //     .post(url, payload, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-type": "application/json",
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response, "response from approval");
  //       alert(response.data.responseMessage);
  //       if (response.status === 200) {
  //         // Close the modal upon successful registration
  //         setModal(false);
  //       }
  //     });
  // };

  const sendApproval = () => {
    const url = `${baseURL}/Supervisor/ADBSupervisorFormNXPApproval?applicationNumber=${formDetails?.applicationNumber}&formID=${ID}&formTypeName=Form NXP`;
    const payload = {
      approved: approval,
      note: note,
      daemonSupervisorName: userName,
      rejectionReasonCode: rejection ? rejectionReason.label : null,
    };
  
    console.log(payload);
    
    // Call debitUser function and chain the promise
    debitUser()
      .then((debitResponse) => {
        console.log(debitResponse, "Debit response");
        // Proceed with sendApproval if debit response is successful
        alert(`Debit Response: ${debitResponse.data.message}`)
        return axios.post(url, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
        });
      })
      .then((approvalResponse) => {
        console.log(approvalResponse, "response from approval");
        alert(approvalResponse.data.responseMessage);
        if (approvalResponse.status === 200) {
          // Close the modal upon successful registration
          setModal(false);
        }
      })
      .catch((error) => {
        // Handle errors for both debitUser and sendApproval functions
        console.error("Error:", error);
        // Additional error handling if needed
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
          to="/supervisor/formNxp"
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

          <div className="w-full grid md:grid-cols-3 2xl:grid-cols-4 gap-y-4">
            {/* 1 */}
            <div className="w-[405px] h-[281px] rounded-lg bg-white border border-[#D1FADF] shadow-lg">
              <div className="w-full h-[52px] bg-[#039855] text-white rounded-t-lg p-4 font-semibold">
                Application
              </div>
              <div className="px-4 py-2 grid gap-4 text-sm">
                <p>
                  <span className="text-gray-600">Status:</span>{" "}
                  {formDetails?.status}
                </p>
                <p>
                  <span className="text-gray-600">Stage:</span>{" "}
                  {formDetails?.statusCode}
                </p>
                <p>
                  <span className="text-gray-600">Application Number:</span>{" "}
                  {formDetails?.applicationNumber}
                </p>
                <p>
                  <span className="text-gray-600">Form Number:</span>{" "}
                  {formDetails?.formNumber}
                </p>
                <p>
                  <span className="text-gray-600">Sector:</span>{" "}
                  {formDetails?.sector}
                </p>
                <p>
                  <span className="text-gray-600">Date Created:</span>{" "}
                  {formDetails?.createdAt}
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
                  {formDetails?.contact?.name}
                </p>
                <p>
                  <span className="text-gray-600">Email:</span>{" "}
                  {formDetails?.contact?.emailAddress}
                </p>
                <p>
                  <span className="text-gray-600">TIN:</span>{" "}
                  {formDetails?.contact?.taxIdentificationNumber}
                </p>
                <p>
                  <span className="text-gray-600">RC Number:</span>{" "}
                  {formDetails?.contact?.rcNumber}
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
            <div className="w-[405px] h-[330px] rounded-lg bg-white border border-[#D1FADF] shadow-lg">
              <div className="w-full h-[52px] bg-[#039855] text-white rounded-t-lg p-4 font-semibold">
                Documents
              </div>
              <p className="px-4 pt-2 font-semibold">Permit</p>
              <div className="px-4 py-2 grid gap-4 text-sm">
                {formDetails?.permits?.map((file) => (
                  <>
                    <div className="flex items-center">
                      <FaFileCode />
                      <p className="mx-2 text-red-600">
                        {file?.file?.fileName}
                      </p>
                      <FaDownload color="red" />
                    </div>
                    <p className="text-xs">
                      <span className="pr-2">Lable:</span>
                      {file?.permit?.name}
                    </p>
                    <p className="text-xs">
                      <span className="pr-2">Date Created:</span>
                      {file?.file?.createdAt}
                    </p>
                  </>
                ))}
              </div>
              <p className="px-4 pt-2 font-semibold">Attachment</p>
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
                      <span className="pr-2">Lable:</span>
                      {file?.file?.label}
                    </p>
                    <p className="text-xs">
                      <span className="pr-2">Date Created:</span>
                      {file?.file?.createdAt}
                    </p>
                  </>
                ))}
              </div>
            </div>
            {/* 4 */}
            <div className="w-[405px] h-[350px] rounded-lg bg-white border border-[#D1FADF] shadow-lg">
              <div className="w-full h-[52px] bg-[#039855] text-white rounded-t-lg p-4 font-semibold">
                Financial Details
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
                    Designated Bank:
                  </span>{" "}
                  {formDetails?.designatedBank?.name}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">Account Number:</span>{" "}
                  {formDetails?.accountNumber}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">
                    Naira Account Number:
                  </span>{" "}
                  {formDetails?.accountNumber}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">
                    Ness Levy Payable:
                  </span>{" "}
                  {formDetails?.nessLevyPayable}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">Exchange Rate:</span>{" "}
                  {formDetails?.exchangeRate}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">Payment Mode:</span>{" "}
                  {formDetails?.paymentMode?.name}
                </p>
              </div>
            </div>
            {/* 5 */}
            <div className="w-[405px] h-[400px] rounded-lg bg-white border border-[#D1FADF] shadow-lg">
              <div className="w-full h-[52px] bg-[#039855] text-white rounded-t-lg p-4 font-semibold">
                General Shipment Details
              </div>
              <div className="px-4 py-2 grid gap-4 text-sm">
                {/* <p>
                  <span className="text-gray-600 text-xs">
                    Loading Terminal:
                  </span>{" "}
                  Loading Terminal
                </p> */}
                <p>
                  <span className="text-gray-600 text-xs">
                    Mode of Transportation:
                  </span>{" "}
                  {formDetails?.transportationMode?.name}
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
                  {formDetails?.accountNumber}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">
                    Port of Destination:
                  </span>{" "}
                  {formDetails?.exchangeRate}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">MEA:</span>{" "}
                  {formDetails?.monitoringMea?.name}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">
                    Temporary Shipping Line:
                  </span>{" "}
                  {formDetails?.tempShippingLine?.name}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">By Order Of:</span>{" "}
                  {formDetails?.byOrderOf}
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
                  {formDetails?.consigneeAddressLine2}
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
                PIA
              </div>
              <div className="px-4 py-2 grid gap-4 text-sm">
                <p>
                  <span className="text-gray-600 text-xs">Name:</span>{" "}
                  {formDetails?.pia?.name}
                </p>
                <p>
                  <span className="text-gray-600 text-xs">
                    Inspection Location:
                  </span>{" "}
                  {formDetails?.inspectionLocation?.name}
                </p>
              </div>
            </div>
            {/* 8 */}
          </div>
          <div className="w-full shadow p-2 font-mono border my-10">
            <h4 className=" text-yellow-500 px-4 text-lg font-semibold">
              Initial Shipment
            </h4>
            <div className="w-full flex items-center justify-between p-4 text-gray-700">
              <div>
                <p className="font-semibold">Expected Shipment Date:</p>
                <p>{formDetails?.initialShipment?.expectedShipmentDate}</p>
              </div>
              <div>
                <p className="font-semibold">Vessel Name:</p>
                <p>{formDetails?.initialShipment?.vesselName}</p>
              </div>
            </div>
          </div>
          <div className="w-full shadow p-2  font-mono border my-10">
            <h4 className=" mb-5 text-green-500 text-lg font-semibold">
              Items
            </h4>
            <table className="w-full text-sm border-collapse border-t-[1px] rounded-sm text-gray-700">
              <thead className="h-10 border-b">
                <tr>
                  <td>#</td>
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
                {formDetails?.initialShipment?.items?.map((item, index) => (
                  <tr key={index} className="h-10 bg-gray-50">
                    <td>{index + 1}</td>
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

export default SupervisorFormNxpDetails;
