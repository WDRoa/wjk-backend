"use strict";

const { UserSchema, USER_TABLE } = require("./../models/user.model");
const { ProductSchema, PRODUCT_TABLE } = require("./../models/product.model");
const { OrderSchema, ORDER_TABLE } = require("./../models/order.model");
const { CategorySchema, CATEGORY_TABLE } = require("./../models/category.model");
const { OrderProductSchema, ORDER_PRODUCT_TABLE } = require("./../models/order-product.model");

module.exports = {
  up: async queryInterface => {
    await queryInterface.createTable(USER_TABLE, UserSchema);
		await queryInterface.createTable(ORDER_TABLE, OrderSchema);
		await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
		await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
		await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);
  },

  down: async queryInterface => {
		await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
		await queryInterface.dropTable(CATEGORY_TABLE);
		await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(USER_TABLE);
  }
};
