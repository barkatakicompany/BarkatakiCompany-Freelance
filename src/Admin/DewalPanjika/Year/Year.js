import React, { useEffect, useState } from "react";
import Base from "../../../Base";
import { addYearInDB, fetchAllYears, updateYearInDB } from "./helper/apiCalls";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Year = () => {
  //year
  const initialYearState = {
    saal: "",
    raja: "",
    mantri: "",
    jaladhipati: "",
    satyadhipati: "",
    ganona: [],
    sunshine: [],
    adhok: "",
    samundrat: "",
    parvatat: "",
    prithivit: "",
    misc: [],
    _id: null,
  };
  const [year, setYear] = useState(initialYearState);
  const [allYears, setAllYears] = useState([]);
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

  const handleChange = (name) => (event) => {
    if (name === "ganona") {
      if (event.target.value.trim()) {
        var ganonas = year.ganona;
        ganonas.push(event.target.value.trim());
        setYear({ ...year, [name]: ganonas });
        event.target.value = "";
      } else {
        event.target.value = "";
      }
    } else {
      setYear({ ...year, [name]: event.target.value });
    }
  };
  const saveYear = (event) => {
    event.preventDefault();
    if (!year.saal.trim()) {
      alert("Please enter a saal.");
      return;
    }

    if (year._id === -1) {
      delete year._id;
      addYearInDB(year).then((res) => {
        if (res.error) {
          alert(res.error);
        } else {
          alert("Year added successfully..!");
          document.location.reload();
        }
      });
    } else {
      updateYearInDB(year).then((res) => {
        if (res.error) {
          alert(res.error);
        } else {
          alert("Year updated successfully..!!");
          document.location.reload();
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
  //html returns
  const editSec = () => {
    return (
      <div className="col container-fluid m-0 p-2">
        <div className="col m-0 p-0">
          <div className="row container-fluid m-0 p-0">
            <div className="input-group col-6 m-0 p-0 mb-4">
              <label>Year</label>
              <div className="input-group">
                <select
                  className="custom-select"
                  onChange={(e) => {
                    if (e.target.value) {
                      setYear(JSON.parse(e.target.value));
                    }
                  }}
                >
                  <option disabled selected>
                    Select Year
                  </option>
                  {allYears &&
                    allYears.map((y, i) => {
                      return (
                        <option key={i} value={JSON.stringify(y)} className="">
                          {y.saal}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>

            <div className=" col-2 mb-4">
              <div
                className="input-group"
                style={{ position: "absolute", bottom: "0" }}
              >
                <div
                  className="btn border"
                  onClick={() => {
                    setYear({ ...initialYearState, _id: -1 });
                  }}
                >
                  Add New
                </div>
              </div>
            </div>
          </div>
        </div>
        {year._id && (
          <form>
            <div className="col m-0 p-0">
              {/* saal */}
              <div className="row m-1 p-0">
                <div className="col m-1 p-0">
                  <label htmlFor="saal">Saal</label>
                  <div className="input-group mb-3">
                    <input
                      id="saal"
                      name="saal"
                      type="text"
                      className="form-control"
                      onChange={handleChange("saal")}
                      value={year.saal}
                    />
                  </div>
                </div>
              </div>
              {/* raja-mantri */}
              <div className="row m-1 p-0">
                <div className="col m-1 p-0">
                  <label htmlFor="raja">Raja</label>
                  <div className="input-group mb-3">
                    <input
                      id="raja"
                      name="raja"
                      type="text"
                      className="form-control"
                      onChange={handleChange("raja")}
                      value={year.raja}
                    />
                  </div>
                </div>
                <div className="col m-1 p-0">
                  <label htmlFor="mantri">Mantri</label>
                  <div className="input-group mb-3">
                    <input
                      id="mantri"
                      name="mantri"
                      type="text"
                      className="form-control"
                      onChange={handleChange("mantri")}
                      value={year.mantri}
                    />
                  </div>
                </div>
                <div className="col m-1 p-0">
                  <label htmlFor="jaladhipati">Jaladhipati</label>
                  <div className="input-group mb-3">
                    <input
                      id="jaladhipati"
                      name="jaladhipati"
                      type="text"
                      className="form-control"
                      onChange={handleChange("jaladhipati")}
                      value={year.jaladhipati}
                    />
                  </div>
                </div>
                <div className="col m-1 p-0">
                  <label htmlFor="satyadhipati">Satyadhipati</label>
                  <div className="input-group mb-3">
                    <input
                      id="satyadhipati"
                      name="satyadhipati"
                      type="text"
                      className="form-control"
                      onChange={handleChange("satyadhipati")}
                      value={year.satyadhipati}
                    />
                  </div>
                </div>
              </div>
              {/* ganona */}
              <div className="row m-1 p-0">
                <div className="col m-1 p-0">
                  <label htmlFor="ganonaEntry">Ganona</label>
                  <div className="input-group">
                    <input
                      id="ganonaEntry"
                      name="ganonaEntry"
                      type="text"
                      className="form-control"
                      onBlur={handleChange("ganona")}
                      onKeyPress={(event) => {
                        if (event.key === "Enter") {
                          if (event.target.value.trim()) {
                            var ganonas = year.ganona;
                            ganonas.push(event.target.value.trim());
                            setYear({ ...year, ganona: ganonas });
                            event.target.value = "";
                          } else {
                            event.target.value = "";
                          }
                        }
                      }}
                    />
                  </div>
                  <div className="container-fluid  mb-3">
                    {year.ganona &&
                      year.ganona.map((g, i) => {
                        return (
                          <div
                            className="row justify-content-between border-bottom align-items-center"
                            key={i}
                          >
                            <div className="">{g}</div>
                            <div
                              className=""
                              onClick={() => {
                                var x = year.ganona;
                                x.splice(i, 1);
                                setYear({ ...year, ganona: x });
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
              </div>
              {/* sunshine rashi ayai byai stthi */}
              <div className="row m-1 p-0">
                <div className="col m-1 p-0">
                  <label htmlFor="rashi">Rashi | Ayai | Byai | Stithi</label>
                  <div className="input-group">
                    <select id="rashi" name="rashi" className="custom-select">
                      <option selected disabled>
                        Select
                      </option>
                      <option value="মেষ">মেষ</option>
                      <option value="বৃষ">বৃষ</option>
                      <option value="মিথুন">মিথুন</option>
                      <option value="কৰ্কট">কৰ্কট</option>
                      <option value="সিংহ">সিংহ</option>
                      <option value="কন্যা">কন্যা</option>
                      <option value="তুলা">তুলা</option>
                      <option value="বিছা">বিছা</option>
                      <option value="ধনু">ধনু</option>
                      <option value="মকৰ">মকৰ</option>
                      <option value="কুম্ভ">কুম্ভ</option>
                      <option value="মীন">মীন</option>
                    </select>

                    <input
                      id="ayai"
                      name="ayai"
                      type="text"
                      className="form-control"
                      placeholder="ayai"
                    />
                    <input
                      id="byai"
                      name="byai"
                      type="text"
                      className="form-control"
                      placeholder="byai"
                    />
                    <input
                      id="stithi"
                      name="stithi"
                      type="text"
                      className="form-control"
                      placeholder="stithi"
                    />
                    <div className="input-group-append">
                      <div
                        className="btn input-group-text"
                        onClick={() => {
                          if (
                            document.getElementById("rashi").value.trim() &&
                            document.getElementById("ayai").value.trim() &&
                            document.getElementById("byai").value.trim() &&
                            document.getElementById("stithi").value.trim()
                          ) {
                            var x = {
                              rashi: document.getElementById("rashi").value,
                              ayai: document.getElementById("ayai").value,
                              byai: document.getElementById("byai").value,
                              stithi: document.getElementById("stithi").value,
                            };
                            var y = year.sunshine;
                            y.push(x);
                            setYear({ ...year, sunshine: y });
                            document.getElementById("rashi").value = "";
                            document.getElementById("ayai").value = "";
                            document.getElementById("byai").value = "";
                            document.getElementById("stithi").value = "";
                          }
                        }}
                      >
                        Add
                      </div>
                    </div>
                  </div>
                  <div className="container-fluid mb-3">
                    {year.sunshine &&
                      year.sunshine.map((s, i) => {
                        return (
                          <div
                            className="row justify-content-between border-bottom align-items-center"
                            key={i}
                          >
                            <div className="col-9 ">
                              <div className="row">
                                <div className="">{s.rashi} | </div>
                                <div className="">{s.ayai} | </div>
                                <div className="">{s.byai} | </div>
                                <div className="">{s.stithi} </div>
                              </div>
                            </div>
                            <div
                              className=""
                              onClick={() => {
                                var x = year.sunshine;
                                x.splice(i, 1);
                                setYear({ ...year, sunshine: x });
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
              </div>
              {/* adhok-samundrat */}
              <div className="row m-1 p-0">
                <div className="col m-1 p-0">
                  <label htmlFor="adhok">Adhok</label>
                  <div className="input-group mb-3">
                    <input
                      id="adhok"
                      name="adhok"
                      type="text"
                      className="form-control"
                      onChange={handleChange("adhok")}
                      value={year.adhok}
                    />
                  </div>
                </div>
                <div className="col m-1 p-0">
                  <label htmlFor="samundrat">Samundrat</label>
                  <div className="input-group mb-3">
                    <input
                      id="samundrat"
                      name="samundrat"
                      type="text"
                      className="form-control"
                      onChange={handleChange("samundrat")}
                      value={year.samundrat}
                    />
                  </div>
                </div>
                <div className="col m-1 p-0">
                  <label htmlFor="parvatat">Parvatat</label>
                  <div className="input-group mb-3">
                    <input
                      id="parvatat"
                      name="parvatat"
                      type="text"
                      className="form-control"
                      onChange={handleChange("parvatat")}
                      value={year.parvatat}
                    />
                  </div>
                </div>
                <div className="col m-1 p-0">
                  <label htmlFor="prithivit">Prithivit</label>
                  <div className="input-group mb-3">
                    <input
                      id="prithivit"
                      name="prithivit"
                      type="text"
                      className="form-control"
                      onChange={handleChange("prithivit")}
                      value={year.prithivit}
                    />
                  </div>
                </div>
              </div>
              {/* misc */}
              <div className="row m-1 p-0">
                <div className="col m-1 p-0">
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
                      var y = year.misc;
                      y.push(x);
                      setYear({ ...year, misc: y });
                      document.getElementById("miscHeading").value = "";
                      miscCKEditor.setData("", "");
                    }}
                  >
                    Add
                  </div>
                  <div className="container-fluid  mb-3">
                    {year.misc &&
                      year.misc.map((m, i) => {
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
                                dangerouslySetInnerHTML={{
                                  __html: m.description,
                                }}
                              ></div>
                            </div>
                            <div
                              className=""
                              onClick={() => {
                                var x = year.misc;
                                x.splice(i, 1);
                                setYear({ ...year, misc: x });
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
              </div>
              <div
                className="btn border border-warning float-right"
                style={{ right: 0 }}
                onClick={saveYear}
              >
                Save Year
              </div>
            </div>
          </form>
        )}
      </div>
    );
  };
  // const displaySec = () => {
  //   return (
  //     <div className="col container-fluid m-0 p-2">
  //       <p
  //         className="m-0 p-0  border border-dark"
  //         style={{ overflow: "auto", height: "620px" }}
  //       ></p>
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
};
export default Year;
