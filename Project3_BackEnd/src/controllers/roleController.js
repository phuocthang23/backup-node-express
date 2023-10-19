import * as services from "../services";

export const createRole = async (req, res) => {
  try {
    const response = await services.createRoleServices(req.body);
    return res.status(200).json(response);
  } catch (error) {
    // return internalServerError(res);
  }
};
export const getAllRole = async (req, res) => {
  try {
    const response = await services.getAllRoleServices();
    return res.status(200).json(response);
  } catch (error) {
    // return internalServerError(res);
  }
};

export const getOneRole = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await services.getOneRoleServices({ id });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(req.body, id);
    const response = await services.updateRoleServices(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await services.deleteRoleServices({ id });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
