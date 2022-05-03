import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signOutUser } from "./User/helper/auth";

const currentTab = (history, path) => {
  if (history.location.pathname.toString().indexOf(path) > -1) {
    return "text-grad nav-link active p-0";
  } else {
    
    return history.location.pathname.toString().indexOf("/astrology") > -1
      ? "nav-link p-0 text-light"
      : "nav-link p-0 text-dark";
  }
};

const Menu2 = ({ history }, linkColor='#ffffff') => {
  return (
    <ul className="row justify-content-center align-items-center nav navigation p-1 ">
      <li className="nav-item px-2">
        <Link className={currentTab(history, "/store")} to="/store">
          <strong>Store</strong>
        </Link>
      </li>
      <li className="nav-item px-2">
        <Link className={currentTab(history, "/astrology")} to="/astrology">
          <strong>Astrology</strong>
        </Link>
      </li>
      <li className="nav-item px-2">
        <Link
          className={currentTab(history, "/dewalpanjika")}
          to="/dewalpanjika"
        >
          <strong>Dewal Panjika</strong>
        </Link>
      </li>
      <li className="nav-item px-2">
        <Link
          className={currentTab(history, "/printingsolution")}
          to="/printingsolution"
        >
          <strong>Printing Solutions</strong>
        </Link>
      </li>
      <li className="nav-item px-2">
        <Link
          className={currentTab(history, "/barkatakifoundation")}
          to="/barkatakifoundation"
        >
          <strong>Barkataki Foundation</strong>
        </Link>
      </li>
    </ul>
  );
};
export default withRouter(Menu2);
