import { API_DEWALPANJIKA } from "../../../backend";
import { isAuthenticated } from "../../../User/helper/auth";

export const getAllAstroRequests = () => {
  const { id, token } = isAuthenticated();
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API_DEWALPANJIKA}/allastroreqs/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const getUserAstroRequests = () => {
  const { id, token } = isAuthenticated();
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API_DEWALPANJIKA}/userreports/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const uploadFile = (data) => {
  document.getElementById("loading-icon").classList.remove("d-none");
  const { id, token } = isAuthenticated();

  return fetch(`${API_DEWALPANJIKA}/upload/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: data,
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateAstroRequest = (data) => {
  document.getElementById("loading-icon").classList.remove("d-none");
  const { id, token } = isAuthenticated();

  return fetch(`${API_DEWALPANJIKA}/astrology/${id}`, {
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
