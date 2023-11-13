/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import HeaderLogin from "../components/HeaderLogin";
import { Link, useNavigate } from "react-router-dom";
// import FormInput from "../components/FormInput";
// import CallDataUser from "../components/CallData";
import { loginUser } from "../../../api";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import ButtonGoogle from "../buttonGoogle";

const LoginForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const regex = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/i;

    // if (!regex.test(user.email)) {
    //   setError({
    //     email: "Vui lòng nhập đúng định dạng email.",
    //     password: error.password,
    //   });
    // }

    if (user.email.trim() === "" || user.password.trim() === "") {
      setError({
        email: "Vui lòng nhập địa chỉ email.",
        password: "Vui lòng nhập mật khẩu.",
      });
      return;
    }

    try {
      const response: any = await loginUser(user);

      if ((response as any).data?.success === false) {
        setServerError("mật khẩu và email không đúng");
        return;
      }

      if ((response as any).data.data?.status === 1) {
        setServerError("Tài khoản đã bị khóa");
        return;
      } else {
        const accessToken = response.data.access_token;
        localStorage.setItem("Auth", accessToken);
        if (response.data.data.roleId === 1) {
          navigate("/admin");
        } else {
          // window.location.reload();
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleChange = (e) => {
    setError({
      ...error,
      [e.target.name]: "",
    });

    setServerError("");

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            TFOODY
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <HeaderLogin heading=" Sign in to your account" />
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={(e) => handleSubmit(e)}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 ${
                      error.email ? "border-red-500" : ""
                    }`}
                  />
                  {error.email && (
                    <p className="mt-2 text-xs text-red-500">{error.email}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Your Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 ${
                      error.password ? "border-red-500" : ""
                    }`}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    {showPassword ? (
                      <FaEyeSlash
                        onClick={togglePasswordVisibility}
                        className="text-gray-400 cursor-pointer"
                      />
                    ) : (
                      <FaEye
                        onClick={togglePasswordVisibility}
                        className="text-gray-400 cursor-pointer"
                      />
                    )}
                  </div>
                  {error.password && (
                    <p className="mt-2 text-xs text-red-500">
                      {error.password}
                    </p>
                  )}
                  {serverError && (
                    <div className="bg-[#FFFF99] border border-yellow-600 text-yellow-900 px-4 py-2 mt-4 text-center text-[15px]">
                      {serverError}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="text-gray-500 dark:text-gray-300">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-yellow-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/auth/register"
                    className="font-medium text-blue-500 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
                <ButtonGoogle />
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginForm;
