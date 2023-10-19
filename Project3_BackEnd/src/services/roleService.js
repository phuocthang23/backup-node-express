import db from "../models";

export const createRoleServices = ({ code }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Role.findOrCreate({
        where: { code },
        defaults: { code },
      });
      console.log();
      resolve({
        success: response[1] === true ? true : false,
        message:
          response[1] === true
            ? "Create role successfully"
            : "Role is available",
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

export const getAllRoleServices = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Role.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"], // bỏ những cái không cần thiết
        },
      });
      const roles = response.map((role) => role.dataValues);
      resolve({
        success: true,
        data: roles,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getOneRoleServices = ({ id }) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        return reject("Bad request");
      }
      const response = await db.Role.findOne({
        where: { id },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      if (response !== null) {
        resolve({
          success: true,
          data: response.dataValues,
        });
      } else {
        resolve({ success: false, message: "Not found" });
      }
    } catch (error) {
      console.log(">>>>", error);
      reject(error);
    }
  });

// export const updateRoleServices = (id, body) =>
//   new Promise(async (resolve, reject) => {
//     console.log(body, id);
//     try {
//       const updated = await db.Role.update(body, {
//         where: { id },
//       });
//       console.log(updated);
//       resolve({
//         success: true,
//         message: `Role updated successfully`,
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });

export const updateRoleServices = (id, body) =>
  new Promise(async (resolve, reject) => {
    try {
      const role = await db.Role.findOne({ where: { id } });
      if (!role) {
        return reject({ success: false, message: "Role not found" });
      }

      const updated = await db.Role.update(body, { where: { id } });

      if (updated) {
        resolve({ success: true, message: "Role updated successfully" });
      } else {
        reject({ success: false, message: "Update failed" });
      }
    } catch (error) {
      reject(error);
    }
  });

export const deleteRoleServices = async ({ id }) => {
  try {
    if (!id) {
      throw new Error("Bad request: No ID provided");
    }
    const role = await db.Role.findOne({ where: { id } });
    if (!role) {
      throw new Error("Not found: No role found with the provided ID");
    }
    const response = await db.Role.destroy({ where: { id } });
    if (response === 0) {
      throw new Error("Delete failed: No role was deleted");
    }
    return {
      success: true,
      message: "Xóa vai trò thành công",
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
