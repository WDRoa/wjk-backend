const { Model, DataTypes, Sequelize } = require("sequelize");

const { USER_TABLE } = require("./user.model");

const ORDER_TABLE = "orders";

const OrderSchema = {
  orderId: {
    allowNull: false,
    primaryKey: true,
		field: "order_id",
    type: DataTypes.STRING,
  },
	userId: {
		allowNull: true,
		field: "user_id",
		type: DataTypes.STRING,
		unique: false,
		references: {
			model: USER_TABLE,
			key: "user_id",
		},
		onUpdate: "CASCADE",
		onDelete: "SET NULL",
	},
  number: {
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    unique: true,
  },
	date: {
		allowNull: false,
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW
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
  static associate(models) {
		this.belongsTo(models.User, {
			as: "user",
			foreignKey: "userId",
		})
		this.belongsToMany(models.Product, {
			as: "items",
			through: models.OrderProduct,
			foreignKey: "orderId",
			otherKey: "productId",
		})
	}

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
