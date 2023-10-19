import db from "../models";

export const createOrderRepository = async (body) => {
  console.log(body);
  const data = await db.Orders.findOrCreate({
    where: {
      codeOrder: body.codeOrder,
    },
    defaults: {
      codeOrder: body.codeOrder,
      addressId: body.addressId,
      paymentId: body.paymentId,
      userId: body.userId,
      status: "PENDING",
    },
  });

  await db.Cart.destroy({
    where: { userId: body.userId },
  });

  return data;
};

export const getAllOrderRepository = async () => {
  console.log("aaa");
  return await db.Orders.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
};

export const getAllOrderByUserRepository = async ({ id }) => {
  // get all products in the cart of a user through the productSizeId and userId
  return await db.Orders.findAll({
    where: { userId: id },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        model: db.Address,
        as: "address",
        attributes: {
          exclude: ["createdAt", "updatedAt", "userId"],
        },
      },
      {
        model: db.OrderItems,
        as: "orderProduct",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: db.sizeProduct,
            as: "sizeProduct",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: [
              {
                model: db.Product,
                as: "product",
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
              {
                model: db.Size,
                as: "size",
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                },
              },
            ],
          },
        ],
      },
    ],
  });
};
