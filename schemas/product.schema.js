const Joi = require("joi");

const productId = Joi.string().uuid();
const name = Joi.string().min(3).max(100);
const price = Joi.number().integer().min(5);
const image = Joi.string().uri();
const isBlock = Joi.boolean();

const createProductSchema = Joi.object({
	productId: productId.required(),
  name: name.required(),
  price: price.required(),
	image: image.required(),
	isBlock: isBlock.required()
});

const updateProductSchema = Joi.object({
  name,
  price,
	image,
	isBlock
});

const getProductSchema = Joi.object({
  productId: productId.required()
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
