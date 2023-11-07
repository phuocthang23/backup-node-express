/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const loginUser = async (data: any) => {
  return await axios
    .post(`http://localhost:8000/auth/login`, data)
    .then((response) => {
      return response;
    });
};
