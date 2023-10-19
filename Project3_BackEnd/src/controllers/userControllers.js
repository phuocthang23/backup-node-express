import * as services from "../services";
const cloudinary = require("cloudinary").v2;
export const getAllUser = async (req, res) => {
  try {
    const response = await services.getAllUserServices();
    return res.status(200).json(response);
  } catch (error) {
    // return internalServerError(res);
  }
};

export const getOneUser = async (req, res) => {
  try {
    const { id } = req.user;
    const response = await services.getOneUserServices({ id });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    const data = req.body;
    // const fileData = req.file.path;
    const fileData = req.file ? req.file.path : null;

    const updatedData = { ...data, avatar: fileData };
    delete updatedData.password;

    const response = await services.updateOneUserServices(updatedData, id);
    console.log(response, "controller");
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await services.deleteOneUserServices({ id });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
