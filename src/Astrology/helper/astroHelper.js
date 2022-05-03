import { API, API_DEWALPANJIKA } from "../../backend";

export const saveAstroRequest = (data) => {
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API_DEWALPANJIKA}newastrorequest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updatePaymentStatusAstro = (order, orderId) => {
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API_DEWALPANJIKA}updateorderpayment?id=${orderId}`, {
    method: "PUT",
    headers: {
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
