import * as repository from "../repositories/orderItemRepository";

export const createOrderItem = async (data) => {
  try {
    const response = await repository.createOrderItemRepository(data);
    return {
      data: response.dataValues,
      message: response.message,
    };
  } catch (error) {
    throw error;
  }
};

export const getOneOrderItemServices = async (id) => {
  try {
    if (!id) {
      throw new Error("Bad request");
    }
    const response = await repository.getOrderItemByUserRepository(id);
    if (response !== null) {
      return {
        success: true,
        data: response,
      };
    } else {
      return { success: false, message: "Not found" };
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllOrderItem = async () => {
  try {
    const response = await repository.getAllOrderItemRepository();
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    console.log(error);
    return error;
  }
};
