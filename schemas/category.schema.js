const Joi = require("joi");

const categoryId = Joi.string().uuid();
const name = Joi.string().min(3).max(20);
const image = Joi.string().uri();
const isBlock = Joi.boolean();

const getCategorySchema = Joi.object({
	categoryId: categoryId.required()
});

const createCategorySchema = Joi.object({
  name: name.required(),
	image: image.required(),
	isBlock: isBlock.required()
});

const updateCategorySchema = Joi.object({
  name,
	image,
	isBlock
});

module.exports = { getCategorySchema, createCategorySchema, updateCategorySchema }
