/* eslint-disable @typescript-eslint/no-explicit-any */
import BaseAxios from "./axiosClient";

export const getAllCartByUser = () => {
  return BaseAxios.get(`http://localhost:8000/api/v1/cart/one`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

export const DeleteCartByUser = (id: any) => {
  return BaseAxios.delete(`http://localhost:8000/api/v1/cart/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
