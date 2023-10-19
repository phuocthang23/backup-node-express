import * as services from "../services/order.Service";

export const createOrderController = async (req, res) => {
  try {
    const { id } = req.user;
    console.log(req.body, "controller");
    const data = {
      ...req.body,
      userId: id,
    };
    // console.log(id);
    const response = await services.createOrder(data);
    console.log(response);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getAllOrderController = async () => {
  console.log("xxx");
  try {
    const response = await services.getAllOrder();
    return res.status(200).json(response);
  } catch (error) {
    // return internalServerError(res);
  }
};

export const getAllOrderByUser = async (req, res) => {
  try {
    const { id } = req.user;
    const response = await services.getOrderByUser({ id });
    if (response.length === 0) {
      return res.status(200).json({ message: "No items in the cart." });
    }
    return res.status(200).json(response);
  } catch (error) {
    // return internalServerError(res);
  }
};
