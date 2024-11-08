const Joi = require("joi");

const userId = Joi.string().uuid();
const role = Joi.string().valid("customer", "admin");
const names = Joi.string().min(3).max(30);
const lastNames = Joi.string().min(3).max(30);
const email = Joi.string().email();
const password = Joi.string().min(8);
const phone = Joi.string().min(10).max(12);
const address = Joi.string().min(3).max(150);
const isBlock = Joi.boolean();

const getUserSchema = Joi.object({
  userId: userId.required()
});

const createUserSchema = Joi.object({
	role: role.required(),
  names: names.required(),
	lastNames: lastNames.required(),
	email: email.required(),
	password: password.required(),
	phone: phone.required(),
	address: address.required(),
	isBlock: isBlock.required()
});

const updateUserSchema = Joi.object({
	role,
  names,
	lastNames,
	email,
	password,
	phone,
	address,
	isBlock
});

module.exports = { getUserSchema, createUserSchema, updateUserSchema };
