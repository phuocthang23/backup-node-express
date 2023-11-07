/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import BaseAxios from "./axiosClient";
import { data } from "autoprefixer";

const token = localStorage.getItem("Auth");

const user = JSON.stringify(token);
console.log(user);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getOneUser = (token) => {
  return axios
    .get(`http://localhost:8000/user/userdetail`, {
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
    .post(`http://localhost:8000/cart/create`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response;
    });
};

export const getAllSizeProduct = (params: any) => {
  return axios
    .get("http://localhost:8000/size", { params: params })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
// export const putOneUser = (data: any) => {
//   return axios
//     .put(`http://localhost:3000/users/${data.id}`, data)
//     .then((response) => {
//       return response;
//     });
// };

export const getAllUsersServer = () => {
  return axios
    .get("http://localhost:8000/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

export const blockUsersServer = (id) => {
  return axios
    .patch(
      `http://localhost:8000/user/status/${id}`,
      { data: 1 },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
