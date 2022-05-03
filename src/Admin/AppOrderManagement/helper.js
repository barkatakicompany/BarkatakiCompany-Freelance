import { API, API_DEWALPANJIKA } from "../../backend";
import { isAuthenticated } from "../../User/helper/auth";

export const getAllUsers = (searchText) => {
  document.getElementById("loading-icon").classList.remove("d-none");

  const { id, token } = isAuthenticated();
  return fetch(`${API}/allUsers/${id}?email=${searchText.email}&mobile=${searchText.mobile}&fid=${searchText.fId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      document.getElementById("loading-icon").classList.add("d-none");

      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getOrdersByUser = (userId) => {
  const { id, token } = isAuthenticated();
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API_DEWALPANJIKA}/ordersbyuser/${id}?userId=${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      document.getElementById("loading-icon").classList.add("d-none");

      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
export const updateOrderOfUser = (userId, roid, rps, pi,ps) => {
  const { id, token } = isAuthenticated();
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API_DEWALPANJIKA}/ordersofuser/${id}?id=${userId}&roid=${roid}&rps=${rps}&pi=${pi}&ps=${ps}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      document.getElementById("loading-icon").classList.add("d-none");

      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
export const createPaymentOrder = (amount, forr, forId, userId,rOid,paymentId,ps) => {
  const { id, token } = isAuthenticated();
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API_DEWALPANJIKA}/createPaymentOrder/${id}?amount=${amount}&for=${forr}&forId=${forId}&userId=${userId}&rOid=${rOid}&paymentId=${paymentId}&ps=${ps}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      document.getElementById("loading-icon").classList.add("d-none");

      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
