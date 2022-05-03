import { isAuthenticated } from "../../../User/helper/auth";

const { API } = require("../../../backend");
const { id, token } = isAuthenticated();

export const saveNewCoupoon = (data) => {
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API}coupoon/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateCoupoon = (data) => {
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API}coupoon/${id}/${data._id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const getAllCoupoons = () => {
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API}allcoupoons/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};
