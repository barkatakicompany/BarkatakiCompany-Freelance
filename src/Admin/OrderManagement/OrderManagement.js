import React, { useEffect, useState } from "react";
import Base from "../../Base";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getOrdersByFilter } from "./helper/apiCalls";

const OrderManagement = () => {
  const [orderFilter, setOrderFilter] = useState({
    fromDate: "",
    toDate: "",
    paymentStatus: "",
    pincode: "",
    _id: "",
    coupoonCode: "",
    trackingId: "",
    paymentId: "",
  });
  const [orders, setOrders] = useState([]);
  const DateCustomInput = ({ value, onClick }) => (
    <input
      type="text"
      className="form-control"
      placeholder="Select date"
      onClick={onClick}
      value={value}
    />
  );
  const paymentStatus = (order) => {
    if (order.paymentStatus === 0) {
      return false;
    }
    if (order.paymentStatus === 1) {
      return true;
    }
  };
  useEffect(() => {
    getOrdersByFilter(orderFilter).then((res) => {
      setOrders(res);
    });
  }, [orderFilter]);
  return (
    <Base>
      {/* {JSON.stringify(orders)} */}
      <div className="row container-fluid justify-content-center p-4 align-items-top border-top">
        <div className="col-3">
          <div className="">
            <big>
              <label>Search Order</label>
            </big>
          </div>
          <label htmlFor="id">Id</label>
          <input
            id="id"
            type="text"
            className="form-control input-group mb-3"
            placeholder="Id"
            value={orderFilter._id}
            onChange={(e) => {
              setOrderFilter({ ...orderFilter, _id: e.target.value });
            }}
          />
          <label htmlFor="startDate">From</label>
          <div className="input-group mb-3">
            <DatePicker
              className=""
              id="startDate"
              name="startDate"
              dateFormat="dd/MM/yyyy"
              isClearable
              shouldCloseOnSelect={true}
              closeOnScroll={true}
              selected={orderFilter.fromDate}
              onChange={(date) =>
                setOrderFilter({ ...orderFilter, fromDate: date })
              }
              customInput={<DateCustomInput />}
            />
          </div>
          <label htmlFor="toDate">To</label>
          <div className="input-group mb-3">
            <DatePicker
              className=""
              id="toDate"
              name="toDate"
              dateFormat="dd/MM/yyyy"
              isClearable
              shouldCloseOnSelect={true}
              closeOnScroll={true}
              selected={orderFilter.toDate}
              onChange={(date) =>
                setOrderFilter({ ...orderFilter, toDate: date })
              }
              customInput={<DateCustomInput />}
            />
          </div>
          <label htmlFor="payStatus">Payment Status</label>
          <select
            className="custom-select input-group mb-3"
            onChange={(e) =>
              setOrderFilter({ ...orderFilter, paymentStatus: e.target.value })
            }
          >
            <option value="1">Paid</option>
            <option value="0">Unpaid</option>
          </select>
          <label htmlFor="paymentId">Payment Id</label>
          <input
            id="paymentId"
            type="text"
            className="form-control input-group mb-3"
            placeholder="Payment Id"
            value={orderFilter.paymentId}
            onChange={(e) => {
              setOrderFilter({ ...orderFilter, paymentId: e.target.value });
            }}
          />
          <label htmlFor="pincode">Pincode</label>
          <input
            id="pincode"
            type="text"
            className="form-control input-group mb-3"
            placeholder="Pincode"
            value={orderFilter.pincode}
            onChange={(e) => {
              setOrderFilter({ ...orderFilter, pincode: e.target.value });
            }}
          />
          <label htmlFor="coupoon">Coupoon</label>
          <input
            id="coupoon"
            type="text"
            className="form-control input-group mb-3"
            placeholder="Coupoon"
            value={orderFilter.coupoonCode}
            onChange={(e) => {
              setOrderFilter({ ...orderFilter, coupoonCode: e.target.value });
            }}
          />
          <label htmlFor="trackId">Tracking Id</label>
          <input
            id="trackId"
            type="text"
            className="form-control input-group mb-3"
            placeholder="Tracking Id"
            value={orderFilter.trackingId}
            onChange={(e) => {
              setOrderFilter({ ...orderFilter, trackingId: e.target.value });
            }}
          />
        </div>
        <div className="col-9">
          {orders &&
            orders.map((order, x) => {
              return (
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
                        <div>Unpaid</div>
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
              );
            })}
        </div>
      </div>
    </Base>
  );
};
export default OrderManagement;
