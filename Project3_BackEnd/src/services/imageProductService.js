import * as ImageProductRepository from "../repositories/imageProductRepository";
const cloudinary = require("cloudinary").v2;

export const createImageProductService = async (body) => {
  try {
    const hasSuccess = await ImageProductRepository.createImageProduct(body);
    // console.log("++++++", hasSuccess);
    if (hasSuccess) {
      return {
        success: true,
        message: "Create image successfully",
      };
    } else {
      cloudinary.uploader.destroy(body.src);
      return {
        success: false,
        message: "Image is available",
      };
    }
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const getAllImageProductService = async () => {
  try {
    const response = await ImageProductRepository.getAllImageProductService();
    console.log(response);
    // const images = response.map((item) => item.toJSON());
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return error;
  }
};

export const getOneImageProductService = async ({ id }) => {
  console.log(123, id);
  try {
    const response = await ImageProductRepository.getOneImageProductRepository({
      id,
    });
    console.log(response);
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return error;
  }
};

export const updateImageProductService = async (id, src) => {
  try {
    const response = await ImageProductRepository.updateImageProductRespository(
      id,
      src
    );
    console.log(response);
    return {
      success: response[0] > 0 ? true : false,
      message: response[0] > 0 ? `Updated image successfully` : `fail`,
      data: response,
    };
  } catch (error) {
    // cloudinary.uploader.uploadError(body.src);
    return error;
  }
};

export const deleteImageProductService = async ({ id }) => {
  console.log(id);
  try {
    const response =
      await ImageProductRepository.deleteOneImageProductRepository({ id });
    return {
      success: response > 0 ? true : false,
      message: response > 0 ? `Delete successfully` : `Delete failed`,
    };
  } catch (error) {
    return error;
  }
};
