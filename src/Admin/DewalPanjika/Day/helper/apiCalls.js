import { API_DEWALPANJIKA } from "../../../../backend";
import { isAuthenticated } from "../../../../User/helper/auth";

export const fetchAllDaysByMonth = (monthId) => {
  const { id, token } = isAuthenticated();
document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API_DEWALPANJIKA}/days/${monthId}/${id}`, {
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

export const addDayInDB = (month) => {
  const { id, token } = isAuthenticated();
document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API_DEWALPANJIKA}day/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(month),
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const updateDayInDB = (day) => {
  const { id, token } = isAuthenticated();
document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API_DEWALPANJIKA}day/${day._id}/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(day),
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const getAllEvents = () => {
  const { id, token } = isAuthenticated();
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API_DEWALPANJIKA}allevents/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const addEvent = (event) => {
  const { id, token } = isAuthenticated();
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API_DEWALPANJIKA}event/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};
