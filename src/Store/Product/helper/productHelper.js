import { API } from "../../../backend";

export const getCategories = () => {
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API}/categories`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getSubCategoriesByCategoryId = (id) => {
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API}/subcategories/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getProductsBySubCategoryId = (id) => {
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API}/productsbysubcategory/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getProductsByName = (proName) => {
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API}/productName/${proName}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getProducts = (limit) => {
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API}/products?limit=${limit}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getAllProductsName = () => {
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API}/apn`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getProductById = (id) => {
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API}/product/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};
