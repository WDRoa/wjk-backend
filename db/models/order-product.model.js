const { Model, DataTypes, Sequelize } = require("sequelize");
const { ORDER_TABLE } = require("./order.model");
const { PRODUCT_TABLE } = require("./product.model");

const ORDER_PRODUCT_TABLE = "orders_products";

const OrderProductSchema = {
  orderProductId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
  },
  orderId: {
    field: "order_id",
    allowNull: true,
    type: DataTypes.STRING,
    references: {
      model: ORDER_TABLE,
      key: "order_id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  productId: {
    field: "product_id",
    allowNull: true,
    type: DataTypes.STRING,
    references: {
      model: PRODUCT_TABLE,
      key: "product_id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
	amount: {
		allowNull: false,
		type: DataTypes.INTEGER
	},
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_at",
    defaultValue: Sequelize.NOW,
  }
};

class OrderProduct extends Model {
  static associate() {

  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      modelName: "OrderProduct",
      timestamps: false,
    };
  }
}

module.exports = { OrderProduct, OrderProductSchema, ORDER_PRODUCT_TABLE };
