import * as SizeProductRepository from "../repositories/sizeProduct.Repository";

export const createSizeProductService = async (body) => {
  // console.log(body);
  try {
    const response = await SizeProductRepository.createSizeProductRepository(
      body
    );
    // console.log(response[1], "><");
    return {
      success: response[1] === true ? true : false,
      message:
        response[1] === true
          ? "Create sizeProduct successfully"
          : "Size is available",
    };
  } catch (error) {
    return error;
  }
};

export const getAllSizeProductService = async () => {
  try {
    const response = await SizeProductRepository.getAllSizeProductRepository();
    return {
      success: response[1] === true ? true : false,
      message:
        response[1] === true
          ? "Get all SizeProduct successfully"
          : "SizeProduct is available",
      data: response,
    };
  } catch (error) {
    return error;
  }
};

export const getOneSizeProductService = async ({ id }) => {
  try {
    if (!id) {
      throw new Error("Bad request");
    }
    const response = await SizeProductRepository.getOneSizeProductRepository({
      id,
    });
    if (response !== null) {
      return {
        success: true,
        data: response.dataValues,
      };
    } else {
      return { success: false, message: "Not found" };
    }
  } catch (error) {
    return error;
  }
};

export const updateSizeProductService = async (id, body) => {
  try {
    const response = await SizeProductRepository.updateSizeProductRepository(
      id,
      body
    );
    console.log(response);
    return {
      success: response[0] > 0 ? true : false,
      message:
        response[0] > 0
          ? "Update SizeProduct successfully"
          : "SizeProduct is failed",
    };
  } catch (error) {
    return error;
  }
};

export const deleteSizeProductService = async ({ id }) => {
  try {
    if (!id) {
      throw new Error("Bad request");
    }
    const response = await SizeProductRepository.deleteSizeProductRepository({
      id,
    });
    return {
      success: response[1] === true ? true : false,
      message:
        response[1] === true
          ? "Delete SizeProduct successfully"
          : "SizeProduct is available",
    };
  } catch (error) {
    return error;
  }
};
