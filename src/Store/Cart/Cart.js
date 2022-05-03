import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { API, PAYMENT_KEY } from "../../backend";
import Base from "../../Base";
import { isAuthenticated } from "../../User/helper/auth";
import { createOrder, updatePaymentStatus } from "../Orders/helper/orderHelper";
import {
  getCartItemsByUserId,
  getCoupoonByCode,
  updateCartItem,
} from "./helper/cartHelper";

const userdetails = isAuthenticated();

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const cartQtys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [redirectTo, setRedirectTo] = useState(false);
  var [totals, setTotals] = useState({
    subTotal: 0,
    coupoonDiscounts: 0,
    postnpack: 40,
  });
  const [order, setOrder] = useState({
    shippingAddress: {
      recieverName: "",
      line1: ["", ""],
      pincode: "",
      city: "",
      state: "",
      country: "INDIA",
      mobile: "",
      otp: "",
    },
    coupoon: "",
    coupoonValid: false,
  });
  const [summaryShow, setSummaryShow] = useState({
    amountDetails: true,
    shippingDetails: false,
  });
  var { subTotal, coupoonDiscounts, postnpack } = totals;
  useEffect(() => {
    loadCartItems();
  }, []);
  const loadCartItems = () => {
    getCartItemsByUserId().then((res) => {
      if (res.status === 0) {
        // alert(res.error);
        setCartItems([]);
      } else {
        setCartItems(res);
      }
    });
  };
  const doRedirect = () => {
    if (redirectTo) {
      return <Redirect to={redirectTo} />;
    }
  };
  const priceSummary = () => {
    return (
      <div className="">
        <div className="border-bottom">
          <div className="row justify-content-center">
            <h5 className="col-4" style={{ textAlign: "left" }}>
              Product
            </h5>
            <h5 className="col-2" style={{ textAlign: "center" }}>
              Qty
            </h5>
            <h5 className="col-3" style={{ textAlign: "center" }}>
              Price (₹)
            </h5>
            <h5 className="col-3" style={{ textAlign: "right" }}>
              Total (₹)
            </h5>
          </div>
        </div>
        <div className="border-bottom">
          {cartItems &&
            cartItems.map((ci, i) => {
              subTotal +=
                ci.product.stocks
                  .find((stck) => stck._id === ci.stock)
                  .sellPrice.toFixed(2) * ci.qty;

              subTotal - coupoonDiscounts > 500
                ? (postnpack = 0)
                : (postnpack = 40);
              return (
                <div key={i} className="row justify-content-center">
                  <p
                    className="col-4 text-1-line"
                    style={{ textAlign: "left" }}
                  >
                    {ci.product.name.split("~")[0]}
                  </p>
                  <p className="col-2" style={{ textAlign: "center" }}>
                    {ci.qty}
                  </p>
                  <p className="col-3" style={{ textAlign: "center" }}>
                    {ci.product.stocks
                      .find((stck) => stck._id === ci.stock)
                      .sellPrice.toFixed(2)}
                  </p>
                  <p className="col-3" style={{ textAlign: "right" }}>
                    {(
                      ci.product.stocks
                        .find((stck) => stck._id === ci.stock)
                        .sellPrice.toFixed(2) * ci.qty
                    ).toFixed(2)}
                  </p>
                </div>
              );
            })}
        </div>
        <div className="border-bottom">
          <p style={{ textAlign: "right" }}>
            Sub Total:&emsp;
            <b>{subTotal.toFixed(2)}</b>
          </p>
          {coupoonDiscounts > 0 && (
            <p className="" style={{ textAlign: "right" }}>
              Coupoon Discounts: &emsp;-&nbsp;{coupoonDiscounts.toFixed(2)}
            </p>
          )}
          <p className="" style={{ textAlign: "right" }}>
            Postage & Packing: &emsp;+&nbsp;
            {postnpack.toFixed(2)}
          </p>
        </div>
        <big>
          <p className="" style={{ textAlign: "right" }}>
            Order Total:&emsp;
            <b> {(subTotal + postnpack - coupoonDiscounts).toFixed(2)}</b>
          </p>
        </big>
        <div className="row justify-content-center m-2">
          {coupoonDiscounts === 0 ? (
            <div className="input-group col-md-6">
              <input
                className="form-control"
                type="text"
                placeholder="Coupoon Code"
                value={order.coupoon}
                onChange={(e) => {
                  setOrder({ ...order, coupoon: e.target.value });
                }}
              />
              <div class="input-group-append">
                <button
                  className="btn input-group-text"
                  onClick={() => {
                    if (order.coupoon) {
                      getCoupoonByCode(order.coupoon).then((res) => {
                        if (res.error) {
                          alert(res.error);
                        } else {
                          var discAmt = 0;
                          if (res.discType === 0) {
                            discAmt = res.discAmt;
                          }
                          if (res.discType === 1) {
                            discAmt = (subTotal * res.discAmt) / 100;
                          }
                          if (discAmt > res.maxDisc) {
                            discAmt = res.maxDisc;
                          }
                          if (discAmt > subTotal) {
                            discAmt = subTotal;
                          }
                          setTotals({ ...totals, coupoonDiscounts: discAmt });
                          subTotal - coupoonDiscounts > 500
                            ? (postnpack = 0)
                            : (postnpack = 40);
                          setOrder({ ...order, coupoonValid: true });
                        }
                      });
                    } else {
                      alert("Please enter a coupoon.");
                    }
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          ) : (
            <div className="input-group col-md-6">
              <input
                className="form-control"
                type="text"
                placeholder="Coupoon Code"
                value={order.coupoon}
                readOnly
              />

              <div class="input-group-append">
                <button
                  className="btn input-group-text"
                  onClick={() => {
                    //todo
                    setTotals({ ...totals, coupoonDiscounts: 0 });
                    setOrder({ ...order, coupoonValid: false, coupoon: "" });
                    subTotal - coupoonDiscounts > 500
                      ? (postnpack = 0)
                      : (postnpack = 40);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="row justify-content-center m-2">
          <div
            className="btn btn-success"
            onClick={() => {
              setSummaryShow({
                ...summaryShow,
                amountDetails: false,
                shippingDetails: true,
              });
            }}
          >
            Confirm
          </div>
        </div>
      </div>
    );
  };
  const startPayment = (order, e) => {
    var options = {
      key: PAYMENT_KEY, // Enter the Key ID generated from the Dashboard
      order_id: order.razorpayOrderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      prefill: {
        name: userdetails.name,
        email: userdetails.email,
        contact: userdetails.mobile,
      },
      handler: function (response) {
        updatePaymentStatus(response, order._id).then((res) => {
          if (res.error) {
            //show error
          } else {
            setRedirectTo("/store/orders");
          }
        });
      },
      modal: {
        ondismiss: function () {
          setRedirectTo("/store/orders");
        },
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
  };
  const shippingSummary = () => {
    return (
      <div className="">
        <div className="row m-0 mb-2 align-items-center justify-content-between">
          <h5 className="text-left">Shipping Address</h5>
          <div
            className="btn btn-light"
            onClick={() => {
              setSummaryShow({
                ...summaryShow,
                amountDetails: true,
                shippingDetails: false,
              });
            }}
          >
            &#x2190;
          </div>
        </div>
        <div className="row justify-content-start">
          <div className="col-md-6">
            {/* <label for="sline1">Line 1</label> */}
            <div className="input-group mb-2">
              <input
                id="sline1"
                type="text"
                placeholder="House/Apartment/Line 1"
                className="form-control"
                value={order.shippingAddress.line1[0]}
                onChange={(e) => {
                  var sa = order.shippingAddress;
                  sa.line1[0] = e.target.value;
                  setOrder({ ...order, shippingAddress: sa });
                }}
              />
            </div>
          </div>
          <div className="col-md-6">
            {/* <label for="sline2">Line 2</label> */}
            <div className="input-group mb-2">
              <input
                id="sline2"
                type="text"
                placeholder="Locality/Landmark/Line 2"
                className="form-control"
                value={order.shippingAddress.line1[1]}
                onChange={(e) => {
                  var sa = order.shippingAddress;
                  sa.line1[1] = e.target.value;
                  setOrder({ ...order, shippingAddress: sa });
                }}
              />
            </div>
          </div>
          <div className="col-md-6">
            {/* <label for="city">City</label> */}
            <div className="input-group mb-2">
              <input
                id="city"
                type="text"
                placeholder="City"
                className="form-control"
                value={order.shippingAddress.city}
                onChange={(e) => {
                  var sa = order.shippingAddress;
                  sa.city = e.target.value;
                  setOrder({ ...order, shippingAddress: sa });
                }}
              />
            </div>
          </div>
          <div className="col-md-6">
            {/* <label for="state">State</label> */}
            <div className="input-group mb-2">
              <input
                id="state"
                type="text"
                placeholder="State"
                className="form-control"
                value={order.shippingAddress.state}
                onChange={(e) => {
                  var sa = order.shippingAddress;
                  sa.state = e.target.value;
                  setOrder({ ...order, shippingAddress: sa });
                }}
              />
            </div>
          </div>
          <div className="col-md-6">
            {/* <label for="country">Country</label> */}
            <div className="input-group mb-2">
              <input
                id="country"
                type="text"
                placeholder="Country"
                className="form-control"
                readOnly
                value={order.shippingAddress.country}
                onChange={(e) => {
                  var sa = order.shippingAddress;
                  sa.country = e.target.value;
                  setOrder({ ...order, shippingAddress: sa });
                }}
              />
            </div>
          </div>
          <div className="col-md-6">
            {/* <label for="pincode">Pincode</label> */}
            <div className="input-group mb-2">
              <input
                id="pincode"
                type="text"
                placeholder="Pincode"
                className="form-control"
                value={order.shippingAddress.pincode}
                onChange={(e) => {
                  var sa = order.shippingAddress;
                  sa.pincode = e.target.value;
                  setOrder({ ...order, shippingAddress: sa });
                }}
              />
            </div>
          </div>
          <div className="col-md-6">
            {/* <label for="mobile">Mobile</label> */}
            <div className="input-group mb-2">
              <input
                id="mobile"
                type="text"
                placeholder="Mobile"
                className="form-control"
                value={order.shippingAddress.mobile}
                onChange={(e) => {
                  var sa = order.shippingAddress;
                  sa.mobile = e.target.value;
                  setOrder({ ...order, shippingAddress: sa });
                }}
              />
            </div>
          </div>
          {/* <div className="col-md-6">
            <label for="mobileOtp">Otp</label>
            <div className="input-group mb-2">
              <input
                id="mobileOtp"
                type="text"
                placeholder="One Time Password"
                className="form-control"
                value={order.shippingAddress.otp}
                onChange={(e) => {
                  var sa = order.shippingAddress;
                  sa.otp = e.target.value;
                  setOrder({ ...order, shippingAddress: sa });
                }}
              />
            </div>
          </div> */}
        </div>
        <div className="m-4 row justify-content-center">
          <div
            className="button p-3"
            onClick={(e) => {
              if (order.shippingAddress.line1[0].length === 0) {
                alert("Please enter valid house/apartment.");
                return;
              }
              if (order.shippingAddress.line1[1].length === 0) {
                alert("Please enter valid locality.");
                return;
              }
              if (
                order.shippingAddress.pincode.length !== 6 ||
                !parseInt(order.shippingAddress.pincode)
              ) {
                alert("Please enter valid pincode.");
                return;
              }
              if (order.shippingAddress.city.length === 0) {
                alert("Please enter valid city.");
                return;
              }
              if (order.shippingAddress.state.length === 0) {
                alert("Please enter valid state.");
                return;
              }
              if (order.shippingAddress.country.length === 0) {
                alert("Please enter valid country.");
                return;
              }
              if (
                order.shippingAddress.mobile.length !== 10 ||
                !parseInt(order.shippingAddress.pincode)
              ) {
                alert("Please enter valid mobile.");
                return;
              }
              // if (order.billingAddress.line1[0].length === 0) {
              //   alert("Please enter valid house/apartment.");
              //   return;
              // }
              // if (order.billingAddress.line1[1].length === 0) {
              //   alert("Please enter valid locality.");
              //   return;
              // }
              // if (
              //   order.billingAddress.pincode.length !== 6 ||
              //   !parseInt(order.billingAddress.pincode)
              // ) {
              //   alert("Please enter valid pincode.");
              //   return;
              // }
              // if (order.billingAddress.city.length === 0) {
              //   alert("Please enter valid city.");
              //   return;
              // }
              // if (order.billingAddress.state.length === 0) {
              //   alert("Please enter valid state.");
              //   return;
              // }
              // if (order.billingAddress.country.length === 0) {
              //   alert("Please enter valid country.");
              //   return;
              // }
              // if (
              //   order.billingAddress.mobile.length !== 10 ||
              //   !parseInt(order.billingAddress.mobile)
              // ) {
              //   alert("Please enter valid mobile.");
              //   return;
              // }

              createOrder(order).then((res) => {
                if (!res.error) {
                  startPayment(res, e);
                } else {
                  alert(res.error);
                }
              });
            }}
          >
            Order Now
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base>
      <div className="side-spacer-small">
        {doRedirect()}
        <div className="row m-0 p-0 justify-content-center ">
          <div className="h3">My Cart</div>
        </div>
        {cartItems.length === 0 ? (
          <div
            className="row justify-content-center p-4"
            style={{ minHeight: "20rem" }}
          >
            <div className="col text-center">
              <svg
                height="200"
                width="200"
                x="0px"
                y="0px"
                viewBox="0 0 450.391 450.391"
                style={{ enableBackground: "new 0 0 450.391 450.391" }}
              >
                <g>
                  <g>
                    <g>
                      <path
                        d="M143.673,350.322c-25.969,0-47.02,21.052-47.02,47.02c0,25.969,21.052,47.02,47.02,47.02
				c25.969,0,47.02-21.052,47.02-47.02C190.694,371.374,169.642,350.322,143.673,350.322z M143.673,423.465
				c-14.427,0-26.122-11.695-26.122-26.122c0-14.427,11.695-26.122,26.122-26.122c14.427,0,26.122,11.695,26.122,26.122
				C169.796,411.77,158.1,423.465,143.673,423.465z"
                      />
                      <path
                        d="M342.204,350.322c-25.969,0-47.02,21.052-47.02,47.02c0,25.969,21.052,47.02,47.02,47.02s47.02-21.052,47.02-47.02
				C389.224,371.374,368.173,350.322,342.204,350.322z M342.204,423.465c-14.427,0-26.122-11.695-26.122-26.122
				c0-14.427,11.695-26.122,26.122-26.122s26.122,11.695,26.122,26.122C368.327,411.77,356.631,423.465,342.204,423.465z"
                      />
                      <path
                        d="M448.261,76.037c-2.176-2.377-5.153-3.865-8.359-4.18L99.788,67.155L90.384,38.42
				C83.759,19.211,65.771,6.243,45.453,6.028H10.449C4.678,6.028,0,10.706,0,16.477s4.678,10.449,10.449,10.449h35.004
				c11.361,0.251,21.365,7.546,25.078,18.286l66.351,200.098l-5.224,12.016c-5.827,15.026-4.077,31.938,4.702,45.453
				c8.695,13.274,23.323,21.466,39.184,21.943h203.233c5.771,0,10.449-4.678,10.449-10.449c0-5.771-4.678-10.449-10.449-10.449
				H175.543c-8.957-0.224-17.202-4.936-21.943-12.539c-4.688-7.51-5.651-16.762-2.612-25.078l4.18-9.404l219.951-22.988
				c24.16-2.661,44.034-20.233,49.633-43.886l25.078-105.012C450.96,81.893,450.36,78.492,448.261,76.037z M404.376,185.228
				c-3.392,15.226-16.319,26.457-31.869,27.69l-217.339,22.465L106.58,88.053l320.261,4.702L404.376,185.228z"
                      />
                    </g>
                  </g>
                </g>
              </svg>
              <p className="p-4 m-4">Your cart looks empty..!</p>
            </div>
          </div>
        ) : (
          <div className="row m-0 p-0 justify-content-center">
            <div className="col-md-6 text-center pt-2">
              <div className="row m-0 p-0 justify-content-between">
                {cartItems.map((ci, i) => {
                  return (
                    <div className="col-md-6 ">
                      <div className="row p-2" key={i}>
                        <div className="col-4 rounded border p-0 ">
                          {ci.product.images.length > 0 ? (
                            <img
                              src={`${API}/filesync?fileId=${ci.product.images[0]._id}`}
                              alt=""
                              className="h-100 w-100"
                            />
                          ) : (
                            <div className="h-100 w-100"></div>
                          )}
                        </div>
                        <div className="col-8 text-left">
                          <a
                            href={`/store/product/${ci.product.name.replace(
                              "/",
                              ""
                            )}/${ci.product._id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p text-2-line"
                          >
                            {ci.product.name.split("~")[0]}
                          </a>

                          <div className="p row m-0 py-2">
                            <span className="mr-2">
                              ₹
                              {ci.product.stocks
                                .find((stck) => stck._id === ci.stock)
                                .sellPrice.toFixed(2)}
                            </span>
                            {ci.product.stocks.find(
                              (stck) => stck._id === ci.stock
                            ).mrp >
                              ci.product.stocks.find(
                                (stck) => stck._id === ci.stock
                              ).sellPrice && (
                              <span style={{ textDecoration: "line-through" }}>
                                ₹
                                {ci.product.stocks
                                  .find((stck) => stck._id === ci.stock)
                                  .mrp.toFixed(2)}
                              </span>
                            )}
                          </div>
                          {/* qty */}
                          <div className="d-inline-flex">
                            <div class="dropdown">
                              <div
                                class="dropdown-toggle rounded px-3 py-1 border"
                                style={{ cursor: "pointer" }}
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                {ci.qty}
                              </div>
                              <div class="dropdown-menu">
                                {cartQtys.map((cq, i) => {
                                  return (
                                    <div
                                      key={i}
                                      onClick={() => {
                                        var crtitm = ci;
                                        crtitm.qty = cq;
                                        updateCartItem(crtitm).then((res) => {
                                          if (res.status === 0) {
                                            alert(res.error);
                                          } else {
                                            alert("Item updated successfully.");
                                            loadCartItems();
                                          }
                                        });
                                      }}
                                      class="dropdown-item"
                                      style={{ cursor: "pointer" }}
                                    >
                                      {cq + (cq === 0 ? " (Delete)" : "")}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-md-6 text-center pt-2">
              {summaryShow.amountDetails && priceSummary()}
              {summaryShow.shippingDetails && shippingSummary()}
            </div>
          </div>
        )}
      </div>
    </Base>
  );
}
