import { API } from "../../../backend";
import { isAuthenticated } from "../../../User/helper/auth";
const { id, token } = isAuthenticated();

export const getOrderByUser = () => {
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API}/orderbyuser/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const createOrder = (order) => {
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API}/order/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const updateOrder = (order, orderId) => {
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API}/order/${id}/${orderId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const updatePaymentStatus = (order, orderId) => {
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API}/orderpaymentupdate/${id}/${orderId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};
