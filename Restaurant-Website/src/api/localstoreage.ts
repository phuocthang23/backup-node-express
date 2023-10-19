/* eslint-disable @typescript-eslint/no-explicit-any */
const localstoreage = () => {
  const loginData: any = localStorage.getItem("Auth");
  return loginData;
};

export default localstoreage;
