const cloudinary = require("cloudinary").v2;
import * as userRepository from "../repositories/user.Repository.js";

export const getAllUserServices = async () => {
  try {
    const response = await userRepository.getAllUserServices();
    return {
      success: true,
      data: response,
    };
  } catch (error) {
    return error;
  }
};

export const getOneUserServices = ({ id }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await userRepository.getOneByUserServices({ id });
      if (response !== null) {
        resolve({
          success: true,
          data: response,
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

// export const updateRoleServices = (id, body) =>
//   new Promise(async (resolve, reject) => {
//     try {
//       const role = await db.Role.findOne({ where: { id } });
//       if (!role) {
//         return reject({ success: false, message: "Role not found" });
//       }

//       const updated = await db.Role.update(body, { where: { id } });

//       if (updated) {
//         resolve({ success: true, message: "Role updated successfully" });
//       } else {
//         reject({ success: false, message: "Update failed" });
//       }
//     } catch (error) {
//       reject(error);
//     }
//   });

export const deleteOneUserServices = async ({ id }) => {
  try {
    const response = await userRepository.changeStatusUserServices({ id });
    console.log(response);

    return {
      message: response,
    };
  } catch (error) {
    console.log(">>>>", error);
    return error;
  }
};

export const updateOneUserServices = (data, id) => {
  console.log(data, id, "service");
  try {
    const response = userRepository.updateRoleServices(data, id);
    return response;
  } catch (error) {
    console.log(">>>", error);
    reject(error);
  }
};
