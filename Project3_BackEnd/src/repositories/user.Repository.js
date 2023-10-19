import db from "../models";

export const getAllUserServices = async () => {
  try {
    const response = await db.User.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        // {
        //   model: db.Role,
        //   as: "role",
        //   attributes: {
        //     exclude: ["createdAt", "updatedAt", "id"],
        //   },
        // },
        {
          model: db.Address,
          as: "address",
          attributes: {
            exclude: ["createdAt", "updatedAt", "userId", "id"],
          },
        },
      ],
    });
    const roles = response.map((role) => role.dataValues);
    return {
      success: true,
      data: roles,
    };
  } catch (error) {}
};

export const getOneByUserServices = async ({ id }) => {
  try {
    const response = await db.User.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: db.Role,
          as: "role",
          attributes: {
            exclude: ["createdAt", "updatedAt", "id"],
          },
        },
        {
          model: db.Address,
          as: "address",
          attributes: {
            exclude: ["createdAt", "updatedAt", "userId", "id"],
          },
        },
        {
          model: db.Wishlist,
          as: "wishlist",
          attributes: {
            exclude: ["createdAt", "updatedAt", "userId", "id"],
          },
          include: [
            {
              model: db.Product,
              as: "product",
              attributes: {
                exclude: ["createdAt", "updatedAt", "id"],
              },
            },
          ],
        },
      ],
    });
    const roles = response.dataValues;
    return {
      success: true,
      data: roles,
    };
  } catch (error) {
    return error;
  }
};

export const changeStatusUserServices = async ({ id }) => {
  try {
    if (!id) {
      throw new Error("Bad request");
    }

    // Lấy thông tin user hiện tại
    const user = await db.User.findOne({ where: { id } });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    // Kiểm tra roleId của user
    if (user.roleId === 1) {
      return { success: false, message: "Admin cannot change user status" };
    }

    // Chuyển đổi giá trị của trường "status"
    const newStatus = user.status === 1 ? 0 : 1;

    // Cập nhật giá trị mới cho trường "status"
    const change = await db.User.update(
      { status: newStatus },
      { where: { id } }
    );

    return {
      success: true,
      message: "User status updated successfully",
      data: user,
    };
  } catch (error) {
    return error;
  }
};

export const updateRoleServices = async (data, id) => {
  console.log(data, id);
  try {
    const response = await db.User.update(data, {
      where: { id: id },
    });
    if (response[0] === 0) {
      cloudinary.uploader.destroy(data.avatar);
    }
    return {
      err: response[0] > 0 ? 0 : 1,
      message:
        response[0] > 0 ? `${response[0]} record updated` : `cant update `,
      data: response,
    };
  } catch {
    return error;
  }
};
