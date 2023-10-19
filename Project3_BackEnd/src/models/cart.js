"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsTo(models.User, {
        foreignKey: "UserId",
        targetKey: "id",
        as: "user",
      });
      Cart.belongsTo(models.sizeProduct, {
        foreignKey: "productSizeId",
        targetKey: "id",
        as: "sizeProduct",
      });
    }
  }
  Cart.init(
    {
      userId: DataTypes.INTEGER,
      productSizeId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
