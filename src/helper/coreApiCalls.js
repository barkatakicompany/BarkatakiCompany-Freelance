import { API } from "../backend";

export const getBanners = (page) => {
  document.getElementById("loading-icon").classList.remove("d-none");
  return fetch(`${API}/banners?for=${page}`, {
    method: "GET",
  })
    .then((response) => {
      document.getElementById("loading-icon").classList.add("d-none");
      return response.json();
    })
    .catch((err) => console.log(err));
};
