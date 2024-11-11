const Joi = require("joi");

const email = Joi.string().email();
const password = Joi.string().min(8).max(16).pattern(/[a-z]/).pattern(/[A-Z]/).pattern(/[0-9]/).pattern(/[@$!%*?&]/).messages({
	"string.min": "The password must be at least 8 characters",
	"string.max": "The password cannot exceed 16 characters",
	"string.pattern.base": "The password must include at least one lowercase letter, one uppercase letter, one number and one special character.",
});
const token = Joi.string();
const refreshToken = Joi.string();

const loginUserSchema = Joi.object({
	email: email.required(),
	password: password.required()
});

const recoverySchema = Joi.object({
	email: email.required()
});

const changePasswordSchema = Joi.object({
	newPassword: password.required(),
	token: token.required()
});

const refreshTokenSchema = Joi.object({
	refreshToken: refreshToken.required()
});

module.exports = { loginUserSchema, recoverySchema, changePasswordSchema, refreshTokenSchema };
