import React, { useEffect, useState } from "react";
import Base from "../../../Base";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { fetchAllYears } from "../Year/helper/apiCalls";
import {
  addMonthInDB,
  fetchAllMonthsByYear,
  updateMonthInDB,
} from "./helper/apiCalls";

export default function Month() {
  const months = [
    "বহাগ",
    "জেঠ",
    "আহাৰ",
    "শাওণ",
    "ভাদ",
    "আহিন",
    "কাতি",
    "আঘোণ",
    "পুহ",
    "মাঘ",
    "ফাগুন",
    "চ’ত",
  ];
  const initialState = {
    shak: "",
    sankaravad: "",
    enYear: "",
    muYear: "",
    saal: "",
    asMonth: "",
    enMonth: "",
    muMonth: "",
    fast: [],
    startDate: "",
    skrntis: [],
    monthPanjikaDscs: [],
    misc: [],
    _id: null,
  };
  const [month, setMonth] = useState(initialState);
  const [allYears, setAllYears] = useState([]);
  const [allMonths, setAllMonths] = useState([]);
  const [miscCKEditor, setMiscCKEditor] = useState();

  useEffect(() => {
    fetchAllYears().then((res) => {
      if (res.error) {
        alert(res.error);
      } else {
        setAllYears(res);
      }
    });
  }, []);
  useEffect(() => {
    if (month.saal) {
      document.getElementById("monthSelect").selectedIndex = 0;
      fetchAllMonthsByYear(month.saal).then((res) => {
        if (res.error) {
          alert(res.error);
        } else {
          setAllMonths(res);
        }
      });
    }
  }, [month.saal]);

  const saveMonth = (event) => {
    event.preventDefault();
    if (!month.startDate) {
      alert("Please select Start Date Time.");
      return;
    }
    if (month._id === -1) {
      delete month._id;
      addMonthInDB(month).then((res) => {
        if (res.error) {
          alert(res.error);
        } else {
          alert("Month added successfully.");
          window.location.reload();
        }
      });
    } else {
      updateMonthInDB(month).then((res) => {
        if (res.error) {
          alert(res.error);
        } else {
          alert("Month updated successfully.");
          window.location.reload();
        }
      });
    }
  };
  const DateCustomInput = ({ value, onClick }) => (
    <input
      type="text"
      className="form-control"
      placeholder="Select date"
      onClick={onClick}
      value={value}
    />
  );

  var editSec = () => {
    return (
      <div className="col container-fluid m-0 p-2">
        <div className="row container-fluid m-0 p-0 mb-4">
          <div className="input-group col-6">
            <label>Year</label>
            <div className="input-group">
              <select
                className="custom-select"
                onChange={(e) => {
                  if (e.target.value) {
                    setMonth({ ...month, saal: e.target.value });
                  }
                }}
              >
                <option disabled selected>
                  Select Year
                </option>
                {allYears &&
                  allYears.map((y, i) => {
                    return (
                      <option key={i} value={y._id} className="">
                        {y.saal}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          {month.saal && (
            <div className="input-group col-6">
              <label>Month</label>
              <div className="input-group">
                <select
                  id="monthSelect"
                  className="custom-select"
                  onChange={(e) => {
                    if (
                      allMonths &&
                      allMonths.find((x) => e.target.value === x.asMonth)
                    ) {
                      setMonth(
                        allMonths.find((x) => e.target.value === x.asMonth)
                      );
                    } else {
                      if (e.target.value) {
                        setMonth({
                          ...initialState,
                          _id: -1,
                          saal: month.saal,
                          asMonth: e.target.value,
                        });
                      } else {
                        alert(
                          "Internal Error. Please report to admin. Error Code: EM01"
                        );
                      }
                    }
                  }}
                >
                  <option disabled selected>
                    Select Month
                  </option>
                  {months &&
                    months.map((y, i) => {
                      return (
                        <option key={i} value={y} className="">
                          {y}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          )}
          {/* {month.saal && (
              <div className=" col-2 m-0 p-0 mb-4">
                <div
                  className="input-group"
                  style={{ position: "absolute", bottom: "0" }}
                >
                  <div
                    className="btn border"
                    onClick={() => {
                      setMonth({ ...month, _id: -1 });
                    }}
                  >
                    Add New
                  </div>
                </div>
              </div>
            )} */}
        </div>
        {month.asMonth && (
          <div className="row container-fluid m-0 p-0 mb-4">
            {/* shak */}
            <div className="col-6 ">
              <label htmlFor="saal">Shak</label>
              <div className="input-group mb-3">
                <input
                  id="shak"
                  name="shak"
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setMonth({ ...month, shak: e.target.value });
                  }}
                  value={month.shak}
                />
              </div>
            </div>
            {/* sankaravad */}
            <div className="col-6 ">
              <label htmlFor="sankaravad">Sankaravad</label>
              <div className="input-group mb-3">
                <input
                  id="sankaravad"
                  name="sankaravad"
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setMonth({ ...month, sankaravad: e.target.value });
                  }}
                  value={month.sankaravad}
                />
              </div>
            </div>
            {/* enYear */}
            <div className="col-6 ">
              <label htmlFor="enYear">English Year</label>
              <div className="input-group mb-3">
                <input
                  id="enYear"
                  name="enYear"
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setMonth({ ...month, enYear: e.target.value });
                  }}
                  value={month.enYear}
                />
              </div>
            </div>
            {/* muYear */}
            <div className="col-6 ">
              <label htmlFor="muYear">Muslim Year</label>
              <div className="input-group mb-3">
                <input
                  id="muYear"
                  name="muYear"
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setMonth({ ...month, muYear: e.target.value });
                  }}
                  value={month.muYear}
                />
              </div>
            </div>
            {/* muMonth */}
            <div className="col-6 ">
              <label htmlFor="muMonth">Muslim Month</label>
              <div className="input-group mb-3">
                <input
                  id="muMonth"
                  name="muMonth"
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setMonth({ ...month, muMonth: e.target.value });
                  }}
                  value={month.muMonth}
                />
              </div>
            </div>
            {/* enMonth */}
            <div className="col-6 ">
              <label htmlFor="enMonth">English Month</label>
              <div className="input-group mb-3">
                <input
                  id="enMonth"
                  name="enMonth"
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setMonth({ ...month, enMonth: e.target.value });
                  }}
                  value={month.enMonth}
                />
              </div>
            </div>
            {/* startDate */}
            <div className="col-6 ">
              <label htmlFor="startDate">Start Date Time</label>
              <div className="input-group mb-3">
                <DatePicker
                  className=""
                  id="startDate"
                  name="startDate"
                  timeInputLabel="Time (24-hrs):"
                  dateFormat="dd/MM/yyyy h:mm aa"
                  showTimeInput
                  isClearable
                  shouldCloseOnSelect={false}
                  closeOnScroll={true}
                  selected={month.startDate ? new Date(month.startDate) : null}
                  onChange={(date) => {
                    setMonth({ ...month, startDate: date });
                  }}
                  customInput={<DateCustomInput />}
                />
              </div>
            </div>
            {/* fast */}
            <div className="col-12">
              <label>Fast</label>
              <div className="input-group">
                <select id="key" name="key" className="custom-select">
                  <option selected disabled>
                    Select
                  </option>
                  <option value="একাঃ">একাঃ</option>
                  <option value="পূঃ">পূঃ</option>
                  <option value="অমাঃ">অমাঃ</option>
                </select>
                <input
                  id="nishi"
                  name="nishi"
                  placeholder="Nishi"
                  type="text"
                  className="form-control"
                />
                <input
                  id="upbash"
                  name="upbash"
                  placeholder="Upbash"
                  type="text"
                  className="form-control"
                />
                <div className="input-group-append">
                  <div
                    className="btn input-group-text"
                    onClick={() => {
                      if (
                        document.getElementById("key").value.trim() &&
                        document.getElementById("nishi").value.trim() &&
                        document.getElementById("upbash").value.trim()
                      ) {
                        var x = {
                          key: document.getElementById("key").value,
                          nishi: document.getElementById("nishi").value,
                          upbash: document.getElementById("upbash").value,
                        };
                        var y = month.fast;
                        y.push(x);
                        setMonth({ ...month, fast: y });
                        document.getElementById("key").value = "";
                        document.getElementById("nishi").value = "";
                        document.getElementById("upbash").value = "";
                      } else {
                        alert("Please enter both the values");
                      }
                    }}
                  >
                    Add
                  </div>
                </div>
              </div>
              <div className="container-fluid  mb-3">
                {month.fast &&
                  month.fast.map((g, i) => {
                    return (
                      <div
                        className="row justify-content-between border-bottom align-items-center"
                        key={i}
                      >
                        <div className="">{g.key}</div>
                        <div className="">{g.nishi}</div>
                        <div className="">{g.upbash}</div>
                        <div
                          className=""
                          onClick={() => {
                            var x = month.fast;
                            x.splice(i, 1);
                            setMonth({ ...month, fast: x });
                          }}
                        >
                          <svg
                            width="2em"
                            height="2em"
                            viewBox="0 0 16 16"
                            className="bi bi-x"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                            />
                          </svg>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            {/* skranti */}
            <div className="col-12">
              <label>Skranti</label>
              <div className="input-group">
                <select id="heading" name="heading" className="custom-select">
                  <option selected disabled>
                    Select
                  </option>
                  <option value="দুই ভৰিত">দুই ভৰিত</option>
                  <option value="দুই চকুত">দুই চকুত</option>
                  <option value="দুচকুত">দুচকুত</option>
                  <option value="বাঁওহাতত">বাঁওহাতত</option>
                  <option value="বাওঁভৰিত">বাওঁভৰিত</option>
                  <option value="গুহ্যত">গুহ্যত</option>
                  <option value="নাভিত">নাভিত</option>
                  <option value="মুখত">মুখত</option>
                  <option value="শিৰত">শিৰত</option>
                  <option value="শোভৰিত">শোভৰিত</option>
                  <option value="সোঁহাতত">সোঁহাতত</option>
                  <option value="হৃদয়ত">হৃদয়ত</option>
                </select>
                <input
                  id="dates"
                  name="dates"
                  placeholder="Dates"
                  type="text"
                  className="form-control"
                />
                <input
                  id="fal"
                  name="fal"
                  placeholder="Fal"
                  type="text"
                  className="form-control"
                />
                <div className="input-group-append">
                  <div
                    className="btn input-group-text"
                    onClick={() => {
                      if (
                        document.getElementById("heading").value.trim() &&
                        document.getElementById("dates").value.trim() &&
                        document.getElementById("fal").value.trim()
                      ) {
                        var x = {
                          heading: document.getElementById("heading").value,
                          dates: document.getElementById("dates").value,
                          fal: document.getElementById("fal").value,
                        };
                        var y = month.skrntis;
                        y.push(x);
                        setMonth({ ...month, skrntis: y });
                        document.getElementById("heading").value = "";
                        document.getElementById("dates").value = "";
                        document.getElementById("fal").value = "";
                      }
                    }}
                  >
                    Add
                  </div>
                </div>
              </div>
              <div className="container-fluid  mb-3">
                {month.skrntis &&
                  month.skrntis.map((g, i) => {
                    return (
                      <div
                        className="row justify-content-between border-bottom align-items-center"
                        key={i}
                      >
                        <div className="">{g.heading}</div>
                        <div className="">{g.dates}</div>
                        <div className="">{g.fal}</div>
                        <div
                          className=""
                          onClick={() => {
                            var x = month.skrntis;
                            x.splice(i, 1);
                            setMonth({ ...month, skrntis: x });
                          }}
                        >
                          <svg
                            width="2em"
                            height="2em"
                            viewBox="0 0 16 16"
                            className="bi bi-x"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                            />
                          </svg>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            {/* misc */}
            <div className="col-12">
              <label htmlFor="miscHeading">Misc</label>
              <div className="input-group mb-1">
                <input
                  id="miscHeading"
                  name="miscHeading"
                  type="text"
                  className="form-control"
                  placeholder="heading"
                />
              </div>
              <CKEditor
                className="h-100 w-100"
                editor={ClassicEditor}
                data=""
                onReady={(editor) => {
                  setMiscCKEditor(editor);
                }}
              />

              <div
                className="btn border boprder-dark rounded mt-1"
                onClick={() => {
                  if (
                    !document.getElementById("miscHeading").value.trim() &&
                    !miscCKEditor.getData()
                  ) {
                    alert("Please enter any one value");
                    return;
                  }
                  var x = {
                    heading: document.getElementById("miscHeading").value,
                    description: miscCKEditor.getData(),
                  };
                  var y = month.misc;
                  y.push(x);
                  setMonth({ ...month, misc: y });
                  document.getElementById("miscHeading").value = "";
                  miscCKEditor.setData("", "");
                }}
              >
                Add
              </div>
              <div className="container-fluid  mb-3">
                {month.misc &&
                  month.misc.map((m, i) => {
                    return (
                      <div
                        className="row justify-content-between border-bottom align-items-center"
                        key={i}
                      >
                        <div
                          className="col-3"
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {m.heading}
                        </div>
                        <div className="col-8">
                          <div
                            dangerouslySetInnerHTML={{ __html: m.description }}
                          ></div>
                        </div>
                        <div
                          className=""
                          onClick={() => {
                            var x = month.misc;
                            x.splice(i, 1);
                            setMonth({ ...month, misc: x });
                          }}
                        >
                          <svg
                            width="2em"
                            height="2em"
                            viewBox="0 0 16 16"
                            className="bi bi-x"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                            />
                          </svg>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="col-12">
              <div
                className="btn border border-warning float-right"
                style={{ right: 0 }}
                onClick={saveMonth}
              >
                Save Month
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  // var displaySec = () => {
  //   return (
  //     <div className="col container-fluid m-0 p-2">
  //       <p
  //         className="m-0 p-0  border border-dark"
  //         style={{ overflow: "auto", height: "620px" }}
  //       >
  //       </p>
  //     </div>
  //   );
  // };
  return (
    <Base>
      <div className="row m-0 p-2 justify-content-center">
        <div className="col-md-8 m-0">{editSec()}</div>
        {/* <div className="col-md-4 m-0">{displaySec()}</div> */}
      </div>
    </Base>
  );
}
