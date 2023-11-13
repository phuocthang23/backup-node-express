/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import HeaderLogin from "../components/HeaderLogin";
import FormInput from "../components/FormInput";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../Admin/components/loading";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [spinner, setSpinner] = useState<boolean>(false);
  const [user, setUser] = useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    RePassword: "",
  });

  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    RePassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSpinner(true);
    const regex = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/i;

    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      RePassword: "",
    };

    const alphabeticRegex = /^[a-zA-Z]+$/;

    if (user.firstName.trim() === "" || user.lastName.trim() === "") {
      setSpinner(false);
      newErrors.firstName = "firstName không được để trống";
      newErrors.lastName = "lastName không được để trống";
    } else if (user.firstName.length < 3 || user.firstName.length > 10) {
      setSpinner(false);
      newErrors.firstName =
        "firstName phải từ 3 ký tự trở lên và từ 10 ký tự trở xuống";
    } else if (user.lastName.length < 3 || user.lastName.length > 10) {
      setSpinner(false);
      newErrors.lastName =
        "lastName phải từ 3 ký tự trở lên và từ 20 ký tự trở xuống";
    } else if (user.password.length < 8 || user.password.length > 20) {
      setSpinner(false);
      newErrors.password = "Mật khẩu phải từ 8 đến 20 ký tự";
    } else if (!alphabeticRegex.test(user.lastName)) {
      setSpinner(false);
      newErrors.lastName = "lastName chỉ được chứa chữ cái";
    } else if (!alphabeticRegex.test(user.fisrtName)) {
      setSpinner(false);
      newErrors.firstName = "firstName chỉ được chứa chữ cái";
    }

    if (user.email.trim() === "") {
      setSpinner(false);
      newErrors.email = "Email không được để trống";
    } else if (!regex.test(user.email)) {
      setSpinner(false);
      newErrors.email = "Email không hợp lệ";
    }

    if (user.password.trim() === "") {
      setSpinner(false);
      newErrors.password = "Mật khẩu không được để trống";
    }

    if (user.RePassword.trim() === "") {
      setSpinner(false);
      newErrors.RePassword = "Nhập lại mật khẩu không được để trống";
    } else if (user.RePassword !== user.password) {
      setSpinner(false);
      newErrors.RePassword = "Mật khẩu không trùng khớp";
    }

    setError(newErrors);

    const noErrors = Object.values(newErrors).every(
      (errorMsg) => errorMsg === ""
    );

    if (noErrors) {
      try {
        const response = await axios.post(
          "http://localhost:8000/auth/register",
          user
        );

        if (response.status === 201) {
          setSpinner(false);
          if (response.data?.success === false) {
            toast.error(`email ${user.email} đã tồn tại`, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
            });
          } else {
            setSpinner(false);
            toast.success("Đăng ký thành công", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
            });
            setTimeout(() => {
              navigate("/auth");
            }, 2000);
          }
        }
      } catch (error) {
        setSpinner(false);
        console.error(error);
      }
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      {spinner ? <Loading /> : ""}
      <div className="flex flex-col items-center justify-center px-24 py-8 mx-auto md:h-screen lg:py-0">
        <div className=" w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <HeaderLogin heading="Create an account" />
            <form className="space-y-8 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <FormInput
                  placeholder="FirstName"
                  text="FirstName"
                  type="text"
                  name="firstName"
                  value={user.firstName}
                  setUser={setUser}
                  error={error.firstName}
                />
                <FormInput
                  placeholder="LastName"
                  text="LastName"
                  type="text"
                  name="lastName"
                  value={user.lastName}
                  setUser={setUser}
                  error={error.lastName}
                />

                <FormInput
                  placeholder="Email"
                  text="Email"
                  type="email"
                  name="email"
                  value={user.email}
                  setUser={setUser}
                  error={error.email}
                />
                <FormInput
                  placeholder="••••••••"
                  text="Password"
                  type="password"
                  name="password"
                  value={user.password}
                  setUser={setUser}
                  error={error.password}
                />
                <FormInput
                  placeholder="••••••••"
                  text="RePassword"
                  type="password"
                  name="RePassword"
                  value={user.RePassword}
                  setUser={setUser}
                  error={error.RePassword}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-yellow-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link to="/auth">
                  <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Login here
                  </span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default RegisterPage;
