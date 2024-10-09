const Joi = require("joi");

const userId = Joi.string().uuid();
const names = Joi.string().min(3).max(30);
const lastNames = Joi.string().min(3).max(30);
const email = Joi.string().email();
const password = Joi.string().min(8);
const address = Joi.string().min(3).max(50);
const isBlock = Joi.boolean();

const createUserSchema = Joi.object({
	userId: userId.required(),
  names: names.required(),
	lastNames: lastNames.required(),
	email: email.required(),
	password: password.required(),
	address: address.required(),
	isBlock: isBlock.required()
});

const updateUserSchema = Joi.object({
  names,
	lastNames,
	email,
	password,
	address,
	isBlock
});

const getUserSchema = Joi.object({
  userId: userId.required()
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }
