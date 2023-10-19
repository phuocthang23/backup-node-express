import * as services from "../services";

//* CREATE
export const createWishlist = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.user;
    const response = await services.createWishlistServices({
      ...req.body,
      userId: id,
    });
    return res.status(200).json(response);
  } catch (error) {
    // return internalServerError(res);
  }
};

//* get All
export const getAllWishlist = async (req, res) => {
  try {
    const response = await services.getAllWishlistServices();
    return res.status(200).json(response);
  } catch (error) {
    // return internalServerError(res);
  }
};

//* get One
export const getOneWishlist = async (req, res) => {
  try {
    const { id } = req.user;
    console.log({ id });
    const response = await services.getOneWishlistServices({ id });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

//* update

export const updateWishlist = async (req, res) => {
  try {
    const { id } = req.user;
    // console.log(req.body, id);
    const response = await services.updateWishlistServices(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

//* delete

export const deleteWishlist = async (req, res) => {
  try {
    const { id } = req.user;
    const response = await services.deleteOneWishlistServices({ id });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
