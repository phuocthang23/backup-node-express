import * as services from "../services";

//* CREATE
export const createCategoriesController = async (req, res) => {
  try {
    const data = req.body;
    const response = await services.createCategoryServices(data);
    return res.status(200).json(response);
  } catch (error) {
    // return internalServerError(res);
  }
};

// //* get All
export const getAllCategories = async (req, res) => {
  try {
    const response = await services.getAllCategoriesServices();
    return res.status(200).json(response);
  } catch (error) {
    // return internalServerError(res);
  }
};

// //* get One
export const getOneCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await services.getOneCategoriesServices({ id });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// //* update

export const updateCategoriesServices = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(req.body, id);
    const response = await services.updateCategoriesServices(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// //* delete

export const deleteCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await services.deleteOneCategoriesServices({ id });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
