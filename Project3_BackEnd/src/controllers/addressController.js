import * as services from "../services";

//* CREATE
export const createAddress = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.user;
    const response = await services.createAddressServices({
      ...req.body,
      userId: id,
    });
    return res.status(200).json(response);
  } catch (error) {
    // return internalServerError(res);
  }
};

//* get All
export const getAllAddress = async (req, res) => {
  try {
    const response = await services.getAllAddressServices();
    return res.status(200).json(response);
  } catch (error) {
    // return internalServerError(res);
  }
};

//* get One
export const getOneAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await services.getOneAddressServices({ id });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

//* update

export const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(req.body, id);
    const response = await services.updateAddressServices(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

//* delete

export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await services.deleteOneAddressServices({ id });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
