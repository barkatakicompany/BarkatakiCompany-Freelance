import { API } from "../../backend";

export const signUpUser = (user) => {
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API}/user`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signInUser = (user) => {
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const authenticateUser = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("barkataki-user", JSON.stringify(data));
    next();
  }
};

export const signOutUser = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("barkataki-user");
    next();

    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then((response) => console.log("signout success"))
      .catch((err) => console.log(err));
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("barkataki-user")) {
    return JSON.parse(localStorage.getItem("barkataki-user"));
  } else {
    return false;
  }
};
export const generateOtp = (email) => {
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API}/otp?to=${email}`, {
    method: "GET",
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const verifyOtp = (email, otp) => {
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API}votp?to=${email}&otp=${otp}`, {
    method: "GET",
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const checkNewEmailMobile = (key, value) => {
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API}/checkNewEmailMobile?${key}=${value}`, {
    method: "GET",
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};
