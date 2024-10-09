const { Model, DataTypes, Sequelize } = require("sequelize");

const ORDER_TABLE = "orders";

const OrderSchema = {
  orderId: {
    allowNull: false,
    primaryKey: true,
		field: "order_id",
    type: DataTypes.STRING,
  },
  number: {
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    unique: true,
  },
	quantityOfProducts: {
		allowNull: false,
		field: "quantity_of_products",
		type: DataTypes.INTEGER,
	},
	total: {
		allowNull: false,
		type: DataTypes.INTEGER,
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

class Order extends Model {
  static associate() {}

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: "Order",
      timestamps: false,
    };
  }
}

module.exports = { ORDER_TABLE, OrderSchema, Order };
