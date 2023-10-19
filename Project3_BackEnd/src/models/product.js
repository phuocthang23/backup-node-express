"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.Categories, {
        foreignKey: "categoryId",
        targetKey: "id",
        as: "category",
      });
      Product.hasMany(models.imageProducts, {
        foreignKey: "productId",
        as: "image",
      });
      Product.hasMany(models.sizeProduct, {
        foreignKey: "productId",
        as: "sizeProduct",
      });
      Product.hasMany(models.Wishlist, {
        foreignKey: "productId",
        targetKey: "id",
        as: "wishlist",
      });
    }
  }
  Product.init(
    {
      nameProduct: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
