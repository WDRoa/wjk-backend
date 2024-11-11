const { Model, DataTypes, Sequelize } = require("sequelize");

const { CATEGORY_TABLE } = require("./category.model");

const PRODUCT_TABLE = "products";

const ProductSchema = {
  productId: {
    allowNull: false,
    primaryKey: true,
		field: "product_id",
    type: DataTypes.STRING,
  },
	categoryId: {
		allowNull: true,
		field: "category_id",
		type: DataTypes.STRING,
		unique: false,
		references: {
			model: CATEGORY_TABLE,
			key: "category_id",
		},
		onUpdate: "CASCADE",
		onDelete: "SET NULL",
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
	description: {
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
    field: "created_at",
    defaultValue: Sequelize.NOW,
  },
};

class Product extends Model {
  static associate(models) {
		this.belongsTo(models.Category, {
			as: "category",
			foreignKey: "categoryId",
		});

	}

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
