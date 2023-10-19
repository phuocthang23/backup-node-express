"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: "roleId",
        targetKey: "id",
        as: "role",
      });
      User.hasMany(models.Address, {
        foreignKey: "userId",
        targetKey: "id",
        as: "address",
      });
      User.hasMany(models.Wishlist, {
        foreignKey: "userId",
        targetKey: "id",
        as: "wishlist",
      });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      password: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
      email: DataTypes.STRING,
      avatar: DataTypes.STRING,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
