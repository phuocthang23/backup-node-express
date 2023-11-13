/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const token = localStorage.getItem("Auth");
export const getOrderUsers = () => {
  return axios
    .get("http://localhost:8000/order/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response;
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

export const createOrder = (data: any) => {
  return axios
    .post("http://localhost:8000/order/create", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response;
    });
};

export const changeStatusOrder = (data: any, id: any) => {
  console.log(data, "+++++++", id);

  return axios
    .put(
      `http://localhost:8000/order/status/${id}`,
      {
        status: data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      return response;
    });
};

export const getAllOrder = () => {
  return axios
    .get("http://localhost:8000/order", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response;
    });
};

export const getOrderById = (id: any) => {
  return axios.get(`http://localhost:8000/order/${id}`).then((response) => {
    return response;
  });
};
