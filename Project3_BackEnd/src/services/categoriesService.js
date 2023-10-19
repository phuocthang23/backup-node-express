import * as categoriesRepository from "../repositories/categoriesRepository.js";

//* create
export const createCategoryServices = async (body) => {
  try {
    const response = await categoriesRepository.createCategories(body);
    return {
      success: response[1] === true ? true : false,
      message:
        response[1] === true
          ? "Create categories successfully"
          : "categories is available",
    };
  } catch (error) {
    return error;
  }
};

// //* getAll
export const getAllCategoriesServices = async () => {
  try {
    const response = await categoriesRepository.getAllCategories();
    const categories = response.map((categories) => categories.dataValues);
    return {
      success: true,
      data: categories,
    };
  } catch (error) {
    return error;
  }
};

// //* getone
export const getOneCategoriesServices = async ({ id }) => {
  try {
    if (!id) {
      return reject("Bad request");
    }
    const response = await categoriesRepository.getOneCategories({ id });
    if (response !== null) {
      return {
        success: true,
        data: response.dataValues,
      };
    } else {
      return { success: false, message: "Not found" };
    }
  } catch (error) {
    return error;
  }
};

// //* update

export const updateCategoriesServices = async (id, body) => {
  try {
    const response = await categoriesRepository.updateCategoriesServices(
      id,
      body
    );
    return {
      success: true,
      message: `Address updated successfully`,
    };
  } catch (error) {
    return error;
  }
};

// //* delete
export const deleteOneCategoriesServices = async ({ id }) => {
  try {
    if (!id) {
      return "Bad request";
    }

    const response = await categoriesRepository.deleteCategoriesServices({
      id,
    });

    if (response === 1) {
      return { success: true, message: "categories deleted successfully" };
    } else if (response === 0) {
      return { success: false, message: "User not found" };
    } else {
      return { success: false, message: "Unexpected result" };
    }
  } catch (error) {
    console.log(">>>>", error);
    return error;
  }
};
