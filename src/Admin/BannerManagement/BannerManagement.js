import React, { useState } from "react";
import { API } from "../../backend";
import Base from "../../Base";
import { getBanners } from "../../helper/coreApiCalls";
import { uploadFile } from "../ProductManagement/helper/apiCalls";
import { deleteBanner, saveNewBanner } from "./helper/apiCalls";
const BannerManagement = () => {
  const [banners, setBanners] = useState([]);
  const [filter, setFilter] = useState("");
  return (
    <Base>
        <div className="row justify-content-center align-items-center m-0 p-0">
          <div className="col border rounded  p-4 shadow">
            <h1 className="text-center display-4">
              Banner Management
            </h1>
            <div className="row  px-4">
              <div className="col-6">
                <select
                  className="custom-select"
                  onChange={(e) => {
                    setBanners([]);
                    setFilter(e.target.value);
                    getBanners(e.target.value).then((res) => {
                      if (!res.error) {
                        setBanners(res);
                      }
                    });
                  }}
                >
                  <option disabled selected>
                    Select
                  </option>
                  <option value="home">Home Web banner</option>
                  <option value="home-m">Home Mobile banner</option>
                  <option value="store">Store Web banner</option>
                  <option value="store-m">Store Mobile banner</option>
                </select>
              </div>
            </div>
            {/* images */}
            {filter && (
              <div className="col-12 m-0 p-2 px-4">
                <div className="input-group">
                  <div className="input-group">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        accept="image/png,image/gif,image/jpeg"
                        id="fileInput"
                        onChange={(e) => {
                          if (!e.target.files[0]) {
                            return;
                          }
                          if (e.target.files[0].size > 2097152) {
                            alert("File size cannot be more than 2mb.");
                            return;
                          }
                          document.getElementById("fileStatus").innerText =
                            "Uploading File...";
                          document.getElementById("fileLabel").innerText =
                            e.target.files[0].name;
                          var formData = new FormData();
                          formData.set("file", e.target.files[0]);
                          formData.set("for", "banner");
                          formData.set("forId", "home");
                          uploadFile(formData).then((res) => {
                            if (res.status === 0) {
                              alert(res.error);
                            } else {
                              document.getElementById("fileStatus").innerText =
                                "File Uploaded Successfully";
                              saveNewBanner({
                                name: res.name,
                                for: filter,
                                fileId: res._id,
                              }).then((res) => {
                                if (!res.error) {
                                  getBanners(filter).then((res) => {
                                    if (!res.error) {
                                      setBanners(res);
                                    }
                                  });
                                }
                              });
                            }
                          });
                        }}
                      />
                      <label
                        className="custom-file-label"
                        style={{ overflow: "hidden" }}
                        id="fileLabel"
                      >
                        Choose file
                      </label>
                    </div>
                  </div>
                  <p id="fileStatus"> </p>
                </div>
              </div>
            )}
            <div className="row m-0 p-2 px-4 justify-content-center">
              {banners &&
                banners.map((b, i) => {
                  return (
                    <div
                      className={
                        (b.for.endsWith("-m") ? " col-5 " : " col-8 ") +
                        " p-4 border rounded m-2"
                      }
                    >
                      <img
                        key={i}
                        src={API + "filesync?fileId=" + b.fileId}
                        alt={b.name}
                        className="w-100"
                      />
                      <div
                        className="d-flex"
                        style={{
                          width: "2rem",
                          zIndex: 1,
                          position: "absolute",
                          top: 0,
                          right: 0,
                        }}
                        onClick={(e) => {
                          if (
                            window.confirm(
                              "Are u sure about deleting the banner?"
                            )
                          ) {
                            deleteBanner(b._id).then((res) => {
                              if (res.error) {
                                alert(res.error);
                              } else {
                                window.location.reload();
                              }
                            });
                          }
                        }}
                      >
                        <svg
                          viewBox="0 0 16 16"
                          className="bi bi-x  h-100 w-100"
                          fill="#E21717"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
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
    </Base>
  );
};
export default BannerManagement;
