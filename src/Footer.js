import React from "react";
import { Link, withRouter } from "react-router-dom";
const textColor = (history) => {
  return history.location.pathname.toString().indexOf("/astrology") > -1
    ? " nav-link p-0 text-light "
    : " nav-link p-0 text-dark ";
};
const Footer = ({ history }) => {
  return (
    <div className="container-fluid side-spacer border-top">
      <div className="row mb-2">
        <div className="col-sm pt-3">
          <ul className="nav flex-column">
            <li className="font-weight-bold pb-2">Product & Services</li>
            <li className="  nav-item">
              <Link className={textColor(history)} to="/dewalpanjika">
                Dewal Panjika App
              </Link>
            </li>
            <li className="  nav-item">Offset Printing</li>
            <li className="  nav-item">Publishing</li>
          </ul>
        </div>
        <div className="col-sm pt-3">
          <ul className="nav flex-column">
            <li className="font-weight-bold pb-2">Social Media</li>
            <li className="  nav-item">
              <a
                style={{
                  textDecoration: "none",
                  color:
                    ("" + textColor(history)).indexOf("dark") > -1
                      ? "#000000"
                      : "#ffffff",
                }}
                href="https://www.facebook.com/Barkataki-Company-983230688507601"
              >
                Facebook
              </a>
            </li>
            <li className="  nav-item">
              <a
                style={{
                  textDecoration: "none",
                  color:
                    ("" + textColor(history)).indexOf("dark") > -1
                      ? "#000000"
                      : "#ffffff",
                }}
                href="https://www.instagram.com/barkataki_company/"
              >
                Instagram
              </a>
            </li>
            <li className="  nav-item">
              <a
                style={{
                  textDecoration: "none",
                  color:
                    ("" + textColor(history)).indexOf("dark") > -1
                      ? "#000000"
                      : "#ffffff",
                }}
                href="https://twitter.com/BarkatakiC"
              >
                Twitter
              </a>
            </li>
            <li className="  nav-item">
              <a
                style={{
                  textDecoration: "none",
                  color:
                    ("" + textColor(history)).indexOf("dark") > -1
                      ? "#000000"
                      : "#ffffff",
                }}
                href="https://www.youtube.com/channel/UCebsKgM-N78OB80uMMTf_DA"
              >
                Youtube
              </a>
            </li>
          </ul>
        </div>
        <div className="col-sm pt-3">
          <ul className="nav flex-column">
            <li className="font-weight-bold pb-2">Support</li>

            <li className={"  nav-item"}>
              <a
                href="mailto: support@barkataki.com"
                style={{
                  textDecoration: "none",
                  color:
                    ("" + textColor(history)).indexOf("dark") > -1
                      ? "#000000"
                      : "#ffffff",
                }}
              >
                Write to our CEO
              </a>
            </li>
            <li className="  nav-item">
              <a
                href="mailto: support@barkataki.com"
                style={{
                  textDecoration: "none",
                  color:
                    ("" + textColor(history)).indexOf("dark") > -1
                      ? "#000000"
                      : "#ffffff",
                }}
              >
                Email Us
              </a>
            </li>
            <li className="  nav-item">
              <a
                href="whatsapp://send?phone=+91-9435009691"
                style={{
                  textDecoration: "none",
                  color:
                    ("" + textColor(history)).indexOf("dark") > -1
                      ? "#000000"
                      : "#ffffff",
                }}
              >
                Chat With Us ↗
              </a>
            </li>
            <li className="  nav-item">
              <a
                href="tel:9435009691"
                style={{
                  textDecoration: "none",
                  color:
                    ("" + textColor(history)).indexOf("dark") > -1
                      ? "#000000"
                      : "#ffffff",
                }}
              >
                Phone
              </a>
            </li>
          </ul>
        </div>
        <div className="col-sm pt-3">
          <ul className="nav flex-column">
            <li className="font-weight-bold pb-2">Registered Office</li>
            <li className="nav-item">
              Barkataki Company,
              <br /> Barkataki Market A.T. Road,
              <br /> Jorhat-785001
            </li>
            <li className="nav-item"></li>
          </ul>
        </div>
      </div>
      <center>
        <Link to="/privacypolicy" className={textColor(history)}>
          Privacy Policy
        </Link>
        <Link to="/termsandconditions" className={textColor(history)}>
          Terms and Conditions
        </Link>
      </center>
      <p className="text-center">
        Copyright ⓒ 1898-2021 Barkataki Company, All Rights reserved.
      </p>
    </div>
  );
};
export default withRouter(Footer);
