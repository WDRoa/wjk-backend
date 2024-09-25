const express = require("express");
const boom = require("@hapi/boom");

const OrdersService = require("../services/order.service");

const router = express.Router();
const service = new OrdersService();

router.get("/", async (request, response, next) => {
	try {
		const orders = await service.find();
		response.json(orders);

	} catch (error) {
			next(boom.internal('Occurred while fetching all the orders', error));
		}
});

router.get("/:orderId", async (request, response, next) => {
	const { orderId } = request.params;

	try {
		const order = await service.findOne(orderId);
		response.json(order);

	} catch (error) {
			next(error);
		}
});

router.post("/", async (request, response, next) => {
	const body = request.body;

	try {
		const newOrder = await service.create(body);
		response.status(201).json({ message: "Created", body: newOrder });

	} catch (error) {
			next(boom.internal('Occurred while creating an order', error));
		}
});

router.put("/:orderId", async (request, response, next) => {
	const { orderId } = request.params;
	const body = request.body;

	try {
		const orderUpdated = await service.update(orderId, body);
		response.json({ message: "Fully updated", body: orderUpdated });

	} catch (error) {
			next(error);
		}
});

router.patch("/:orderId", async (request, response, next) => {
	const { orderId } = request.params;
	const body = request.body;

	try {
		const orderUpdated = await service.update(orderId, body);
		response.json({ message: "Partially updated", body: orderUpdated });

	} catch (error) {
			next(error);
		}
});

router.delete("/:orderId", async (request, response, next) => {
	const { orderId } = request.params;

	try {
		await service.delete(orderId);
		response.json({ message: "Deleted", id: orderId });

	} catch (error) {
			next(error);
		}
});

module.exports = router;
