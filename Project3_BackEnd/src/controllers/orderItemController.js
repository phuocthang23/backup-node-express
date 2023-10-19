import * as services from "../services/orderItem.Service";

export const createOrderItem = async (req, res) => {
  try {
    const { id } = req.user;
    const data = {
      ...req.body,
      userId: id,
    };
    const response = await services.createOrderItem(data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getAllOrderItemByUser = async (req, res) => {
  try {
    const { id } = req.user;
    const response = await services.getOneOrderItemServices(id);
    if (response.length === 0) {
      return res.status(200).json({ message: "No items in the cart." });
    }
    return res.status(200).json(response);
  } catch (error) {
    // return internalServerError(res);
  }
};

export const getAllOrderController = async (req, res) => {
  try {
    const response = await services.getAllOrderItem();
    console.log(response);
    return res.status(200).json(response);
  } catch (error) {
    // return internalServerError(res);
  }
};
