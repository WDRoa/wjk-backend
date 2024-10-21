const express = require("express");
const boom = require("@hapi/boom");

const UsersService = require("./../services/user.service");
const validatorHandler = require("./../middlewares/validator.handler");
const { createUserSchema, updateUserSchema, getUserSchema } = require("./../schemas/user.schema");


const router = express.Router();
const service = new UsersService();

router.get("/", async (request, response, next) => {
	try {
		const users = await service.find();
		response.json(users);

	} catch (error) {
			next(boom.internal("Occurred while fetching all the users", error));
		}
});

router.get("/:userId",
	validatorHandler(getUserSchema, "params"),
	async (request, response, next) => {
		const { userId } = request.params;

		try {
			const user = await service.findOne(userId);

			if (user.isBlock) {
					throw boom.conflict("User is blocked");
			} else {
					response.json(user);
				}

		} catch (error) {
				next(boom.notFound("Ocurred while fetching an user", error));
			}
});

router.post("/",
	validatorHandler(createUserSchema, "body"),
	async (request, response, next) => {
		const body = request.body;

		try {
			const newUser = await service.create(body);
			response.status(201).json({ message: "Created", body: newUser });

		} catch (error) {
				next(boom.internal("Occurred while creating an user", error));
			}
});

router.put("/:userId",
	validatorHandler(getUserSchema, "params"),
	validatorHandler(updateUserSchema, "body"),
	async (request, response, next) => {
		const { userId } = request.params;
		const body = request.body;

		try {
			const userUpdated = await service.update(userId, body);
			response.json({ message: "Fully updated", body: userUpdated });

		} catch (error) {
				next(boom.notFound("Occurred while updating an user completely", error));
			}
});

router.patch("/:userId",
	validatorHandler(getUserSchema, "params"),
	validatorHandler(updateUserSchema, "body"),
	async (request, response, next) => {
		const { userId } = request.params;
		const body = request.body;

		try {
			const userUpdated = await service.update(userId, body);
			response.json({ message: "Partially updated", body: userUpdated });

		} catch (error) {
			next(boom.notFound("Occurred while updating an user partially", error));
			}
});

router.delete("/:userId",
	validatorHandler(getUserSchema, "params"),
	async (request, response, next) => {
		const { userId } = request.params;

		try {
			await service.delete(userId);
			response.json({ message: "Deleted", id: userId });

		} catch (error) {
				next(boom.notFound("Occurred while deleting an user", error));
			}
});

module.exports = router;
