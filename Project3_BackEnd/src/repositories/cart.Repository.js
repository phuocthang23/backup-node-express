import db from "../models";

export const createCartRepository = async (body) => {
  console.log(body, "service");
  const existingItem = await db.Cart.findOne({
    where: {
      userId: body.userId,
      productSizeId: body.productSizeId,
    },
  });
  console.log(existingItem, "existingItem");

  if (existingItem) {
    // If the product is already in the cart and is the same size, update the quantity
    const newCart = await db.Cart.update(
      {
        quantity: existingItem.quantity + +body.quantity,
      },
      {
        where: {
          userId: body.userId,
          productSizeId: body.productSizeId,
        },
      }
    );
    return {
      message: "The product is already in the cart and is the same size",
      newCart: newCart,
    };
  } else {
    // If the product is not in the cart, create a new cart
    const newCart = await db.Cart.create({
      userId: +body.userId,
      productSizeId: +body.productSizeId,
      quantity: +body.quantity,
    });
    return {
      message: "The product is added in the cart",
      newCart: newCart,
    };
  }

  // return newCart;
};

export const getAllCartRepository = async () => {
  return db.Cart.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      //* sizeProduct
      {
        model: db.sizeProduct,
        as: "sizeProduct",
        attributes: {
          exclude: ["createdAt", "updatedAt", "id", "sizeId", "productId"],
        },
        include: [
          //* size
          {
            model: db.Size,
            as: "size",
            attributes: {
              exclude: ["createdAt", "updatedAt", "id"],
            },
          },
          //* product
          {
            model: db.Product,
            as: "product",
            attributes: {
              exclude: ["createdAt", "updatedAt", "id"],
            },
          },
        ],
      },
      // {
      //   model: db.User,
      //   as: "user",
      //   attributes: {
      //     exclude: ["createdAt", "updatedAt"],
      //   },
      // },
    ],
  });
};

export const getAllCartByUserRepository = async ({ id }) => {
  // get all products in the cart of a user through the productSizeId and userId
  return await db.Cart.findAll({
    where: { userId: id },
    attributes: {
      exclude: ["createdAt", "updatedAt", "productSizeId", "userId"],
    },
    include: [
      {
        model: db.sizeProduct,
        as: "sizeProduct",
        attributes: {
          exclude: ["createdAt", "updatedAt", "id", "sizeId", "productId"],
        },
        include: [
          //* size
          {
            model: db.Size,
            as: "size",
            attributes: {
              exclude: ["createdAt", "updatedAt", "id"],
            },
          },
          //* product
          {
            model: db.Product,
            as: "product",
            attributes: {
              exclude: ["createdAt", "updatedAt", "id"],
            },
            include: [
              {
                model: db.imageProducts,
                as: "image",
                attributes: {
                  exclude: ["createdAt", "updatedAt", "productId"],
                },
              },
            ],
          },
        ],
      },
    ],
  });
};

export const deleteCartRepository = async (id) => {
  return await db.Cart.destroy({
    where: { id: id },
  });
};
