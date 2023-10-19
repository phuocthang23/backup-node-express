"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Size.hasMany(models.sizeProduct, {
      //   foreignKey: "sizeId",
      //   as: "sizeProduct",
      // });
    }
  }
  Size.init(
    {
      size: DataTypes.STRING,
      priceSize: DataTypes.DECIMAL(10, 2),
    },
    {
      sequelize,
      modelName: "Size",
    }
  );
  return Size;
};
