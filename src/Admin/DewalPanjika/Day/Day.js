import React, { useEffect, useState } from "react";
import Base from "../../../Base";
import { fetchAllMonthsByYear } from "../Month/helper/apiCalls";
import { fetchAllYears } from "../Year/helper/apiCalls";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import {
  addDayInDB,
  addEvent,
  fetchAllDaysByMonth,
  getAllEvents,
  updateDayInDB,
} from "./helper/apiCalls";
export default function Day() {
  const daysNames = [
    "১",
    "২",
    "৩",
    "৪",
    "৫",
    "৬",
    "৭",
    "৮",
    "৯",
    "১০",
    "১১",
    "১২",
    "১৩",
    "১৪",
    "১৫",
    "১৬",
    "১৭",
    "১৮",
    "১৯",
    "২০",
    "২১",
    "২২",
    "২৩",
    "২৪",
    "২৫",
    "২৬",
    "২৭",
    "২৮",
    "২৯",
    "৩০",
    "৩১",
    "৩২",
  ];
  const [allYears, setAllYears] = useState([]);
  const [allMonths, setAllMonths] = useState([]);
  const [allDays, setAllDays] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const initialState = {
    asDate: "",
    enDate: "",
    muDate: "",
    tithi: [],
    naks: [],
    month: "",
    sRise: { asText: "" },
    sSet: { asText: "" },
    events: [],
    holidays: [],
    misc: [],
    saal: "",
    _id: null,
  };
  const [day, setDay] = useState(initialState);
  const [miscCKEditor, setMiscCKEditor] = useState();
  useEffect(() => {
    fetchAllYears().then((res) => {
      if (res.error) {
        alert(res.error);
      } else {
        setAllYears(res);
      }
    });
    getAllEvents().then((res) => {
      if (res.error) {
        alert(res.error);
      } else {
        setAllEvents(res);
      }
    });
  }, []);
  useEffect(() => {
    if (day.saal) {
      document.getElementById("monthSelect").selectedIndex = 0;
      setDay({ ...day, month: "", asDate: "" });
      fetchAllMonthsByYear(day.saal).then((res) => {
        if (res.error) {
          alert(res.error);
        } else {
          setAllMonths(res);
        }
      });
    }
  }, [day.saal]);
  useEffect(() => {
    if (day.month) {
      document.getElementById("daySelect").selectedIndex = 0;
      setDay({ ...day, asDate: "" });
      fetchAllDaysByMonth(day.month).then((res) => {
        if (res.error) {
          alert(res.error);
        } else {
          setAllDays(res);
        }
      });
    }
  }, [day.month]);
  const saveDay = () => {
    if (!day.enDate) {
      alert("Please select Start Date Time.");
      return;
    }
    if (day._id === -1) {
      delete day._id;
      addDayInDB(day).then((res) => {
        if (res.error) {
          alert(res.error);
        } else {
          alert("Day added successfully.");
          window.location.reload();
        }
      });
    } else {
      updateDayInDB(day).then((res) => {
        if (res.error) {
          alert(res.error);
        } else {
          alert("Day updated successfully.");
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
          <div className="input-group col-6 mb-4">
            <label>Year</label>
            <div className="input-group">
              <select
                className="custom-select"
                onChange={(e) => {
                  if (e.target.value) {
                    setDay({ ...day, saal: e.target.value });
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
          {day.saal && (
            <div className="input-group col-6 mb-4">
              <label>Month</label>
              <div className="input-group">
                <select
                  id="monthSelect"
                  className="custom-select"
                  onChange={(e) => {
                    if (e.target.value) {
                      setDay({ ...day, month: e.target.value });
                    }
                  }}
                >
                  <option disabled selected>
                    Select Month
                  </option>
                  {allMonths &&
                    allMonths.map((y, i) => {
                      return (
                        <option key={i} value={y._id} className="">
                          {y.asMonth}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          )}
          {day.month && (
            <div className="input-group col-6">
              <label>Day</label>
              <div className="input-group">
                <select
                  id="daySelect"
                  className="custom-select"
                  onChange={(e) => {
                    if (
                      allDays &&
                      allDays.find((x) => x.asDate === e.target.value)
                    ) {
                      setDay(allDays.find((x) => x.asDate === e.target.value));
                    } else {
                      if (e.target.value) {
                        setDay({
                          ...initialState,
                          saal: day.saal,
                          month: day.month,
                          asDate: e.target.value,
                          _id: -1,
                        });
                      }
                    }
                  }}
                >
                  <option selected disabled>
                    Select Day
                  </option>
                  {daysNames &&
                    daysNames.map((y, i) => {
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
        </div>
        {day.asDate && (
          <div className="row container-fluid m-0 p-0 mb-4">
            {/* enDate */}
            <div className="col-6 ">
              <label htmlFor="enDate">Start Date Time</label>
              <div className="input-group mb-3">
                <DatePicker
                  className=""
                  id="enDate"
                  name="enDate"
                  timeInputLabel="Time (24-hrs):"
                  dateFormat="dd/MM/yyyy h:mm aa"
                  showTimeInput
                  isClearable
                  shouldCloseOnSelect={false}
                  closeOnScroll={true}
                  selected={day.enDate ? new Date(day.enDate) : null}
                  onChange={(date) => setDay({ ...day, enDate: date })}
                  customInput={<DateCustomInput />}
                />
              </div>
            </div>
            {/* muDate */}
            <div className="col-6 ">
              <label htmlFor="muDate">Muslim Date</label>
              <div className="input-group mb-3">
                <input
                  id="muDate"
                  name="muDate"
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setDay({ ...day, muDate: e.target.value });
                  }}
                  value={day.muDate}
                />
              </div>
            </div>
            {/* sRise */}
            <div className="col-6 ">
              <label htmlFor="sRise">Sun Rise</label>
              <div className="input-group mb-3">
                <input
                  id="sRise"
                  name="sRise"
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    var x = { asText: e.target.value };
                    setDay({ ...day, sRise: x });
                  }}
                  value={day.sRise.asText}
                />
              </div>
            </div>
            {/* sSet */}
            <div className="col-6 ">
              <label htmlFor="sSet">Sun Set</label>
              <div className="input-group mb-3">
                <input
                  id="sSet"
                  name="sSet"
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    var x = { asText: e.target.value };
                    setDay({ ...day, sSet: x });
                  }}
                  value={day.sSet.asText}
                />
              </div>
            </div>
            {/* tithi */}
            <div className="col-12">
              <label>Tithi</label>
              <div className="input-group">
                <select
                  id="tname"
                  className="input-group-prepend custom-select"
                >
                  <option value="কৃ: প্ৰতিপদ">কৃ: প্ৰতিপদ</option>
                  <option value="কৃ: দ্বিতীয়া">কৃ: দ্বিতীয়া</option>
                  <option value="কৃ: তৃতীয়া">কৃ: তৃতীয়া</option>
                  <option value="কৃ: চতুৰ্থী">কৃ: চতুৰ্থী</option>
                  <option value="কৃ: পঞ্চমী">কৃ: পঞ্চমী</option>
                  <option value="কৃ: ষষ্ঠী">কৃ: ষষ্ঠী</option>
                  <option value="কৃ: সপ্তমী">কৃ: সপ্তমী</option>
                  <option value="কৃ: অষ্টমী">কৃ: অষ্টমী</option>
                  <option value="কৃ: নৱমী">কৃ: নৱমী</option>
                  <option value="কৃ: দশমী">কৃ: দশমী</option>
                  <option value="কৃ: একাদশী">কৃ: একাদশী</option>
                  <option value="কৃ: দ্বাদশী">কৃ: দ্বাদশী</option>
                  <option value="কৃ: ত্ৰয়োদশী">কৃ: ত্ৰয়োদশী</option>
                  <option value="কৃ: চতুৰ্দশী">কৃ: চতুৰ্দশী</option>
                  <option value="অমাৱস্যা">অমাৱস্যা</option>
                  <option value="শু: প্ৰতিপদ">শু: প্ৰতিপদ</option>
                  <option value="শু: দ্বিতীয়া">শু: দ্বিতীয়া</option>
                  <option value="শু: তৃতীয়া">শু: তৃতীয়া</option>
                  <option value="শু: চতুৰ্থী">শু: চতুৰ্থী</option>
                  <option value="শু: পঞ্চমী">শু: পঞ্চমী</option>
                  <option value="শু: ষষ্ঠী">শু: ষষ্ঠী</option>
                  <option value="শু: সপ্তমী">শু: সপ্তমী</option>
                  <option value="শু: অষ্টমী">শু: অষ্টমী</option>
                  <option value="শু: নৱমী">শু: নৱমী</option>
                  <option value="শু: দশমী">শু: দশমী</option>
                  <option value="শু: একাদশী">শু: একাদশী</option>
                  <option value="শু: দ্বাদশী">শু: দ্বাদশী</option>
                  <option value="শু: ত্ৰয়োদশী">শু: ত্ৰয়োদশী</option>
                  <option value="শু: চতুৰ্দশী">শু: চতুৰ্দশী</option>
                  <option value="পূৰ্ণিমা">পূৰ্ণিমা</option>
                </select>
                <input
                  id="tasEndTime"
                  name="tasEndTime"
                  placeholder="End Time (Assamese)"
                  type="text"
                  className="form-control"
                />
                <input
                  id="tendTime"
                  name="tendTime"
                  placeholder="End Time (eg: 21:56:12)"
                  type="text"
                  className="form-control"
                />
                <div className="input-group-append">
                  <div
                    className="btn input-group-text"
                    onClick={() => {
                      if (
                        document.getElementById("tname").value.trim() &&
                        document.getElementById("tasEndTime").value.trim() &&
                        document.getElementById("tendTime").value.trim()
                      ) {
                        var x = {
                          name: document.getElementById("tname").value,
                          asEndTime: document.getElementById("tasEndTime")
                            .value,
                          endTime: document.getElementById("tendTime").value,
                        };
                        var y = day.tithi;
                        y.push(x);
                        setDay({ ...day, tithi: y });
                        document.getElementById("tname").value = "";
                        document.getElementById("tasEndTime").value = "";
                        document.getElementById("tendTime").value = "";
                      }
                    }}
                  >
                    Add
                  </div>
                </div>
              </div>
              <div className="container-fluid  mb-3">
                {day.tithi &&
                  day.tithi.map((g, i) => {
                    return (
                      <div
                        className="row justify-content-between border-bottom align-items-center"
                        key={i}
                      >
                        <div className="">{g.name}</div>
                        <div className="">{g.asEndTime}</div>
                        <div className="">{g.endTime}</div>
                        <div
                          className=""
                          onClick={() => {
                            var x = day.tithi;
                            x.splice(i, 1);
                            setDay({ ...day, tithi: x });
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
            {/* naks */}
            <div className="col-12">
              <label>Nakshatra</label>
              <div className="input-group">
                <select
                  id="nname"
                  className="input-group-prepend custom-select"
                >
                  <option value="কৃত্তিকা">কৃত্তিকা</option>
                  <option value="ৰোহিনী">ৰোহিনী</option>
                  <option value="মৃগশিৰা">মৃগশিৰা</option>
                  <option value="আৰ্দ্ৰা">আৰ্দ্ৰা</option>
                  <option value="পুনৰ্বসু">পুনৰ্বসু</option>
                  <option value="পুষ্যা">পুষ্যা</option>
                  <option value="অশ্লেষা">অশ্লেষা</option>
                  <option value="মঘা">মঘা</option>
                  <option value="পূঃ ফাল্গনী">পূঃ ফাল্গনী</option>
                  <option value="ঊঃ ফল্গনী">ঊঃ ফল্গনী</option>
                  <option value="হস্তা">হস্তা</option>
                  <option value="চিত্ৰা">চিত্ৰা</option>
                  <option value="স্বাতী">স্বাতী</option>
                  <option value="বিশাখা">বিশাখা</option>
                  <option value="অনুৰাধা">অনুৰাধা</option>
                  <option value="জ্যেষ্ঠা">জ্যেষ্ঠা</option>
                  <option value="মূলা">মূলা</option>
                  <option value="ৰেৱতী">ৰেৱতী</option>
                  <option value="অশ্বিনী">অশ্বিনী</option>
                  <option value="ভৰণী">ভৰণী</option>
                  <option value="শ্ৰৱণা">শ্ৰৱণা</option>
                  <option value="শতভিষা">শতভিষা</option>
                  <option value="পূৰ্বভাদ্ৰপদ">পূৰ্বভাদ্ৰপদ</option>
                  <option value="উত্তৰভাদ্ৰপদ">উত্তৰভাদ্ৰপদ</option>
                  <option value="ধনিষ্ঠা">ধনিষ্ঠা</option>
                  <option value="পূৰ্বষাঢ়া">পূৰ্বষাঢ়া</option>
                  <option value="উত্তৰাষাঢ়া">উত্তৰাষাঢ়া</option>
                </select>
                <input
                  id="nasEndTime"
                  name="nasEndTime"
                  placeholder="End Time (Assamese)"
                  type="text"
                  className="form-control"
                />
                <input
                  id="nendTime"
                  name="nendTime"
                  placeholder="End Time (eg: 21:56:12)"
                  type="text"
                  className="form-control"
                />
                <div className="input-group-append">
                  <div
                    className="btn input-group-text"
                    onClick={() => {
                      if (
                        document.getElementById("nname").value.trim() &&
                        document.getElementById("nasEndTime").value.trim() &&
                        document.getElementById("nendTime").value.trim()
                      ) {
                        var x = {
                          name: document.getElementById("nname").value,
                          asEndTime: document.getElementById("nasEndTime")
                            .value,
                          endTime: document.getElementById("nendTime").value,
                        };
                        var y = day.naks;
                        y.push(x);
                        setDay({ ...day, naks: y });
                        document.getElementById("nname").value = "";
                        document.getElementById("nasEndTime").value = "";
                        document.getElementById("nendTime").value = "";
                      }
                    }}
                  >
                    Add
                  </div>
                </div>
              </div>
              <div className="container-fluid  mb-3">
                {day.naks &&
                  day.naks.map((g, i) => {
                    return (
                      <div
                        className="row justify-content-between border-bottom align-items-center"
                        key={i}
                      >
                        <div className="">{g.name}</div>
                        <div className="">{g.asEndTime}</div>
                        <div className="">{g.endTime}</div>
                        <div
                          className=""
                          onClick={() => {
                            var x = day.naks;
                            x.splice(i, 1);
                            setDay({ ...day, naks: x });
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
            {/* events */}
            <div className="col-12">
              <label>Events</label>
              <div className="input-group mb-3">
                <select
                  id="eType"
                  className="input-group-prepend custom-select"
                >
                  <option selected disabled>
                    Select
                  </option>
                  <option value="KARMA">Subha Karma</option>
                  <option value="HOLIDAY">Holiday</option>
                  <option value="FESTIVAL">Festival</option>
                </select>

                <input
                  id="eName"
                  name="eName"
                  placeholder="Name"
                  type="text"
                  className="form-control"
                />
                <div className="input-group-append">
                  <div
                    className="btn input-group-text"
                    onClick={() => {
                      if (
                        document.getElementById("eName").value.trim() &&
                        document.getElementById("eType").value.trim()
                      ) {
                        var x = {
                          name: document.getElementById("eName").value,
                          eType: document.getElementById("eType").value,
                        };
                        addEvent(x).then((res) => {
                          if (res.error) {
                            alert(res.error);
                          } else {
                            alert("Event Added Successfully.");
                            getAllEvents().then((res) => {
                              if (res.error) {
                                alert(res.error);
                              } else {
                                setAllEvents(res);
                              }
                            });
                          }
                        });
                        document.getElementById("eType").selectedIndex = 0;
                        document.getElementById("eName").value = "";
                      }
                    }}
                  >
                    Add
                  </div>
                </div>
              </div>
              <div className="row mx-4">
                {day &&
                  allEvents &&
                  allEvents.map((eve) => {
                    var color =
                      eve.eType == "KARMA"
                        ? "border-primary"
                        : eve.eType == "HOLIDAY"
                        ? "border-warning"
                        : eve.eType == "FESTIVAL"
                        ? "border-info"
                        : "";
                    return (
                      <div
                        className={
                          "row rounded border align-items-center m-1 p-1 px-2 " +
                          color
                        }
                      >
                        <input
                          type="checkbox"
                          defaultChecked={day.events.find((x) => x === eve._id)}
                          value={eve._id}
                          onClick={(e) => {
                            if (e.target.checked) {
                              var es = day.events;
                              if (es.indexOf(e.target.value) == -1) {
                                es.push(e.target.value);
                              }
                              setDay({ ...day, events: es });
                            } else {
                              setDay({
                                ...day,
                                events: day.events.filter(
                                  (x) => x != e.target.value
                                ),
                              });
                            }
                          }}
                        />
                        <div className="p ml-2">{eve.name}</div>
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
                  var y = day.misc;
                  y.push(x);
                  setDay({ ...day, misc: y });
                  document.getElementById("miscHeading").value = "";
                  miscCKEditor.setData("", "");
                }}
              >
                Add
              </div>
              <div className="container-fluid  mb-3">
                {day.misc &&
                  day.misc.map((m, i) => {
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
                            var x = day.misc;
                            x.splice(i, 1);
                            setDay({ ...day, misc: x });
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
                onClick={saveDay}
              >
                Save Day
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  return (
    <Base>
      <div className="row m-0 p-2 justify-content-center">
        <div className="col-md-8 m-0">{editSec()}</div>
      </div>
    </Base>
  );
}
