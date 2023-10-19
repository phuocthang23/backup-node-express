import db from "../models";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/generateToken";
require("dotenv").config();

const salt = bcrypt.genSaltSync(10);

let hasUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hash = await bcrypt.hashSync(password, salt);
      // resolve(bcrypt.compareSync(password, hash));
      resolve(hash);
    } catch (error) {
      reject(error);
    }
  });
};
export const createUserServices = async (body) => {
  console.log(body);
  try {
    let hashPassword = await hasUserPassword(body.password);
    const defaultAvatar =
      "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    const response = await db.User.findOrCreate({
      where: { email: body.email },
      defaults: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: hashPassword,
        avatar: defaultAvatar,
      },
    });
    console.log(response);
    return {
      success: response[1] === true ? true : false,
      message:
        response[1] === true ? "Create user successfully" : "User is available",
    };
  } catch (error) {
    console.log(error);
    return error;
  }
};

//*=================================(login)================================

export const loginUserServices = async (dataUser) => {
  try {
    const { email, password } = dataUser;
    const regex = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/i;

    if (!regex.test(email)) {
      return Error("Email không hợp lệ.");
    }

    const user = await db.User.findOne({
      where: { email },
      attributes: {
        exclude: ["createdAt", "updatedAt"], // bỏ những cái không cần thiết
      },
    });

    if (!user) {
      return Error("Không tìm thấy người dùng với email này.");
    }

    const checkPassword = bcrypt.compareSync(password, user.password); // kiểm tra true false

    if (!checkPassword) {
      return Error("Mật khẩu không chính xác.");
    }

    const token = generateToken(user);

    const { password: userPassword, ...userWithoutPassword } = user.dataValues;

    return {
      success: true,
      data: userWithoutPassword,
      accessToken: token, // trả token
    };
  } catch (error) {
    throw error;
  }
};
