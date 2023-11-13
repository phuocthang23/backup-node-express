/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { changeStatusOrder, getOrderUsers } from "../../../../api";
import { ToastContainer, toast } from "react-toastify";
const OderHistory = () => {
  const [order, setOrder] = useState<any>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = async () => {
      const response = await getOrderUsers();
      setOrder(response);
    };
    data();
  }, [loading]);

  const orderUser = order.data;

  //*---------------------------------(cancer order)-------------------------
  const handleCancerOrder = async (id: any) => {
    const data = 2;
    const response = await changeStatusOrder(data, id);
    console.log(response, "<<<<<<<<<<");
    // setOrder(response);
    setLoading(!loading);
    if (response.status === 200) {
      toast.success("đã hủy đơn hàng");
    } else {
      toast.error("đơn đã đặt không thể hủy");
    }
  };

  return (
    <div>
      <div className="py-32 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        {orderUser?.map((item: any, index: any) => {
          return (
            <div className="border border-gray-600 rounded-[20px] mt-10 px-5 py-4">
              <div key={index}>
                <div className="flex justify-start item-start space-y-2 flex-col ml-6  ">
                  <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800 mt-6">
                    Order #{item.code}
                  </h1>
                  <p className="text-base font-medium leading-6 text-gray-600">
                    21st Mart 2021 at 10:34 PM
                  </p>
                  <p className="text-[32px] font-medium leading-6 text-gray-600">
                    {item.status === 1
                      ? "đang chờ xác nhận"
                      : item.status === 2
                      ? "Đã hủy"
                      : item.status === 3
                      ? "đã xác nhận"
                      : item.status === 4
                      ? "đang giao"
                      : "Đã giao"}
                  </p>
                </div>
                <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                  <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                    <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                      <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">
                        Customer’s Cart
                      </p>
                      {item?.orderItems.map((item2: any) => (
                        <div
                          key={item2.id}
                          className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full  "
                        >
                          <div className="pb-4 md:pb-8 w-full md:w-40">
                            <img
                              src={item2.product.imageProducts[0].src}
                              className="w-full hidden md:block"
                              alt="dress"
                            />
                          </div>
                          <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                            <div className="w-full flex flex-col justify-start items-start space-y-8">
                              <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                                {item2.product.nameProduct}
                              </h3>
                              <div className="flex justify-start items-start flex-col space-y-2">
                                <p className="text-sm leading-none text-gray-800">
                                  <span className="text-gray-300">
                                    Category:{" "}
                                  </span>{" "}
                                  {item2.product.category.title}
                                </p>
                                <p className="text-sm leading-none text-gray-800">
                                  <span className="text-gray-300">Size: </span>{" "}
                                  {item2.sizeId === 1
                                    ? "S"
                                    : item2.sizeId === 2
                                    ? "M"
                                    : item2.sizeId === 3
                                    ? "L"
                                    : "XL"}
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-between space-x-8 items-start w-full">
                              <p className="text-base xl:text-lg leading-6">
                                {item2.product.price.toLocaleString()} VND
                              </p>
                              <p className="text-base xl:text-lg leading-6 text-gray-800">
                                {item2.quantity}
                              </p>
                              <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                                {item2.sizeId === 1
                                  ? (
                                      item2.product.price *
                                      1 *
                                      item2.quantity
                                    ).toLocaleString()
                                  : item2.sizeId === 2
                                  ? (
                                      item2.product.price *
                                      1.2 *
                                      item2.quantity
                                    ).toLocaleString()
                                  : item2.sizeId === 3
                                  ? (
                                      item2.product.price *
                                      1.5 *
                                      item2.quantity
                                    ).toLocaleString()
                                  : (
                                      item2.product.price *
                                      2 *
                                      item2.quantity
                                    ).toLocaleString()}{" "}
                                VND
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                      <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
                        <h3 className="text-xl font-semibold leading-5 text-gray-800">
                          Summary
                        </h3>
                        <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                          <div className="flex justify-between  w-full">
                            <p className="text-base leading-4 text-gray-800">
                              Subtotal
                            </p>
                            <p className="text-base leading-4 text-gray-600">
                              {item.subTotal.toLocaleString()} VND
                            </p>
                          </div>

                          <div className="flex justify-between items-center w-full">
                            <p className="text-base leading-4 text-gray-800">
                              Shipping
                            </p>
                            <p className="text-base leading-4 text-gray-600">
                              {item.ship.toLocaleString()} VND
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center w-full">
                          <p className="text-base font-semibold leading-4 text-gray-800">
                            Total
                          </p>
                          <p className="text-base font-semibold leading-4 text-gray-600">
                            {item.total.toLocaleString()} VND
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
                    <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
                      <div className="flex flex-col justify-start items-start flex-shrink-0"></div>
                      <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
                        <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                          <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                            <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                              Shipping Address
                            </p>
                            <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                              {`${item.street} - ${item.wardName} - ${item.districtName}`}
                            </p>
                          </div>
                          <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 ">
                            <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                              shop Address
                            </p>
                            <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                              336 Nguyễn Hữu Thọ, Phường hòa cường Bắc, Quận Cẩm
                              Lệ
                            </p>
                          </div>
                          <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 ">
                            <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                              Payment
                            </p>
                            <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                              {item.payment === 1 ? "COD" : "Paypal"}
                            </p>
                          </div>
                        </div>
                        <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                          {item.status === 1 && (
                            <button
                              onClick={() => handleCancerOrder(item.id)}
                              className="mt-6 md:mt-0 py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-gray-800"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ToastContainer />
    </div>
  );
};

export default OderHistory;
