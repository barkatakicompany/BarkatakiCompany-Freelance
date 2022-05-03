import { API_DEWALPANJIKA } from "../../../../backend";
import { isAuthenticated } from "../../../../User/helper/auth";

export const fetchAllYears = () => {
  const { id, token } = isAuthenticated();
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API_DEWALPANJIKA}/allyears/${id}`, {
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

export const addYearInDB = (year) => {
  const { id, token } = isAuthenticated();
document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API_DEWALPANJIKA}year/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(year),
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const updateYearInDB = (year) => {
  const { id, token } = isAuthenticated();
document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API_DEWALPANJIKA}year/${year._id}/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(year),
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};
