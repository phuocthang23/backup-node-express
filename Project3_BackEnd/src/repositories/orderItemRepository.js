import db from "../models";
export const createOrderItemRepository = async (data) => {
  console.log(data, "data");
  // Get the cart item
  const cartItem = await db.Cart.findAll({
    where: { userId: data.userId },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });

  if (!cartItem) {
    return { message: "Không tìm thấy mục trong giỏ hàng" };
  }

  const min = 100000000;
  const max = 999999999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  const createOrder = cartItem.map((item) => ({
    sizeProductId: item.productSizeId,
    codeOrder: randomNumber,
    quantity: item.quantity,
    userId: item.userId,
  }));

  console.log(createOrder, "createOrder");
  // Create a new order item with the data from the cart item
  // const newOrderItems = [];

  const newOrderItem = await db.OrderItems.bulkCreate(createOrder);
  console.log(newOrderItem, "newOrderItem");

  return newOrderItem;
};

export const getAllOrderItemRepository = async () => {
  const data = await db.OrderItems.findAll({
    include: [
      {
        model: db.Orders,
        as: "orderProduct",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    ],
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  return data;
};

export const getOrderItemByUserRepository = async (id) => {
  const data = await db.OrderItems.findAll({
    where: { userId: id },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        model: db.ProductSize,
        as: "productSize",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    ],
  });
  return data;
};
