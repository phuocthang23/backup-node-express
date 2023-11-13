import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "../layouts/Auth/Auth";
import UserLayout from "../layouts/User/UserLayout";
import AdminLayout from "../layouts/Admin/page/AdminLayout";
import LoginPage from "./../layouts/Auth/Login/LoginPage";
import RegisterPage from "./../layouts/Auth/Register/RegisterPage";
import HomePage from "../layouts/User/pages/Home/HomePage";
import ProductDetailPage from "../layouts/User/pages/ProductDetail/ProductDetailPage";
import CartPage from "../layouts/User/pages/Cart/CartPage";
import DashBoardPage from "../layouts/Admin/page/DashBoard/DashBoardPage";
import ManageProductPage from "../layouts/Admin/page/ManageProduct/ManageProduct";
import NotFound from "../layouts/User/pages/NotFound";
import User from "../layouts/Admin/page/User/User";
import OderHistory from "../layouts/User/pages/orderHistory/OderHistory";
import Category from "../layouts/Admin/page/categories/category";
import Size from "../layouts/Admin/page/Size/Size";
import Order from "../layouts/Admin/page/order/Order";
import Profile from "../layouts/User/pages/profile/Profile";
// import Cart from "../layouts/User/pages/Cart/Cart";
import WishList from "./../layouts/User/pages/Cart/WishList";
import LoginSuccsess from "../layouts/Auth/loginGG/loginGG";

const AppRoute: React.FC = () => {
  return (
    <Routes>
      {/* Layout Login */}
      <Route path="/auth" element={<Auth />}>
        <Route index element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="verifyGoogle/:token/v1" element={<LoginSuccsess />} />
      </Route>
      {/* Layout User */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<HomePage />} />
        <Route path="product/:id" element={<ProductDetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="wishlist" element={<WishList />} />
        <Route path="history" element={<OderHistory />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      {/* Layout Admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashBoardPage />} />
        <Route path="product" element={<ManageProductPage />} />
        <Route path="user" element={<User />} />
        <Route path="category" element={<Category />} />
        <Route path="size" element={<Size />} />
        <Route path="orderManager" element={<Order />} />
      </Route>
      {/* Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoute;
