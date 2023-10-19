import * as service from "../services";

export const createSizeProductController = async (req, res) => {
  try {
    const response = await service.createSizeProductService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getAllSizeProductController = async (req, res) => {
  try {
    const response = await service.getAllSizeProductService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getOneSizeProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.getOneSizeProductService({ id });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const updateSizeProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.updateSizeProductService(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const deleteSizeProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.deleteSizeProductService({ id });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
