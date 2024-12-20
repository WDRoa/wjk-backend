const { User, UserSchema } = require("./user.model");
const { Order, OrderSchema } = require("./order.model");
const { Category, CategorySchema } = require("./category.model");
const { Product, ProductSchema } = require("./product.model");
const { OrderProduct, OrderProductSchema } = require("./order-product.model");

const setupModels = sequelize => {
  User.init(UserSchema, User.config(sequelize));
	OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));
	Order.init(OrderSchema, Order.config(sequelize));
	Category.init(CategorySchema, Category.config(sequelize));
	Product.init(ProductSchema, Product.config(sequelize));

	User.associate(sequelize.models);
	Order.associate(sequelize.models);
	Category.associate(sequelize.models);
	Product.associate(sequelize.models);
}

module.exports = setupModels;
