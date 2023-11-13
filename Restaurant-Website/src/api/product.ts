/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
// import BaseAxios from "./axiosClient";
const token = localStorage.getItem("Auth");

export const getAllProducts = async (data: any) => {
  try {
    const response = await axios.get("http://localhost:8000/product", {
      headers: { Authorization: `Bearer ${token}` },
      params: data,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);

    // Trả về một giá trị mặc định nếu có lỗi
    return [];
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getOneProducts = (id: any) => {
  return axios.get(`http://localhost:8000/product/${id}`).then((response) => {
    return response;
  });
};

export const deleteProducts = (id: number) => {
  return axios
    .delete(`http://localhost:8000/product/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};

export const apiPostProducts = (data: any) => {
  return axios
    .post("http://localhost:8000/product/create", data, {
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

export const updateProduct = (data: any) => {
  return axios
    .put(`http://localhost:8000/product/update/${data.id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
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
