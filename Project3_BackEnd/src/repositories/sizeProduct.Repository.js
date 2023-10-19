import db from "../models";
export const createSizeProductRepository = async (body) => {
  const response = await db.sizeProduct.findOrCreate({
    where: {
      productId: body.productId,
      sizeId: body.sizeId,
    },
    default: {
      productId: body.productId,
      sizeId: body.sizeId,
      status: body.status,
    },
  });
  return response;
};

export const getAllSizeProductRepository = async () => {
  return db.sizeProduct.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        model: db.Size,
        as: "size",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: db.Product,
        as: "product",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    ],
  });
};

export const getOneSizeProductRepository = async ({ id }) => {
  return db.sizeProduct.findOne({
    where: { id },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    // include: [
    //   {
    //     model: db.Categories,
    //     as: "category",
    //     attributes: {
    //       exclude: ["createdAt", "updatedAt"],
    //     },
    //   },
    //   {
    //     model: db.imageSizeProducts,
    //     as: "image",
    //     attributes: {
    //       exclude: ["createdAt", "updatedAt", "SizeProductId"],
    //     },
    //   },
    // ],
  });
};

export const updateSizeProductRepository = async (id, body) => {
  return db.sizeProduct.update(body, {
    where: { id },
  });
};

export const deleteSizeProductRepository = async ({ id }) => {
  return db.sizeProduct.destroy({
    where: { id },
  });
};
