import { isAuthenticated } from "../../../User/helper/auth";

const { API } = require("../../../backend");

export const getCategories = () => {
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API}categories`, {
    method: "GET",
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const getSubCategories = (categoryId) => {
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API}subcategories/${categoryId}`, {
    method: "GET",
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const getProducts = (subCategoryId) => {
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API}productsbysubcategory/${subCategoryId}`, {
    method: "GET",
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const getProductById = (productId) => {
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API}product/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const addProduct = (data) => {
  document.getElementById("loading-icon").classList.remove("d-none");
  const { id, token } = isAuthenticated();
  return fetch(`${API}product/${id}`, {
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
export const addCategory = (data) => {
  document.getElementById("loading-icon").classList.remove("d-none");
  const { id, token } = isAuthenticated();
  return fetch(`${API}category/${id}`, {
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
export const addSubCategory = (data) => {
  document.getElementById("loading-icon").classList.remove("d-none");
  const { id, token } = isAuthenticated();
  return fetch(`${API}subcategory/${id}`, {
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
export const updateProduct = (data) => {
  document.getElementById("loading-icon").classList.remove("d-none");
  const { id, token } = isAuthenticated();

  return fetch(`${API}product/${id}/${data._id}`, {
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

export const uploadFile = (data) => {
  document.getElementById("loading-icon").classList.remove("d-none");
  const { id, token } = isAuthenticated();

  return fetch(`${API}/upload/${id}`, {
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
