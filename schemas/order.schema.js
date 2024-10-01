const Joi = require("joi");

const orderId = Joi.string().uuid();
const date = Joi.date();
const quantityOfProducts = Joi.number().integer().min(1);
const total = Joi.number().min(5);
const isBlock = Joi.boolean();

const createOrderSchema = Joi.object({
	date: date.required(),
	quantityOfProducts: quantityOfProducts.required(),
	total: total.required(),
});

const updateOrderSchema = Joi.object({
	date,
	quantityOfProducts,
	total,
	isBlock
});

const getOrderSchema = Joi.object({
  orderId: orderId.required()
});

module.exports = { createOrderSchema, updateOrderSchema, getOrderSchema }
