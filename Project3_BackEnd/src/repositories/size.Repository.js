import db from "../models";
export const createSizeRepository = async (body) => {
  return db.Size.findOrCreate({
    where: {
      size: body.size,
    },
    defaults: {
      size: body.size,
      priceSize: Number(body.priceSize),
    },
  });
};

export const getAllSizeRepository = async () => {
  return db.Size.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt", "categoryId"],
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
    //     model: db.imageSizes,
    //     as: "image",
    //     attributes: {
    //       exclude: ["createdAt", "updatedAt", "SizeId"],
    //     },
    //   },
    // ],
  });
};

export const getOneSizeRepository = async ({ id }) => {
  return db.Size.findOne({
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
    // ],
  });
};

export const updateSizeRepository = async (id, body) => {
  return db.Size.update(body, {
    where: { id },
  });
};

export const deleteSizeRepository = async ({ id }) => {
  return db.Size.destroy({
    where: { id },
  });
};
