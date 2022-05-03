import React from "react";
import Menu from "./Menu";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import Menu2 from "./Menu2";
import logo  from './logo1.png';
const Base = ({ children, error, backgroundStyle}) => {
  return (
    <div
      className="row w-100 m-0 p-0"
      
      style={backgroundStyle}
    >
      <div className="col m-0 p-0">
        <div className="col">
          <div className="row m-2 px-4 align-items-center">
            {/* logo */}
            <Link
              className="col-md-4 p-0 m-0 h2 row align-items-center justify-content-center"
              to="/"
            >
              <img
                src={logo}
                alt="Company Logo"
                className=""
                style={{ maxHeight: "6rem" }}
              />
            </Link>
            {/* userMenu */}
            <div className="col-md-8 p-0 m-0">
              <Menu />
            </div>
          </div>
          <div className="col">
            {/* page menu */}
            <Menu2 />
          </div>
        </div>
        {error && <div>404</div>}
        <div>{children}</div>
        <Footer />
        <div className="">
          <img
            id="loading-icon"
            src="/loading.svg"
            style={{
              zIndex: "10000",
              pointerEvents: "none",
              position: "fixed",
              padding: "20%",
              margin: "0",
              top: "0px",
              left: "0px",
              width: "100%",
              height: "100%",
              backgroundColor: "rgb(235, 235, 235, 0.3)",
            }}
            alt="..."
            className="d-none"
          />
        </div>
      </div>
    </div>
  );
};
export default Base;
