import db from "../models";

export const createAddress = (body) => {
  return db.Address.findOrCreate({
    where: {
      address: body.address,
      phoneNumber: body.phoneNumber,
      userId: body.userId,
    },
    defaults: {
      address: body.address,
      phoneNumber: body.phoneNumber,
      userId: body.userId,
    },
  });
};

export const getAllAddresses = () => {
  return db.Address.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"], // bỏ những cái không cần thiết
    },
  });
};

export const getOneAddress = ({ id }) => {
  return db.Address.findOne({
    where: { id },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
};

export const updateAddress = (id, body) => {
  return db.Address.update(body, {
    where: { id },
  });
};

export const deleteOneAddress = ({ id }) => {
  return db.Address.destroy({
    where: { id },
  });
};
