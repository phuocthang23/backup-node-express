"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderItems extends Model {
    static associate(models) {
      OrderItems.belongsTo(models.Orders, {
        foreignKey: "codeOrder",
        targetKey: "codeOrder",
        as: "orderProduct",
      });
      OrderItems.belongsTo(models.sizeProduct, {
        foreignKey: "sizeProductId",
        targetKey: "id",
        as: "sizeProduct",
      });
    }
  }
  OrderItems.init(
    {
      quantity: DataTypes.INTEGER,
      sizeProductId: DataTypes.INTEGER,
      codeOrder: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OrderItems",
    }
  );
  return OrderItems;
};
