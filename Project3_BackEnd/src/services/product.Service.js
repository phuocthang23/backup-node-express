import * as repository from "../repositories/product.Repository";

export const createProductServices = async (body) => {
  try {
    const response = await repository.createProductRepository(body);
    return {
      success: response[1] ? true : false,
      data: response[0],
      message: response[1]
        ? "Create product successfully"
        : "Product is available",
    };
  } catch (error) {
    return error;
  }
};

export const getAllProductServices = async () => {
  try {
    const repositoryResponse = await repository.getAllProductRepository();
    return {
      success: true,
      data: repositoryResponse,
    };
  } catch (error) {
    return error;
  }
};

export const getOneProductServices = async ({ id }) => {
  try {
    if (!id) {
      throw new Error("Bad request");
    }
    const repositoryResponse = await repository.getOneProductRepository({ id });
    if (repositoryResponse !== null) {
      return {
        success: true,
        data: repositoryResponse.dataValues,
      };
    } else {
      return { success: false, message: "Not found" };
    }
  } catch (error) {
    console.log(">>>>", error);
    return error;
  }
};

export const updateProductServices = async (id, body) => {
  try {
    const updated = await repository.updateProductRepository(id, body);
    console.log(updated);
    return {
      success: true,
      message: `Product updated successfully`,
    };
  } catch (error) {
    return error;
  }
};

export const deleteProductServices = async ({ id }) => {
  try {
    const response = await repository.changeStatusProductServices({ id });
    // console.log(response);
    return response;
  } catch (error) {
    return error;
  }
};
