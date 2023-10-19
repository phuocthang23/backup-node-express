import * as repository from "../repositories/orderItemRepository";
import * as repositories from "../repositories/orderRepository";

export const createOrder = async (body) => {
  try {
    const dataOrderItem = await repository.getAllOrderItemRepository();
    // console.log(dataOrderItem);
    const uniqueCodeOrders = [
      ...new Set(dataOrderItem.map((item) => item.codeOrder)),
    ];
    // console.log(uniqueCodeOrders);

    for (const item of uniqueCodeOrders) {
      const createOrder = {
        codeOrder: item,
        addressId: +body.addressId,
        paymentId: +body.paymentId,
        userId: body.userId,
      };
      // console.log(createOrder, "xxx");
      await repositories.createOrderRepository(createOrder);
      // return {
      //   success: response > 0 ? true : false,
      //   message:
      //     response > 0 ? "Create order successfully" : "Create order failed",
      // };
    }
    // }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllOrder = async () => {
  console.log("yyyy");
  try {
    const response = await repositories.getAllOrderRepository();
    // const order = response.map((order) => order.dataValues);
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    console.log(error, "xxxx");
    return error;
  }
};

export const getOrderByUser = async (id) => {
  try {
    const response = await repositories.getAllOrderByUserRepository(id);
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return error;
  }
};
