import * as Repository from "../repositories/cart.Repository";
import { getAllCartByUser } from "./../repositories/cart.Repository";

export const createCartService = async (body) => {
  console.log(body, "service");
  try {
    const response = await Repository.createCartRepository(body);
    console.log(response, "service response");
    return {
      message: response.message,
    };
  } catch (error) {
    return error;
  }
};

export const getAllCart = async () => {
  try {
    const response = await Repository.getAllCartRepository();
    const cart = response.map((cart) => cart.dataValues);
    console.log(cart, "cart");
    return {
      success: true,
      data: cart,
    };
  } catch (error) {
    return error;
  }
};

export const getCartByUser = async (id) => {
  try {
    const response = await Repository.getAllCartByUserRepository(id);
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return error;
  }
};

export const deleteCart = async (id) => {
  console.log(id);
  try {
    const response = await Repository.deleteCartRepository(id);
    console.log(response, "service response");
    return {
      message: "The cart is deleted",
    };
  } catch (error) {
    return error;
  }
};
