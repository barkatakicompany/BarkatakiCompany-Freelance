import React, { useEffect, useState } from "react";
import { API_DEWALPANJIKA } from "../../backend";
import Base from "../../Base";
import {
  getAllAstroRequests,
  updateAstroRequest,
  uploadFile,
} from "./helper/apiCalls";

const AstrologyManagement = () => {
  const [astroReqs, setAstroReqs] = useState([]);
  useEffect(() => {
    getAllAstroRequests().then((res) => {
      if (res.error) {
        alert(res.error);
      } else {
        setAstroReqs(res.requests);
      }
    });
  }, []);
  return (
    <Base
      backgroundStyle={{
        backgroundColor: "#ffffff",
        color: "#000000",
      }}
    >
      <div className="">
        <div className="row justify-content-center align-items-center m-0 p-0">
          <div className="col border rounded p-4">
            <h1>Manage Astrology Report Requests</h1>

            <div className="" style={{ overflow: "scroll" }}>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Payment Status</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Email</th>
                    <th scope="col">User Id</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">DOB</th>
                    <th scope="col">POB</th>
                    <th scope="col">Gender</th>
                    <th scope="col">File</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {astroReqs.map((ar, i) => {
                    return (
                      <tr>
                        <th scope="row">{ar._id}</th>
                        <td>
                          {ar.orderId.paymentStatus
                            ? ar.orderId.paymentId
                            : "NA"}
                        </td>
                        <td>{ar.mobile}</td>
                        <td>{ar.email}</td>
                        <td>{ar.user}</td>
                        <td>{ar.fname}</td>
                        <td>{ar.lname}</td>
                        <td>{new Date(ar.dob).toLocaleString()}</td>
                        <td>{ar.pob}</td>
                        <td>{ar.gender}</td>
                        <td>
                          {ar.file ? (
                            <a target="_blank" rel='noreferrer' href={API_DEWALPANJIKA + "/filesync?fileId="+ar.file._id+"&token="+ar.file.key}>View</a>
                          ) : (
                            <div className="">
                              <input
                                type="file"
                                name="Upload"
                                // className="custom-file-input bg-dark"
                                accept="application/pdf"
                                id="fileInput"
                                onChange={(e) => {
                                  if (!e.target.files[0]) {
                                    return;
                                  }
                                  document
                                    .getElementById("loading-icon")
                                    .classList.add("d-none");

                                  var formData = new FormData();
                                  formData.set("file", e.target.files[0]);
                                  formData.set("for", "ASTRO");
                                  formData.set("forId", ar._id);
                                  formData.set("secure",true)
                                  uploadFile(formData).then((res) => {
                                    if (res.status === 0) {
                                      alert(res.error);
                                    } else {
                                      updateAstroRequest({
                                        _id: ar._id,
                                        file: res._id,
                                      }).then((res) => {
                                        if (res.error) {
                                          alert(res.error);
                                        } else {
                                          alert("Uploaded Successfully.");
                                          window.location.reload();
                                        }
                                      });
                                    }
                                  });
                                }}
                              />
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};
export default AstrologyManagement;
