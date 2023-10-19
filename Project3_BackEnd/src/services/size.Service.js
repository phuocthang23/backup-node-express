import * as sizeRepository from "../repositories/size.Repository";

export const createSizeService = async (body) => {
  try {
    const response = await sizeRepository.createSizeRepository(body);
    return {
      success: response[1] === true ? true : false,
      message:
        response[1] === true ? "Create size successfully" : "Size is available",
    };
  } catch (error) {
    return error;
  }
};

export const getAllSizeService = async () => {
  try {
    const response = await sizeRepository.getAllSizeRepository();
    return {
      success: response[1] === true ? true : false,
      message:
        response[1] === true
          ? "Get all size successfully"
          : "Size is available",
      data: response,
    };
  } catch (error) {
    return error;
  }
};

export const getOneSizeService = async ({ id }) => {
  try {
    if (!id) {
      throw new Error("Bad request");
    }
    const response = await sizeRepository.getOneSizeRepository({ id });
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

export const updateSizeService = async (id, body) => {
  try {
    const response = await sizeRepository.updateSizeRepository(id, body);
    console.log(response);
    return {
      success: response[0] > 0 ? true : false,
      message: response[0] > 0 ? "Update size successfully" : "Size is failed",
    };
  } catch (error) {
    return error;
  }
};

export const deleteSizeService = async ({ id }) => {
  try {
    if (!id) {
      throw new Error("Bad request");
    }
    const response = await sizeRepository.deleteSizeRepository({ id });
    return {
      success: response[1] === true ? true : false,
      message:
        response[1] === true ? "Delete size successfully" : "Size is available",
    };
  } catch (error) {
    return error;
  }
};
