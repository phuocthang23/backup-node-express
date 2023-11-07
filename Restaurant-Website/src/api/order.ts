/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const getOrderUsers = () => {
  return axios.get("http://localhost:3000/users").then((response) => {
    return response.data;
  });
};

export const getAllImage = (id: any) => {
  return axios
    .get(`http://localhost:8000/image-product/${id}`)
    .then((response) => {
      return response.data;
    });
};
export const updateImage = (id: any, data: any) => {
  return axios
    .put(`http://localhost:8000/image-product/update/${id}`, data)
    .then((response) => {
      return response;
    });
};
