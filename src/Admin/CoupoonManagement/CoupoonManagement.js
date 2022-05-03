import React, { useState } from "react";
import Base from "../../Base";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  saveNewCoupoon,
  updateCoupoon,
  getAllCoupoons,
} from "./helper/apiCalls";
const BannerManagement = () => {
  const DateCustomInput = ({ value, onClick }) => (
    <input
      type="text"
      className="form-control"
      placeholder="Select date"
      onClick={onClick}
      value={value}
    />
  );
  const [coupoon, setCoupoon] = useState({
    _id: "",
    //if assigned to particular user
    username: "",
    code: "",
    // 0=amt
    // 1=%
    discType: "",
    discAmt: "",
    maxDisc: "",
    //0=active
    //1=used
    //2=inactive
    status: "0",
    usedAt: "",
    order: "",
    validTill: "",
  });
  const [allCoupoons, setAllCoupoons] = useState([]);
  const [showAllCpns, setShowAllCpns] = useState(false);
  return (
    <Base>
      <div className="row  side-spacer justify-content-center align-items-center">
        <div className="col border rounded p-4">
          <h1 className="text-center display-4">Coupoon Management</h1>
          <div className="row justify-content-center mb-3">
            <div
              className="btn border px-2 mx-2 m-1"
              onClick={(e) => {
                getAllCoupoons().then((res) => {
                  if (res.error) {
                    alert(res.error);
                  } else {
                    setAllCoupoons(res);
                    setShowAllCpns(true);
                    setCoupoon({ _id: null });
                  }
                });
              }}
            >
              Veiw All
            </div>
            <div
              className="btn border px-2 mx-2 m-1"
              onClick={(e) => {
                setCoupoon({
                  _id: -1,
                  //if assigned to particular user
                  username: "",
                  code: "",
                  // 0=amt
                  // 1=%
                  discType: "",
                  discAmt: "",
                  maxDisc: "",
                  //0=active
                  //1=used
                  //2=inactive
                  status: "0",
                  usedAt: "",
                  order: "",
                  validTill: "",
                });
                setShowAllCpns(false);
              }}
            >
              Add new
            </div>
          </div>
          {coupoon._id && (
            <div className="row justify-content-center">
              <div className="col-6">
                {/* code */}
                <div className="input-group mb-4">
                  <label>Coupoon Code</label>
                  <div className="input-group">
                    <input
                      id="cpnCode"
                      readOnly={coupoon._id !== -1}
                      type="text"
                      className="form-control"
                      placeholder="CODE"
                      value={coupoon.code}
                      onChange={(e) => {
                        setCoupoon({ ...coupoon, code: e.target.value });
                      }}
                    />
                    <div className="input-group-append">
                      <div
                        className="btn border"
                        onClick={(e) => {
                          if (coupoon._id !== -1) {
                            alert("Cannot regenerate coupoon code.");
                            return;
                          }
                          setCoupoon({
                            ...coupoon,
                            code: Math.floor(
                              1000000000 + Math.random() * 9000000000
                            ),
                          });
                        }}
                      >
                        Generate
                      </div>
                      {/* <div className="input-group-text"></div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6 ">
                {/* valid till */}
                <label htmlFor="enDate">Valid Till</label>
                <div className="input-group mb-3">
                  <DatePicker
                    className=""
                    id="enDate"
                    name="enDate"
                    dateFormat="dd/MM/yyyy"
                    isClearable
                    shouldCloseOnSelect={false}
                    closeOnScroll={true}
                    selected={
                      coupoon.validTill ? new Date(coupoon.validTill) : null
                    }
                    onChange={(date) =>
                      setCoupoon({ ...coupoon, validTill: date })
                    }
                    customInput={<DateCustomInput />}
                  />
                </div>
              </div>
              <div className="col-6">
                {/* status */}
                <div className="input-group mb-4">
                  <label>Status</label>
                  <div className="input-group">
                    <select
                      className="custom-select"
                      onChange={(e) => {
                        setCoupoon({ ...coupoon, status: e.target.value });
                      }}
                    >
                      <option selected disabled>
                        Select
                      </option>
                      <option value="0">Active</option>
                      <option value="2">Inactive</option>
                    </select>
                  </div>
                  <p className="p-0 px-2 m-0">
                    {coupoon.status === 0
                      ? "Active"
                      : coupoon.status === 1
                      ? "Inactive"
                      : coupoon.status === 2
                      ? "Inactive"
                      : ""}
                  </p>
                </div>
              </div>
              <div className="col-6">
                {/* type */}
                <div className="input-group mb-4">
                  <label>Discount Type</label>
                  <div className="input-group">
                    <select
                      className="custom-select"
                      onChange={(e) => {
                        setCoupoon({ ...coupoon, discType: e.target.value });
                      }}
                    >
                      <option disabled selected>
                        Select
                      </option>
                      <option value="0">Amount</option>
                      <option value="1">Percentage</option>
                    </select>
                  </div>
                  <p className="p-0 px-2 m-0">
                    {coupoon.discType === 0
                      ? "Amount"
                      : coupoon.discType === 1
                      ? "Percentage"
                      : ""}
                  </p>
                </div>
              </div>
              <div className="col-6">
                {/* amount */}
                <div className="input-group mb-4">
                  <label>Discount Amount/Percentage</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Amount/Percentage"
                      value={coupoon.discAmt}
                      onChange={(e) => {
                        setCoupoon({ ...coupoon, discAmt: e.target.value });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                {/* max */}
                <div className="input-group mb-4">
                  <label>Maximum Discount</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      value={coupoon.maxDisc}
                      placeholder="Amount"
                      onChange={(e) => {
                        setCoupoon({ ...coupoon, maxDisc: e.target.value });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6 text-center">
                <div
                  className=" btn border px-2 mx-2 m-1"
                  onClick={(e) => {
                    if (coupoon._id !== -1) {
                      alert(typeof coupoon._id);
                      //update
                      if (!coupoon.code) {
                        alert("Please enter a coupoon code.");
                        return;
                      } else if (!coupoon.discAmt) {
                        alert("Please enter the discount amount.");
                        return;
                      } else if (!coupoon.validTill) {
                        alert("Please select validity.");
                        return;
                      } else if (!coupoon.discType) {
                        alert("Please select the discount type.");
                        return;
                      } else if (!coupoon.maxDisc) {
                        alert("Please enter maximum discount to be allowed.");
                        return;
                      } else {
                        updateCoupoon(coupoon).then((res) => {
                          if (res.error) {
                            alert(res.error);
                          } else {
                            alert("Coupoon updated successfully.");
                            document.location.reload();
                          }
                        });
                      }
                    } else {
                      //add
                      delete coupoon._id;
                      if (!coupoon.code) {
                        alert("Please enter a coupoon code.");
                        return;
                      } else if (!coupoon.discAmt) {
                        alert("Please enter the discount amount.");
                        return;
                      } else if (!coupoon.validTill) {
                        alert("Please select validity.");
                        return;
                      } else if (!coupoon.discType) {
                        alert("Please select the discount type.");
                        return;
                      } else if (!coupoon.maxDisc) {
                        alert("Please enter maximum discount to be allowed.");
                        return;
                      } else {
                        saveNewCoupoon(coupoon).then((res) => {
                          if (res.error) {
                            alert(res.error);
                          } else {
                            alert("Coupoon saved successfully.");
                            document.location.reload();
                          }
                        });
                      }
                    }
                  }}
                >
                  {coupoon._id !== "-1" ? "Update" : "Add"}
                </div>
              </div>
            </div>
          )}
          {showAllCpns && (
            <div className="row justify-content-center">
              <table className="rounded text-center">
                <tr className="bg-light">
                  <th className="px-4 p-1 border">Code</th>
                  <th className="px-4 p-1 border">Type</th>
                  <th className="px-4 p-1 border">Amount(₹)</th>
                  <th className="px-4 p-1 border">Max Discount(₹)</th>
                  <th className="px-4 p-1 border">Status</th>
                  <th className="px-4 p-1 border">Used At</th>
                  <th className="px-4 p-1 border">Order</th>
                  <th className="px-4 p-1 border">Valid Till</th>
                  <th className="px-4 p-1 border"></th>
                </tr>
                {allCoupoons &&
                  allCoupoons.map((cpn, i) => {
                    return (
                      <tr>
                        <td className="px-4 p-1 border">{cpn.code}</td>
                        <td className="px-4 p-1 border">
                          {cpn.discType === 0
                            ? "Amount"
                            : cpn.discType === 1
                            ? "Percentage"
                            : ""}
                        </td>
                        <td className="px-4 p-1 border">
                          {cpn.discAmt.toFixed(2)}
                        </td>
                        <td className="px-4 p-1 border">
                          {cpn.maxDisc.toFixed(2)}
                        </td>
                        <td className="px-4 p-1 border">
                          {cpn.status === 0
                            ? "Active"
                            : cpn.status === 1
                            ? "Inactive"
                            : cpn.status === 2
                            ? "Inactive"
                            : ""}
                        </td>
                        <td className="px-4 p-1 border">
                          {cpn.usedAt
                            ? new Date(cpn.usedAt).toDateString()
                            : ""}
                        </td>
                        <td className="px-4  p-1 border">{cpn.order}</td>
                        <td className="px-4  p-1 border">
                          {new Date(cpn.validTill).toDateString()}
                        </td>
                        <td className="p-1 px-3 border">
                          <div
                            className="btn"
                            onClick={(e) => {
                              setCoupoon(cpn);
                              setShowAllCpns(false);
                            }}
                          >
                            <svg
                              width="20"
                              height="20"
                              x="0px"
                              y="0px"
                              viewBox="0 0 477.873 477.873"
                              style={{
                                enableBackground: "new 0 0 477.873 477.873",
                              }}
                              // xml:space="preserve"
                            >
                              <g>
                                <g>
                                  <path
                                    d="M392.533,238.937c-9.426,0-17.067,7.641-17.067,17.067V426.67c0,9.426-7.641,17.067-17.067,17.067H51.2
			c-9.426,0-17.067-7.641-17.067-17.067V85.337c0-9.426,7.641-17.067,17.067-17.067H256c9.426,0,17.067-7.641,17.067-17.067
			S265.426,34.137,256,34.137H51.2C22.923,34.137,0,57.06,0,85.337V426.67c0,28.277,22.923,51.2,51.2,51.2h307.2
			c28.277,0,51.2-22.923,51.2-51.2V256.003C409.6,246.578,401.959,238.937,392.533,238.937z"
                                  />
                                </g>
                              </g>
                              <g>
                                <g>
                                  <path
                                    d="M458.742,19.142c-12.254-12.256-28.875-19.14-46.206-19.138c-17.341-0.05-33.979,6.846-46.199,19.149L141.534,243.937
			c-1.865,1.879-3.272,4.163-4.113,6.673l-34.133,102.4c-2.979,8.943,1.856,18.607,10.799,21.585
			c1.735,0.578,3.552,0.873,5.38,0.875c1.832-0.003,3.653-0.297,5.393-0.87l102.4-34.133c2.515-0.84,4.8-2.254,6.673-4.13
			l224.802-224.802C484.25,86.023,484.253,44.657,458.742,19.142z"
                                  />
                                </g>
                              </g>
                            </svg>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </table>
            </div>
          )}
        </div>
      </div>
    </Base>
  );
};
export default BannerManagement;
