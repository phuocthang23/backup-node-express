/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import logo from "../../../../../public/assets/images/Thiết kế chưa có tên.png";
import "flowbite";
import { GiHamburgerMenu } from "react-icons/gi";
// import SearchBar from "../Search/SearchBar";
import { BsCartPlus } from "react-icons/bs";
import { Avatar, Dropdown } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { getAllCartByUser, getOneUser } from "../../../../api";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./index.css";
import SearchBar from "../Search/SearchBar";
const Header = () => {
  const navigate = useNavigate();

  const update = useSelector((state: any) => state.updateReducer);
  const [cart, setCart] = useState<any>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loginUser = localStorage.getItem("Auth");

  const [user, setUser] = useState<any>("");
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loginUser = localStorage.getItem("Auth");
    if (loginUser) {
      const fetchData = async () => {
        const response = await getOneUser();
        const cart = await getAllCartByUser();
        setCart((cart as any).data);
        setUser((response as any).data);
      };
      fetchData();
    }
  }, [update]);

  const handleLogout = () => {
    localStorage.removeItem("Auth");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-white border-b-2 border-gray-200 dark:bg-gray-900 fixed w-full z-10">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to={"/"} className="flex items-center">
          <img src={logo} className="h-[60px] w-full mr-3" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            TFoody
          </span>
        </Link>
        {/* seach bar */}
        <div className="w-1/3  input-item-search mt-2">
          <SearchBar />
        </div>
        {/* responsive navbar */}
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <GiHamburgerMenu className="h-5 w-5" />
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink to={"/"}>
                <a
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </a>
              </NavLink>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                About
              </a>
            </li>

            <li>
              <a
                href="#"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Contact
              </a>
            </li>
            {loginUser ? null : (
              <li>
                <Link
                  to={"/auth"}
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  login
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="flex items-center">
          <div className="relative mx-7">
            <Link to={"/cart"}>
              <BsCartPlus className="w-7 h-7 cursor-pointer" />
            </Link>
            <div className="w-7 h-7 rounded-full bg-orange-400 absolute top-[-15px] left-[10px]">
              {loginUser ? (
                <p className="text-center">{cart.length}</p>
              ) : (
                <p className="text-center">0</p>
              )}
            </div>
          </div>
          {loginUser ? (
            <Dropdown
              label={<Avatar img={user?.avatar} rounded />}
              arrowIcon={false}
              inline
            >
              <Dropdown.Header>
                <span className="block text-sm">{user.email}</span>
                <span className="block truncate text-sm font-medium">
                  {user?.firstName + " " + user?.lastName === undefined
                    ? ""
                    : user?.firstName + " " + user?.lastName}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>
                <NavLink to={"/profile"}>Profile</NavLink>
              </Dropdown.Item>
              <Dropdown.Item>
                <NavLink to={"/history"}>
                  {" "}
                  <a className="hover:text-blue-500"> History</a>{" "}
                </NavLink>
              </Dropdown.Item>
              <Dropdown.Item>
                {" "}
                <NavLink to={"/wishlist"}>WishList</NavLink>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Avatar rounded className="mx-2" />
          )}
          <span className="mx-3 ">
            {loginUser ? (
              <span>{user?.firstName + " " + user?.lastName}</span>
            ) : (
              <span>Guest</span>
            )}
          </span>
        </div>

        {/* <span></span> */}
      </div>
    </nav>
  );
};
export default Header;
