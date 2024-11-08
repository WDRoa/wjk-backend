const Joi = require("joi");

const productId = Joi.string().uuid();
const categoryId = Joi.string().uuid() || null;
const name = Joi.string().min(3).max(100);
const price = Joi.number().integer().min(5);
const image = Joi.string().uri();
const description = Joi.string().min(10);
const isBlock = Joi.boolean();

const price_min = Joi.number().integer();
const price_max = Joi.number().integer();

const limit = Joi.number().integer().min(1).max(100).default(10);
const offset = Joi.number().integer().min(0).default(0);

const getProductSchema = Joi.object({
  productId: productId.required()
});

const createProductSchema = Joi.object({
	categoryId: categoryId.required(),
  name: name.required(),
  price: price.required(),
	image: image.required(),
	description: description.required(),
	isBlock: isBlock.required()
});

const updateProductSchema = Joi.object({
	categoryId,
  name,
  price,
	image,
	description,
	isBlock
});

const queryProductSchema = Joi.object({
	limit,
	offset,
	price,
	price_min,
	price_max: price_max.when("price_min", {
		is: price_min.required(),
		then: Joi.required()
	}),
});

module.exports = { getProductSchema, createProductSchema, updateProductSchema, queryProductSchema };
