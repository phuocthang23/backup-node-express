/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import HearderAdmin from "../../components/layout/headerAdmin/HearderAdmin";
import { changeStatusOrder, getAllOrder } from "../../../../api";
import OrderDetail from "../../components/modal/detail/OrderDetail";

const Order = () => {
  const [order, setOrder] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  // const [find, setFind] = useState("");

  useEffect(() => {
    const data = async () => {
      const response = await getAllOrder();
      setOrder(response.data);
      console.log(response.data);
    };
    data();
  }, []);

  const handleSearch = async () => {
    // const params = data.length > 0 ? { name: data } : null;
    // const search = await getAllProducts(null);
    // setFind(search);
    // console.log(find);
  };

  const handleUpdate = async (e, id: any) => {
    const newStatus = +e.target.value;

    setOrder((prevOrder) => {
      return prevOrder.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      );
    });

    const changeStatusOrderResult = await changeStatusOrder(newStatus, id);
    console.log(changeStatusOrderResult);
    setLoading(!loading);
  };

  return (
    <div>
      <div className="flex items-center justify-between ">
        <HearderAdmin title="Order" handleSearch={handleSearch} />
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <p>STT</p>
            </th>
            <th scope="col" className="px-3 py-3">
              Phương thức thanh toán
            </th>
            <th scope="col" className="px-6 py-3">
              Địa chỉ giao
            </th>
            <th scope="col" className="px-6 py-3">
              Ngày đặt hàng
            </th>
            <th scope="col" className="px-6 py-3">
              Ngày giao dự kiến
            </th>
            <th scope="col" className="px-6 py-3">
              Trạng thái
            </th>
            <th scope="col" className="px-6 py-3">
              Tổng tiền
            </th>
            <th scope="col" className="px-6 py-3">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {order?.map((item: any, index: number) => {
            return (
              <tr key={item.id} className="p-10">
                <td className="w-4 p-4">{index + 1}</td>
                <td className="px-6 py-4 ">
                  {" "}
                  {item.payment === 1
                    ? "thanh toán khi giao"
                    : "thanh toán paypal"}{" "}
                </td>
                <td className="px-6 py-4 ">
                  {`${item.street}, ${item.wardName} - ${item.districtName}`}
                </td>
                <td className="px-6 py-4">
                  {item.createdAt
                    .slice(0, 10)
                    .replace("T", " ")
                    .split("-")
                    .reverse("-")
                    .join("-")}
                </td>
                <td className="px-6 py-4">
                  {item.updatedAt
                    .slice(0, 10)
                    .replace("T", " ")
                    .split("-")
                    .reverse("-")
                    .join("-")}
                </td>

                <td className="px-6 py-4">
                  {item.status === 2 ? (
                    <p>Đơn bị hủy</p>
                  ) : item.status === 5 ? (
                    <p>Đơn hàng đã giao</p>
                  ) : (
                    <select
                      onChange={(e) => handleUpdate(e, item.id)} //  * sửa(e,item.id)
                      className="cursor-pointer"
                    >
                      {item.status === 2 ? (
                        <p>Đơn bị hủy</p>
                      ) : item.status === 5 ? (
                        <p>Đơn hàng đã giao</p>
                      ) : (
                        <button onClick={(e) => handleUpdate(e, item.id)}>
                          Cập nhật
                        </button>
                      )}
                      <option>
                        {item.status === 1
                          ? "đang chờ xác nhận"
                          : item.status === 2
                          ? "Đã hủy"
                          : item.status === 3
                          ? "đã xác nhận"
                          : item.status === 4
                          ? "đang giao"
                          : "Đã giao"}
                      </option>
                      <option value={3}>xác nhận</option>
                      <option value={2}>hủy</option>
                      <option value={4}>đang giao</option>
                      <option value={5}>Đã giao</option>
                    </select>
                  )}
                </td>

                <td className="px-6 py-4 w-[150px]">
                  {item?.total?.toLocaleString()} VND
                </td>
                <td className="px-6 py-4">
                  <OrderDetail orderId={item.id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
