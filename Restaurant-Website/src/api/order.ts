/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const getOrderUsers = () => {
  return axios.get("http://localhost:3000/users").then((response) => {
    return response.data;
  });
};
