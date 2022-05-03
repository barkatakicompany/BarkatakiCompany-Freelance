import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signOutUser } from "./User/helper/auth";

const currentTab = (history, path) => {
  if (history.location.pathname.toString().indexOf(path) > -1) {
    return "text-grad nav-link active p-0";
  } else {
    return "text-dark nav-link p-0";
  }
};

const Menu = ({ history }) => { 
  return (
    <ul className="container row m-0 p-0 nav navigation">
      {!isAuthenticated() && (
        <li className="nav-item px-2">
          <Link className={currentTab(history, "/signin")} to="/signin">
            Login
          </Link>
        </li>
      )}
      {isAuthenticated() &&
        isAuthenticated().roles.find((x) => x === "ROLE_ADMIN") && (
          <li className="nav-item px-2">
            <div className="dropdown">
              <div
                className="dropdown-toggle "
                id="dropdownUserButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Admin
              </div>

              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="dropdownUserButton"
              >
                <div className="dropdown-item">
                  <Link
                    className={currentTab(history, "/admin/product")}
                    to="/admin/product"
                  >
                    Manage Product
                  </Link>
                </div>
                <div className="dropdown-item">
                  <Link
                    className={currentTab(history, "/admin/banner")}
                    to="/admin/banner"
                  >
                    Manage Banners
                  </Link>
                </div>
                <div className="dropdown-item">
                  <Link
                    className={currentTab(history, "/admin/coupoon")}
                    to="/admin/coupoon"
                  >
                    Manage Coupoon
                  </Link>
                </div>
                <div className="dropdown-item">
                  <Link
                    className={currentTab(history, "/admin/order")}
                    to="/admin/order"
                  >
                    Manage Order
                  </Link>
                </div>
                <div className="dropdown-item">
                  <Link
                    className={currentTab(history, "/admin/astrology")}
                    to="/admin/astro"
                  >
                    Manage Astrology
                  </Link>
                </div>
              </div>
            </div>
          </li>
        )}
      {isAuthenticated() &&
        isAuthenticated().roles.find(
          (x) => x === "ROLE_DEWALPANJIKA_ADMIN"
        ) && (
          <li className="nav-item px-2">
            <div className="dropdown">
              <div
                className="dropdown-toggle "
                id="dropdownUserButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dewal Panjika Admin
              </div>

              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="dropdownUserButton"
              >
                <div className="dropdown-item">
                  <Link
                    className={currentTab(history, "/admin/dewalpanjika/year")}
                    to="/admin/dewalpanjika/year"
                  >
                    Manage Year
                  </Link>
                </div>
                <div className="dropdown-item">
                  <Link
                    className={currentTab(history, "/admin/dewalpanjika/month")}
                    to="/admin/dewalpanjika/month"
                  >
                    Manage Month
                  </Link>
                </div>
                <div className="dropdown-item">
                  <Link
                    className={currentTab(history, "/admin/dewalpanjika/day")}
                    to="/admin/dewalpanjika/day"
                  >
                    Manage Day
                  </Link>
                </div>
                <div className="dropdown-item">
                  <Link
                    className={currentTab(history, "/admin/dewalpanjika/orders")}
                    to="/admin/dewalpanjika/orders"
                  >
                    Manage Orders
                  </Link>
                </div>
                
              </div>
            </div>
          </li>
        )}
      {isAuthenticated() && (
        <li className="nav-item px-2">
          <div className="dropdown">
            <div
              className="dropdown-toggle dropdown-no-arrow"
              id="dropdownUserButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <svg
                width="1.5rem"
                height="1.5rem"
                viewBox="0 0 16 16"
                className="bi bi-person-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                />
              </svg>
            </div>

            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="dropdownUserButton"
            >
              <div className="dropdown-item">
                <Link className={currentTab(history, "/user")} to="/user">
                  My Account
                </Link>
              </div>
              <div className="dropdown-item">
                <Link
                  className={currentTab(history, "/store/cart")}
                  to="/store/cart"
                >
                  My Cart
                </Link>
              </div>
              <div className="dropdown-item">
                <Link
                  className={currentTab(history, "/store/orders")}
                  to="/store/orders"
                >
                  My Orders
                </Link>
              </div>
              <div className="dropdown-item">
                <div
                  className={currentTab(history, "/signout")}
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();
                    signOutUser(() => {
                      window.location.reload();
                    });
                  }}
                >
                  Logout
                </div>
              </div>
            </div>
          </div>
        </li>
      )}
    </ul>
  );
};
export default withRouter(Menu);
