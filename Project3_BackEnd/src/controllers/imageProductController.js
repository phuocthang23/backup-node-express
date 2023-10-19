import * as services from "../services";
export const createImageProductController = async (req, res) => {
  try {
    const data = req?.files?.map((el) => ({
      src: el.path,
      productId: +req.body.productId,
    }));
    const response = await services.createImageProductService(data);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    // return internalServerError(res);
  }
};

export const getAllImageProductController = async (req, res) => {
  try {
    const response = await services.getAllImageProductService();
    console.log(response);
    return res.status(200).json(response);
  } catch (error) {
    // return internalServerError(res);
  }
};
export const getOneImageProductController = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await services.getOneImageProductService({ id });
    console.log("xxxx", response);
    return res.status(200).json(response);
  } catch (error) {
    // return internalServerError(res);
  }
};

export const updateImageProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const src = req.file.path;
    console.log(src);
    const response = await services.updateImageProductService(id, src);
    return res.status(200).json(response);
  } catch (error) {
    // return internalServerError(res);
  }
};
export const deleteImageProductController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log({ id });
    const response = await services.deleteImageProductService({ id });
    return res.status(200).json(response);
  } catch (error) {
    // return internalServerError(res);
  }
};
