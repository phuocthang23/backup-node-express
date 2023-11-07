/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import BaseAxios from "./axiosClient";

const token = localStorage.getItem("Auth");
export const getAllCartByUser = () => {
  return BaseAxios.get(`http://localhost:8000/cart/me`, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

export const DeleteCartByUser = (id: any) => {
  return axios
    .delete(`http://localhost:8000/cart/me/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
