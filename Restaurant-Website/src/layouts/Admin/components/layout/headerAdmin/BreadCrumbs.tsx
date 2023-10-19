import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function DefaultBreadcrumb() {
  const location = useLocation();
  const navigate = useNavigate();

  //* lấy pathname từ địa chỉ hiện tại
  const pathname = location.pathname;

  //* Chuyển đổi pathname thành các phần tử breadcrumb
  const crumbs = pathname.split("/").filter((crumb) => crumb !== "");

  //* Xây dựng đường dẫn từng phần của breadcrumb
  let currentPath = "";
  const crumbItems = crumbs.map((segment) => {
    currentPath += `/${segment}`;

    return (
      <Breadcrumb.Item key={currentPath}>
        {currentPath === "/" ? (
          <Link to="/admin">
            {" "}
            <HiHome /> home
          </Link>
        ) : (
          <Link to={currentPath}>{segment}</Link>
        )}
      </Breadcrumb.Item>
    );
  });

  return (
    <Breadcrumb aria-label="Default breadcrumb example">
      <Breadcrumb.Item
        onClick={() => navigate("/admin")}
        icon={HiHome}
        className="cursor-pointer"
      ></Breadcrumb.Item>
      {crumbItems}
    </Breadcrumb>
  );
}
