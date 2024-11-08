const Joi = require("joi");

const orderId = Joi.string().uuid();
const amount = Joi.number().integer().min(1); //cuantity of type product
const productId = Joi.string().uuid();
const isBlock = Joi.boolean();

const getOrderSchema = Joi.object({
	orderId: orderId.required()
});

const createOrderSchema = Joi.object({
	isBlock: isBlock.required()
});

const updateOrderSchema = Joi.object({
	isBlock
});

const addItemSchema = Joi.object({
	orderId: orderId.required(),
	productId: productId.required(),
	amount: amount.required()
});

module.exports = { getOrderSchema, createOrderSchema, updateOrderSchema, addItemSchema };

