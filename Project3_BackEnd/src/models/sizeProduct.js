"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SizeProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SizeProduct.belongsTo(models.Size, {
        foreignKey: "sizeId",
        as: "size",
      });
      SizeProduct.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });
      SizeProduct.hasOne(models.Cart, {
        foreignKey: "productSizeId",
        as: "cart",
      });
    }
  }
  SizeProduct.init(
    {
      sizeId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "sizeProduct",
    }
  );
  return SizeProduct;
};
