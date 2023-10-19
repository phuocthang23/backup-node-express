import db from "../models";

export const createCategories = (body) => {
  return db.Categories.findOrCreate({
    where: {
      title: body.title,
    },
    defaults: {
      title: body.title,
    },
  });
};

export const getAllCategories = () => {
  return db.Categories.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
};

export const getOneCategories = ({ id }) => {
  return db.Categories.findOne({
    where: { id },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
};

export const updateCategoriesServices = (id, body) => {
  return db.Categories.update(body, {
    where: { id },
  });
};

export const deleteCategoriesServices = ({ id }) => {
  return db.Categories.destroy({
    where: { id },
  });
};
