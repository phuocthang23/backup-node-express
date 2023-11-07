/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const token = localStorage.getItem("Auth");
export const getAllSize = () => {
  return axios
    .get(`http://localhost:8000/size`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response?.data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

export const createSize = (data: any) => {
  return axios
    .post(
      `http://localhost:8000/size/create`,
      {
        size: data.size,
        priceSize: data.priceSize,
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

export const deleteSize = (id: number) => {
  return axios
    .delete(`http://localhost:8000/size/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

export const editSize = (
  id: number,
  data: { size: string; priceSize: number }
) => {
  return axios
    .put(
      `http://localhost:8000/size/update/${id}`,
      {
        size: data.size,
        priceSize: data.priceSize,
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
