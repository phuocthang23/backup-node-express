import db from "../models";

export const createWishlist = (body) => {
  return db.Wishlist.findOrCreate({
    where: {
      productId: body.productId,
      userId: body.userId,
    },
    defaults: {
      productId: body.productId,
      userId: body.userId,
    },
  });
};

export const getAllWishlist = () => {
  return db.Wishlist.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"], // bỏ những cái không cần thiết
    },
  });
};

export const getallWishlistById = ({ id }) => {
  console.log("res", id);
  return db.Wishlist.findAll({
    where: { userId: id },
    attributes: {
      exclude: ["createdAt", "updatedAt", "id", "productId"],
    },
    include: [
      {
        model: db.Product,
        as: "product",
        attributes: {
          exclude: ["createdAt", "updatedAt", "id"],
        },
      },
    ],
  });
};

export const updateWishlist = (id, body) => {
  return db.Wishlist.update(body, {
    where: { id },
  });
};

export const deleteOneWishlist = ({ id }) => {
  return db.Wishlist.destroy({
    where: { id },
  });
};
