import { API } from "../../../backend";
import { isAuthenticated } from "../../../User/helper/auth";

export const saveCartItem = (cartitem) => {
  const { id, token } = isAuthenticated();
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API}/cartitem/${id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cartitem),
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateCartItem = (cartitem) => {
  const { id, token } = isAuthenticated();
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API}/cartitem/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cartitem),
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getCartItemsByUserId = () => {
  const { id, token } = isAuthenticated();
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API}/cartitems/${id}`, {
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

export const getCoupoonByCode = (code) => {
  const { id, token } = isAuthenticated();
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API}/coupoonbycode/${id}?code=${code}`, {
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
