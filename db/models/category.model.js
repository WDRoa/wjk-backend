const { Model, DataTypes, Sequelize } = require("sequelize");

const CATEGORY_TABLE = "categories";

const CategorySchema = {
  categoryId: {
    allowNull: false,
    primaryKey: true,
		field: "category_id",
    type: DataTypes.STRING,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
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

class Category extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: "Category",
      timestamps: false,
    };
  }
}

module.exports = { CATEGORY_TABLE, CategorySchema, Category };
