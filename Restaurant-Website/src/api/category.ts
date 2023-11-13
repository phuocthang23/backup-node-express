/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const token = localStorage.getItem("Auth");
export const getAllCategory = () => {
  return axios
    .get(`http://localhost:8000/categories`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response?.data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

export const createCategory = (data: any) => {
  return axios
    .post(
      `http://localhost:8000/categories/create`,
      {
        title: data,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

export const deleteCategory = (id: number) => {
  return axios
    .delete(`http://localhost:8000/categories/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

export const editCategory = (id: number, data: string) => {
  return axios
    .put(
      `http://localhost:8000/categories/update/${id}`,
      {
        title: data,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

export const getProductByCategory = (id: number) => {
  return axios
    .get(`http://localhost:8000/product/category/${id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
