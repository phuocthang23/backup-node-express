import React from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../components/layout/AdminSideBar/AdminSideBar";

const AdminLayout: React.FC = () => {
  return (
    <div className="w-full ">
      <div className="flex w-full ">
        <div className="w-1/6">
          <AdminSideBar />
        </div>
        <div className="p-4 w-5/6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
