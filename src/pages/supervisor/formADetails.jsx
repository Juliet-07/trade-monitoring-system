import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import { FaDownload } from "react-icons/fa";

const FormADetails = () => {
  const baseURL = import.meta.env.VITE_REACT_APP_BASEURL;
  const userInfo = JSON.parse(localStorage.getItem("trmsUser"));
  const token = userInfo.token;
  const [data, setData] = useState({});
  const [role, setRole] = useState("");

  
  const GetFormADetails = () => {
    const url = `${baseURL}/v1/FormA/FormADetails?formID=${"61494855"}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setData(response.data.responseResult);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    GetFormADetails();
  }, []);

  return (
    <div className="flex flex-col">
      <Header />
      <div className="px-10 mt-10 text-sm">
        <div className="flex items-start gap-2">
          <div className="">
            <div className="flex items-start gap-1">
              <div className="flex flex-col gap-3 px-10 py-6 w-[400px] shadow">
                <h4 className="text-md font-bold text-red-500">Application</h4>
                <div className="flex flex-col gap-7">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-600">Status</span>
                    <span className="bg-green-700 px-3 py-1 rounded-full text-white ">
                      {data.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-600">Stage</span>
                    <span className="bg-yellow-700 px-3 py-1 rounded-full text-white">
                      {data.statusCode}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-600">
                      Application No.
                    </span>
                    <span className="uppercase font-medium text-gray-600">
                      {data.applicationNumber}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-600">
                      Form Number
                    </span>
                    <span className="uppercase font-medium text-gray-600">
                      {data.formNumber}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-600">Sector</span>
                    <span className="uppercase font-medium text-gray-600">
                      {}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-600">
                      Date Created
                    </span>
                    <span className="uppercase font-medium text-gray-600">
                      29-11-2023 15:13
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 px-10 py-6 w-[600px] shadow">
                <h4 className="text-md font-bold text-blue-500">
                  Exporter Information
                </h4>
                <div className="flex flex-col gap-7">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-600">Name</span>
                    <span className=" px-3 py-1 font-semibold">
                      Gregory Etim
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-600">TIN</span>
                    <span className=" px-3 py-1 font-semibold">556677833</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-600">RC No.</span>
                    <span className="uppercase font-medium text-gray-600">
                      rc12345
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-600">Email</span>
                    <span className="font-medium text-gray-600">
                      gregetim@premiumtrustbank.com
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-600">Phone</span>
                    <span className="uppercase font-medium text-gray-600">
                      081234567
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-600">Address</span>
                    <span className="uppercase font-medium text-gray-600">
                      Lagos
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col gap-3 px-10 py-6 w-[400px] shadow">
                <h4 className="text-md font-bold text-blue-500">
                  Finanacial Details
                </h4>
                <div className="flex flex-col gap-7">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-600">
                      Processing Bank
                    </span>
                    <span className=" px-3 py-1 font-semibold">
                      Gregory Etim
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-600">
                      Processing Bank Branch
                    </span>
                    <span className="font-medium text-gray-600"></span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-600">
                      Designated Bank
                    </span>
                    <span className="uppercase font-medium text-gray-600">
                      081234567
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-600">
                      Account Number
                    </span>
                    <span className="uppercase font-medium text-gray-600">
                      Lagos
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-600">
                      NESS Levy Payable
                    </span>
                    <span className=" px-3 py-1 font-semibold">
                      Adeola Hopewell
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-600">
                      Exchange Rate
                    </span>
                    <span className=" px-3 py-1 font-semibold">
                      Adeola Hopewell
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-600">FoB</span>
                    <span className=" px-3 py-1 font-semibold">
                      Adeola Hopewell
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-600">
                      Payment Mode
                    </span>
                    <span className=" px-3 py-1 font-semibold">
                      Adeola Hopewell
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 px-10 py-6 w-[400px] shadow">
                <h4 className="text-md font-bold text-blue-500">
                  Gneral Shipment Details
                </h4>
                <div className="flex flex-col gap-7">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-600">
                      Loading Terminal
                    </span>
                    <span className=" px-3 py-1 font-semibold">
                      Gregory Etim
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-600 capitalize">
                      Mode of Transaportation{" "}
                    </span>
                    <span className="font-medium text-gray-600"></span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-600">
                      Port of Shipment
                    </span>
                    <span className="uppercase font-medium text-gray-600">
                      081234567
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-600">
                      Destination Country
                    </span>
                    <span className="uppercase font-medium text-gray-600">
                      Lagos
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-600">
                      Port of Discharge
                    </span>
                    <span className=" px-3 py-1 font-semibold">
                      Adeola Hopewell
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-600">MEA</span>
                    <span className=" px-3 py-1 font-semibold">
                      Adeola Hopewell
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-600">
                      Teamporary shipping Line
                    </span>
                    <span className=" px-3 py-1 font-semibold">
                      Adeola Hopewell
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-600">
                      By order of
                    </span>
                    <span className=" px-3 py-1 font-semibold">
                      Adeola Hopewell
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="shadow w-[400px] px-10 py-6 ">
              <h4 className="text-md font-bold text-blue-500">Attachment</h4>
              <div className="my-5 flex flex-col">
                <a
                  className="flex items-center gap-2 mb-2 text-red-400 font-semibold"
                  href=""
                >
                  <span>document2.pdf</span>
                  <FaDownload />
                  <span></span>
                </a>
                <small className="font-medium">Label: Proforma Invoice</small>
                <small className="font-medium">
                  Date Uploaded: 22-01-24 15:13
                </small>
              </div>
            </div>
            <div className="flex flex-col gap-3 px-10 py-6 w-[400px] shadow">
              <h4 className="text-md font-bold text-blue-500">
                Consignee Information
              </h4>
              <div className="flex flex-col gap-7">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-600">Name</span>
                  <span className=" px-3 py-1 font-semibold">Gregory Etim</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-600">Email</span>
                  <span className="font-medium text-gray-600">
                    gregetim@premiumtrustbank.com
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-600">Phone</span>
                  <span className="uppercase font-medium text-gray-600">
                    081234567
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-600">
                    Address Line 1
                  </span>
                  <span className="uppercase font-medium text-gray-600">
                    Lagos
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-600">
                    Address Line 2
                  </span>
                  <span className=" px-3 py-1 font-semibold">
                    Adeola Hopewell
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <div>
            <h4 className="text-md font-bold mb-4">Initial Shipment</h4>
            <div className="flex items-center justify-between px-40 py-5 border-t-[1px] border-b-[1px]">
              <div>
                <p className="text-sm font-bold ">Expected Date:</p>
                <small className=" tracking-wider text-[14px]">23-01-23</small>
              </div>
              <div>
                <p className="text-sm font-bold ">Vessel Name:</p>
                <small className=" tracking-wider text-[14px]">
                  Boyle Vessel
                </small>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <h4 className="text-md font-bold mb-4">Items</h4>
            <div className=" overflow-x-scroll w-[100%]">
              <table className="w-full">
                <thead className="border-t shadow h-16">
                  <tr className="text-center">
                    <td className="w-[10%]">#</td>
                    <td className="w-[500px] text-left">HS Code</td>
                    <td className="w-[10%]">Packaging Mode</td>
                    <td className="w-[10%]">Unit of Measurement</td>
                    <td className="w-[10%]">Quantity</td>
                    <td className="w-[10%]">Unit Price</td>
                    <td className="w-[10%]">Net Weight</td>
                    <td className="w-[10%]">Gross Weight</td>
                    <td className="w-[10%]">Freight Charges</td>
                    <td className="w-[10%]">FoB Value</td>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center">
                    <td className="w-[100px]">1</td>
                    <td className="text-left flex flex-col justify-center w-[500px] gap-2 mt-4">
                      <div className="border-b-[2px] pb-2">
                        2710.19932.32 - Brake Fluid
                      </div>
                      <div className="border-b-[2px] pb-2">
                        Description: Brake fluid and other related products
                      </div>
                      <div className="border-b-[2px] pb-2">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Fugiat, maxime!
                      </div>
                      <div>
                        <p>SGS Tag: Weight/Volume: L</p>
                        <p>SGS Tag: Oil Type: Oil</p>
                        <p>SGS Tag: Quantity: 50000</p>
                      </div>
                    </td>
                    <td className="">Packaging Mode</td>
                    <td className="">Unit of Measurement</td>
                    <td className="">Quantity</td>
                    <td className="">Unit Price</td>
                    <td className="">Net Weight</td>
                    <td className="">Gross Weight</td>
                    <td className="">Freight Charges</td>
                    <td className="">FoB Value</td>
                  </tr>
                </tbody>
                <tfoot className="font-bold">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Total:</td>
                  <td>200</td>
                  <td>400</td>
                  <td>N900,000.00</td>
                  <td>$120,000,000.00</td>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormADetails;
