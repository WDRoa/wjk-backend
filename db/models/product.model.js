const { Model, DataTypes, Sequelize } = require("sequelize");

const PRODUCT_TABLE = "products";

const ProductSchema = {
  productId: {
    allowNull: false,
    primaryKey: true,
		field: "product_id",
    type: DataTypes.STRING,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: false,
  },
	price: {
		allowNull: false,
		type: DataTypes.INTEGER,
	},
	image: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	isBlock: {
		allowNull: false,
		field: "is_block",
		type: DataTypes.BOOLEAN,
	},
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW,
  },
};

class Product extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: "Product",
      timestamps: false,
    };
  }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product };
