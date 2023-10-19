"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class imageProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association here if needed
    }
  }
  imageProducts.init(
    {
      src: DataTypes.STRING,
      productId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "imageProducts",
    }
  );
  return imageProducts;
};
