import axios from "axios";

const token = localStorage.getItem("Auth");
export const getOneWishlist = () => {
  console.log(token, "token");
  return axios
    .get(`http://localhost:8000/wishlist/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      console.log(response, "ppppp");

      return response;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
