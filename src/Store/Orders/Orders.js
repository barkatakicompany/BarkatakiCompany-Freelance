import React, { useState, useEffect } from "react";
import Base from "../../Base";
import { Redirect } from "react-router-dom";
import { getOrderByUser, updatePaymentStatus } from "./helper/orderHelper";
import { isAuthenticated } from "../../User/helper/auth";
import { PAYMENT_KEY } from "../../backend";
const userdetails = isAuthenticated();
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [redirectTo, setRedirectTo] = useState(false);
  useEffect(() => {
    loadOrders();
  }, []);
  const loadOrders = () => {
    getOrderByUser().then((res) => {
      if (res.error) {
        //shoe error
      } else {
        setOrders(res);
      }
    });
  };
  const paymentStatus = (order) => {
    if (order.paymentStatus === 0) {
      return false;
    }
    if (order.paymentStatus === 1) {
      return true;
    }
  };
  const startPayment = (order) => (e) => {
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
            console.log(res);
          } else {
            loadOrders();
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
    rzp1.open();
    e.preventDefault();
  };
  const doRedirect = () => {
    if (redirectTo) {
      return <Redirect to={redirectTo} />;
    }
  };
  return (
    <Base>
      <div className="col side-spacer-small justify-content-center">
        <div className="h3 text-center">My Orders</div>
        {orders &&
          orders.map((order, i) => {
            return (
              <div key={i} className="row justify-content-center m-0 p-0">
                <div className="col m-4 bg-light card border shadow p-0">
                  <div className="row m-0 justify-content-between card-header">
                    <div
                      className="col-md m-0 p-2"
                      style={{ textAlign: "center" }}
                    >
                      <h5 className="m-0 p-0">Order Id</h5>
                      <p className="m-0 p-0">#{order._id}</p>
                    </div>
                    <div
                      className="col-md m-0 p-2"
                      style={{ textAlign: "center" }}
                    >
                      <h5 className="p-0 m-0">Dated</h5>
                      <p className="m-0 p-0">
                        {order.createdAt.substring(0, 10)}
                      </p>
                    </div>

                    <div
                      className="col-md m-0 p-2"
                      style={{ textAlign: "center" }}
                    >
                      <h5 className="p-0 m-0">Discounts</h5>
                      <p className="m-0 p-0">
                        ₹{order.coupoonDiscount.toFixed(2)}
                      </p>
                    </div>
                    <div
                      className="col-md m-0 p-2"
                      style={{ textAlign: "center" }}
                    >
                      <h5 className="p-0 m-0">Postage & Packing</h5>
                      <p className="m-0 p-0">
                        ₹{order.shippingCharges.toFixed(2)}
                      </p>
                    </div>
                    <div
                      className="col-md m-0 p-2"
                      style={{ textAlign: "center" }}
                    >
                      <h5 className="m-0 p-0">Total</h5>
                      <p className="m-0 p-0"> ₹{order.netAmount.toFixed(2)}</p>
                    </div>
                    <div
                      className="col-md m-0 p-2"
                      style={{ textAlign: "center" }}
                    >
                      {paymentStatus(order) ? (
                        <div>
                          <h5 className="m-0 p-0">Payment Successfull</h5>
                          <p className="m-0 p-0">
                            {" "}
                            {order.paymentId.replace("pay_", "#")}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <div
                            className="btn m-1 bg-danger text-white"
                            onClick={startPayment(order)}
                          >
                            Retry Payment
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row m-0 p-0">
                    <div className="col-md p-3">
                      <div className="row p-0 m-0 justify-content-between  border-bottom pb-1">
                        <p
                          className="col-7 col-md-8 m-0 p-0"
                          style={{ textAlign: "left" }}
                        >
                          <b>Product</b>
                        </p>
                        <p
                          className="col-2 col-md-1 m-0 p-0"
                          style={{ textAlign: "center" }}
                        >
                          <b>Qty</b>
                        </p>
                        <p
                          className="col-3 m-0 p-0"
                          style={{ textAlign: "right" }}
                        >
                          <b>Price(₹)</b>
                        </p>
                      </div>

                      {order.items &&
                        order.items.map((item, i) => {
                          return (
                            <div
                              key={i}
                              className="row m-0 p-0 justify-content-between pt-1"
                            >
                              <p
                                className="col-7 col-md-8 m-0 p-0 text-1-line"
                                style={{ textAlign: "left" }}
                              >
                                <a
                                  href={`/store/product/${item.product.name.replace(
                                    "/",
                                    ""
                                  )}/${item.product._id}`}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {item.product.name.split("~")[0]}
                                </a>
                              </p>
                              <p
                                className="col-2 col-md-1 m-0 p-0"
                                style={{ textAlign: "center" }}
                              >
                                {item.qty}
                              </p>
                              <p
                                className="col-3 m-0 p-0"
                                style={{ textAlign: "right" }}
                              >
                                {item.product.stocks[0].sellPrice.toFixed(2)}
                              </p>
                            </div>
                          );
                        })}
                    </div>
                    <div className="border-right web-only"></div>
                    <div className="col-md p-3">
                      <p className="m-0 p-0">
                        <b>Courier Partner: </b>
                        {order.courierPartner}
                      </p>
                      <p className="m-0 p-0">
                        <b>Tracking Id: </b>
                        {order.trackingId}
                      </p>
                      <p className="m-0 p-0">
                        <b>Shipping Address:</b>
                        <p className="" style={{ textAlign: "left" }}>
                          {order.shippingAddress.line1.join(", ")} <br />
                          {order.shippingAddress.city},{" "}
                          {order.shippingAddress.state},{" "}
                          {order.shippingAddress.country}
                          {" - "}
                          {order.shippingAddress.pincode}
                          <br />
                          {order.shippingAddress.mobile}
                        </p>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        {orders.length === 0 && (
          <div
            className="row justify-content-center p-4"
            style={{ minHeight: "20rem" }}
          >
            <div className="col text-center">
              <svg
                height="200"
                viewBox="0 -11 493.78 493"
                width="200"
                className="mr-3"
              >
                <path d="m378.351562 70.472656c.214844.015625.429688.03125.648438.03125.371094 0 .742188-.03125 1.105469-.082031 9.722656.199219 17.503906 8.128906 17.515625 17.851563 0 4.417968 3.582031 8 8 8 4.417968 0 8-3.582032 8-8-.019532-15.902344-11.089844-29.660157-26.621094-33.082032v-7.6875c0-4.417968-3.582031-8-8-8s-8 3.582032-8 8v8.050782c-16.421875 4.390624-27.046875 20.277343-24.832031 37.132812 2.214843 16.855469 16.582031 29.457031 33.582031 29.457031 9.871094 0 17.871094 8.003907 17.871094 17.875 0 9.867188-8 17.871094-17.871094 17.871094s-17.871094-8.003906-17.871094-17.871094c0-4.417969-3.582031-8-8-8-4.417968 0-8 3.582031-8 8 .019532 15.328125 10.316406 28.738281 25.121094 32.71875v8.765625c0 4.417969 3.582031 8 8 8s8-3.582031 8-8v-8.398437c16.894531-3.699219 28.289062-19.535157 26.425781-36.730469-1.859375-17.195312-16.378906-30.226562-33.675781-30.222656-9.597656.003906-17.484375-7.574219-17.863281-17.164063-.375-9.589843 6.894531-17.765625 16.464843-18.511719zm0 0" />
                <path d="m380.207031.390625c-49.214843 0-91.214843 32.113281-106.949219 75.113281h-198.558593c-4.398438 0-7.96875 3.964844-8 8.359375l-1.890625 280.640625h-56.597656c-4.417969 0-8.210938 3.199219-8.210938 7.625v35.613282c.101562 33.527343 26.507812 61.070312 60 62.585937v.175781h247v-.234375c2 .074219 2.824219.234375 4.089844.234375h.171875c34.664062-.054687 62.738281-28.171875 62.738281-62.835937v-180.0625c2 .109375 4.117188.167969 6.1875.167969 62.628906 0 113.59375-51.0625 113.59375-113.695313 0-62.628906-50.941406-113.6875-113.574219-113.6875zm-317.164062 454.113281h-.050781c-25.878907-.035156-46.875-20.960937-46.992188-46.84375v-27.15625h232v27.042969c.011719 16.695313 6.679688 32.699219 18.523438 44.46875.839843.839844 1.882812 1.488281 2.761718 2.488281zm294.957031-46.84375c.003906 25.835938-20.914062 46.792969-46.746094 46.84375h-.152344c-25.9375-.046875-46.972656-21.015625-47.101562-46.949218v-35.425782c.066406-2.046875-.714844-4.027344-2.164062-5.472656-1.449219-1.445312-3.429688-2.222656-5.472657-2.152344h-175.554687l1.835937-273h186.171875c-1.417968 7.324219-2.152344 14.761719-2.191406 22.21875-.015625 15.769532 3.273438 31.363282 9.65625 45.78125h-75.5625c-4.421875 0-8 3.582032-8 8 0 4.417969 3.578125 8 8 8h84.242188c16.503906 25.953125 42.886718 44.046875 73.039062 50.101563zm22.207031-195.882812c-53.890625 0-97.582031-43.6875-97.578125-97.582032 0-53.894531 43.6875-97.582031 97.582032-97.582031 53.890624 0 97.578124 43.691407 97.578124 97.582031-.058593 53.867188-43.710937 97.523438-97.582031 97.582032zm0 0" />
                <path d="m149.367188 212.746094c-14.121094 0-25.605469 11.121094-25.605469 24.792968 0 13.671876 11.484375 24.792969 25.605469 24.792969 14.121093 0 25.609374-11.121093 25.609374-24.792969 0-13.671874-11.488281-24.792968-25.609374-24.792968zm0 33.585937c-5.300782 0-9.605469-3.945312-9.605469-8.792969 0-4.851562 4.308593-8.792968 9.605469-8.792968 5.296874 0 9.609374 3.945312 9.609374 8.792968 0 4.847657-4.3125 8.792969-9.609374 8.792969zm0 0" />
                <path d="m192.71875 237.503906c0 4.417969 3.578125 8 8 8h106.65625c4.417969 0 8-3.582031 8-8 0-4.417968-3.582031-8-8-8h-106.65625c-4.421875 0-8 3.582032-8 8zm0 0" />
                <path d="m149.367188 143.203125c-14.121094 0-25.605469 11.125-25.605469 24.796875s11.484375 24.792969 25.605469 24.792969c14.121093 0 25.609374-11.121094 25.609374-24.792969s-11.488281-24.796875-25.609374-24.796875zm0 33.589844c-5.300782 0-9.605469-3.945313-9.605469-8.792969s4.308593-8.796875 9.605469-8.796875c5.296874 0 9.609374 3.945313 9.609374 8.796875 0 4.847656-4.3125 8.796875-9.609374 8.796875zm0 0" />
                <path d="m149.367188 282.28125c-14.121094 0-25.605469 11.121094-25.605469 24.792969s11.484375 24.792969 25.605469 24.792969c14.121093 0 25.609374-11.121094 25.609374-24.792969s-11.488281-24.792969-25.609374-24.792969zm0 33.585938c-5.300782 0-9.605469-3.941407-9.605469-8.792969 0-4.847657 4.308593-8.792969 9.605469-8.792969 5.296874 0 9.609374 3.945312 9.609374 8.792969 0 4.847656-4.3125 8.792969-9.609374 8.792969zm0 0" />
                <path d="m307.375 299.503906h-106.65625c-4.421875 0-8 3.582032-8 8 0 4.417969 3.578125 8 8 8h106.65625c4.417969 0 8-3.582031 8-8 0-4.417968-3.582031-8-8-8zm0 0" />
              </svg>
              <p className="p-4 m-4">No orders from you...!!</p>
            </div>
          </div>
        )}
      </div>
      {doRedirect()}
    </Base>
  );
};
export default Orders;
