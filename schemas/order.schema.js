const Joi = require("joi");

const orderId = Joi.string().uuid();
const userId = Joi.string().uuid();
const orderProductId = Joi.string().uuid();
const number = Joi.number().integer().min(1); //number of order
const amount = Joi.number().integer().min(1); //cuantity of type product
const productId = Joi.string().uuid();
const date = Joi.date();
const isBlock = Joi.boolean();

const getOrderSchema = Joi.object({
	orderId: orderId.required()
});

const createOrderSchema = Joi.object({
	orderId: orderId.required(),
	userId: userId.required(),
	number: number.required(),
	date: date.required(),
	isBlock: isBlock.required()
});

const updateOrderSchema = Joi.object({
	number,
	date,
	isBlock
});

const addItemSchema = Joi.object({
	orderProductId: orderProductId.required(),
	orderId: orderId.required(),
	productId: productId.required(),
	amount: amount.required()

});

module.exports = { getOrderSchema, createOrderSchema, updateOrderSchema, addItemSchema }
