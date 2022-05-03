import React, { useEffect, useState } from "react";
import Base from "../../Base";
import { fetchAllYears } from "../DewalPanjika/Year/helper/apiCalls";
import { createPaymentOrder, getAllUsers, getOrdersByUser, updateOrderOfUser } from "./helper";

export default function AppOrdersManagement() {
  // const filterRecords = () => {
  //   // var input = document.getElementById("userDetail").value.toUpperCase();

  //   // var users = document.getElementsByClassName("users");
  //   // for (var i = 0; i < users.length; i++) {
  //   //   if (
  //   //     // users[i].childNodes[0].innerText == input ||
  //   //     // users[i].childNodes[1].innerText.toUpperCase().indexOf(input) > -1 ||
  //   //     users[i].childNodes[2].innerText.toUpperCase().indexOf(input) > -1 ||
  //   //     users[i].childNodes[3].innerText.toUpperCase().indexOf(input) > -1
  //   //   ) {
  //   //     users[i].classList.remove("d-none");
  //   //     // users[i].style.display = "block";
  //   //   } else {
  //   //     // users[i].style.display = "none";
  //   //     users[i].classList.add("d-none");
  //   //   }
  //   // }
  //   var newRec = [];
  //   allUsers.map((u) => {
  //     if (
  //       (u.email &&
  //         u.email.toUpperCase().indexOf(searchtext.toUpperCase()) > -1) ||
  //       (u.mobile && ("" + u.mobile).indexOf(searchtext.toUpperCase()) > -1)
  //     ) {
  //       newRec.push(u);
  //     }
  //   });
  //   setFilteredRecords(newRec);
  // };
  const [searchtext, setSearchtext] = useState({
    mobile: "",
    email: "",
    fId: "",
  });
  const [avlYears, setavlYears] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  // const [filteredRecords, setFilteredRecords] = useState([]);
  const [newOrder, setNewOrder] = useState({
    amount: "",
    for: "",
    forId: "",
    userId: "",
    currency: "",
    note: "",
    razorpayOrderId: "",
    paymentId: "",
    razorpayPaymentSignature: "",
    paymentStatus: 0,
    createdAt: "",
    updatedAt: "",
  });
  const [userOrders, setUserOrders] = useState([]);

useEffect(() => {
  if(newOrder.paymentStatus){
    createPaymentOrder(newOrder.amount, newOrder.for, newOrder.forId, newOrder.userId, newOrder.razorpayOrderId, newOrder.paymentId, newOrder.paymentStatus).then(res=>{
      if(!res.status){
        //
      }else{
        window.location.reload()
      }
    })
  }
}, [newOrder.paymentStatus])
  
  useEffect(() => {
    fetchAllYears().then((res) => {
      if (res.error) {
        alert(res.error);
      } else {
        setavlYears(res);
      }
    });
  }, []);
  // useEffect(() => {
  //   if(searchtext.length==3){
  //     getAllUsers(searchtext).then((res) => {
  //       if (res.error) {
  //         alert(res.error);
  //       } else {
  //         setAllUsers(res.users);
  //       }
  //     });
  //   }
  // }, [searchtext]);
  useEffect(() => {
    if (newOrder.userId) {
      getOrdersByUser(newOrder.userId).then((res) => {
        setUserOrders(res.orders);
      });
    }
  }, [newOrder.userId]);
  return (
    <Base>
      <div className="px-4">
        <div className="display-4">Barkataki App Payments</div>
        {!newOrder.userId && (
          <div>
            <div className="row m-0 p-0 mt-4 justify-content-center">
              <div className="col-3">
                <div className="input-group mb-3">
                  <input
                    id="userDetail"
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    onChange={(e) => {
                      setSearchtext({ ...searchtext, email: e.target.value });
                    }}
                    value={searchtext.email}
                  />
                </div>
              </div>
              <div className="col-3">
                <div className="input-group mb-3">
                  <input
                    id="userDetail"
                    type="text"
                    className="form-control"
                    placeholder="Mobile"
                    onChange={(e) => {
                      setSearchtext({ ...searchtext, mobile: e.target.value });
                    }}
                    value={searchtext.mobile}
                  />
                </div>
              </div>
              <div className="col-3">
                <div className="input-group mb-3">
                  <input
                    id="userDetail"
                    type="text"
                    className="form-control"
                    placeholder="Firebase Id"
                    onChange={(e) => {
                      setSearchtext({ ...searchtext, fId: e.target.value });
                    }}
                    value={searchtext.fId}
                  />
                </div>
              </div>
              <div className="col-1">
                <div
                  className="button"
                  onClick={(e) => {
                    getAllUsers(searchtext).then((res) => {
                      if (res.error) {
                        alert(res.error);
                      } else {
                        setAllUsers(res.users);
                      }
                    });
                  }}
                >
                  Search
                </div>
              </div>
            </div>
            <div className="row m-0 p-0 justify-content-center ">
              <div
                style={{ maxHeight: "30rem", overflow: "scroll" }}
                className="w-100"
              >
                <table className="table table-sm w-100">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Mobile</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.length > 0 ? (
                      allUsers.map((u, i) => {
                        return (
                          <tr className="users" key={i}>
                            <th className="users-id" scope="row">
                              {u._id}
                            </th>
                            <td className="">{u.fname + " " + u.lname}</td>
                            <td className="">{u.email}</td>
                            <td className="">{u.mobile}</td>
                            <td className="text-center">
                              <div
                                className="btn btn-dark"
                                onClick={(e) => {
                                  setNewOrder({ ...newOrder, userId: u._id });
                                  setSelectedUser(u);
                                }}
                              >
                                Select
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <div className="text-center">No Users Found</div>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {newOrder.userId && (
          <div>
            <div className="row m-0 p-0">
              <h5>User: </h5>
              <p>
                {selectedUser._id +
                  " " +
                  selectedUser.fname +
                  " " +
                  selectedUser.lname +
                  "-" +
                  (selectedUser.email ? selectedUser.email : "") +
                  (selectedUser.mobile ? selectedUser.mobile : "")}
              </p>
            </div>
            {avlYears &&
              avlYears.map((year, i) => {
                return (
                  <div
                    key={i}
                    className="button"
                    onClick={(e) => {
                      setNewOrder({
                        ...newOrder,
                        amount: 51,
                        for: "YEAR",
                        forId: year._id,
                        paymentStatus: 1,
                        paymentId: prompt("Payment Id."),
                      })
                    }}
                  >
                    {year.saal}
                  </div>
                );
              })}
            <h3 className="">Orders</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Payment Status</th>
                  <th scope="col">For</th>
                  <th scope="col">For ID</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Created</th>
                  <th scope="col">Updated</th>
                </tr>
              </thead>
              {userOrders.length > 0 ? (
                <tbody>
                  {userOrders.map((uo, i) => {
                    return (
                      <tr>
                        <th scope="row">{uo._id}</th>
                        <td>
                          {uo.paymentStatus ? (
                            <div
                              className="btn btn-dark"
                              onClick={(e) => {
                                updateOrderOfUser(uo._id, "", "", "", 0).then(
                                  (res) => {
                                    if (res.error) alert(res.error);
                                    else window.location.reload();
                                  }
                                );
                              }}
                            >
                              Remove Access
                            </div>
                          ) : (
                            <div
                              className="btn btn-dark"
                              onClick={(e) => {
                                updateOrderOfUser(uo._id, "", "", "", 1).then(
                                  (res) => {
                                    if (res.error) alert(res.error);
                                    else window.location.reload();
                                  }
                                );
                              }}
                            >
                              Mark as Paid
                            </div>
                          )}
                        </td>
                        <td>{uo.for}</td>
                        {/* <td>{uo.forId}</td> */}
                        <td>{avlYears.find((x) => x._id === uo.forId).saal}</td>
                        <td>{uo.amount}</td>
                        <td>{new Date(uo.createdAt).toLocaleString()}</td>
                        <td>{new Date(uo.updatedAt).toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              ) : (
                <p>No Orders Found</p>
              )}
            </table>
          </div>
        )}
      </div>
    </Base>
  );
}
