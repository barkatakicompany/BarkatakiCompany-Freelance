import React from "react";
import Base from "../Base";
import "./style.css";
import pageBackground from "./bg1.svg";
import screen0 from "./screens/screen0.png";
import screen1 from "./screens/screen1.png";
import screen2 from "./screens/screen2.png";
import screen3 from "./screens/screen3.png";
import screen4 from "./screens/screen4.png";
// import screen5 from "./screens/screen5.png";
const DewalPanjika = () => {
  
  return (
    <Base
      backgroundStyle={{
        backgroundColor: "#f0fafb",
        color: "#000000",
        backgroundImage: `url(${pageBackground})`,
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="side-spacer">
        {/* row1 */}
        <div
          className="row m-0 p-0 p-4 h-100 w-100 align-items-center justify-content-center  side-spacer "
          style={{}}
        >
          <div className="col-md-8 text-center p-4">
            <h1 className="pt-4 mt-4">Barkataki Dewal Panjika</h1>
            <h2>Now in you Pocket</h2>
            <big>
              <p>
                Now 122 year old Barkataki Calendar is in your fingertips. In
                addition to the hard copy, now you can see your daily features,
                horoscopes and shuvakarmas in you mobile device. Celebrating
                years of excellent service and dedication towards the nation.
              </p>
            </big>
            <div
              className="button p-3 m-2"
              onClick={() => {
                var url =
                  "https://play.google.com/store/apps/details?id=com.barkataki.dewalpanjika";
                var win = window.open(url, "_blank");
                win.focus();
              }}
            >
              Download Now
            </div>
          </div>
          <div className="col-md-4 p-2 mobile-cover">
            <div id="myMobile" class="carousel slide" data-ride="carousel">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img
                    className="mobile w-100"
                    style={{ width: "20rem" }}
                    src={screen0}
                    alt=""
                  />
                </div>
                <div class="carousel-item">
                  <img
                    className="mobile w-100"
                    style={{ width: "20rem" }}
                    src={screen4}
                    alt=""
                  />
                </div>
                <div class="carousel-item">
                  <img
                    className="mobile w-100"
                    style={{ width: "20rem" }}
                    src={screen1}
                    alt=""
                  />
                </div>
                <div class="carousel-item">
                  <img
                    className="mobile w-100"
                    style={{ width: "20rem" }}
                    src={screen3}
                    alt=""
                  />
                </div>
                <div class="carousel-item">
                  <img
                    className="mobile w-100"
                    style={{ width: "20rem" }}
                    src={screen2}
                    alt=""
                  />
                </div>
              </div>
              <a
                class="carousel-control-prev"
                href="#myMobile"
                role="button"
                data-slide="prev"
              >
                {/* <span
                  class="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span> */}
                <span class="sr-only">Previous</span>
              </a>
              <a
                class="carousel-control-next"
                href="#myMobile"
                role="button"
                data-slide="next"
              >
                {/* <span
                  class="carousel-control-next-icon"
                  aria-hidden="true"
                ></span> */}
                <span class="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};
export default DewalPanjika;
