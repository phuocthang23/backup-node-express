import * as service from "../services";

export const createSizeController = async (req, res) => {
  try {
    const response = await service.createSizeService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getAllSizeController = async (req, res) => {
  try {
    const response = await service.getAllSizeService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getOneSizeController = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.getOneSizeService({ id });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const updateSizeController = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.updateSizeService(id, req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const deleteSizeController = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await service.deleteSizeService({ id });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
