const { User, UserSchema } = require("./user.model");
const { Category, CategorySchema } = require("./category.model");
const { Product, ProductSchema } = require("./product.model");
const { Order, OrderSchema } = require("./order.model");

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
	Category.init(CategorySchema, Category.config(sequelize));
	Order.init(OrderSchema, Order.config(sequelize));
	Product.init(ProductSchema, Product.config(sequelize));
}

module.exports = setupModels;
