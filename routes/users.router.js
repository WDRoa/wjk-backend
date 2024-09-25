const express = require("express");
const boom = require("@hapi/boom");

const UsersService = require("../services/user.service");

const router = express.Router();
const service = new UsersService();

router.get("/", async (request, response, next) => {
	try {
		const users = await service.find();
		response.json(users);

	} catch (error) {
			next(boom.internal('Occurred while fetching all the users', error));
		}
});

router.get("/:userId", async (request, response, next) => {
	const { userId } = request.params;

	try {
		const user = await service.findOne(userId);
		response.json(user);

	} catch (error) {
			next(error);
		}
});

router.post("/", async (request, response, next) => {
	const body = request.body;

	try {
		const newUser = await service.create(body);
		response.status(201).json({ message: "Created", body: newUser });

	} catch (error) {
			next(boom.internal('Occurred while creating an user', error));
		}
});

router.put("/:userId", async (request, response, next) => {
	const { userId } = request.params;
	const body = request.body;

	try {
		const userUpdated = await service.update(userId, body);
		response.json({ message: "Fully updated", body: userUpdated });

	} catch (error) {
			next(error);
		}
});

router.patch("/:userId", async (request, response, next) => {
	const { userId } = request.params;
	const body = request.body;

	try {
		const userUpdated = await service.update(userId, body);
		response.json({ message: "Partially updated", body: userUpdated });

	} catch (error) {
			next(error);
		}
});

router.delete("/:userId", async (request, response, next) => {
	const { userId } = request.params;

	try {
		await service.delete(userId);
		response.json({ message: "Deleted", id: userId });

	} catch (error) {
			next(error);
		}
});

module.exports = router;
