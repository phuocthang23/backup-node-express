/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, Table } from "flowbite-react";
import React, { useState } from "react";
import { useEffect } from "react";
import { getOrderById } from "../../../../../api";

const OrderDetail = ({ orderId }) => {
  const [openModal, setOpenModal] = useState(false);
  const [orderDetail, setOrderDetail] = useState<any>({});

  useEffect(() => {
    const callApi = async () => {
      const response = await getOrderById(orderId);
      setOrderDetail(response.data);
    };
    callApi();
  }, []);

  const valueShipping = orderDetail?.ship;
  const valueTotal = orderDetail?.total;

  return (
    <div>
      <Button
        className="bg-emerald-500 h-10 w-14 px-10 py-4"
        onClick={() => setOpenModal(true)}
      >
        detail
      </Button>
      <Modal
        dismissible
        show={openModal}
        size="6xl"
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>
          <div className="text-center">
            <h1 className="text-2xl font-bold ">
              Mã đơn hàng: #{orderDetail.code}
            </h1>
          </div>
          <div className="bg-gray-200 px-3 py-2 mt-2">
            <div className="mt-4">
              <p className="text-lg">
                Địa chỉ:{" "}
                {`${orderDetail.street}, ${orderDetail.wardName}, ${orderDetail.districtName}`}
              </p>
            </div>
            <div className="mt-4">
              <p className="text-lg">
                Tên người nhận:{" "}
                {`${orderDetail?.user?.firstName} ${orderDetail?.user?.lastName}`}
              </p>
            </div>
            <div className="mt-4 flex">
              <p className="text-lg underline"> thanh toán : </p>
              <p className="text-lg">
                {orderDetail?.payment === 1
                  ? "Thanh toán khi nhận hàng"
                  : "Thanh toán trên paypal"}
              </p>
            </div>
          </div>
        </Modal.Header>

        <Modal.Body>
          <div className="space-y-6">
            <Table>
              <Table.Body className="divide-y">
                {orderDetail?.orderItems?.length > 0 &&
                  orderDetail.orderItems.map((item, index) => {
                    return (
                      <Table.Row
                        key={index}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        {item?.product?.imageProducts?.[0]?.src && (
                          <Table.Cell>
                            <img
                              src={item?.product?.imageProducts[0].src}
                              className="w-[100px] h-[100px] rounded-lg"
                            />
                          </Table.Cell>
                        )}
                        <Table.Cell>{item?.product?.nameProduct}</Table.Cell>
                        <Table.Cell>{item?.product?.size}</Table.Cell>
                        <Table.Cell>X {item?.quantity}</Table.Cell>
                        <Table.Cell>
                          {item?.product?.price.toLocaleString()}
                        </Table.Cell>
                        <Table.Cell>
                          <a
                            href="#"
                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                          >
                            Edit
                          </a>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
              </Table.Body>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer className=" px-3 py-2">
          <div className="flex-col my-4 bg-gray-200 px-3 py-2">
            <div className="text-lg mb-3">
              Shipping: {valueShipping?.toLocaleString()} VND
            </div>
            <div className="text-lg">total: {valueTotal} VND</div>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderDetail;
