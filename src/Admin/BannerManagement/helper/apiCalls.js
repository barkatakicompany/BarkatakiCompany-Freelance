import { isAuthenticated } from "../../../User/helper/auth";

const { API } = require("../../../backend");
const { id, token } = isAuthenticated();

export const saveNewBanner = (data) => {
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API}banner/${id}`, {
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
export const deleteBanner = (bannerId) => {
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API}banner/${id}?bannerId=${bannerId}`, {
    method: "DELETE",
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
