import db from "../models";
const cloudinary = require("cloudinary").v2;

// export const createImageProduct = async (body) => {
//   let hasSuccess = false;
//   for (const image of body) {
//     try {
//       const response = await db.imageProducts.findOrCreate({
//         where: { src: image.src },
//         defaults: { src: image.src, productId: +image.productId },
//       });
//       const success = response[1] === true ? true : false;
//       if (success) {
//         hasSuccess = true;
//       } else {
//         await cloudinary.uploader.destroy(image.src);
//         return "image is available";
//       }
//     } catch (e) {
//       await cloudinary.uploader.destroy(image.src);
//       return "cant get images";
//     }
//     return hasSuccess;
//   }
// };
// imageProductRepository.js

export const createImageProduct = async (body) => {
  let hasSuccess = false;
  for (const image of body) {
    try {
      // Kiểm tra xem ảnh đã tồn tại theo productId
      const existingImage = await db.imageProducts.findOne({
        where: { productId: +image.productId, src: image.src },
      });

      console.log(">>>>", existingImage);

      if (existingImage) {
        // Nếu ảnh đã tồn tại, hủy ảnh
        await cloudinary.uploader.destroy(existingImage.src);
        return "image is available";
      }

      const response = await db.imageProducts.findOrCreate({
        where: { src: image.src },
        defaults: { src: image.src, productId: +image.productId },
      });
      const success = response[1] === true ? true : false;
      if (success) {
        hasSuccess = true;
      }
    } catch (error) {
      // If there's an error, destroy the image
      await cloudinary.uploader.destroy(image.src);
      throw error;
    }
  }
  return hasSuccess;
};

export const getAllImageProductService = async () => {
  try {
    const response = await db.imageProducts.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
  // include: [
  //   {
  //     model: db.Product,
  //     as: "product",
  //     attributes: {
  //       exclude: ["createdAt", "updatedAt"],
  //     },
  //   },
  // ],
};

export const getOneImageProductRepository = async ({ id }) => {
  try {
    const response = await db.imageProducts.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      // include: [
      //   {
      //     model: db.Product,
      //     as: "product",
      //     attributes: {
      //       exclude: ["createdAt", "updatedAt"],
      //     },
      //   },
      // ],
    });
    console.log("mmm", response);
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteOneImageProductRepository = async ({ id }) => {
  try {
    const response = await db.imageProducts.destroy({
      where: { id },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const updateImageProductRespository = async (id, src) => {
  console.log(2222222222222, src);
  try {
    const response = await db.imageProducts.update(
      { src: src },
      {
        where: { id: id },
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};
