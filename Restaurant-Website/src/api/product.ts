/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import BaseAxios from "./axiosClient";
const token = localStorage.getItem("Auth");
export const getAllProducts = async (data: any) => {
  return await BaseAxios.get("http://localhost:8000/api/v1/product", {
    params: data,
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      // Trả về một giá trị mặc định nếu có lỗi
      return [];
    });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getOneProducts = (id: any) => {
  return axios
    .get(`http://localhost:8000/api/v1/product/${id}`)
    .then((response) => {
      return response?.data?.data;
    });
};

export const deleteProducts = (id: number) => {
  return BaseAxios.delete(`http://localhost:8000/api/v1/product/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};

export const apiPostProducts = (data: any) => {
  return axios
    .post("http://localhost:8000/api/v1/product", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response;
    });
};

export const apiPostImageProducts = (data: any) => {
  return axios
    .post("http://localhost:8000/api/v1/imgProduct", data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response;
    });
};

export const apiPostOneProducts = (data: any) => {
  return axios
    .put(`http://localhost:3000/product/${data.id}`, data)
    .then((response) => {
      return response;
    });
};

export const apiPostOrderProducts = (id: any, data: any) => {
  return axios
    .put(`http://localhost:3000/product/${id}`, data)
    .then((response) => {
      return response;
    });
};

export const apiPutOrder = (data: any) => {
  return axios
    .post("http://localhost:3000/order", data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      // Trả về một giá trị mặc định nếu có lỗi
      return [];
    });
};

export const getAllCategory = async () => {
  return await BaseAxios.get("http://localhost:8000/api/v1/categories")
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      // Trả về một giá trị mặc định nếu có lỗi
      return [];
    });
};
