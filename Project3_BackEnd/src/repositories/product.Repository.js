import db from "../models";
export const createProductRepository = async (body) => {
  return db.Product.findOrCreate({
    where: {
      nameProduct: body.nameProduct,
    },
    defaults: {
      nameProduct: body.nameProduct,
      description: body.description,
      price: body.price,
      categoryId: body.categoryId,
      stock: body.stock,
      status: body.status,
    },
  });
};

export const getAllProductRepository = async () => {
  return db.Product.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt", "categoryId"],
    },
    include: [
      {
        model: db.Categories,
        as: "category",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: db.imageProducts,
        as: "image",
        attributes: {
          exclude: ["createdAt", "updatedAt", "productId"],
        },
      },
      {
        model: db.sizeProduct,
        as: "sizeProduct",
        attributes: {
          exclude: ["createdAt", "updatedAt", "productId", "sizeId"],
        },
        include: [
          {
            model: db.Size,
            as: "size",
            attributes: {
              exclude: ["createdAt", "updatedAt", "sizeId"],
            },
          },
        ],
      },
    ],
  });
};

export const getOneProductRepository = async ({ id }) => {
  return db.Product.findOne({
    where: { id },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        model: db.Categories,
        as: "category",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: db.imageProducts,
        as: "image",
        attributes: {
          exclude: ["createdAt", "updatedAt", "productId"],
        },
      },
      {
        model: db.sizeProduct,
        as: "sizeProduct",
        attributes: {
          exclude: ["createdAt", "updatedAt", "productId", "sizeId"],
        },
        include: [
          {
            model: db.Size,
            as: "size",
            attributes: {
              exclude: ["createdAt", "updatedAt", "sizeId"],
            },
          },
        ],
      },
    ],
  });
};

export const updateProductRepository = async (id, body) => {
  return db.Product.update(body, {
    where: { id },
  });
};

export const changeStatusProductServices = async ({ id }) => {
  try {
    if (!id) {
      return new Error("Bad request");
    }

    // Lấy thông tin user hiện tại
    const product = await db.Product.findOne({ where: { id } });

    if (!product) {
      return { success: false, message: "Product not found" };
    }

    // Chuyển đổi giá trị của trường "status"
    const newStatus = product.status === 1 ? 0 : 1;

    // Cập nhật giá trị mới cho trường "status"
    const change = await db.Product.update(
      { status: newStatus },
      { where: { id } }
    );

    return {
      success: true,
      message: "User status updated successfully",
      data: newStatus,
    };
  } catch (error) {
    return error;
  }
};
