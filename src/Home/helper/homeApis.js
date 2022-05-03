export const loadCurrentDay = () => {
  return fetch(`http://3.133.84.12:8001/api/cuday/5eb3fcc8f369aa3dbe1d6e86`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWIzZmNjOGYzNjlhYTNkYmUxZDZlODYiLCJpYXQiOjE1OTUxNzgzNDB9.QJDeNIFV9bZEdm8exSS-lh9triGLKkqaHr8donGIavg",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
