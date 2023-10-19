"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    static associate(models) {
      Orders.belongsTo(models.Address, {
        foreignKey: "addressId",
        targetKey: "id",
        as: "address",
      });

      Orders.hasMany(models.OrderItems, {
        foreignKey: "codeOrder",
        sourceKey: "codeOrder",
        as: "orderProduct",
      });
    }
  }
  Orders.init(
    {
      userId: DataTypes.INTEGER,
      addressId: DataTypes.INTEGER,
      paymentId: DataTypes.INTEGER,
      status: DataTypes.STRING,
      codeOrder: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Orders",
    }
  );
  return Orders;
};
