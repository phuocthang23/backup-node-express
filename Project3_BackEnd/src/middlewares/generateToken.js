import jwt from "jsonwebtoken";
// require dotenv
require("dotenv").config();
export const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      roleId: user.roleId,
    },
    process.env.ACCESS_TOKEN_SCERET
  );

  return token;
};
