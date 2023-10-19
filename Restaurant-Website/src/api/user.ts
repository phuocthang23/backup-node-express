/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import BaseAxios from "./axiosClient";
import { data } from "autoprefixer";

export const getAllUsers = (params: any) => {
  return axios
    .get("http://localhost:3000/users", { params: params })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getOneUser = (token) => {
  return axios
    .get(`http://localhost:8000/api/v1/user/one`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addTocart = (data) => {
  return axios
    .post(
      `http://localhost:8000/api/v1/cart`,
      {
        productSizeId: data.cart.sizeProductId,
        quantity: data.cart.quantity,
      },
      {
        headers: { Authorization: `Bearer ${data.loginData}` },
      }
    )
    .then((response) => {
      return response;
    });
};

export const getAllSizeProduct = (params: any) => {
  return axios
    .get("http://localhost:8000/api/v1/sizeProduct", { params: params })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
export const putOneUser = (data: any) => {
  return axios
    .put(`http://localhost:3000/users/${data.id}`, data)
    .then((response) => {
      return response;
    });
};

export const getAllUsersServer = (params: any) => {
  return BaseAxios.get("http://localhost:8000/api/v1/user", { params: params })
    .then((response) => {
      return response.data.data.data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

export const blockUsersServer = (id) => {
  return BaseAxios.delete(`http://localhost:8000/api/v1/user/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
